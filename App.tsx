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
import AmbientBackground from './components/AmbientBackground';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { translations } from './translations';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
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