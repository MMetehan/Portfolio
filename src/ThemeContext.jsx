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
        // Theme always dark, only language from localStorage
        const savedLanguage = localStorage.getItem('language') || 'tr';
        setLanguage(savedLanguage);

        // Ensure theme is always dark
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    // Remove theme toggle functionality
    const toggleLanguage = () => {
        const newLanguage = language === 'tr' ? 'en' : 'tr';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const value = {
        theme, // Always 'dark'
        language,
        toggleLanguage,
        // toggleTheme removed
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
