import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.title = 'About | NAKAMURA Hiroyuki';
  }, []);

  return (
    <div className="w-full min-h-screen pt-32 md:pt-48 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-8 md:gap-12 text-[#1a1a1a]">
      <div className="md:w-1/3">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:sticky md:top-48 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif italic leading-[0.8]"
        >
          {t.aboutTitle}
        </motion.h1>
      </div>

      <div className="md:w-2/3 flex flex-col justify-end pb-16 md:pb-24">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-sm mx-auto md:mx-0"
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-2xl">
            <img
              src="/images/nakamura-photo.jpg"
              alt="NAKAMURA Hiroyuki / 中村 浩之"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="space-y-12 max-w-2xl"
        >
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
                <span className="font-serif italic text-2xl md:text-3xl mr-2">NAKAMURA Hiroyuki / 中村 浩之</span> 
                <br /><br />
                {t.aboutIntro}
            </p>
            
            <p className="text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                {t.aboutP1}
            </p>

            <p className="text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                {t.aboutP2}
            </p>

            <p className="text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                {t.aboutP3}
            </p>

            <p className="text-sm md:text-base lg:text-lg opacity-80 leading-relaxed">
                {t.aboutP4}
            </p>

            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <h3 className="font-bold uppercase tracking-widest mb-8 text-sm">{t.services}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                    <ul className="space-y-4 opacity-70">
                        <li>{t.service1}</li>
                        <li>{t.service2}</li>
                        <li>{t.service3}</li>
                        <li>{t.service4}</li>
                    </ul>
                    <ul className="space-y-4 opacity-70">
                         <li>{t.service5}</li>
                         <li>{t.service6}</li>
                         <li>{t.service7}</li>
                         <li>{t.service8}</li>
                    </ul>
                </div>
            </div>

            <div className="pt-12 border-t border-[#1a1a1a]/20">
                <h3 className="font-bold uppercase tracking-widest mb-8 text-sm">{t.links}</h3>
                <ul className="space-y-4 text-sm">
                    <li>
                        <a href="https://www.instagram.com/nakahiro0724/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Instagram</a>
                    </li>
                    <li>
                        <a href="https://bbm-sound.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Beyond Boundary Music</a>
                    </li>
                </ul>
            </div>

             <div className="pt-16 md:pt-24">
                <p className="text-xs uppercase tracking-widest mb-4 opacity-50">{t.inquiries}</p>
                <a href="mailto:nakamurahiroyuki.com@gmail.com" className="inline-block text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif italic hover:opacity-50 transition-opacity break-all">
                    <ScrambleText text="nakamurahiroyuki.com@gmail.com" />
                </a>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;