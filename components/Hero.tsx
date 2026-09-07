import React, { useEffect, useState } from 'react';
import { HERO_PHOTOS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import HeroCanvas from './HeroCanvas';

const ROTATE_MS = 9000;

// 12-column grid on desktop, full lg:h-[100svh]; photo lives in columns 8-12
// (order-2/col-start-8/col-span-5), text in columns 1-7 (order-1/col-span-7).
// Below lg the grid collapses to a column: photo first (order-1) at a 60svh
// full-bleed height, then the wordmark/role line (order-2) — this is what
// restores the hero photo on phones, where the previous build showed nothing
// below 768px.
const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const showJapaneseName = language === 'ja' || language === 'zh';

  const [index, setIndex] = useState(() => Math.floor(Math.random() * HERO_PHOTOS.length));

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_PHOTOS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative w-full lg:h-[100svh] lg:pt-[72px] lg:pb-10 lg:px-10">
      <HeroCanvas />
      <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-6 lg:h-full lg:border-b lg:border-line">
        <div className="order-1 lg:order-2 lg:col-start-8 lg:col-span-5 flex lg:h-full lg:justify-end">
          <div className="relative w-full h-[60svh] lg:h-full lg:w-full lg:max-w-[600px]">
            {HERO_PHOTOS.map((photo, i) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={i === index ? photo.alt : ''}
                aria-hidden={i === index ? undefined : true}
                className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
                style={{ opacity: i === index ? 1 : 0 }}
              />
            ))}
            <p className="hero-caption absolute left-0 right-0 bottom-0 px-3 py-2 font-mono text-[10px] leading-snug text-paper bg-ink/55">
              {HERO_PHOTOS[index].caption[language]}
            </p>
          </div>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-center items-start px-6 py-8 lg:px-0 lg:py-0 lg:h-full">
          <h1 className="hero-wordmark uppercase text-ink">NAKAMURA HIROYUKI</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-mute">
            <span>{t.composer}</span>
            <span aria-hidden="true">·</span>
            <span>{t.pianist}</span>
            <span aria-hidden="true">·</span>
            <span>{t.visual}</span>
          </div>
          {showJapaneseName && <p className="mt-1 text-[12px] text-mute">中村浩之</p>}
        </div>
      </div>
      <style>{`
        .hero-photo {
          transition: opacity 1200ms linear;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-photo { transition: none; }
        }

        .hero-wordmark {
          display: block;
          margin: 0;
          font-weight: 400;
          /* Sized so one line always fits inside col 1-7 without reaching the
             photo: at 1440 the column is ~783px and this renders ~690px. */
          font-size: clamp(20px, 3vw, 44px);
          font-stretch: 100%;
          letter-spacing: 0.32em;
          line-height: 1;
          white-space: nowrap;
        }

        /* Below the 12-col grid the column constraint is gone, so let the name
           wrap rather than overflow the viewport on narrow phones. */
        @media (max-width: 400px) {
          .hero-wordmark {
            white-space: normal;
            letter-spacing: 0.24em;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
