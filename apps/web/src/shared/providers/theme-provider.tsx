import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeProviderContextType {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: Theme }> = ({
  children,
  defaultTheme = 'dark',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('vite-theme') as Theme) || defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    let activeTheme: 'dark' | 'light' = 'dark';
    if (theme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      activeTheme = theme;
    }

    root.classList.add(activeTheme);
    setResolvedTheme(activeTheme);

    // Sync mobile browser status bar / theme-color meta tag with navbar background
    const barColor = activeTheme === 'dark' ? '#090d16' : '#f8fafc';
    let metaThemeColor = document.getElementById('meta-theme-color');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', barColor);
    } else {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.id = 'meta-theme-color';
      metaThemeColor.setAttribute('name', 'theme-color');
      metaThemeColor.setAttribute('content', barColor);
      document.head.appendChild(metaThemeColor);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('vite-theme', newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
