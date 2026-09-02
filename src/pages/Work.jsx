import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaArrowRight,
  FaBolt,
  FaCode,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaPython,
  FaPhp,
  FaDocker,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiJavascript,
  SiVuedotjs,
  SiIonic,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiRedux,
  SiSocketdotio,
  SiElectron,
  SiWebrtc,
  SiPrisma,
  SiSwagger,
  SiAxios,
  SiReactrouter,
  SiSharp,
  SiDotnet,
  SiArduino,
  SiPytorch,
  SiOpenai,
} from "react-icons/si";
import { LightningBolt, FloatingSparks } from "../components/LightningEffects";
import { getWorks } from "../data/works";

const SITE_URL = "https://metehan-yildirim.com";

const TECH_ICONS = {
  react: { icon: FaReact, color: "#61DAFB" },
  "react native": { icon: FaReact, color: "#61DAFB" },
  "node.js": { icon: FaNodeJs, color: "#339933" },
  nodejs: { icon: FaNodeJs, color: "#339933" },
  node: { icon: FaNodeJs, color: "#339933" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  js: { icon: SiJavascript, color: "#F7DF1E" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  ts: { icon: SiTypescript, color: "#3178C6" },
  "next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  nextjs: { icon: SiNextdotjs, color: "#FFFFFF" },
  tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  mongo: { icon: SiMongodb, color: "#47A248" },
  express: { icon: SiExpress, color: "#FFFFFF" },
  "express.js": { icon: SiExpress, color: "#FFFFFF" },
  prisma: { icon: SiPrisma, color: "#A5B4CB" },
  "prisma orm": { icon: SiPrisma, color: "#A5B4CB" },
  swagger: { icon: SiSwagger, color: "#85EA2D" },
  axios: { icon: SiAxios, color: "#5A29E4" },
  "react router": { icon: SiReactrouter, color: "#CA4245" },
  ionic: { icon: SiIonic, color: "#3880FF" },
  vue: { icon: SiVuedotjs, color: "#4FC08D" },
  "vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  html: { icon: FaHtml5, color: "#E34F26" },
  html5: { icon: FaHtml5, color: "#E34F26" },
  css: { icon: FaCss3Alt, color: "#1572B6" },
  css3: { icon: FaCss3Alt, color: "#1572B6" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  postgres: { icon: SiPostgresql, color: "#4169E1" },
  firebase: { icon: SiFirebase, color: "#FFCA28" },
  redux: { icon: SiRedux, color: "#764ABC" },
  "socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
  websocket: { icon: SiSocketdotio, color: "#FFFFFF" },
  electron: { icon: SiElectron, color: "#47848F" },
  webrtc: { icon: SiWebrtc, color: "#A0AEC0" },
  "c#": { icon: SiSharp, color: "#8B5CF6" },
  csharp: { icon: SiSharp, color: "#8B5CF6" },
  ".net": { icon: SiDotnet, color: "#8B5CF6" },
  dotnet: { icon: SiDotnet, color: "#8B5CF6" },
  arduino: { icon: SiArduino, color: "#00979D" },
  whisper: { icon: SiOpenai, color: "#A0AEC0" },
  llm: { icon: SiOpenai, color: "#A0AEC0" },
  "machine learning": { icon: SiPytorch, color: "#EE4C2C" },
  "scikit-learn": { icon: SiPytorch, color: "#EE4C2C" },
  pytorch: { icon: SiPytorch, color: "#EE4C2C" },
  docker: { icon: FaDocker, color: "#2496ED" },
  python: { icon: FaPython, color: "#3776AB" },
  php: { icon: FaPhp, color: "#777BB4" },
};

const techMeta = (name) =>
  TECH_ICONS[String(name).toLowerCase().trim()] || {
    icon: FaCode,
    color: "#9CA3AF",
  };

// Followable by design: no nofollow / noreferrer unless an entry opts in.
const relFor = (link) => link.rel || "noopener";
const IconFor = (type) => (type === "github" ? FaGithub : FaExternalLinkAlt);

const metaLine = (work) =>
  [work.role, work.client, work.year].filter(Boolean).join(" · ");

const Work = () => {
  const { theme, language } = useTheme();
  const location = useLocation();
  const [firstLanding, setFirstLanding] = useState(true);
  const [active, setActive] = useState(null);

  const works = useMemo(() => getWorks(language), [language]);

  const text = {
    title: "Selected Work",
    subtitle:
      "A curated selection of client and personal products I have designed and built, with the story behind each one.",
    viewDetails: "View details",
    close: "Close",
    highlights: "Highlights",
    builtWith: "Built with",
    empty: "Work entries are on the way. Check back soon.",
  };

  useEffect(() => {
    setFirstLanding(false);
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = `${SITE_URL}${location.pathname}`;
    }
  }, [location.pathname]);

  // Modal: Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const primaryLink = (work) =>
    (work.links || []).find((l) => l.type === "live") || (work.links || [])[0];

  const ogImage = works[0]?.cover
    ? `${SITE_URL}${works[0].cover}`
    : `${SITE_URL}/my.jpeg`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${text.title} - Muhammed Metehan Yıldırım`,
    description: text.subtitle,
    url: `${SITE_URL}/work`,
    inLanguage: language === "tr" ? "tr" : "en",
    isPartOf: { "@type": "WebSite", url: SITE_URL },
    about: {
      "@type": "Person",
      name: "Muhammed Metehan Yıldırım",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works.map((work, index) => {
        const link = primaryLink(work);
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: work.title,
            description: work.summary || work.description,
            ...(work.cover ? { image: `${SITE_URL}${work.cover}` } : {}),
            ...(work.tech?.length ? { keywords: work.tech.join(", ") } : {}),
            ...(work.year
              ? { datePublished: String(work.year).slice(0, 4) }
              : {}),
            ...(link ? { url: link.url } : {}),
            ...(work.video
              ? {
                  video: {
                    "@type": "VideoObject",
                    name: `${work.title} — demo`,
                    description: work.summary || work.description,
                    contentUrl: `${SITE_URL}${work.video.src}`,
                    ...(work.video.poster || work.cover
                      ? {
                          thumbnailUrl: `${SITE_URL}${
                            work.video.poster || work.cover
                          }`,
                        }
                      : {}),
                    ...(work.year
                      ? { uploadDate: `${String(work.year).slice(0, 4)}-01-01` }
                      : {}),
                  },
                }
              : {}),
            creator: {
              "@type": "Person",
              name: "Muhammed Metehan Yıldırım",
              url: SITE_URL,
            },
          },
        };
      }),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
    ],
  };

  const cardBase =
    theme === "dark"
      ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50"
      : "bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50";

  const badgeClass =
    theme === "dark"
      ? "bg-cyan-500/20 text-cyan-400"
      : "bg-purple-500/20 text-purple-600";

  const linkButtonClass =
    theme === "dark"
      ? "border-gray-600 text-gray-200 hover:border-cyan-400 hover:text-cyan-400"
      : "border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600";

  return (
    <>
      <Helmet>
        <title>Selected Work - Muhammed Metehan Yıldırım</title>
        <meta
          name="description"
          content="Selected work by Muhammed Metehan Yıldırım: client and personal web and mobile products built with React, Ionic and modern JavaScript, with the story and outcome of each project."
        />
        <meta
          name="keywords"
          content="Metehan Yıldırım work, portfolio, case studies, React projects, Ionic apps, frontend developer projects, web application development, mobile application development"
        />
        <meta name="author" content="Muhammed Metehan Yıldırım" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Selected Work - Muhammed Metehan Yıldırım"
        />
        <meta
          property="og:description"
          content="Client and personal products designed and built by Muhammed Metehan Yıldırım, with the story and outcome of each project."
        />
        <meta property="og:url" content={`${SITE_URL}/work`} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Metehan Portfolio & Blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Selected Work - Muhammed Metehan Yıldırım"
        />
        <meta
          name="twitter:description"
          content="Client and personal products designed and built by Muhammed Metehan Yıldırım."
        />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={`${SITE_URL}/work`} />
        <script type="application/ld+json">
          {JSON.stringify(collectionJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
      </Helmet>

      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        }`}
      >
        <FloatingSparks />
        <LightningBolt delay={0} className="top-24 right-10" />
        <LightningBolt delay={1.5} className="top-52 left-12" />
        <LightningBolt delay={3} className="bottom-40 right-1/4" />

        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: firstLanding ? 0.2 : 0 }}
            className="text-center mb-16"
          >
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 lightning-text ${
                theme === "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
              }`}
              style={{
                textShadow:
                  theme === "dark" ? "0 0 30px rgba(0, 255, 255, 0.3)" : "none",
              }}
            >
              <span className="inline-flex items-center gap-4">
                <FaBolt className="text-yellow-400 lightning-flash" />
                {text.title}
                <FaBolt className="text-yellow-400 lightning-flash" />
              </span>
            </h1>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {text.subtitle}
            </p>
          </motion.header>

          {works.length === 0 ? (
            <p
              className={`text-center text-lg ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {text.empty}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work, index) => (
                <motion.article
                  key={work.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 ${cardBase}`}
                  style={{
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(work)}
                    aria-label={`${work.title} — ${text.viewDetails}`}
                    className="text-left w-full flex flex-col flex-1 cursor-pointer"
                  >
                    {work.cover && (
                      <img
                        src={work.cover}
                        alt={work.coverAlt}
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="450"
                        className="w-full aspect-[16/9] object-cover"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {work.category && (
                        <span
                          className={`self-start px-3 py-1 rounded-full text-xs font-medium mb-3 ${badgeClass}`}
                        >
                          {work.category}
                        </span>
                      )}
                      <h2
                        className={`text-xl font-bold mb-2 transition-colors ${
                          theme === "dark"
                            ? "text-white group-hover:text-cyan-400"
                            : "text-gray-800 group-hover:text-purple-600"
                        }`}
                      >
                        {work.title}
                      </h2>
                      {metaLine(work) && (
                        <p
                          className={`text-sm mb-3 ${
                            theme === "dark"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {metaLine(work)}
                        </p>
                      )}
                      {work.summary && (
                        <p
                          className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                            theme === "dark"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {work.summary}
                        </p>
                      )}
                      {work.tech.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                          {work.tech.slice(0, 6).map((t) => {
                            const { icon: Icon, color } = techMeta(t);
                            return (
                              <span
                                key={t}
                                title={t}
                                className="inline-flex items-center gap-1 text-xs text-gray-400"
                              >
                                <Icon style={{ color }} />
                                {t}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      <span
                        className={`inline-flex items-center gap-2 mt-4 text-sm font-medium ${
                          theme === "dark"
                            ? "text-cyan-400"
                            : "text-purple-600"
                        }`}
                      >
                        {text.viewDetails}
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </button>

                  {/* Outbound links live in the DOM on every card so they are
                      crawlable without opening the modal. Followable by design. */}
                  {work.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-6 pb-6">
                      {work.links.map((link) => {
                        const LinkIcon = IconFor(link.type);
                        return (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel={relFor(link)}
                            title={`${work.title} — ${link.label}`}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${linkButtonClass}`}
                          >
                            <LinkIcon />
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={text.close}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-300 hover:text-cyan-400"
                    : "bg-gray-100 text-gray-600 hover:text-purple-600"
                }`}
              >
                <FaTimes />
              </button>

              {active.video ? (
                <video
                  src={active.video.src}
                  poster={active.video.poster || active.cover || undefined}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-[70vh] object-contain rounded-xl mb-6 bg-black"
                />
              ) : (
                active.cover && (
                  <img
                    src={active.cover}
                    alt={active.coverAlt}
                    width="1200"
                    height="675"
                    className="w-full aspect-[16/9] object-cover rounded-xl mb-6"
                  />
                )
              )}

              {active.category && (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${badgeClass}`}
                >
                  {active.category}
                </span>
              )}

              <h2
                id="work-modal-title"
                className={`text-2xl sm:text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {active.title}
              </h2>

              {metaLine(active) && (
                <p
                  className={`text-sm mb-6 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {metaLine(active)}
                </p>
              )}

              {active.description && (
                <p
                  className={`whitespace-pre-line leading-relaxed mb-6 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {active.description}
                </p>
              )}

              {active.highlights.length > 0 && (
                <div className="mb-6">
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
                      theme === "dark" ? "text-cyan-400" : "text-purple-600"
                    }`}
                  >
                    {text.highlights}
                  </h3>
                  <ul className="space-y-2">
                    {active.highlights.map((item, i) => (
                      <li
                        key={i}
                        className={`flex gap-2 text-sm ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <FaBolt className="text-yellow-400 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.gallery.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {active.gallery.map((shot, i) => (
                    <img
                      key={i}
                      src={shot.src}
                      alt={shot.alt || active.coverAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-lg border border-gray-700/40"
                    />
                  ))}
                </div>
              )}

              {active.tech.length > 0 && (
                <div className="mb-6">
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wide mb-3 ${
                      theme === "dark" ? "text-cyan-400" : "text-purple-600"
                    }`}
                  >
                    {text.builtWith}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {active.tech.map((t) => {
                      const { icon: Icon, color } = techMeta(t);
                      return (
                        <span
                          key={t}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                            theme === "dark"
                              ? "bg-gray-800 text-gray-200"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <Icon style={{ color }} />
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {active.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {active.links.map((link) => {
                    const LinkIcon = IconFor(link.type);
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel={relFor(link)}
                        title={`${active.title} — ${link.label}`}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                        }`}
                      >
                        <LinkIcon />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Work;
