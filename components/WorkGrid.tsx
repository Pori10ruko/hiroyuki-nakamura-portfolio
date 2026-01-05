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
  const [expandedReleasesId, setExpandedReleasesId] = useState<string | null>(null);
  const [selectedReleaseCategory, setSelectedReleaseCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedGenre === 'ALL') return PROJECTS;
    return PROJECTS.filter(project => project.genre === selectedGenre);
  }, [selectedGenre]);

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
          className="flex flex-wrap gap-3 md:gap-4"
        >
          {GENRES.map((genre) => (
            <motion.button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
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
              transition={{ duration: 0.2 }}
            >
              {genre}
              {selectedGenre === genre && (
                <motion.div
                  layoutId="genreIndicator"
                  className="absolute inset-0 bg-[#1a1a1a]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
            </motion.button>
          ))}
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
          <React.Fragment key={`${project.id}-${selectedGenre}`}>
            <WorkItem 
              project={project} 
              index={index} 
              isHovered={hoveredProject === project.id}
              onHover={(id) => setHoveredProject(id)}
              onToggleReleases={(id) => {
                if (expandedReleasesId === id) {
                  setExpandedReleasesId(null);
                  setSelectedReleaseCategory(null);
                } else {
                  setExpandedReleasesId(id);
                  setSelectedReleaseCategory(null);
                }
              }}
              isReleasesExpanded={expandedReleasesId === project.id}
            />
            
            {/* Releases Expansion - Full Width */}
            {project.genre === 'RELEASES' && expandedReleasesId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-full"
              >
                <ReleasesExpanded 
                  selectedCategory={selectedReleaseCategory}
                  onSelectCategory={setSelectedReleaseCategory}
                  language={language}
                />
              </motion.div>
            )}
          </React.Fragment>
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
  onToggleReleases?: (id: string) => void;
  isReleasesExpanded?: boolean;
}

const WorkItem: React.FC<WorkItemProps> = ({ 
  project, 
  index, 
  isHovered, 
  onHover,
  onToggleReleases,
  isReleasesExpanded = false
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
    // If it's a Releases project, toggle expansion instead of navigating
    if (project.genre === 'RELEASES' && onToggleReleases) {
      onToggleReleases(project.id);
      return;
    }
    
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

// Releases Data
const RELEASES_DATA: Record<string, any[]> = {
  SOLO: [
    {
      title: 'Look Up at the Stars',
      year: '2023',
      image: 'https://bbm-sound.com/images/look-up.jpg',
      links: { bandcamp: 'https://youngbloods.bandcamp.com/album/look-up-at-the-stars', youtube: 'https://www.youtube.com/watch?v=lI7Rq58b2Ys' }
    },
    {
      title: 'TRITONOMICS',
      year: '2022',
      image: 'https://f4.bcbits.com/img/a0987654321_10.jpg',
      links: { bandcamp: 'https://overlap.bandcamp.com/album/nakamura-hiroyuki-tritonomics' }
    },
    {
      title: 'Sen no Tsudoi (千の集い)',
      year: '2024',
      image: 'https://i.ytimg.com/vi/6_keqXc2xZk/maxresdefault.jpg',
      links: { other: 'https://www.dragonseyerecordings.com/release/de9001/', youtube: 'https://www.youtube.com/playlist?list=PLb_2IgACrNd9j9MLFkpMetV0CoXyiKcoE' }
    }
  ],
  BBCO: [
    {
      title: 'SITA',
      year: '2023',
      image: 'https://static.wixstatic.com/media/dbd631_8c9d4e5f6a7b4c8d9e0f1a2b3c4d5e6f~mv2.jpg',
      links: { other: 'https://d-musica.co.jp/?p=389', youtube: 'https://www.youtube.com/watch?v=Zl3sF_lN6lM' }
    },
    {
      title: '2nd Album (In Development)',
      year: '2026',
      image: 'https://i.ytimg.com/vi/qZHZwPZqjSk/maxresdefault.jpg',
      links: { youtube: 'https://www.youtube.com/watch?v=qZHZwPZqjSk' }
    }
  ],
  'UN.a': [
    {
      title: 'Intersecting',
      year: '2020',
      image: 'https://i.ytimg.com/vi/QH2ls79_ImA/maxresdefault.jpg',
      links: { spotify: 'https://linkco.re/uAPbr8Mz?lang=ja', youtube: 'https://www.youtube.com/watch?v=QH2ls79_ImA' }
    },
    {
      title: 'COLOR',
      year: '2018',
      image: 'https://i.ytimg.com/vi/U9kxsHOumeo/maxresdefault.jpg',
      links: { other: 'http://purre-goohn.com/un-acolor/', youtube: 'https://www.youtube.com/watch?v=U9kxsHOumeo' }
    }
  ],
  PRODUCE: [
    {
      title: 'Erfu Shin - Supernal Tears',
      year: '2020',
      image: 'https://i.ytimg.com/vi/avpQVtT7vyk/maxresdefault.jpg',
      links: { spotify: 'https://linkco.re/ZQCEM5tF', youtube: 'https://www.youtube.com/watch?v=avpQVtT7vyk' }
    },
    {
      title: 'Utae - toi toi toi',
      year: '2019',
      image: 'https://i.ytimg.com/vi/m4J0QYEQ9Sk/maxresdefault.jpg',
      links: { other: 'http://purre-goohn.com/utaervr/', youtube: 'https://www.youtube.com/watch?v=m4J0QYEQ9Sk' }
    }
  ],
  OTHER: [
    {
      title: 'JOY-S - Red Thread',
      year: '2016',
      image: 'https://i.ytimg.com/vi/alolSBasznk/maxresdefault.jpg',
      links: { youtube: 'https://www.youtube.com/watch?v=alolSBasznk' }
    }
  ]
};

interface ReleasesExpandedProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  language: 'en' | 'ja' | 'zh';
}

const ReleasesExpanded: React.FC<ReleasesExpandedProps> = ({ selectedCategory, onSelectCategory, language }) => {
  const categories = ['SOLO', 'BBCO', 'UN.a', 'PRODUCE', 'OTHER'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 px-6 bg-[#0a0a0a]/5 rounded-lg border border-[#1a1a1a]/10"
    >
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
            className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
              selectedCategory === cat
                ? 'bg-[#1a1a1a] text-[#dfdbd5]'
                : 'bg-transparent border border-[#1a1a1a]/20 hover:border-[#1a1a1a]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Releases Grid */}
      {selectedCategory && RELEASES_DATA[selectedCategory] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {RELEASES_DATA[selectedCategory].map((release, index) => (
            <motion.div
              key={`${release.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden mb-4 bg-[#1a1a1a]">
                <img
                  src={release.image}
                  alt={release.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium">{release.title}</h3>
                  <span className="text-sm opacity-50">{release.year}</span>
                </div>
                {Object.keys(release.links).length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {release.links.spotify && (
                      <a href={release.links.spotify} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:opacity-50">Spotify</a>
                    )}
                    {release.links.youtube && (
                      <a href={release.links.youtube} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:opacity-50">YouTube</a>
                    )}
                    {release.links.bandcamp && (
                      <a href={release.links.bandcamp} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:opacity-50">Bandcamp</a>
                    )}
                    {release.links.other && (
                      <a href={release.links.other} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:opacity-50">More Info</a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkGrid;