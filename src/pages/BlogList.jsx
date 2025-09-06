import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { FaCalendarAlt, FaClock, FaTag, FaUser, FaSearch, FaFilter, FaBolt } from 'react-icons/fa';
import { LightningBolt, FloatingSparks } from '../components/LightningEffects';
import { blogPosts, getFeaturedPosts, getAllCategories } from '../blogs/blogConfig';

const BlogList = () => {
    const { theme, language } = useTheme();
    const [filteredPosts, setFilteredPosts] = useState(blogPosts);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [featuredPosts] = useState(getFeaturedPosts(language));

    // SEO Meta tags
    useEffect(() => {
        document.title = language === 'tr'
            ? 'Blog | Metehan Yıldırım - Frontend Developer Blog Yazıları'
            : 'Blog | Metehan Yıldırım - Frontend Developer Blog Posts';

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content',
                language === 'tr'
                    ? 'Frontend development, React, Ionic, JavaScript ve web teknolojileri hakkında blog yazıları. Metehan Yıldırım\'ın deneyimlerini ve ipuçlarını keşfedin.'
                    : 'Blog posts about frontend development, React, Ionic, JavaScript and web technologies. Discover Metehan Yıldırım\'s experiences and tips.'
            );
        }

        // Keywords meta
        const keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            keywordsMeta.setAttribute('content',
                language === 'tr'
                    ? 'blog, frontend development, React, Ionic, JavaScript, web development, programming, teknoloji'
                    : 'blog, frontend development, React, Ionic, JavaScript, web development, programming, technology'
            );
        }
    }, [language]);

    // Filter posts
    useEffect(() => {
        let filtered = blogPosts.filter(post => post.published);

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => {
                const category = language === 'tr' ? post.categoryTr : post.category;
                return category.toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        if (searchTerm) {
            filtered = filtered.filter(post => {
                const title = language === 'tr' ? post.titleTr : post.title;
                const description = language === 'tr' ? post.descriptionTr : post.description;
                const searchText = `${title} ${description}`.toLowerCase();
                return searchText.includes(searchTerm.toLowerCase());
            });
        }

        setFilteredPosts(filtered);
    }, [selectedCategory, searchTerm, language]);

    const content = {
        tr: {
            title: "Blog",
            subtitle: "Frontend geliştirme deneyimlerim ve ipuçları",
            searchPlaceholder: "Blog yazılarında ara...",
            allCategories: "Tüm Kategoriler",
            featuredPosts: "Öne Çıkan Yazılar",
            latestPosts: "Son Yazılar",
            readMore: "Devamını Oku",
            readTime: "dakika okuma",
            noResults: "Arama kriterlerinize uygun blog yazısı bulunamadı.",
            publishedOn: "Yayınlanma:",
            by: "Yazar:"
        },
        en: {
            title: "Blog",
            subtitle: "My frontend development experiences and tips",
            searchPlaceholder: "Search in blog posts...",
            allCategories: "All Categories",
            featuredPosts: "Featured Posts",
            latestPosts: "Latest Posts",
            readMore: "Read More",
            readTime: "min read",
            noResults: "No blog posts found matching your search criteria.",
            publishedOn: "Published:",
            by: "By:"
        }
    };

    const text = content[language];
    const categories = getAllCategories(language);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return language === 'tr'
            ? date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })
            : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const BlogCard = ({ post, featured = false }) => {
        const title = language === 'tr' ? post.titleTr : post.title;
        const description = language === 'tr' ? post.descriptionTr : post.description;
        const excerpt = language === 'tr' ? post.excerptTr : post.excerpt;
        const category = language === 'tr' ? post.categoryTr : post.category;
        const tags = language === 'tr' ? post.tagsTr : post.tags;

        return (
            <motion.article
                whileHover={{ scale: 1.02 }}
                className={`group relative ${featured ? 'col-span-full md:col-span-2' : ''}`}
            >
                <Link
                    to={`/blog/${post.slug}`}
                    className={`block p-6 rounded-xl border transition-all duration-300 ${theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700 hover:border-cyan-500/50'
                        : 'bg-white/70 border-gray-200 shadow-lg hover:border-purple-400/50'
                        }`}
                    style={{
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)'
                    }}
                >
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === 'dark'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-purple-500/20 text-purple-600'
                            }`}>
                            {category}
                        </span>
                        {featured && (
                            <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500 text-black">
                                FEATURED
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h2 className={`text-xl ${featured ? 'md:text-2xl' : ''} font-bold mb-3 group-hover:text-cyan-400 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                        {title}
                    </h2>

                    {/* Description */}
                    <p className={`mb-4 ${featured ? 'text-base' : 'text-sm'} ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        {excerpt || description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className={`px-2 py-1 rounded text-xs ${theme === 'dark'
                                    ? 'bg-gray-700 text-gray-300'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Meta Info */}
                    <div className={`flex flex-wrap items-center gap-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <div className="flex items-center gap-1">
                            <FaCalendarAlt />
                            <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaClock />
                            <span>{post.readTime} {text.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaUser />
                            <span>{post.author}</span>
                        </div>
                    </div>

                    {/* Read More */}
                    <div className={`mt-4 flex items-center gap-2 font-medium group-hover:gap-3 transition-all ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'
                        }`}>
                        <span>{text.readMore}</span>
                        <FaBolt className="lightning-flash" />
                    </div>
                </Link>
            </motion.article>
        );
    };

    return (
        <div className={`min-h-screen py-20 px-4 relative overflow-hidden ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black'
            : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
            }`}>

            {/* Lightning Background Effects */}
            <FloatingSparks />
            <LightningBolt delay={0} className="top-20 left-10" />
            <LightningBolt delay={1.5} className="top-40 right-20" />
            <LightningBolt delay={3} className="bottom-32 left-1/4" />
            <LightningBolt delay={4.5} className="top-60 right-1/3" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
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
                            <FaBolt className="text-yellow-400 lightning-flash" />
                            {text.title}
                            <FaBolt className="text-yellow-400 lightning-flash" />
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-xl ${theme === 'dark' ? 'text-cyan-400' : 'text-purple-600'}`}
                    >
                        {text.subtitle}
                    </motion.p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                            <input
                                type="text"
                                placeholder={text.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-400 focus:border-cyan-400'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
                                    }`}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <FaFilter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`pl-10 pr-8 py-3 rounded-lg border appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 ${theme === 'dark'
                                    ? 'bg-gray-800 border-gray-700 text-white focus:ring-cyan-400 focus:border-cyan-400'
                                    : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
                                    }`}
                            >
                                <option value="all">{text.allCategories}</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* All Posts */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}>
                        {(searchTerm || selectedCategory !== 'all') ?
                            `${filteredPosts.length} sonuç bulundu` :
                            text.latestPosts
                        }
                    </h2>

                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + index * 0.1 }}
                                >
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}
                        >
                            <FaSearch className="text-6xl mb-4 mx-auto opacity-50" />
                            <p className="text-xl">{text.noResults}</p>
                        </motion.div>
                    )}
                </motion.section>
            </div>
        </div>
    );
};

export default BlogList;
