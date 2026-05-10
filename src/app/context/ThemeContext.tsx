import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('udl-theme') as Theme;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('udl-theme', theme);

    // Apply theme class to body
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Theme token getter
export function getThemeColors(theme: Theme) {
  if (theme === 'dark') {
    return {
      // Backgrounds
      bgBase: '#1E1E1E',
      bgSidebar: '#252526',
      bgHeader: '#323233',
      bgElevated: '#2D2D30',
      bgInput: '#3C3C3C',
      bgHover: '#2A2D2E',
      bgActive: '#094771',
      bgActivityBar: '#333333',
      bgCanvas: '#1E1E1E',

      // Text
      textPrimary: '#CCCCCC',
      textSecondary: '#858585',
      textInverse: '#FFFFFF',
      textEditor: '#D4D4D4',

      // Borders
      borderDefault: '#2B2B2B',
      borderSubtle: '#3E3E42',
      borderFocus: '#007ACC',

      // UI Elements
      tabInactive: '#252526',
      tabActive: '#1E1E1E',
      tabBorder: '#2B2B2B',

      // Status
      statusBar: '#007ACC',
      success: '#4EC9B0',
      error: '#F48771',
      warning: '#CCA700'
    };
  } else {
    return {
      // Backgrounds
      bgBase: '#FFFFFF',
      bgSidebar: '#F3F3F3',
      bgHeader: '#F3F3F3',
      bgElevated: '#FFFFFF',
      bgInput: '#FFFFFF',
      bgHover: '#E8E8E8',
      bgActive: '#E0E0E0',
      bgActivityBar: '#2C2C2C',
      bgCanvas: '#FFFFFF',

      // Text
      textPrimary: '#333333',
      textSecondary: '#666666',
      textInverse: '#FFFFFF',
      textEditor: '#000000',

      // Borders
      borderDefault: '#E0E0E0',
      borderSubtle: '#CCCCCC',
      borderFocus: '#007ACC',

      // UI Elements
      tabInactive: '#F3F3F3',
      tabActive: '#FFFFFF',
      tabBorder: '#E0E0E0',

      // Status
      statusBar: '#007ACC',
      success: '#4EC9B0',
      error: '#F48771',
      warning: '#CCA700'
    };
  }
}
