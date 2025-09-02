import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FaDownload, FaGithub, FaLinkedin, FaTwitter, FaBolt, FaInstagram } from 'react-icons/fa';
import { LightningBolt, FloatingSparks } from '../components/LightningEffects';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { theme, language } = useTheme();
    const navigate = useNavigate();
    const [firstLanding, setFirstLanding] = React.useState(true);

    const content = {
        tr: {
            greeting: "Merhaba, Ben:",
            name: "Muhammed Metehan Yıldırım",
            title: "Front-End Developer",
            description: "Profesyonel yazılım hayatıma 2018’de adım attım ama aslında hikâye çok daha öncesine, çocukluk meraklarıma dayanıyor. Yıllar içinde özellikle otel sektörüne yönelik etkileşimli mobil uygulamalar geliştirme konusunda uzmanlaştım. HTML5, JavaScript ve Ionic teknolojileriyle kullanıcı dostu arayüzler tasarlıyor, React.js ile modern ve kolay kullanışlı web panelleri üretiyorum. Güçlü problem çözme becerilerimle sadece teknik engelleri aşmakla kalmıyor, projelere “bir tık daha havalı” dokunuşlar katmayı da seviyorum. Kullanıcı etkileşimini artırmak, işleri işlevsel olduğu kadar keyifli hale getirmek benim için öncelik. sonuçta kimse sıkıcı bir uygulama kullanmak istemez, değil mi? 🚀",
            downloadCV: "CV İndir",
            viewProjects: "Projeleri Gör",
            contact: "İletişim"
        },
        en: {
            greeting: "Hello, I'm: ",
            name: "Muhammed Metehan Yıldırım",
            title: "Front-End Developer",
            description: "I started my professional software journey in 2018, but the story goes much further back, all the way to my childhood curiosity. Over the years, I have specialized in developing interactive mobile applications, particularly for the hotel industry, designing user-friendly interfaces with HTML5, JavaScript, and Ionic, and building modern, easy-to-use web panels with React.js. Thanks to my strong problem-solving skills, I not only overcome technical challenges but also enjoy adding a “slightly cooler” touch to projects. Enhancing user engagement and making applications both functional and enjoyable is a priority for me—after all, no one wants to use a boring app, right? 🚀",
            downloadCV: "Download CV",
            viewProjects: "View Projects",
            contact: "Contact"
        }
    };

    const text = content[language];

    useEffect(() => {
        setFirstLanding(false);
    }, [])

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>
            <FloatingSparks />
            <LightningBolt delay={0} className="top-20 left-10" />
            <LightningBolt delay={1.5} className="top-40 right-20" />
            <LightningBolt delay={3} className="bottom-32 left-1/4" />
            <LightningBolt delay={4.5} className="top-60 right-1/3" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-20  lg:text-left lg:mt-0"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 0.2 : 0 }}
                        className={`text-lg mb-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                            }`}
                    >
                        {text.greeting}
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 0.4 : 0 }}
                        className={`text-4xl text-center md:text-6xl font-bold mb-4 ${theme === 'dark'
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'
                            }`}
                        style={{
                            textShadow: theme === 'dark' ? '0 0 30px rgba(0, 255, 255, 0.3)' : 'none'
                        }}
                    >
                        {text.name}
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 0.6 : 0 }}
                        className={`text-2xl text-center md:text-3xl font-semibold mb-6 lightning-text flex items-center gap-3 justify-center align-middle ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}
                    >
                        <FaBolt className="text-yellow-400 electric-pulse" />
                        {text.title}
                        <FaBolt className="text-yellow-400 electric-pulse" />
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 0.8 : 0 }}
                        className={`text-md mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                            }`}
                    >
                        {text.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 1 : 0 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: theme === 'dark' ? '0 0 25px rgba(0, 255, 255, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white border border-cyan-400'
                                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                }`}
                        >
                            <FaDownload />
                            {text.downloadCV}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/projects')}
                            className={`px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 ${theme === 'dark'
                                ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
                                : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                                }`}
                        >
                            {text.viewProjects}
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: firstLanding ? 1.2 : 0 }}
                        className="flex gap-4 justify-center lg:justify-start"
                    >
                        {[
                            { icon: FaGithub, url: "https://github.com/MMetehan" },
                            { icon: FaLinkedin, url: "https://www.linkedin.com/in/muhammed-metehan-y%C4%B1ld%C4%B1r%C4%B1m-17687b169/" },
                            { icon: FaInstagram, url: "https://www.instagram.com/metehan__yildirim/" }
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.url}
                                target='_blank'
                                whileHover={{ scale: 1.2, y: -5 }}
                                className={`text-2xl transition-colors duration-300 ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-cyan-400'
                                    : 'text-gray-600 hover:text-purple-600'
                                    }`}
                                style={{
                                    filter: theme === 'dark' ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.3))' : 'none'
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
                            scale: [1, 1.02, 1, 1.02, 1]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className={`relative ${theme === 'dark'
                            ? 'bg-gradient-to-br from-cyan-400 to-purple-600'
                            : 'bg-gradient-to-br from-purple-400 to-blue-600'
                            } p-1 rounded-full shadow-2xl`}
                        style={{
                            boxShadow: theme === 'dark'
                                ? '0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(0, 255, 255, 0.1)'
                                : '0 20px 50px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        <div className={`w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } flex items-center justify-center text-6xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                            }`}>
                            <img src="./my.jpeg" alt="Avatar" className="w-72 h-72 rounded-full object-cover animate-paddingTopPulse my-self-image" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-400 opacity-50"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
