import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  FaDownload,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaBolt,
  FaInstagram,
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaWikipediaW,
} from "react-icons/fa";
import { LightningBolt, FloatingSparks } from "../components/LightningEffects";
import { useNavigate, Link } from "react-router-dom";
import { getFeaturedPosts } from "../blogs/blogConfig";

const Home = () => {
  const { theme, language } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [firstLanding, setFirstLanding] = React.useState(true);
  const [featuredPosts] = React.useState(
    getFeaturedPosts(language).slice(0, 2)
  );

  const text = {
    greeting: "Hello, I'm: ",
    name: "Muhammed Metehan Yıldırım",
    title: "Front-End Developer",
    description:
      "I started my professional software journey in 2018, but the story goes much further back, all the way to my childhood curiosity. Over the years, I have specialized in developing interactive mobile applications, particularly for the hotel industry, designing user-friendly interfaces with HTML5, JavaScript, and Ionic, and building modern, easy-to-use web panels with React.js. Thanks to my strong problem-solving skills, I not only overcome technical challenges but also enjoy adding a 'slightly cooler' touch to projects. Enhancing user engagement and making applications both functional and enjoyable is a priority for me—after all, no one wants to use a boring app, right? 🚀",
    downloadCV: "Download CV",
    viewProjects: "View Projects",
    contact: "Contact",
    latestFromBlog: "Latest from Blog",
    viewAllPosts: "View All Posts",
    readMore: "Read More",
    readTime: "min read",
  };

  useEffect(() => {
    setFirstLanding(false);
    // Canonical URL'i manuel olarak güncelle
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = `https://metehan-yildirim.com${location.pathname}`;
    }
  }, [location.pathname]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === "tr"
      ? date.toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  return (
    <>
      <Helmet>
        <title>Muhammed Metehan Yıldırım - Frontend Developer</title>
        <meta
          name="description"
          content="Expert software developer specializing in React, React Native, Node.js, and modern web technologies. Building mobile applications and web solutions."
        />
        <meta
          name="keywords"
          content="React, React Native, Node.js, Javascript, Typescript, Mobil Uygulama, Web Geliştirme, Yazılım Geliştirici, Frontend, Backend, Web Development, Software Developer"
        />
        <meta
          property="og:title"
          content={"Muhammed Metehan Yıldırım - Frontend Developer"}
        />
        <meta
          property="og:description"
          content={
            "Expert software developer in modern web and mobile technologies"
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://metehan-yildirim.com${location.pathname}`}
        />
        <link
          rel="canonical"
          href={`https://metehan-yildirim.com${location.pathname}`}
        />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div
          className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black"
              : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
          }`}
        >
          <FloatingSparks />
          <LightningBolt delay={0} className="top-20 left-10" />
          <LightningBolt delay={1.5} className="top-40 right-20" />
          <LightningBolt delay={3} className="bottom-32 left-1/4" />
          <LightningBolt delay={4.5} className="top-60 right-1/3" />

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: firstLanding ? 0.2 : 0 }}
              className="text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: firstLanding ? 0.4 : 0 }}
                className={`text-xl mb-4 ${
                  theme === "dark" ? "text-cyan-400" : "text-purple-600"
                }`}
              >
                {text.greeting}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: firstLanding ? 0.6 : 0 }}
                className={`text-5xl md:text-6xl font-bold mb-4 lightning-text ${
                  theme === "dark"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
                }`}
                style={{
                  textShadow:
                    theme === "dark"
                      ? "0 0 30px rgba(0, 255, 255, 0.3)"
                      : "none",
                }}
              >
                {text.name}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: firstLanding ? 0.8 : 0 }}
                className={`text-2xl md:text-3xl font-semibold mb-6 ${
                  theme === "dark" ? "text-cyan-300" : "text-purple-700"
                }`}
              >
                <span className="flex items-center justify-center lg:justify-start gap-2">
                  <FaBolt className="text-yellow-400 lightning-flash" />
                  {text.title}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: firstLanding ? 1 : 0 }}
                className={`text-lg mb-8 leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {text.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: firstLanding ? 1.2 : 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="./muhammed-metehan-yildirim-TR.pdf"
                  download
                  className={`lightning-button px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                  }`}
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "0 0 30px rgba(0, 255, 255, 0.3)"
                        : "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <FaDownload />
                  {text.downloadCV}
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/projects")}
                  className={`px-8 py-4 rounded-full font-medium border-2 transition-all duration-300 ${
                    theme === "dark"
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                      : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  {text.viewProjects}
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: firstLanding ? 1.4 : 0 }}
                className="flex justify-center lg:justify-start gap-6"
              >
                {[
                  {
                    icon: FaGithub,
                    url: "https://github.com/MMetehan",
                    name: "GitHub",
                  },
                  {
                    icon: FaLinkedin,
                    url: "https://www.linkedin.com/in/muhammed-metehan-y%C4%B1ld%C4%B1r%C4%B1m-17687b169/",
                    name: "LinkedIn",
                  },
                  {
                    icon: FaInstagram,
                    url: "https://www.instagram.com/metehan__yildirim/",
                    name: "Instagram",
                  },
                  {
                    icon: FaWikipediaW,
                    url: "https://www.wikidata.org/wiki/Q136186660",
                    name: "Wikidata",
                  },
                ].map((item, index) => (
                  <motion.a
                    aria-label={"Visit my " + item.name + " profile."}
                    key={index}
                    href={item.url}
                    target="_blank"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className={`text-2xl transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-cyan-400"
                        : "text-gray-600 hover:text-purple-600"
                    }`}
                    style={{
                      filter:
                        theme === "dark"
                          ? "drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))"
                          : "none",
                    }}
                  >
                    <item.icon />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: firstLanding ? 0.4 : 0 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.02, 1, 1.02, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`relative ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-cyan-400 to-purple-600"
                    : "bg-gradient-to-br from-purple-400 to-blue-600"
                } p-1 rounded-full shadow-2xl`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)"
                      : "0 20px 50px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  className={`w-80 h-80 rounded-full ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } flex items-center justify-center text-6xl font-bold ${
                    theme === "dark" ? "text-cyan-400" : "text-purple-600"
                  }`}
                >
                  <img
                    src="./my.jpeg"
                    alt="Avatar"
                    className="w-72 h-72 rounded-full object-cover animate-paddingTopPulse my-self-image"
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-400 opacity-50"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Blog Section */}
        {featuredPosts.length > 0 && (
          <section
            className={`py-20 px-4 relative ${
              theme === "dark"
                ? "bg-gradient-to-br from-black via-gray-900 to-purple-900"
                : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
            }`}
          >
            <FloatingSparks />
            <LightningBolt delay={0} className="top-10 right-10" />
            <LightningBolt delay={2} className="bottom-20 left-20" />

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold mb-6 lightning-text ${
                    theme === "dark"
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                      : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
                  }`}
                  style={{
                    textShadow:
                      theme === "dark"
                        ? "0 0 30px rgba(0, 255, 255, 0.3)"
                        : "none",
                  }}
                >
                  <span className="inline-flex items-center gap-4">
                    <FaBookOpen className="text-yellow-400 lightning-flash" />
                    {text.latestFromBlog}
                    <FaBolt className="text-yellow-400 lightning-flash" />
                  </span>
                </motion.h2>
              </motion.div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {featuredPosts.map((post, index) => {
                  const title = language === "tr" ? post.titleTr : post.title;
                  const description =
                    language === "tr" ? post.descriptionTr : post.description;
                  const category =
                    language === "tr" ? post.categoryTr : post.category;
                  const excerpt =
                    language === "tr" ? post.excerptTr : post.excerpt;

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      whileHover={{ scale: 1.03 }}
                      className="group"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`block p-8 rounded-xl border transition-all duration-300 h-full ${
                          theme === "dark"
                            ? "bg-gray-800/50 border-gray-700 hover:border-cyan-500/50"
                            : "bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50"
                        }`}
                        style={{
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                        }}
                      >
                        {/* Category */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              theme === "dark"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-purple-500/20 text-purple-600"
                            }`}
                          >
                            {category}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500 text-black">
                            FEATURED
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className={`text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {title}
                        </h3>

                        {/* Excerpt */}
                        <p
                          className={`mb-6 text-base leading-relaxed ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {excerpt || description}
                        </p>

                        {/* Meta Info */}
                        <div
                          className={`flex items-center gap-4 text-sm mb-6 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock />
                            <span>
                              {post.readTime} {text.readTime}
                            </span>
                          </div>
                        </div>

                        {/* Read More */}
                        <div
                          className={`flex items-center gap-2 font-medium group-hover:gap-3 transition-all ${
                            theme === "dark"
                              ? "text-cyan-400"
                              : "text-purple-600"
                          }`}
                        >
                          <span>{text.readMore}</span>
                          <FaArrowRight className="lightning-flash" />
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>

              {/* View All Posts Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-center"
              >
                <Link
                  to="/blog"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500"
                  }`}
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "0 0 30px rgba(0, 255, 255, 0.3)"
                        : "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <FaBookOpen />
                  {text.viewAllPosts}
                  <FaArrowRight className="lightning-flash" />
                </Link>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
