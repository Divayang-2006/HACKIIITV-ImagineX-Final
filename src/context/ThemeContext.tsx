import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'maroon' | 'green' | 'peach';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = {
  light: {
    primary: '#ffffff',
    text: '#111827',
    accent: '#2B7A0B',
  },
  dark: {
    primary: '#111827',
    text: '#ffffff',
    accent: '#3B82F6',
  },
  maroon: {
    primary: '#2D0000',
    text: '#ffffff',
    accent: '#800000',
  },
  green: {
    primary: '#2B7A0B',
    text: '#ffffff',
    accent: '#1C5007',
  },
  peach: {
    primary: '#FFF0E6',
    text: '#111827',
    accent: '#FFAA80',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);

    // Apply theme classes to the root html element
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-maroon', 'theme-green', 'theme-peach');
    root.classList.add(`theme-${theme}`);

    // Update CSS variables
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 