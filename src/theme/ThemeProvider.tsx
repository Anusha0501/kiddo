import { useState, ReactNode } from 'react';
import { Theme } from '../types';
import ThemeContext from './ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

/**
 * Theme Provider for runtime theming
 * Manages theme state and provides it to all child components
 * 
 * This enables OTA-style theme updates without app reload
 */
export const ThemeProvider = ({ 
  children, 
  initialTheme 
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    initialTheme || {
      primary: '#FF9933',
      background: '#FFF5E6',
      secondary: '#FF6B35',
      text: '#333333',
      cardBackground: '#FFFFFF',
      accent: '#4ECDC4'
    }
  );

  const value = {
    theme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
