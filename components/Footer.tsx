import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="w-full border-t border-line px-4 md:px-8 py-10 md:py-12 text-mute">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        <div>
          <p className="uppercase text-ink mb-3" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>
            {t.contact}
          </p>
          <a
            href="mailto:contact@bbmusic.tokyo"
            className="inline-block text-mute hover:text-ink transition-colors duration-200"
            style={{ fontSize: '12px' }}
          >
            contact@bbmusic.tokyo
          </a>
        </div>
        <div>
          <p className="uppercase text-ink mb-3" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>
            SNS
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://www.instagram.com/nakahiro0724/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit text-mute hover:text-ink transition-colors duration-200"
              style={{ fontSize: '12px' }}
            >
              Instagram
            </a>
            <a
              href="https://bbm-sound.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-fit text-mute hover:text-ink transition-colors duration-200"
              style={{ fontSize: '12px' }}
            >
              BBM
            </a>
          </div>
        </div>
        <div className="md:text-right">
          <p style={{ fontSize: '11px', letterSpacing: '0.04em' }}>© 2026 Hiroyuki Nakamura</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
