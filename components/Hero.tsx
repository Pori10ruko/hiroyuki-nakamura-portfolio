import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import InfiniteText from './InfiniteText';
import AudioVisualizer from './AudioVisualizer';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth) - 0.5;
      const yPct = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden perspective-container"
      style={{ perspective: "1500px" }}
    >
      
      {/* Real-time Visuals Background */}
      <div className="absolute inset-0 z-0 opacity-40">
         <AudioVisualizer />
      </div>

      {/* Background Marquee */}
      <div className="absolute top-[15%] left-0 w-full opacity-[0.03] z-0 pointer-events-none rotate-[-1deg] scale-105">
         <InfiniteText baseVelocity={-0.5} className="text-[12vw] font-serif italic leading-none text-[#1a1a1a]">
            Sonic Architecture — Silence — Resonance —
         </InfiniteText>
      </div>

      {/* Main Content */}
      <motion.div 
        className="z-10 relative flex flex-col justify-center items-center w-full h-full transform-style-3d"
        style={{ rotateX, rotateY }}
      >
        <div className="text-[#1a1a1a] relative z-20 mix-blend-darken cursor-default">
            <motion.div 
              style={{ y: y1, z: 20 }}
              className="flex flex-col items-center justify-center transform-style-3d"
              initial="idle"
              whileHover="hover"
            >
              <h1 className="text-center flex flex-col items-center group perspective-[500px]">
                {/* Last Name: Thin, Elegant, Airy */}
                <motion.div
                   variants={{
                     idle: { 
                         textShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                         scale: 1,
                     },
                     hover: { 
                         textShadow: [
                            "2px 2px 0px rgba(0,0,0,0.1), -2px -2px 0px rgba(255,255,255,0.5)",
                            "-2px 2px 0px rgba(0,0,0,0.1), 2px -2px 0px rgba(255,255,255,0.5)",
                         ],
                         scale: 1.02,
                         transition: {
                             textShadow: { duration: 0.1, repeat: Infinity, repeatType: "mirror" }
                         }
                     }
                   }}
                   animate={{
                       color: ["#1a1a1a", "#333333", "#1a1a1a"],
                   }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   // UPDATED: Extremely thin weight (font-[200]) for airy aesthetic
                   className="text-[12vw] leading-[0.8] tracking-widest font-[200] uppercase text-[#1a1a1a]"
                >
                   NAKAMURA
                </motion.div>
                
                {/* First Name */}
                <motion.div
                   variants={{
                     idle: { letterSpacing: "0.2em", opacity: 0.8 },
                     hover: { letterSpacing: "0.4em", opacity: 1 }
                   }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   // UPDATED: Thin weight to match
                   className="text-[4vw] font-[200] uppercase mt-2 text-[#333]"
                >
                   Hiroyuki
                </motion.div>
              </h1>
            </motion.div>
        </div>

        {/* Floating Sonic Monolith - SILVER/WHITE AESTHETIC with SHIMMER */}
        <motion.div 
            style={{ 
                y: y2,
                z: 50,
                rotateY: -15, 
                rotateX: 5
            }}
            className="absolute top-1/4 right-[15%] w-[25vw] h-[40vh] z-10 hidden md:block transform-style-3d"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Monolith Construction */}
            <motion.div
                className="relative w-full h-full transform-style-3d group"
                whileHover={{ 
                    rotateY: 0, 
                    rotateX: 0,
                    scale: 1.05,
                    transition: { duration: 0.6, ease: "circOut" } 
                }}
            >
                {/* Back Face */}
                <div 
                    className="absolute inset-0 translate-z-[-40px] w-full h-full bg-[#d4d4d4]" 
                />
                
                {/* Side Faces - Generative Slow Gradient */}
                <motion.div 
                    className="absolute inset-0 translate-x-[20px] translate-y-[20px] translate-z-[-20px] w-full h-full border border-white/40" 
                    style={{ 
                        backgroundSize: "400% 400%", // Larger size for generative feel
                        boxShadow: "inset 0 0 30px rgba(255,255,255,0.8)",
                        background: "linear-gradient(115deg, #e6e6e6, #ffffff, #d4d4d4, #f0f0f0, #cccccc)" 
                    }}
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "50% 100%", "0% 50%", "0% 0%"]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Front Face (Main Image) */}
                <div className="absolute inset-0 bg-[#eee] translate-z-[0px] overflow-hidden border border-white/60 shadow-xl">
                     <motion.img 
                        src="https://picsum.photos/800/1200?random=piano" 
                        alt="Piano Performance" 
                        className="w-full h-full object-cover transition-all duration-700 ease-out"
                        style={{
                            // UPDATE: Show distinct color in idle state (20% grayscale = 80% color)
                            filter: isHovered ? "grayscale(0%) contrast(1)" : "grayscale(20%) contrast(1.1)",
                            opacity: isHovered ? 1 : 0.9,
                            mixBlendMode: "normal"
                        }}
                    />
                    
                    {/* Breathing Light Overlay */}
                    <motion.div 
                        className="absolute inset-0 bg-white"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Shimmer Line */}
                    <motion.div 
                        className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Scanline Texture - Subtle */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            background: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%)",
                            backgroundSize: "100% 4px"
                        }}
                    />

                    {/* Technical Metadata Badge */}
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-[#1a1a1a] bg-white/70 px-2 py-1 backdrop-blur-md border border-white/50 shadow-sm">
                        <ScrambleText text="FREQ: 440Hz / AIR" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-[#1a1a1a] z-20">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="flex items-center gap-4"
        >
            <span className="w-8 h-[2px] bg-[#1a1a1a]"></span>
            <span className="text-[#1a1a1a]">{t.composer}</span>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex items-center gap-4"
        >
             <span className="w-8 h-[2px] bg-[#1a1a1a]"></span>
            <span className="text-[#1a1a1a]">{t.pianist}</span>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="flex items-center gap-4"
        >
             <span className="w-8 h-[2px] bg-[#1a1a1a]"></span>
            <span className="text-[#1a1a1a]">{t.visual}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;