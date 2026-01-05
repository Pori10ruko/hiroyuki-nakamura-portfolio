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
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`
            relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full
            transition-all duration-300
            ${language === lang.code 
              ? 'text-[#1a1a1a]' 
              : 'text-white/60 hover:text-white/90'
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
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
