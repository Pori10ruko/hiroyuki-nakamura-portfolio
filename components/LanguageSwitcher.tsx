import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' },
  ];

  return (
    <div className="flex items-center gap-0.5 md:gap-1 bg-black/80 backdrop-blur-md rounded-full px-1.5 md:px-2 py-1 border border-white/20 shadow-lg">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            relative px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full
            transition-all duration-300
            ${language === lang.code 
              ? 'text-black' 
              : 'text-white/70 hover:text-white'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === lang.code && (
            <motion.div
              layoutId="activeLanguage"
              className="absolute inset-0 bg-white rounded-full"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
