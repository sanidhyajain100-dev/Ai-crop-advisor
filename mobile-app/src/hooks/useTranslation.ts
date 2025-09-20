import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;
  
  // Helper function for nested translations
  const translate = (key: string, options?: any) => {
    return t(key, options || {});
  };

  return {
    t: translate,
    i18n,
    changeLanguage,
    currentLanguage,
    isHindi: currentLanguage === 'hi'
  };
};

export default useTranslation;
