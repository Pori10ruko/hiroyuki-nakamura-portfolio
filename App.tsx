import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NowSection from './components/NowSection';
import FeaturedWorks from './components/FeaturedWorks';
import Footer from './components/Footer';
import About from './components/About';
import WorkGrid from './components/WorkGrid';
import Academic from './components/Academic';
import Contact from './components/Contact';
import DistantEcho from './components/DistantEcho';
import SenNoTsudoi from './components/SenNoTsudoi';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  React.useEffect(() => {
    document.title = 'NAKAMURA Hiroyuki | Composer · Pianist · Spatial-Audio Artist';
  }, []);

  return (
    <>
      <Hero />
      <NowSection />
      <FeaturedWorks />
      <div className="flex justify-center pb-24 relative z-10">
        <a href="#/work" className="text-[11px] uppercase tracking-[0.16em] text-mute hover:text-ink transition-colors">
          {t.viewAllWorks}
        </a>
      </div>
    </>
  );
};

const App: React.FC = () => {
  // Prevent iOS Safari bounce scroll from triggering navigation
  React.useEffect(() => {
    const preventBounce = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('.interactive')) {
        return;
      }

      if (scrollTop <= 0 && e.touches[0].clientY > (e.touches[0] as any).lastY) {
        e.preventDefault();
      }

      if (scrollTop + clientHeight >= scrollHeight && e.touches[0].clientY < (e.touches[0] as any).lastY) {
        e.preventDefault();
      }
    };

    const trackTouch = (e: TouchEvent) => {
      (e.touches[0] as any).lastY = e.touches[0].clientY;
    };

    document.addEventListener('touchstart', trackTouch, { passive: true });
    document.addEventListener('touchmove', preventBounce, { passive: false });

    return () => {
      document.removeEventListener('touchstart', trackTouch);
      document.removeEventListener('touchmove', preventBounce);
    };
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="relative bg-paper text-ink min-h-screen selection:bg-ink selection:text-paper">
          <Header />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<WorkGrid />} />
              {/* The standalone video page was folded into Work (2026-09-07) —
                  each project now shows its own videos, and the rest are
                  grouped at the bottom of /work. Old /video links still land
                  somewhere sensible. */}
              <Route path="/video" element={<Navigate to="/work" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/academic" element={<Academic />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/distant-echo" element={<DistantEcho />} />
              <Route path="/sen-no-tsudoi" element={<SenNoTsudoi />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
