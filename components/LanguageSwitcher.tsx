import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  /** 'dark' = text over the paper background (Header). 'light' = text over a
   * dark/photo background. Matches production's Mv({variant}). */
  variant?: 'dark' | 'light';
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'dark' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {LANGUAGES.map((lang) => {
        const active = language === lang.code;
        const colorClass =
          variant === 'light'
            ? active
              ? 'text-paper'
              : 'text-paper/60 hover:text-paper'
            : active
            ? 'text-ink'
            : 'text-mute hover:text-ink';
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={active}
            className={`uppercase transition-colors duration-200 ${colorClass}`}
            style={{ fontSize: '11px', letterSpacing: '0.16em' }}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
