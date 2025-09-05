import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaExclamationTriangle, FaArrowLeft, FaSearch, FaBolt, FaCode, FaUser, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { LightningBolt, FloatingSparks } from '../components/LightningEffects';

const NotFound = () => {
    const { theme, language } = useTheme();
    const navigate = useNavigate();

    // SEO için document title güncelle
    useEffect(() => {
        document.title = language === 'tr'
            ? '404 - Sayfa Bulunamadı | Metehan Yıldırım - Frontend Developer'
            : '404 - Page Not Found | Metehan Yıldırım - Frontend Developer';

        // Meta description güncelle
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content',
                language === 'tr'
                    ? 'Aradığınız sayfa bulunamadı. Metehan Yıldırım portfolio sitesinde diğer sayfalara göz atabilirsiniz.'
                    : 'The page you are looking for could not be found. You can browse other pages on Metehan Yıldırım\'s portfolio website.'
            );
        }

        // Robots meta güncelle
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) {
            robotsMeta.setAttribute('content', 'noindex, nofollow');
        }

        // Canonical URL'i kaldır (404 sayfası için gerekli değil)
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.remove();
        }

        return () => {
            // Component unmount olduğunda meta'ları geri yükle
            if (metaDescription) {
                metaDescription.setAttribute('content',
                    'Muhammed Metehan Yıldırım - 8+ yıl deneyimli Frontend Developer. React.js, Ionic, JavaScript, TypeScript ile modern web ve mobil uygulamalar geliştiriyorum. Portfolio ve projelerim.'
                );
            }
            if (robotsMeta) {
                robotsMeta.setAttribute('content', 'index, follow');
            }
        };
    }, [language]);

    const content = {
        tr: {
            title: "404",
            subtitle: "Sayfa Bulunamadı",
            description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
            suggestion: "Ana sayfaya dönebilir veya aşağıdaki bağlantıları kullanabilirsiniz:",
            homeButton: "Ana Sayfaya Dön",
            backButton: "Geri Dön",
            searchSuggestion: "Belki bunlar işinize yarayabilir:",
            errorCode: "Hata Kodu: 404",
            links: [
                {
                    path: "/",
                    label: "Ana Sayfa",
                    description: "Portfolio ana sayfası",
                    icon: FaHome,
                    color: "from-blue-500 to-cyan-500"
                },
                {
                    path: "/about",
                    label: "Hakkımda",
                    description: "Kim olduğumu öğrenin",
                    icon: FaUser,
                    color: "from-purple-500 to-pink-500"
                },
                {
                    path: "/skills",
                    label: "Yetenekler",
                    description: "Teknik becerilerim",
                    icon: FaCode,
                    color: "from-green-500 to-teal-500"
                },
                {
                    path: "/projects",
                    label: "Projeler",
                    description: "Geliştirdiğim projeler",
                    icon: FaProjectDiagram,
                    color: "from-orange-500 to-red-500"
                },
                {
                    path: "/contact",
                    label: "İletişim",
                    description: "Benimle iletişime geçin",
                    icon: FaEnvelope,
                    color: "from-indigo-500 to-purple-500"
                }
            ]
        },
        en: {
            title: "404",
            subtitle: "Page Not Found",
            description: "The page you are looking for doesn't exist or may have been moved.",
            suggestion: "You can return to the homepage or use the links below:",
            homeButton: "Go to Homepage",
            backButton: "Go Back",
            searchSuggestion: "Maybe these might help:",
            errorCode: "Error Code: 404",
            links: [
                {
                    path: "/",
                    label: "Home",
                    description: "Portfolio homepage",
                    icon: FaHome,
                    color: "from-blue-500 to-cyan-500"
                },
                {
                    path: "/about",
                    label: "About",
                    description: "Get to know me",
                    icon: FaUser,
                    color: "from-purple-500 to-pink-500"
                },
                {
                    path: "/skills",
                    label: "Skills",
                    description: "My technical skills",
                    icon: FaCode,
                    color: "from-green-500 to-teal-500"
                },
                {
                    path: "/projects",
                    label: "Projects",
                    description: "My developed projects",
                    icon: FaProjectDiagram,
                    color: "from-orange-500 to-red-500"
                },
                {
                    path: "/contact",
                    label: "Contact",
                    description: "Get in touch with me",
                    icon: FaEnvelope,
                    color: "from-indigo-500 to-purple-500"
                }
            ]
        }
    };

    const text = content[language];

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${theme === 'dark'
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
                : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>

            {/* Lightning Background Effects */}
            <FloatingSparks />
            <LightningBolt delay={0} className="top-20 left-10" />
            <LightningBolt delay={1.5} className="top-40 right-20" />
            <LightningBolt delay={3} className="bottom-32 left-1/4" />
            <LightningBolt delay={4.5} className="top-60 right-1/3" />

            <div className="max-w-4xl mx-auto text-center relative z-10">

                {/* 404 Error Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{
                            textShadow: theme === 'dark' ? [
                                '0 0 20px rgba(255, 0, 0, 0.5)',
                                '0 0 40px rgba(255, 0, 0, 0.8)',
                                '0 0 20px rgba(255, 0, 0, 0.5)'
                            ] : 'none'
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`text-9xl md:text-[12rem] font-bold mb-4 ${theme === 'dark'
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400'
                                : 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-purple-600'
                            }`}
                    >
                        {text.title}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-3 mb-4"
                    >
                        <FaExclamationTriangle className={`text-3xl ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`} />
                        <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}>
                            {text.subtitle}
                        </h1>
                        <FaExclamationTriangle className={`text-3xl ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`} />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`text-lg mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}
                    >
                        {text.description}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                    >
                        {text.errorCode}
                    </motion.p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap gap-4 justify-center mb-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className={`px-8 py-4 rounded-lg font-semibold flex items-center gap-3 transition-all duration-300 ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-400/25'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-400/25'
                            }`}
                    >
                        <FaHome />
                        {text.homeButton}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className={`px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 flex items-center gap-3 ${theme === 'dark'
                                ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                                : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                            }`}
                    >
                        <FaArrowLeft />
                        {text.backButton}
                    </motion.button>
                </motion.div>

                {/* Suggested Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mb-8"
                >
                    <h2 className={`text-2xl font-bold mb-6 flex items-center justify-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                        <FaSearch className={`${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`} />
                        {text.searchSuggestion}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {text.links.map((link, index) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link
                                    to={link.path}
                                    className={`block p-6 rounded-xl border transition-all duration-300 ${theme === 'dark'
                                            ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-500/50'
                                            : 'bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50'
                                        }`}
                                    style={{
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)'
                                    }}
                                >
                                    <div className={`p-3 rounded-lg bg-gradient-to-r ${link.color} w-fit mx-auto mb-4`}>
                                        <link.icon className="text-2xl text-white" />
                                    </div>
                                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                        }`}>
                                        {link.label}
                                    </h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {link.description}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Lightning Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex justify-center items-center gap-3"
                >
                    <FaBolt className="text-yellow-400 lightning-flash" />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {language === 'tr' ? 'Ana sayfaya dönmek için yıldırım hızında!' : 'Lightning fast back to homepage!'}
                    </span>
                    <FaBolt className="text-yellow-400 lightning-flash" />
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
