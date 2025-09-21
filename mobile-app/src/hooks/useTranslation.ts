import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { t, language, setLanguage, isLoading } = useLanguage();
  
  // Helper function to translate nested keys
  const translate = (key: string, defaultValue: string = ''): string => {
    try {
      // Handle nested keys like 'navigation.dashboard'
      const keys = key.split('.');
      let result: any = t;
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return defaultValue || key;
        }
      }
      
      return typeof result === 'string' ? result : defaultValue || key;
    } catch (e) {
      console.warn(`Translation error for key: ${key}`, e);
      return defaultValue || key;
    }
  };

  return {
    t: translate,
    language,
    setLanguage,
    isLoading,
    isHindi: language === 'hi',
    isEnglish: language === 'en'
  };
};

export default useTranslation;
