import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import {
  FaCode,
  FaGraduationCap,
  FaHeart,
  FaGamepad,
  FaBolt,
} from "react-icons/fa";
import { LightningBolt, FloatingSparks } from "../components/LightningEffects";

const About = () => {
  const { theme, language } = useTheme();
  const location = useLocation();
  const [firstLanding, setFirstLanding] = React.useState(true);
  const text = {
    title: "About Me",
    subtitle: "Get to know who I am",
    intro:
      "Hi! I'm Muhammed Metehan Yıldırım. Coding is not just my job it’s my passion. I’ve been working professionally in software development since 2018 and keep improving myself with new technologies every day.",
    story:
      "My web development journey is driven by a desire to create solutions that users actually enjoy and find useful. I design mobile apps with HTML5, JavaScript, and Ionic, and build modern, functional web panels using React.js. Solving problems and adding small but impactful touches makes my work fun. 🚀",
    passion: "My passion for technology",
    passionDesc:
      "New technology = a new playground. I get that first-day excitement every time I dive into something new. Nerd fun included. 😎",
    education: "Education",
    educationDesc:
      "I didn’t attend university, but that didn’t stop me. I’ve kept learning and improving and still am. Knowledge is power, coffee is fuel! ☕",
    hobbies: "Hobbies",
    hobbiesDesc:
      "In my free time, I love gaming, camping, and cooking. Especially cooking sometimes I treat recipes like code and debug them! 🍳",
    values: "My Values",
    valuesDesc:
      "Quality code, teamwork, and continuous development are my core values. Also, I can never forget coffee. ☕",
  };

  const features = [
    {
      icon: FaCode,
      title: text.passion,
      description: text.passionDesc,
      color:
        theme === "dark"
          ? "from-cyan-400 to-blue-500"
          : "from-purple-500 to-blue-600",
    },
    {
      icon: FaGraduationCap,
      title: text.education,
      description: text.educationDesc,
      color:
        theme === "dark"
          ? "from-purple-400 to-pink-500"
          : "from-indigo-500 to-purple-600",
    },
    {
      icon: FaGamepad,
      title: text.hobbies,
      description: text.hobbiesDesc,
      color:
        theme === "dark"
          ? "from-green-400 to-cyan-500"
          : "from-green-500 to-teal-600",
    },
    {
      icon: FaHeart,
      title: text.values,
      description: text.valuesDesc,
      color:
        theme === "dark"
          ? "from-pink-400 to-red-500"
          : "from-pink-500 to-red-600",
    },
  ];

  useEffect(() => {
    setFirstLanding(false);
    // Canonical URL'i manuel olarak güncelle
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = `https://metehan-yildirim.com${location.pathname}`;
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{"About Me - Muhammed Metehan Yıldırım"}</title>
        <meta
          name="description"
          content="A passionate software developer with expertise in modern technologies and innovative solutions."
        />
        <meta
          name="keywords"
          content={
            "Hakkımda, Yazılım Geliştirici, Kişisel Hikaye, Teknoloji Tutkusu, Problem Çözme, About Me, Software Developer, Personal Story, Technology Passion, Problem Solving"
          }
        />
        <meta
          property="og:title"
          content="About Me - Muhammed Metehan Yıldırım"
        />
        <meta
          property="og:description"
          content="A passionate software developer with expertise in modern technologies"
        />
        <meta
          property="og:url"
          content={`https://metehan-yildirim.com${location.pathname}`}
        />
        <link
          rel="canonical"
          href={`https://metehan-yildirim.com${location.pathname}`}
        />
      </Helmet>
      <div
        className={`min-h-screen py-20 px-4 relative overflow-hidden ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
        }`}
      >
        {/* Floating Sparks Background */}
        <FloatingSparks />

        {/* Lightning Bolts */}
        <LightningBolt delay={0} className="top-20 left-10" />
        <LightningBolt delay={1.5} className="top-40 right-20" />
        <LightningBolt delay={3} className="bottom-32 left-1/4" />
        <LightningBolt delay={4.5} className="top-60 right-1/3" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              className={`interactive-title text-5xl md:text-6xl font-bold mb-6 lightning-text ${
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
                <FaBolt className="text-yellow-400 electric-pulse" />
                {text.title}
                <FaBolt className="text-yellow-400 electric-pulse" />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: firstLanding ? 0.2 : 0 }}
              className={`text-xl ${
                theme === "dark" ? "text-cyan-400" : "text-purple-600"
              }`}
            >
              {text.subtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: firstLanding ? 0.3 : 0 }}
              className="space-y-6"
            >
              <div
                className={`p-6 rounded-xl border ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-cyan-400/30"
                    : "bg-white/70 border-purple-200 shadow-lg"
                }`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0 0 30px rgba(0, 255, 255, 0.1)"
                      : "none",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <p
                  className={`text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {text.intro}
                </p>
              </div>

              <div
                className={`p-6 rounded-xl border ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-purple-400/30"
                    : "bg-white/70 border-purple-200 shadow-lg"
                }`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0 0 30px rgba(147, 51, 234, 0.1)"
                      : "none",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <p
                  className={`text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {text.story}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: firstLanding ? 0.5 : 0 }}
              className="flex justify-center items-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`relative w-80 h-80 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500"
                    : "bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600"
                } p-1 shadow-2xl`}
                style={{
                  boxShadow:
                    theme === "dark"
                      ? "0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)"
                      : "0 20px 50px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div
                  className={`w-full overflow-hidden h-full rounded-full ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  } flex items-center justify-center text-6xl font-bold ${
                    theme === "dark" ? "text-cyan-400" : "text-purple-600"
                  }`}
                >
                  <img className="w-fit pt-10 my-self-image" src="./my.jpeg" />
                </div>
                {[0, 120, 240].map((rotation, index) => (
                  <motion.div
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15 + index * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: firstLanding ? index * 0.5 : 0,
                    }}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div
                      className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${
                        index === 0
                          ? "bg-cyan-400"
                          : index === 1
                          ? "bg-purple-400"
                          : "bg-pink-400"
                      }`}
                      style={{
                        boxShadow: `0 0 20px ${
                          index === 0
                            ? "rgba(0, 255, 255, 0.8)"
                            : index === 1
                            ? "rgba(147, 51, 234, 0.8)"
                            : "rgba(236, 72, 153, 0.8)"
                        }`,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: firstLanding ? 0.7 : 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: firstLanding ? 0.9 + index * 0.1 : 0 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    theme === "dark"
                      ? "0 20px 50px rgba(0, 255, 255, 0.2)"
                      : "0 20px 50px rgba(0, 0, 0, 0.15)",
                }}
                className={`feature-card p-6 rounded-xl border transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white/70 border-gray-200 shadow-lg"
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}
                  >
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;
