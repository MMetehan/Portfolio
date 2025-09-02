import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaMobile, FaCode, FaStar, FaCodeBranch, FaPython, FaJava, FaHtml5, FaCss3Alt, FaPhp, FaSwift, FaDocker, FaBolt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs, SiJavascript, SiHtml5, SiCss3, SiVuedotjs } from 'react-icons/si';
import { VscTerminal } from 'react-icons/vsc';
import { LightningBolt, FloatingSparks } from '../components/LightningEffects';

const Projects = () => {
    const { theme, language } = useTheme();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstLanding, setFirstLanding] = React.useState(true);

    const content = {
        tr: {
            title: "Projelerim",
            subtitle: "GitHub'dan alınan projeler ve çalışmalar",
            viewCode: "Kodu Görüntüle",
            liveDemo: "Canlı Demo",
            technologies: "Kullanılan Teknolojiler",
            loading: "Projeler yükleniyor...",
            error: "Projeler yüklenirken bir hata oluştu",
            noProjects: "Henüz proje bulunamadı",
            stars: "Yıldız",
            forks: "Fork",
            updated: "Güncelleme"
        },
        en: {
            title: "My Projects",
            subtitle: "Projects and works fetched from GitHub",
            viewCode: "View Code",
            liveDemo: "Live Demo",
            technologies: "Technologies Used",
            loading: "Loading projects...",
            error: "Error occurred while loading projects",
            noProjects: "No projects found yet",
            stars: "Stars",
            forks: "Forks",
            updated: "Updated"
        }
    };

    const text = content[language];
    const getTechnologyIcon = (language) => {
        const icons = {
            'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
            'TypeScript': { icon: SiTypescript, color: '#3178C6' },
            'React': { icon: FaReact, color: '#61DAFB' },
            'Node.js': { icon: FaNodeJs, color: '#339933' },
            'HTML': { icon: SiHtml5, color: '#E34F26' },
            'CSS': { icon: SiCss3, color: '#1572B6' },
            'MongoDB': { icon: SiMongodb, color: '#47A248' },
            'Next.js': { icon: SiNextdotjs, color: '#000000' },
            'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' }
        };
        return icons[language] || { icon: FaCode, color: '#666666' };
    };
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.github.com/users/MMetehan/repos');

                if (!response.ok) {
                    throw new Error('GitHub API request failed');
                }

                const data = await response.json();
                const filteredProjects = data
                    .filter(repo => !repo.fork && !repo.archived)
                    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

                setProjects(filteredProjects);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        setFirstLanding(false);
    }, [])
    const getTechInfo = (language) => {
        const techMap = {
            'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
            'TypeScript': { icon: SiTypescript, color: '#3178C6' },
            'React': { icon: FaReact, color: '#61DAFB' },
            'Vue': { icon: SiVuedotjs, color: '#4FC08D' },
            'Node.js': { icon: FaNodeJs, color: '#339933' },
            'Python': { icon: FaPython, color: '#3776AB' },
            'Java': { icon: FaJava, color: '#007396' },
            'HTML': { icon: FaHtml5, color: '#E34F26' },
            'CSS': { icon: FaCss3Alt, color: '#1572B6' },
            'PHP': { icon: FaPhp, color: '#777BB4' },
            'C++': { icon: FaCode, color: '#00599C' },
            'C#': { icon: FaCode, color: '#239120' },
            'Swift': { icon: FaSwift, color: '#FA7343' },
            'Kotlin': { icon: FaCode, color: '#7F52FF' },
            'Go': { icon: FaCode, color: '#00ADD8' },
            'Rust': { icon: FaCode, color: '#CE422B' },
            'Ruby': { icon: FaCode, color: '#CC342D' },
            'Dockerfile': { icon: FaDocker, color: '#2496ED' },
            'Shell': { icon: VscTerminal, color: '#4EAA25' }
        };

        return techMap[language] || { icon: FaCode, color: '#6B7280' };
    };
    const sortedProjects = projects
        .filter(repo => !repo.fork && !repo.archived)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const featuredProjects = sortedProjects.slice(0, 6);
    const otherProjects = sortedProjects.slice(6);

    return (
        <div className={`min-h-screen py-20 px-4 relative ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>
            <FloatingSparks />
            <LightningBolt top="10%" left="5%" delay="0s" />
            <LightningBolt top="30%" right="8%" delay="2s" />
            <LightningBolt bottom="25%" left="10%" delay="4s" />
            <LightningBolt bottom="40%" right="5%" delay="1.5s" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.h1
                        className={`text-5xl md:text-6xl font-bold mb-6 lightning-text ${theme === 'dark'
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
                            }`}
                        style={{
                            textShadow: theme === 'dark' ? '0 0 30px rgba(0, 255, 255, 0.3)' : 'none'
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
                        className={`text-xl ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`}
                    >
                        {text.subtitle}
                    </motion.p>
                </motion.div>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${theme === 'dark' ? 'border-cyan-400' : 'border-purple-600'
                            }`}></div>
                        <p className={`mt-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`}>
                            {language === 'tr' ? 'Projeler yükleniyor...' : 'Loading projects...'}
                        </p>
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                            ⚠️
                        </div>
                        <p className={`text-xl ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                            {language === 'tr' ? 'Projeler yüklenirken hata oluştu' : 'Error loading projects'}
                        </p>
                        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {error}
                        </p>
                    </motion.div>
                )}
                {!loading && !error && projects.length > 0 && (
                    <>
                        {featuredProjects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: firstLanding ? 0.3 : 0 }}
                                className="mb-16"
                            >
                                <h2 className={`text-4xl font-bold mb-8 text-center lightning-text ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    {language === 'tr' ? 'Öne Çıkan Projeler' : 'Featured Projects'}
                                </h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {featuredProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: firstLanding ? 0.5 + index * 0.2 : 0 }}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: theme === 'dark'
                                                    ? '0 25px 50px rgba(0, 255, 255, 0.2)'
                                                    : '0 25px 50px rgba(0, 0, 0, 0.15)'
                                            }}
                                            className={`project-card group p-8 rounded-xl border transition-all duration-300 ${theme === 'dark'
                                                ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-500/50'
                                                : 'bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50'
                                                }`}
                                            style={{
                                                boxShadow: theme === 'dark' ? '0 0 30px rgba(0, 255, 255, 0.1)' : 'none',
                                                backdropFilter: 'blur(20px)',
                                                WebkitBackdropFilter: 'blur(20px)'
                                            }}
                                        >
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-xl ${theme === 'dark'
                                                        ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20'
                                                        : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                                                        }`}>
                                                        {project.language ? (
                                                            React.createElement(getTechInfo(project.language).icon, {
                                                                className: "text-2xl",
                                                                style: { color: getTechInfo(project.language).color }
                                                            })
                                                        ) : (
                                                            <FaCode className={`text-2xl ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                                                                }`} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                                            {project.name}
                                                        </h3>
                                                        {project.language && (
                                                            <p className={`text-sm ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`}>
                                                                {project.language}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                                        <FaStar />
                                                        <span>{project.stargazers_count}</span>
                                                    </div>
                                                    <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                                        <FaCodeBranch />
                                                        <span>{project.forks_count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {project.description || (language === 'tr' ? 'Açıklama yok' : 'No description available')}
                                                </p>
                                            </div>
                                            <div className="mb-6">
                                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {language === 'tr' ? 'Son güncelleme: ' : 'Last updated: '}
                                                    {new Date(project.updated_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <motion.a
                                                    href={project.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${theme === 'dark'
                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                        }`}
                                                >
                                                    <FaGithub />
                                                    {text.viewCode}
                                                </motion.a>

                                                {project.homepage && (
                                                    <motion.a
                                                        href={project.homepage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${theme === 'dark'
                                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400'
                                                            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
                                                            }`}
                                                    >
                                                        <FaExternalLinkAlt />
                                                        {text.liveDemo}
                                                    </motion.a>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {otherProjects.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: firstLanding ? 1.5 : 0 }}
                            >
                                <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    {language === 'tr' ? 'Diğer Projeler' : 'Other Projects'}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {otherProjects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                                            whileHover={{
                                                scale: 1.03,
                                                boxShadow: theme === 'dark'
                                                    ? '0 20px 40px rgba(0, 255, 255, 0.15)'
                                                    : '0 20px 40px rgba(0, 0, 0, 0.1)'
                                            }}
                                            className={`p-6 rounded-xl border transition-all duration-300 ${theme === 'dark'
                                                ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-500/50'
                                                : 'bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50'
                                                }`}
                                            style={{
                                                boxShadow: theme === 'dark' ? '0 0 20px rgba(0, 255, 255, 0.05)' : 'none',
                                                backdropFilter: 'blur(20px)',
                                                WebkitBackdropFilter: 'blur(20px)'
                                            }}
                                        >
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className={`p-2 rounded-lg ${theme === 'dark'
                                                    ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20'
                                                    : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                                                    }`}>
                                                    {project.language ? (
                                                        React.createElement(getTechInfo(project.language).icon, {
                                                            className: "text-lg",
                                                            style: { color: getTechInfo(project.language).color }
                                                        })
                                                    ) : (
                                                        <FaCode className={`text-lg ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                                                            }`} />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                                        {project.name}
                                                    </h3>
                                                    {project.language && (
                                                        <p className={`text-sm ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`}>
                                                            {project.language}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={project.html_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`p-2 rounded-lg transition-colors duration-300 ${theme === 'dark'
                                                            ? 'text-gray-400 hover:text-cyan-400'
                                                            : 'text-gray-600 hover:text-purple-600'
                                                            }`}
                                                    >
                                                        <FaGithub />
                                                    </a>
                                                    {project.homepage && (
                                                        <a
                                                            href={project.homepage}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`p-2 rounded-lg transition-colors duration-300 ${theme === 'dark'
                                                                ? 'text-gray-400 hover:text-cyan-400'
                                                                : 'text-gray-600 hover:text-purple-600'
                                                                }`}
                                                        >
                                                            <FaExternalLinkAlt />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 mb-4 text-sm">
                                                <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>
                                                    <FaStar />
                                                    <span>{project.stargazers_count}</span>
                                                </div>
                                                <div className={`flex items-center gap-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                                                    <FaCodeBranch />
                                                    <span>{project.forks_count}</span>
                                                </div>
                                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {new Date(project.updated_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
                                                </div>
                                            </div>
                                            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {project.description || (language === 'tr' ? 'Açıklama yok' : 'No description available')}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Projects;