import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('budget-tracker-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', savedTheme);
      return savedTheme;
    }
    // If not set, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
    return systemTheme;
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to document and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('budget-tracker-theme', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('budget-tracker-theme');
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('budget-tracker-theme', newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider }; 