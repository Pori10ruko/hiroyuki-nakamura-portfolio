import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import About from './components/About';
import WorkGrid from './components/WorkGrid';
import Academic from './components/Academic';
import Contact from './components/Contact';
import DistantEcho from './components/DistantEcho';
import Releases from './components/Releases';
import SenNoTsudoi from './components/SenNoTsudoi';
import AmbientBackground from './components/AmbientBackground';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use instant to avoid conflicts with user scrolling
    });
  }, [pathname]);
  return null;
};

const Home: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  return (
    <>
      <Hero />
      {/* Introduction Text Section */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10">
          <p className="text-2xl md:text-3xl font-serif leading-relaxed interactive text-[#1a1a1a]/80">
              "{t.heroQuote}"
          </p>
      </section>
      <ProjectGallery />
      <div className="flex justify-center pb-24 relative z-10">
          <a href="#/work" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
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
      // Only prevent default if at scroll boundaries
      const target = e.target as HTMLElement;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Check if we're in an interactive element (input, textarea, etc.)
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('.interactive')) {
        return;
      }
      
      // At top and scrolling up
      if (scrollTop <= 0 && e.touches[0].clientY > (e.touches[0] as any).lastY) {
        e.preventDefault();
      }
      
      // At bottom and scrolling down
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
      {/* Main container with transparent background to show AmbientBackground */}
      <div className="relative text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-[#dfdbd5]">
        <AmbientBackground />
        <CustomCursor />
        <NoiseOverlay />
        
        <Header />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="/academic" element={<Academic />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/distant-echo" element={<DistantEcho />} />
            <Route path="/sen-no-tsudoi" element={<SenNoTsudoi />} />
          </Routes>
          <Footer />
        </main>
        
        <AIChat />
      </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;