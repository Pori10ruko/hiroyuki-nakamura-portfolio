import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectGallery: React.FC = () => {
  const { language } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // Featured projects - show first 6
  const featuredProjects = PROJECTS.slice(0, 6);

  return (
    <section ref={targetRef} className="relative h-[300vh] text-[#1a1a1a]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden perspective-[2000px]">
        
        <div className="absolute top-6 md:top-12 left-4 md:left-12 z-10 mix-blend-darken text-[#1a1a1a]">
             <h2 className="text-2xl md:text-4xl lg:text-6xl font-serif italic tracking-tight text-[#1a1a1a]">
                <ScrambleText text="Selected Works" />
             </h2>
             <div className="w-8 md:w-12 h-[2px] bg-[#1a1a1a] mt-2 md:mt-4 mb-1 md:mb-2"></div>
             <p className="text-[9px] md:text-xs font-mono opacity-60 uppercase tracking-widest text-[#1a1a1a]">Audio / Visual Archive 2023 — 2024</p>
        </div>

        <motion.div style={{ x }} className="flex gap-6 md:gap-12 lg:gap-32 pl-[10vw] md:pl-[20vw] items-center transform-style-3d">
          {featuredProjects.map((project, index) => (
            <GalleryItem key={project.id} project={project} index={index} />
          ))}
          <div className="w-[50vw]"></div> 
        </motion.div>
      </div>
    </section>
  );
};

interface GalleryItemProps {
  project: Project;
  index: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ project, index }) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      className={`group relative w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] aspect-square flex-shrink-0 interactive flex flex-col justify-center items-center perspective-[1000px] ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Number Display - Clean Grey */}
      <div className="absolute -top-10 md:-top-16 left-0 overflow-hidden pointer-events-none font-mono">
        <motion.div
           initial={{ y: "100%" }}
           whileInView={{ y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-2xl md:text-4xl font-bold text-[#a0a0a0] opacity-40"
        >
          {index + 1 < 10 ? `0${index + 1}` : index + 1} //
        </motion.div>
      </div>

      <div className="w-full h-full relative transform-style-3d">
        {/* The Sonic Cube Wrapper */}
        <motion.div
            className="w-full h-full relative transform-style-3d"
            initial={{ rotateY: -30, rotateX: 10 }}
            whileHover={{ 
                rotateY: 0, 
                rotateX: 0,
                scale: 1.08,
                transition: { duration: 0.6, ease: "circOut" }
            }}
            animate={{
               // Slow technical rotation
               rotateY: [-30, -25, -30],
               transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            {/* Shadow (Ambient & Fluffy & Breathing) */}
            <motion.div 
                className="absolute inset-0 rounded-xl"
                style={{ 
                    transform: "translateZ(-60px) translateX(30px) translateY(30px)",
                    background: "rgba(0,0,0,0.08)", // Very light shadow
                    filter: "blur(20px)"
                }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Mid Housing - Generative Slow Gradient */}
            <motion.div 
                className="absolute inset-0 border border-white/50"
                style={{ 
                    transform: "translateZ(-30px) translateX(15px) translateY(15px)",
                    backgroundSize: "400% 400%",
                    background: "linear-gradient(115deg, #d4d4d4, #ffffff, #ececec, #c0c0c0, #d4d4d4)"
                }}
                animate={{
                    backgroundPosition: ["0% 0%", "100% 50%", "0% 100%", "50% 50%", "0% 0%"]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            {/* Front Face (Screen/Grille) */}
            <motion.div
                className="absolute inset-0 bg-[#f5f5f5] shadow-lg overflow-hidden border border-white"
                style={{ 
                    transform: "translateZ(0px)",
                }}
            >
                 <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-500 ease-out"
                    style={{
                        // UPDATE: Show distinct color in idle state (20% grayscale)
                        filter: isHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(20%) contrast(1.05)",
                        opacity: isHovered ? 1 : 0.9,
                        mixBlendMode: "normal"
                    }}
                />
                
                {/* Breathing Light Overlay */}
                <motion.div 
                    className="absolute inset-0 bg-white"
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                />

                {/* Shimmer Line Overlay */}
                <motion.div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 + index }}
                />
            </motion.div>
            
        </motion.div>
      </div>

      <div className="absolute -bottom-16 md:-bottom-24 left-0 w-full text-left pointer-events-none">
         <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-none text-[#1a1a1a] group-hover:translate-x-2 transition-transform duration-500">
            <ScrambleText text={typeof project.title === 'string' ? project.title : project.title[language]} />
         </h3>
         <div className="flex items-center gap-2 mt-2 md:mt-4">
             <div className="w-2 h-2 bg-[#ccc] animate-pulse rounded-full"></div>
             <p className="text-xs uppercase tracking-widest text-[#666] font-bold font-mono">
                {project.category}
             </p>
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectGallery;