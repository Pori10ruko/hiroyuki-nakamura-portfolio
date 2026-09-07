import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, NOW_ITEMS } from '../translations';

// "Now" block — lives on Home in production (not only on About, which the
// pre-9/6 build had it restricted to).
const NowSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative z-10 px-4 md:px-12 pt-12 md:pt-16 text-ink">
      <div className="border-t border-line pt-3">
        <span className="text-[11px] uppercase tracking-[0.16em] text-mute">{t.nowTitle}</span>
      </div>
      <ul className="mt-5 max-w-3xl flex flex-col gap-3">
        {NOW_ITEMS[language].map((item) => (
          <li key={item} className="text-[15px] md:text-base leading-[1.7] text-ink">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NowSection;
