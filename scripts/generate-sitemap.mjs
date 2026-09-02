import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "src", "blogs", "posts");
const SITE_URL = "https://metehan-yildirim.com";

const getField = (frontmatter, field) => {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*"?([^"\\n]+)"?\\s*$`, "m"));
  return match ? match[1].trim() : null;
};

const posts = readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const raw = readFileSync(join(postsDir, file), "utf-8").replace(/\r\n/g, "\n");
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    const fm = fmMatch ? fmMatch[1] : "";
    return {
      slug: file.replace(/\.md$/, ""),
      title: getField(fm, "title"),
      description: getField(fm, "description"),
      date: getField(fm, "date"),
      published: getField(fm, "published") !== "false",
    };
  })
  .filter((post) => post.published && post.date)
  .sort((a, b) => b.date.localeCompare(a.date));

const latestPostDate = posts[0]?.date;

const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: latestPostDate },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/skills", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/work", changefreq: "monthly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.9", lastmod: latestPostDate },
];

const urlEntry = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map((page) => urlEntry({ loc: `${SITE_URL}${page.path}`, ...page }))
  .join("\n")}
${posts
  .map((post) =>
    urlEntry({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.8",
    })
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), sitemap);

const escapeXml = (text) =>
  (text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Muhammed Metehan Yıldırım - Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Tech blog about frontend development, React, JavaScript and open source.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(join(root, "public", "rss.xml"), rss);

console.log(`sitemap.xml + rss.xml generated (${posts.length} posts)`);
