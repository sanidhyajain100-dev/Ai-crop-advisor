import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    if (langCode !== language) {
      setIsChanging(true);
      setLanguage(langCode);
      // Reset the changing state after a short delay
      setTimeout(() => setIsChanging(false), 500);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
          'bg-muted hover:bg-muted/80 text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isChanging && 'opacity-70 cursor-not-allowed'
        )}
        aria-label={t('common.changeLanguage')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn('transition-transform', isOpen && 'rotate-180')}>
          ▼
        </span>
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-40 bg-popover rounded-md shadow-lg z-50"
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                'w-full text-left px-4 py-2 text-sm flex items-center justify-between',
                'hover:bg-accent hover:text-accent-foreground',
                'transition-colors',
                language === lang.code ? 'bg-accent text-accent-foreground' : ''
              )}
              role="option"
              aria-selected={language === lang.code}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              {language === lang.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
