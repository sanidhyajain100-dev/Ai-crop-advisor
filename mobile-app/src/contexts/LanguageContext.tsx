import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Translation } from '../utils/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  isLoading: false
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading] = useState(false);

  // Handle language changes
  const handleSetLanguage = (lang: string) => {
    if (lang !== language && translations[lang]) {
      setLanguage(lang);
    }
  };

  // Get current translations or fallback to English
  const currentTranslations = translations[language] || translations.en;
  
  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: currentTranslations,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
