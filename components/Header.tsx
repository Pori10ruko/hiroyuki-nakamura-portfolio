import React from 'react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';
import ScrambleText from './ScrambleText';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex justify-between items-start text-white pointer-events-none">
      <Magnetic>
        <Link to="/" className="text-xs md:text-sm font-bold tracking-widest uppercase interactive pointer-events-auto block mix-blend-difference">
            <ScrambleText text="@NH" />
        </Link>
      </Magnetic>

      <div className="flex flex-col items-end gap-2 md:gap-4 pointer-events-auto">
        <LanguageSwitcher />
        <nav className="flex flex-col items-end gap-1 md:gap-2 mix-blend-difference">
          <Magnetic>
              <Link to="/work" className="interactive relative text-xs md:text-sm uppercase tracking-widest hover:opacity-50 transition-opacity px-1 md:px-2 py-1 block">
                  <ScrambleText text={t.work} />
              </Link>
          </Magnetic>
          <Magnetic>
              <Link to="/about" className="interactive relative text-xs md:text-sm uppercase tracking-widest hover:opacity-50 transition-opacity px-1 md:px-2 py-1 block">
                  <ScrambleText text={t.about} />
              </Link>
          </Magnetic>
          <Magnetic>
              <Link to="/academic" className="interactive relative text-xs md:text-sm uppercase tracking-widest hover:opacity-50 transition-opacity px-1 md:px-2 py-1 block">
                  <ScrambleText text={t.academic} />
              </Link>
          </Magnetic>
          <Magnetic>
              <Link to="/contact" className="interactive relative text-xs md:text-sm uppercase tracking-widest hover:opacity-50 transition-opacity px-1 md:px-2 py-1 block">
                  <ScrambleText text={t.contact} />
              </Link>
          </Magnetic>
        </nav>
      </div>
    </header>
  );
};

export default Header;