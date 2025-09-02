import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaPaperPlane, FaInstagram, FaBolt } from 'react-icons/fa';

const LightningBolt = ({ delay = 0, className = "" }) => {
    return (
        <motion.div
            className={`absolute text-cyan-400 pointer-events-none ${className}`}
            style={{ '--delay': `${delay}s` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <FaBolt className="lightning-bolt text-4xl" />
        </motion.div>
    );
};

const FloatingSparks = () => {
    const sparks = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute"
                    style={{
                        left: `${spark.left}%`,
                        top: `${spark.top}%`,
                        '--delay': `${spark.delay}s`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: spark.delay }}
                >
                    <div
                        className="spark-float text-cyan-400"
                        style={{ fontSize: `${spark.size}px` }}
                    >
                        ⚡
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const Contact = () => {
    const { theme, language } = useTheme();
    const [firstLanding, setFirstLanding] = React.useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const content = {
        tr: {
            title: "İletişim",
            subtitle: "Benimle iletişime geçin",
            getInTouch: "İletişime Geçin",
            description: "Bir proje hakkında konuşmak veya sadece merhaba demek isterseniz, mesaj göndermekten çekinmeyin!",
            name: "Ad Soyad",
            email: "E-posta",
            subject: "Konu",
            message: "Mesaj",
            send: "Mesaj Gönder",
            contactInfo: "İletişim Bilgileri",
            phone: "Telefon",
            address: "Adres",
            followMe: "Beni Takip Edin"
        },
        en: {
            title: "Contact",
            subtitle: "Get in touch with me",
            getInTouch: "Get In Touch",
            description: "Whether you want to discuss a project or just say hello, don't hesitate to send a message!",
            name: "Full Name",
            email: "Email",
            subject: "Subject",
            message: "Message",
            send: "Send Message",
            contactInfo: "Contact Information",
            phone: "Phone",
            address: "Address",
            followMe: "Follow Me"
        }
    };

    const text = content[language];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    useEffect(() => {
        setFirstLanding(false);
    }, [])

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: "E-mail",
            value: "muhammed.metehan.yildirim@gmail.com",
            link: "mailto:muhammed.metehan.yildirim@gmail.com"
        },
        {
            icon: FaPhone,
            title: text.phone,
            value: "+90 551 150 82 82",
            link: "tel:+905511508282"
        }
    ];

    const socialLinks = [
        {
            icon: FaGithub,
            name: "GitHub",
            url: "https://github.com/MMetehan",
            color: "#333"
        },
        {
            icon: FaLinkedin,
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/muhammed-metehan-y%C4%B1ld%C4%B1r%C4%B1m-17687b169/",
            color: "#0077B5"
        },
        {
            icon: FaInstagram,
            name: "Instagram",
            url: "https://www.instagram.com/metehan__yildirim/",
            color: "#C13584"
        }
    ];

    return (
        <div className={`min-h-screen py-20 px-4 relative overflow-hidden ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>

            <FloatingSparks />
            <LightningBolt delay={0} className="top-20 left-10" />
            <LightningBolt delay={1.5} className="top-40 right-20" />
            <LightningBolt delay={3} className="bottom-32 left-1/4" />
            <LightningBolt delay={4.5} className="top-60 right-1/3" />

            <div className="max-w-6xl mx-auto flex items-center align-middle flex-col relative z-10">
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
                        <span className="inline-flex items-center gap-3">
                            <FaBolt className="text-yellow-400 electric-pulse" />
                            {text.title}
                            <FaBolt className="text-yellow-400 electric-pulse" />
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: firstLanding ? 0.2 : 0 }}
                        className={`text-xl ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                            }`}
                    >
                        {text.subtitle}
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-100">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: firstLanding ? 0.5 : 0 }}
                        className="space-y-8"
                    >
                        <div className={`contact-card p-8 rounded-xl border ${theme === 'dark'
                            ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
                            : 'bg-white/70 border-gray-200 backdrop-blur-sm shadow-lg'
                            }`}
                            style={{
                                boxShadow: theme === 'dark' ? '0 0 30px rgba(0, 255, 255, 0.1)' : 'none'
                            }}>
                            <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                }`}>
                                {text.contactInfo}
                            </h3>

                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: firstLanding ? 0.7 + index * 0.1 : 0 }}
                                        className="flex items-center space-x-4"
                                    >
                                        <div className={`p-3 rounded-lg ${theme === 'dark'
                                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500'
                                            : 'bg-gradient-to-r from-purple-600 to-blue-600'
                                            }`}>
                                            <info.icon className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                                }`}>
                                                {info.title}
                                            </p>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className={`transition-colors duration-300 ${theme === 'dark'
                                                        ? 'text-cyan-400 hover:text-cyan-300'
                                                        : 'text-purple-600 hover:text-purple-700'
                                                        }`}
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                    {info.value}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className={`social-media-card p-8 rounded-xl border ${theme === 'dark'
                            ? 'bg-gray-800/50 border-gray-700'
                            : 'bg-white/70 border-gray-200 shadow-lg'
                            }`}
                            style={{
                                boxShadow: theme === 'dark' ? '0 0 30px rgba(0, 255, 255, 0.1)' : 'none',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)'
                            }}>
                            <h3 className={`text-2xl text-center font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                                }`}>
                                {text.followMe}
                            </h3>

                            <div className="flex space-x-4 justify-evenly">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: firstLanding ? 1 + index * 0.1 : 0 }}
                                        whileHover={{
                                            scale: 1.2,
                                            y: -5,
                                            boxShadow: `0 10px 25px ${social.color}40`
                                        }}
                                        className={`social-link p-4 rounded-full transition-all duration-300 ${theme === 'dark'
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        style={{
                                            backgroundColor: theme === 'dark' ? undefined : social.color + '10'
                                        }}
                                    >
                                        <social.icon
                                            className="text-2xl"
                                            style={{ color: social.color }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: firstLanding ? 1.3 : 0, duration: 1 }}
                            className="flex justify-center"
                        >
                            <div className={`relative w-32 h-32 rounded-full ${theme === 'dark'
                                ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                                : 'bg-gradient-to-r from-purple-400 to-blue-500'
                                } p-1`}
                                style={{
                                    boxShadow: theme === 'dark'
                                        ? '0 0 50px rgba(0, 255, 255, 0.3)'
                                        : '0 20px 50px rgba(0, 0, 0, 0.2)'
                                }}>
                                <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                                    } flex items-center justify-center social-link cursor-pointer`}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        onClick={() => window.open('mailto:muhammed.metehan.yildirim@gmail.com', "_blank")}
                                    >
                                        <FaEnvelope className={`text-4xl ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                                            }`} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
