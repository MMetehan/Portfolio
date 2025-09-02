import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('tr');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const savedLanguage = localStorage.getItem('language') || 'tr';
        setTheme(savedTheme);
        setLanguage(savedLanguage);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'tr' ? 'en' : 'tr';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const value = {
        theme,
        language,
        toggleTheme,
        toggleLanguage,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
