import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaShare,
  FaBookmark,
  FaBolt,
} from "react-icons/fa";
import { useTheme } from "../ThemeContext";
import { getBlogPostBySlug, getBlogPosts } from "../blogs/blogConfig";
import { LightningBolt, FloatingSparks } from "../components/LightningEffects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-dark.css";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, language } = useTheme();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const foundPost = getBlogPostBySlug(slug);
    if (!foundPost) {
      navigate("/404");
      return;
    }

    setPost(foundPost);

    // İlgili yazılar (aynı kategoriden)
    const related = getBlogPosts()
      .filter((p) => p.id !== foundPost.id && p.category === foundPost.category)
      .slice(0, 3);
    setRelatedPosts(related);

    // SEO Meta tags güncelle
    const title = language === "tr" ? foundPost.titleTr : foundPost.title;
    const description =
      language === "tr" ? foundPost.descriptionTr : foundPost.description;

    document.title = `${title} | Metehan Yıldırım Blog`;

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", foundPost.tags.join(", "));
    }

    // Robots
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute("content", "index, follow");
    }
  }, [slug, navigate, language]);

  // Canonical URL güncellemesi
  useEffect(() => {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = `https://metehan-yildirim.com${location.pathname}`;
    }
  }, [location.pathname]);

  if (!post) return null;

  const title = language === "tr" ? post.titleTr : post.title;
  const description = language === "tr" ? post.descriptionTr : post.description;
  const category = language === "tr" ? post.categoryTr : post.category;

  const content = {
    tr: {
      backToBlog: "Blog'a Dön",
      readTime: "dakika okuma",
      sharePost: "Yazıyı Paylaş",
      bookmark: "Yer İmi Ekle",
      bookmarked: "Yer İmine Eklendi",
      relatedPosts: "İlgili Yazılar",
      readMore: "Devamını Oku",
    },
    en: {
      backToBlog: "Back to Blog",
      readTime: "min read",
      sharePost: "Share Post",
      bookmark: "Bookmark",
      bookmarked: "Bookmarked",
      relatedPosts: "Related Posts",
      readMore: "Read More",
    },
  };

  const text = content[language];

  return (
    <>
      <Helmet>
        <title>
          {post?.title || (language === "tr" ? "Blog Yazısı" : "Blog Post")} -
          Muhammed Metehan Yıldırım
        </title>
        <meta
          name="description"
          content={
            post?.excerpt ||
            (language === "tr"
              ? "Yazılım geliştirme konusunda detaylı blog yazısı"
              : "Detailed blog post about software development")
          }
        />
        <meta
          name="keywords"
          content={
            post?.tags?.join(", ") ||
            (language === "tr"
              ? "Blog, Yazılım, Geliştirme, Teknoloji"
              : "Blog, Software, Development, Technology")
          }
        />
        <meta name="author" content="Muhammed Metehan Yıldırım" />
        <meta property="article:published_time" content={post?.date} />
        <meta property="article:author" content="Muhammed Metehan Yıldırım" />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content={post?.tags?.join(", ")} />
        <meta
          property="og:title"
          content={`${post?.title || "Blog Post"} - Muhammed Metehan Yıldırım`}
        />
        <meta
          property="og:description"
          content={post?.excerpt || "Blog post about software development"}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://metehan-yildirim.com/blog/${slug}`}
        />
        <link
          rel="canonical"
          href={`https://metehan-yildirim.com/blog/${slug}`}
        />
      </Helmet>
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        }`}
      >
        <FloatingSparks />
        <LightningBolt delay={0} className="top-20 right-10" />
        <LightningBolt delay={2} className="bottom-20 left-20" />

        <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-lg hover:gap-3 transition-all ${
                theme === "dark" ? "text-cyan-400" : "text-purple-600"
              }`}
            >
              <FaArrowLeft />
              {text.backToBlog}
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            {/* Category */}
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                theme === "dark"
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-purple-500/20 text-purple-600"
              }`}
            >
              {category}
            </span>

            {/* Title */}
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 lightning-text ${
                theme === "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
              }`}
            >
              {title}
            </h1>

            {/* Meta Info */}
            <div
              className={`flex flex-wrap items-center gap-6 mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>
                  {new Date(post.date).toLocaleDateString(
                    language === "tr" ? "tr-TR" : "en-US"
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <span>
                  {post.readTime} {text.readTime}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <FaTag className="inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.share
                    ? navigator.share({ title, url: window.location.href })
                    : navigator.clipboard.writeText(window.location.href);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    : "border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600"
                }`}
              >
                <FaShare />
                {text.sharePost}
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isBookmarked
                    ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                    : theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
                    : "border-gray-300 text-gray-600 hover:border-yellow-500 hover:text-yellow-500"
                }`}
              >
                <FaBookmark />
                {isBookmarked ? text.bookmarked : text.bookmark}
              </button>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`prose prose-lg max-w-none mb-16 ${
              theme === "dark" ? "prose-invert" : "prose-gray"
            }`}
          >
            <div
              className={`text-lg leading-relaxed markdown-content ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Custom styling for code blocks
                  pre: ({ children, ...props }) => (
                    <pre
                      {...props}
                      className={`${
                        theme === "dark" ? "bg-gray-900" : "bg-gray-800"
                      } text-gray-100 p-6 rounded-xl overflow-x-auto mb-6 border ${
                        theme === "dark" ? "border-gray-700" : "border-gray-600"
                      }`}
                      style={{ fontSize: "14px", lineHeight: "1.6" }}
                    >
                      {children}
                    </pre>
                  ),
                  // Custom styling for inline code
                  code: ({ node, inline, children, ...props }) => {
                    if (inline) {
                      return (
                        <code
                          {...props}
                          className={`${
                            theme === "dark"
                              ? "bg-gray-700 text-cyan-300"
                              : "bg-gray-200 text-purple-700"
                          } px-2 py-1 rounded text-sm font-mono`}
                        >
                          {children}
                        </code>
                      );
                    }
                    return <code {...props}>{children}</code>;
                  },
                  // Custom styling for headers
                  h1: ({ children, ...props }) => (
                    <h1
                      {...props}
                      className={`text-3xl font-bold mb-8 mt-12 ${
                        theme === "dark" ? "text-cyan-400" : "text-purple-600"
                      }`}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children, ...props }) => (
                    <h2
                      {...props}
                      className={`text-2xl font-bold mb-6 mt-10 ${
                        theme === "dark" ? "text-cyan-400" : "text-purple-600"
                      }`}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children, ...props }) => (
                    <h3
                      {...props}
                      className={`text-xl font-bold mb-4 mt-8 ${
                        theme === "dark" ? "text-cyan-400" : "text-purple-600"
                      }`}
                    >
                      {children}
                    </h3>
                  ),
                  // Custom styling for links
                  a: ({ children, href, ...props }) => (
                    <a
                      {...props}
                      href={href}
                      className={`${
                        theme === "dark"
                          ? "text-cyan-400 hover:text-cyan-300"
                          : "text-purple-600 hover:text-purple-700"
                      } hover:underline transition-colors`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  // Custom styling for paragraphs
                  p: ({ children, ...props }) => (
                    <p {...props} className="mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  // Custom styling for lists
                  ul: ({ children, ...props }) => (
                    <ul
                      {...props}
                      className="list-disc list-inside mb-4 space-y-2"
                    >
                      {children}
                    </ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside mb-4 space-y-2"
                    >
                      {children}
                    </ol>
                  ),
                  // Custom styling for blockquotes
                  blockquote: ({ children, ...props }) => (
                    <blockquote
                      {...props}
                      className={`border-l-4 ${
                        theme === "dark"
                          ? "border-cyan-400 bg-gray-800"
                          : "border-purple-400 bg-purple-50"
                      } pl-6 py-4 mb-6 italic rounded-r-lg`}
                    >
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <h2
                className={`text-3xl font-bold mb-8 flex items-center gap-3 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                <FaBolt className="text-yellow-400 lightning-flash" />
                {text.relatedPosts}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => {
                  const relatedTitle =
                    language === "tr" ? relatedPost.titleTr : relatedPost.title;
                  const relatedDescription =
                    language === "tr"
                      ? relatedPost.descriptionTr
                      : relatedPost.description;

                  return (
                    <Link
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className={`block p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50"
                          : "bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50"
                      }`}
                    >
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {relatedTitle}
                      </h3>
                      <p
                        className={`mb-4 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {relatedDescription}
                      </p>
                      <span
                        className={`text-sm font-medium ${
                          theme === "dark" ? "text-cyan-400" : "text-purple-600"
                        }`}
                      >
                        {text.readMore} →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
