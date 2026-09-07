import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const isHome = location.pathname === '/';
  // On Home the wordmark is hidden until the hero (100svh) is scrolled past;
  // on every other route it's shown from the start.
  const [scrolledPastHero, setScrolledPastHero] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(true);
      return;
    }
    const onScroll = () => setScrolledPastHero(window.scrollY > window.innerHeight * 0.98);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const showWordmark = !isHome || scrolledPastHero;

  const navLinks = [
    { to: '/work', label: t.work },
    { to: '/about', label: t.about },
    { to: '/academic', label: t.academic },
    { to: '/contact', label: t.contact },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-line bg-paper">
      <div className="px-4 md:px-8 py-3 md:py-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="min-h-[14px] leading-none">
          {showWordmark && (
            <Link to="/" className="wordmark uppercase text-ink">
              NAKAMURA HIROYUKI
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between md:flex-nowrap md:justify-end gap-x-4 gap-y-2 md:gap-10">
          <nav className="flex items-center gap-4 md:gap-7">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              const colorClass = active ? 'text-ink' : 'text-mute hover:text-ink';
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`uppercase transition-colors duration-200 whitespace-nowrap ${colorClass}`}
                  style={{ fontSize: '11px', letterSpacing: '0.16em' }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
      <style>{`
        .wordmark {
          display: inline-block;
          font-weight: 400;
          font-size: 14px;
          font-stretch: 82%;
          letter-spacing: 0.16em;
          line-height: 1;
          white-space: nowrap;
          transition: font-stretch 240ms linear;
        }

        @starting-style {
          .wordmark {
            font-stretch: 100%;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
