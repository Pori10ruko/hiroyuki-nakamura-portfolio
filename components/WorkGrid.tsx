import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS, GENRES, Genre } from '../constants';
import { Project } from '../types';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const WorkGrid: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('ALL');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  // Define sub-categories for each major category
  const CATEGORY_STRUCTURE: Record<string, string[]> = {
    'RELEASES': ['SOLO', 'BBCO', 'UN.a', 'PRODUCE', 'OTHER'],
    'INSTALLATION': ['Interactive', 'Immersive', 'Public Space'],
    'CLIENT WORKS': ['Music Video', 'VTuber', 'Commercial', 'Mix/Master'],
  };

  const filteredProjects = useMemo(() => {
    if (selectedGenre === 'ALL') return PROJECTS.filter(p => p.genre !== 'RELEASES');
    
    // For major categories with sub-categories
    if (CATEGORY_STRUCTURE[selectedGenre]) {
      const projectsInGenre = PROJECTS.filter(p => p.genre === selectedGenre);
      
      // If a sub-category is selected, filter by it
      if (selectedSubCategory) {
        return projectsInGenre.filter(p => {
          if (selectedGenre === 'RELEASES') {
            return p.category === selectedSubCategory;
          } else if (selectedGenre === 'INSTALLATION') {
            // Map installation projects to sub-categories
            if (selectedSubCategory === 'Interactive') return ['Interactive Installation', 'AR App', 'App'].includes(p.category);
            if (selectedSubCategory === 'Immersive') return ['Live Painting Concert', 'Immersive'].includes(p.category);
            if (selectedSubCategory === 'Public Space') return ['Public Project', 'Public Space'].includes(p.category);
          } else if (selectedGenre === 'CLIENT WORKS') {
            // Map client work projects to sub-categories
            if (selectedSubCategory === 'Music Video') return ["Jim's Petty", 'Live Painting Concert', 'UN.a'].includes(p.category);
            if (selectedSubCategory === 'VTuber') return ['RE:ACT', 'RK MUSIC'].includes(p.category);
            if (selectedSubCategory === 'Commercial') return ['Music Festival'].includes(p.category);
            if (selectedSubCategory === 'Mix/Master') return ['Opera Mix'].includes(p.category);
          }
          return false;
        });
      }
      
      // If no sub-category selected, show all projects in the genre
      return projectsInGenre;
    }
    
    // For simple categories without sub-categories
    return PROJECTS.filter(project => project.genre === selectedGenre);
  }, [selectedGenre, selectedSubCategory]);

  return (
    <div className="w-full min-h-screen px-4 md:px-12 py-32 text-[#1a1a1a]">
       <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24 flex flex-col gap-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#1a1a1a]/10 pb-8">
          <h1 
              className="text-[10vw] md:text-[8vw] leading-[0.85] font-serif italic tracking-tight text-[#1a1a1a]"
          >
            {t.selectedWorks.split(' ')[0]}<br />{t.selectedWorks.split(' ')[1]}
          </h1>
          <div className="mb-2 text-right">
              <p className="text-xs font-bold uppercase tracking-widest font-mono text-[#666]">{t.archive}</p>
              <p className="text-xs opacity-60 font-mono text-[#666]">2023 — 2025</p>
          </div>
        </div>

        {/* Genre Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          {/* Major Categories with Sub-categories */}
          <div className="flex flex-col gap-6">
            {/* RELEASES - Special Category */}
            <div>
              <motion.button
                onClick={() => {
                  if (selectedGenre === 'RELEASES') {
                    setSelectedGenre('ALL');
                    setExpandedCategory(null);
                    setSelectedSubCategory(null);
                  } else {
                    setSelectedGenre('RELEASES');
                    setExpandedCategory('RELEASES');
                    setSelectedSubCategory(null);
                  }
                }}
                className={`
                  relative px-8 py-4 text-base md:text-lg font-bold uppercase tracking-widest
                  transition-all duration-300 border w-fit
                  ${selectedGenre === 'RELEASES'
                    ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                    : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RELEASES
              </motion.button>

              {/* RELEASES Sub-categories */}
              {expandedCategory === 'RELEASES' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap gap-3 mt-4 pl-4 border-l-2 border-[#1a1a1a]/20"
                >
                  {CATEGORY_STRUCTURE.RELEASES.map((subCat) => (
                    <motion.button
                      key={subCat}
                      onClick={() => setSelectedSubCategory(selectedSubCategory === subCat ? null : subCat)}
                      className={`
                        px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest
                        transition-all duration-300 border
                        ${selectedSubCategory === subCat
                          ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {subCat}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* INSTALLATION - Major Category */}
            <div>
              <motion.button
                onClick={() => {
                  if (selectedGenre === 'INSTALLATION') {
                    setSelectedGenre('ALL');
                    setExpandedCategory(null);
                    setSelectedSubCategory(null);
                  } else {
                    setSelectedGenre('INSTALLATION');
                    setExpandedCategory('INSTALLATION');
                    setSelectedSubCategory(null);
                  }
                }}
                className={`
                  relative px-7 py-3.5 text-sm md:text-base font-bold uppercase tracking-widest
                  transition-all duration-300 border w-fit
                  ${selectedGenre === 'INSTALLATION'
                    ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                    : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                INSTALLATION
              </motion.button>

              {/* INSTALLATION Sub-categories */}
              {expandedCategory === 'INSTALLATION' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap gap-3 mt-4 pl-4 border-l-2 border-[#1a1a1a]/20"
                >
                  {CATEGORY_STRUCTURE.INSTALLATION.map((subCat) => (
                    <motion.button
                      key={subCat}
                      onClick={() => setSelectedSubCategory(selectedSubCategory === subCat ? null : subCat)}
                      className={`
                        px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest
                        transition-all duration-300 border
                        ${selectedSubCategory === subCat
                          ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {subCat}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CLIENT WORKS - Major Category */}
            <div>
              <motion.button
                onClick={() => {
                  if (selectedGenre === 'CLIENT WORKS') {
                    setSelectedGenre('ALL');
                    setExpandedCategory(null);
                    setSelectedSubCategory(null);
                  } else {
                    setSelectedGenre('CLIENT WORKS');
                    setExpandedCategory('CLIENT WORKS');
                    setSelectedSubCategory(null);
                  }
                }}
                className={`
                  relative px-7 py-3.5 text-sm md:text-base font-bold uppercase tracking-widest
                  transition-all duration-300 border w-fit
                  ${selectedGenre === 'CLIENT WORKS'
                    ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                    : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CLIENT WORKS
              </motion.button>

              {/* CLIENT WORKS Sub-categories */}
              {expandedCategory === 'CLIENT WORKS' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap gap-3 mt-4 pl-4 border-l-2 border-[#1a1a1a]/20"
                >
                  {CATEGORY_STRUCTURE['CLIENT WORKS'].map((subCat) => (
                    <motion.button
                      key={subCat}
                      onClick={() => setSelectedSubCategory(selectedSubCategory === subCat ? null : subCat)}
                      className={`
                        px-5 py-2 text-xs md:text-sm font-bold uppercase tracking-widest
                        transition-all duration-300 border
                        ${selectedSubCategory === subCat
                          ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                          : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {subCat}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Other Simple Categories */}
          <div className="flex flex-wrap gap-3 md:gap-4 pt-4 border-t border-[#1a1a1a]/10">
            {GENRES.filter(g => !['ALL', 'RELEASES', 'INSTALLATION', 'CLIENT WORKS'].includes(g)).map((genre) => (
              <motion.button
                key={genre}
                onClick={() => {
                  setSelectedGenre(genre);
                  setExpandedCategory(null);
                  setSelectedSubCategory(null);
                }}
                className={`
                  relative px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest
                  transition-all duration-300 border
                  ${selectedGenre === genre 
                    ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                    : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {genre}
              </motion.button>
            ))}
          </div>

          {/* ALL button */}
          <motion.button
            onClick={() => {
              setSelectedGenre('ALL');
              setExpandedCategory(null);
              setSelectedSubCategory(null);
            }}
            className={`
              relative px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-widest
              transition-all duration-300 border w-fit
              ${selectedGenre === 'ALL'
                ? 'bg-[#1a1a1a] text-[#dfdbd5] border-[#1a1a1a]' 
                : 'bg-transparent text-[#1a1a1a] border-[#1a1a1a]/20 hover:border-[#1a1a1a]/60'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ALL
          </motion.button>
        </motion.div>

        {/* Project Count */}
        <motion.div
          key={selectedGenre}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono text-[#666] opacity-60"
        >
          {t.showingProjects} {filteredProjects.length} {filteredProjects.length === 1 ? t.project : t.projects}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 w-full pb-48 perspective-[2000px] max-w-7xl mx-auto">
        {filteredProjects.map((project, index) => (
          <WorkItem 
            key={`${project.id}-${selectedGenre}`}
            project={project} 
            index={index} 
            isHovered={hoveredProject === project.id}
            onHover={(id) => setHoveredProject(id)}
          />
        ))}
      </div>
    </div>
  );
};

interface WorkItemProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const WorkItem: React.FC<WorkItemProps> = ({ 
  project, 
  index, 
  isHovered, 
  onHover
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [project.id]);

  const handleClick = () => {
    if (project.link) {
      // Check if it's an internal link (starts with /#/)
      if (project.link.startsWith('/#/')) {
        const path = project.link.replace('/#', '');
        navigate(path);
      } else {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleImageLoad = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      await e.currentTarget.decode();
      setImageLoaded(true);
    } catch {
      setImageLoaded(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className={`relative group cursor-pointer flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      style={{ perspective: "1000px", willChange: "auto" }}
    >
      {/* 3D Acoustic Block Container */}
      <motion.div 
        className="relative w-full aspect-square mb-6 transform-style-3d overflow-hidden"
        animate={{ 
            rotateY: [0, -1.5, 0],
            rotateX: [0, 0.8, 0],
            y: [0, 3, 0] 
        }}
        transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4
        }}
        whileHover={{
            scale: 1.03, 
            y: -12,
            rotateY: 0,
            rotateX: 0,
            transition: {
                duration: 0.5, ease: "circOut"
            }
        }}
      >
        {/* Shadow Layer - Breathing */}
        <motion.div 
             className="absolute inset-0 bg-black opacity-5 shadow-2xl"
             style={{ 
                 transform: "translateZ(-50px) translateX(25px) translateY(25px)",
                 filter: "blur(18px)"
             }}
             animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.08, 1] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        />

        {/* Depth Layer - Gradient Animation */}
         <motion.div 
             className="absolute inset-0 border border-white/50"
             style={{ 
                 transform: "translateZ(-25px) translateX(12px) translateY(12px)",
                 backgroundSize: "400% 400%",
                 background: "linear-gradient(120deg, #d8d8d8, #f5f5f5, #e8e8e8, #dadada, #d8d8d8)"
             }}
             animate={{
                backgroundPosition: ["0% 0%", "100% 50%", "50% 100%", "0% 0%"]
             }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Surface */}
        <motion.div 
            className="absolute inset-0 bg-[#f2f2f2] overflow-hidden border border-white/70 shadow-2xl"
            style={{ transform: "translateZ(0px)" }}
        >
            {/* Loading placeholder */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
            )}
            
            <img
                key={`project-${project.id}-${project.image}`}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ 
                    filter: isHovered ? "grayscale(0%) contrast(1.08) brightness(1)" : "grayscale(15%) contrast(1.05) brightness(1.08)",
                    opacity: imageLoaded && !imageError ? (isHovered ? 1 : 0.92) : 0,
                    mixBlendMode: "normal",
                    imageRendering: "-webkit-optimize-contrast",
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0,0,0)"
                }}
                onLoad={handleImageLoad}
                onError={() => setImageError(true)}
                loading="eager"
                decoding="sync"
            />
            
            {/* Breathing Overlay */}
            <motion.div 
                className="absolute inset-0 bg-white"
                animate={{ opacity: [0, 0.18, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            />

            {/* Shimmer Line Overlay */}
            <motion.div 
                className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 + index }}
            />

            {/* Shimmer Effect */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            />

            {/* Genre Badge */}
            <div className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest font-mono text-white bg-[#1a1a1a]/80 px-3 py-2 backdrop-blur-md border border-white/10 shadow-lg">
              {project.genre}
            </div>

            {/* Link Indicator */}
            {project.link && (
              <motion.div 
                className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-[#1a1a1a]/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                animate={{ 
                  scale: isHovered ? 1 : 0,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "backOut" }}
              >
                <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.div>
            )}
        </motion.div>

      </motion.div>

      <div className="flex flex-col pt-4 border-t border-[#1a1a1a]/10 border-dashed">
        <div className="flex justify-between items-baseline mb-2 opacity-100">
            <span className="text-xs font-bold tracking-widest uppercase font-mono text-[#666]"><ScrambleText text={project.category} useHover={false} /></span>
            <span className="text-xs font-mono bg-[#e0e0e0] text-[#1a1a1a] px-1 rounded-sm">{project.year}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300 text-[#1a1a1a]">
            {typeof project.title === 'string' ? project.title : project.title[language]}
        </h2>
        <motion.div 
          className="overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.6, height: 'auto' }}
        >
            <p className="mt-4 text-sm max-w-md leading-relaxed opacity-70 text-[#333]">
                {typeof project.description === 'string' ? project.description : project.description[language]}
            </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkGrid;