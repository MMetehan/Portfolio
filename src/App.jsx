import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaSun, FaMoon, FaBolt, FaBars, FaTimes } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, useTheme } from "./ThemeContext";
import LoadingScreen from "./LoadingScreen";
import MouseLightning from "./components/MouseLightning";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
import NotFound from "./pages/NotFound";

// Global Lightning Effects Component
const LIGHTNING_POSITIONS = [
  { top: "10%", left: "5%", delay: 0 },
  { top: "20%", right: "10%", delay: 1.5 },
  { bottom: "30%", left: "15%", delay: 3 },
  { top: "60%", right: "8%", delay: 4.5 },
  { bottom: "15%", right: "20%", delay: 6 },
];

const SPARKS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 3,
  enterDelay: Math.random() * 2,
  duration: 3 + Math.random() * 2,
}));

const GlobalLightningEffects = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {LIGHTNING_POSITIONS.map((pos, index) => (
        <motion.div
          key={index}
          className={`absolute text-cyan-400/20 ${
            theme === "dark" ? "opacity-100" : "opacity-30"
          }`}
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            "--delay": `${pos.delay}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: pos.delay / 2 }}
        >
          <FaBolt className="text-4xl lightning-flash" />
        </motion.div>
      ))}

      {SPARKS.map((spark) => (
        <motion.div
          key={`spark-${spark.id}`}
          className={`absolute text-cyan-400/10 ${
            theme === "dark" ? "opacity-100" : "opacity-20"
          }`}
          style={{
            left: spark.left,
            top: spark.top,
            "--delay": `${spark.delay}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: spark.enterDelay }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xs"
          >
            ⚡
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/skills", label: "Skills" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          theme === "dark"
            ? "bg-gray-900/80 backdrop-blur-md border-b border-gray-700"
            : "bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => handleNavClick("/")}
              className={`text-2xl font-bold cursor-pointer ${
                theme === "dark"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <FaBolt className="text-yellow-400 electric-pulse" />
                Metehan
              </span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? theme === "dark"
                        ? "text-cyan-400"
                        : "text-purple-600"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-cyan-400"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        theme === "dark" ? "bg-cyan-400" : "bg-purple-600"
                      }`}
                      style={{
                        boxShadow:
                          theme === "dark"
                            ? "0 0 10px rgba(0, 255, 255, 0.5)"
                            : "none",
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              {/* <motion.button
                aria-label="Toggle language"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className={`language-toggle p-2 aspect-square w-10 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-cyan-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "tr" ? "TR" : "EN"}
              </motion.button> */}

              {/* Mobile Menu Button */}
              <motion.button
                aria-label="Toggle mobile menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden flex justify-center items-center p-2 rounded-full aspect-square w-10 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-cyan-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`absolute inset-0 ${
                theme === "dark" ? "bg-black/50" : "bg-gray-900/50"
              } backdrop-blur-sm`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 left-0 bottom-0 w-80 z-50 md:hidden ${
              theme === "dark"
                ? "bg-gray-900/95 border-r border-gray-700"
                : "bg-white/95 border-r border-gray-200"
            } backdrop-blur-md shadow-2xl`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <motion.div
                className={`text-2xl font-bold ${
                  theme === "dark"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
                }`}
              >
                <span className="flex items-center gap-2">
                  <FaBolt className="text-yellow-400 lightning-flash" />
                  Metehan
                </span>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-cyan-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FaTimes />
              </motion.button>
            </div>

            {/* Sidebar Navigation */}
            <div className="py-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left px-6 py-4 font-medium transition-all duration-300 relative ${
                      location.pathname === item.path
                        ? theme === "dark"
                          ? "text-cyan-400 bg-cyan-400/10 border-r-2 border-cyan-400"
                          : "text-purple-600 bg-purple-600/10 border-r-2 border-purple-600"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-100/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {location.pathname === item.path && (
                        <FaBolt className="text-yellow-400 lightning-flash text-sm" />
                      )}
                      {item.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function AppContent() {
  // Show the full intro only on the first visit of the session; crawlers and
  // returning visitors get content almost immediately (LCP / Core Web Vitals).
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem("introShown")
  );

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("introShown", "1");
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative">
      <GlobalLightningEffects />
      <MouseLightning />
      <Navigation />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-cyan-400 text-lg animate-pulse">Loading...</div></div>}><BlogList /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-cyan-400 text-lg animate-pulse">Loading...</div></div>}><BlogDetail /></Suspense>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
