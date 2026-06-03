import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");

  const toggleLanguage = () => {
    setLanguage("en");
    localStorage.setItem("language", "en");
  };

  const value = {
    theme: "dark",
    language,
    toggleLanguage,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
