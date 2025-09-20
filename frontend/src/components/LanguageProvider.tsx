import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Translation } from '../utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [_, forceUpdate] = useState({});

  // Load language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (savedLanguage !== language) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Handle language changes
  const handleSetLanguage = (lang: string) => {
    if (lang !== language) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      // Force a re-render to update all components
      forceUpdate({});
    }
  };

  // Get current translations or fallback to English
  const currentTranslations = translations[language] || translations.en;
  
  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: currentTranslations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
