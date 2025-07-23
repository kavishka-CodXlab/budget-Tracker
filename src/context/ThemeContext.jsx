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
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('budget-tracker-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update document theme attribute and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    
    localStorage.setItem('budget-tracker-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't manually set a theme
      if (!localStorage.getItem('budget-tracker-theme')) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (dark) => {
    setIsDark(dark);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        isDark, 
        toggleTheme, 
        setTheme,
        theme: isDark ? 'dark' : 'light'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 