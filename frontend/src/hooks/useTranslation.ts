import { useTranslation as useBaseTranslation } from '../components/LanguageProvider';

export const useTranslation = () => {
  const { t, language, setLanguage } = useBaseTranslation();
  
  // Helper function to translate nested keys
  const translate = (key: string, defaultValue: string = ''): string => {
    try {
      // Handle nested keys like 'navigation.dashboard'
      return key.split('.').reduce((obj, k) => obj && obj[k], t as any) || defaultValue || key;
    } catch (e) {
      console.warn(`Translation key not found: ${key}`);
      return defaultValue || key;
    }
  };

  return {
    t: translate,
    language,
    setLanguage,
    isHindi: language === 'hi'
  };
};

export default useTranslation;
