import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS, GENRES, Genre, SUBCATEGORY_DESCRIPTIONS, BBCO_HERO_IMAGE, BBCO_GALLERY_IMAGES, SITA_GALLERY_IMAGES, SITA_DESCRIPTIONS, UNA_HERO_IMAGE, JOYS_HERO_IMAGE } from '../constants';
import { Project } from '../types';
import ScrambleText from './ScrambleText';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import VideoModal from './VideoModal.tsx';

const WorkGrid: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('ALL');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState<{ id: string; title: string }[]>([]);
  const [modalExternalLink, setModalExternalLink] = useState<string | undefined>(undefined);
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [modalGalleryImages, setModalGalleryImages] = useState<string[] | undefined>(undefined);
  const [modalDescription, setModalDescription] = useState<string | undefined>(undefined);

  // Define sub-categories for each major category
  const CATEGORY_STRUCTURE: Record<string, string[]> = {
    'RELEASES': ['SOLO', 'BBCO', 'UN.a', 'PRODUCE', 'OTHER'],
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
          } else if (selectedGenre === 'CLIENT WORKS') {
            // Map client work projects to sub-categories
            const jimPetty = "Jim's Petty";
            if (selectedSubCategory === 'Music Video') return [jimPetty, 'Live Painting Concert', 'UN.a'].includes(p.category);
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

  const handleProjectClick = (project: Project) => {
    // For PRODUCE, BBCO, and OTHER projects, always go to external link (videos are shown separately)
    if ((project.category === 'PRODUCE' || project.category === 'BBCO' || project.category === 'OTHER') && project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // If project has videos, open modal
    if (project.videos && project.videos.length > 0) {
      setSelectedVideos(project.videos);
      setModalExternalLink(project.externalLink);
      setModalTitle(typeof project.title === 'string' ? project.title : project.title[language]);
      
      // Set gallery images and description for SITA
      if (project.id === '24') {
        setModalGalleryImages(SITA_GALLERY_IMAGES);
        setModalDescription(SITA_DESCRIPTIONS[language]);
      } else {
        setModalGalleryImages(undefined);
        setModalDescription(undefined);
      }
      
      setVideoModalOpen(true);
      return;
    }
    
    // Otherwise, handle link navigation
    if (project.link) {
      if (project.link.startsWith('/#/')) {
        const path = project.link.replace('/#', '');
        navigate(path);
      } else {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

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
                  className="flex flex-col gap-4 mt-4 pl-4 border-l-2 border-[#1a1a1a]/20"
                >
                  <div className="flex flex-wrap gap-3">
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
                  </div>
                  {/* Show sub-category descriptions */}
                  {selectedSubCategory && SUBCATEGORY_DESCRIPTIONS[selectedSubCategory as keyof typeof SUBCATEGORY_DESCRIPTIONS] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-[#1a1a1a]/70 leading-relaxed max-w-3xl mt-2"
                    >
                      {SUBCATEGORY_DESCRIPTIONS[selectedSubCategory as keyof typeof SUBCATEGORY_DESCRIPTIONS][language]}
                    </motion.div>
                  )}
                  
                  {/* BBCO Gallery Images */}
                  {selectedSubCategory === 'BBCO' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {BBCO_GALLERY_IMAGES.map((image, index) => (
                        <motion.img 
                          key={index}
                          src={image} 
                          alt={`BBCO ${index + 1}`} 
                          className="w-full h-auto rounded-lg shadow-lg"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  )}
                  
                  {/* UN.a Hero Image */}
                  {selectedSubCategory === 'UN.a' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mt-6 max-w-2xl"
                    >
                      <motion.img 
                        src={UNA_HERO_IMAGE} 
                        alt="UN.a" 
                        className="w-full h-auto rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Other Major Categories - INSTALLATION, SPATIAL AUDIO */}
            <div className="flex gap-3 md:gap-4">
              {['INSTALLATION', 'SPATIAL AUDIO'].map((genre) => (
                <motion.button
                  key={genre}
                  onClick={() => {
                    setSelectedGenre(genre);
                    setExpandedCategory(null);
                    setSelectedSubCategory(null);
                  }}
                  className={`
                    relative px-8 py-4 text-base md:text-lg font-bold uppercase tracking-widest
                    transition-all duration-300 border w-fit
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
          </div>

          {/* Small Categories - CLIENT WORKS, EDUCATION, ARCHIVE */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {GENRES.filter(g => !['ALL', 'RELEASES', 'INSTALLATION', 'SPATIAL AUDIO'].includes(g)).map((genre) => (
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
          </div>
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

      {/* Regular Project Grid - Hidden for PRODUCE, BBCO, and OTHER subcategories */}
      {!(selectedGenre === 'RELEASES' && (selectedSubCategory === 'PRODUCE' || selectedSubCategory === 'BBCO' || selectedSubCategory === 'OTHER')) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 w-full pb-48 perspective-[2000px] max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <WorkItem 
              key={`${project.id}-${selectedGenre}`}
              project={project} 
              index={index} 
              isHovered={hoveredProject === project.id}
              onHover={(id) => setHoveredProject(id)}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      )}
      
      {/* Gymnopedie YouTube Embed for SPATIAL AUDIO */}
      {selectedGenre === 'SPATIAL AUDIO' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-16 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-[#1a1a1a]">
            Eric Satie "Gymnopedie" Full
          </h3>
          <div className="aspect-video mb-6">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/azl0h7vc4eE"
              title="Eric Satie Gymnopedie Full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-[#666] leading-relaxed">
            {language === 'ja' 
              ? 'ピアノ演奏を「ベース音」「和音」「メロディ」の3つに分けて録音し、360度立体空間内に配置。バイノーラル音声技術により、自動化された動き、距離に基づく音量・EQ調整、トランジェント整形、Ambisonicリバーブを駆使し、あらゆるヘッドフォンで没入型体験を実現。'
              : 'Piano performance recorded in three separate parts (bass, chords, melody) and positioned in 360° spatial space. Using binaural audio technology with automated movement, distance-based volume/EQ adjustments, transient shaping, and Ambisonic reverb to create an immersive listening experience through any headphones.'}
          </p>
        </motion.div>
      )}
      
      {/* Look Up at the Stars YouTube Videos */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'SOLO' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-16 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-[#1a1a1a]">
            Look Up at the Stars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/zXDl7wiq-dQ"
                title="Look Up at the Stars - Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/kHcXBKJCcP8"
                title="Look Up at the Stars - Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/lXkOnMQLFsg"
                title="Look Up at the Stars - Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Solo Piano Works YouTube Videos */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'SOLO' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-12 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-[#1a1a1a]">
            Solo Piano Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/bBCqNJIW4GQ"
                title="Solo Piano Works - Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/QvMYUWoV2jU"
                title="Solo Piano Works - Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/E-CZp4zW1oI"
                title="Solo Piano Works - Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/rIQDM58aX-Y"
                title="Solo Piano Works - Video 4"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Solo Piano Works SoundCloud Embed */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'SOLO' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-0 mb-24 max-w-5xl mx-auto"
        >
          <div className="w-full">
            <iframe 
              width="100%" 
              height="450" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A133465326&color=%230c6689&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            />
          </div>
        </motion.div>
      )}
      
      {/* UN.a YouTube Videos */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'UN.a' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-24 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6 text-[#1a1a1a]">
            Videos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#666]">UN.a / Embrace</h4>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/P7QPGLEQoOM" 
                  title="UN.a Embrace"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#666]">UN.a/COLOR Release Party</h4>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Rvki8xfQNBw" 
                  title="UN.a COLOR Release Party"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#666]">Kenji Hirano / UN.a COLOR</h4>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/U9kxsHOumeo" 
                  title="Kenji Hirano UN.a COLOR"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2 text-[#666]">UN.a/Intersecting</h4>
              <div className="aspect-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/QH2ls79_ImA" 
                  title="UN.a Intersecting"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* PRODUCE Section with Artist Names and Videos */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'PRODUCE' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-24"
        >
          {/* Erfu Shin */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#1a1a1a]">
              Erfu Shin
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects
                .filter(project => project.artistName === 'Erfu Shin')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* Erfu Shin Videos */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Related Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/avpQVtT7vyk" 
                    title="Erfu Shin - Supernal Tears 1"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/qXC4brVqLXs" 
                    title="Erfu Shin - Supernal Tears 2"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Utae */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#1a1a1a]">
              Utae
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects
                .filter(project => project.artistName === 'Utae')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* Utae Videos */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Related Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/m4J0QYEQ9Sk" 
                    title="Utae - Supersonic"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/NsjZdpWejYg" 
                    title="Utae - Victoria"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Kazuko Kitatani */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#1a1a1a]">
              北谷和子 (Kazuko Kitatani)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredProjects
                .filter(project => project.artistName === 'Kazuko Kitatani')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* Kazuko Kitatani Video */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Related Video</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/ytm5zN3xz_A" 
                    title="Kazuko Kitatani - Memories"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* BBCO Section with Project Cards and Videos */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'BBCO' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-24"
        >
          {/* SITA */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#1a1a1a]">
              SITA
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {filteredProjects
                .filter(project => project.id === '24')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* SITA Videos */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Performance Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/3TUAD9bo6Ko" 
                    title="SITA - Performance Highlight 1"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/beNtxBeqfwE" 
                    title="SITA - Performance Highlight 2"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/NJ2_X9Ybq-I" 
                    title="SITA - Performance Highlight 3"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/JeRUBW1QWOQ" 
                    title="SITA - Performance Highlight 4"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
              {/* SITA Gallery Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SITA_GALLERY_IMAGES.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`SITA Gallery ${index + 1}`} 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* 2nd Album */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-8 text-[#1a1a1a]">
              2nd Album (In Development)
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {filteredProjects
                .filter(project => project.id === '25')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* 2nd Album Videos */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Demo Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/S8RzBlb0hQo" 
                    title="Ravel: Bolero - Arr. For an Imaginary Asia"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/s6yengQxH74" 
                    title="For BBCO demo"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/qZHZwPZqjSk" 
                    title="Symphony for an Imagined Asia"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* OTHER Section with Artist Names and Embedded Content */}
      {selectedGenre === 'RELEASES' && selectedSubCategory === 'OTHER' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 mb-24"
        >
          {/* JOY-S Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 max-w-md mx-auto"
          >
            <img 
              src={JOYS_HERO_IMAGE} 
              alt="JOY-S" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>

          {/* JOY-S */}
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-[#1a1a1a]">
              JOY-S
            </h3>
            <p className="text-sm text-[#666] mb-8">Classical Pop Unit</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {filteredProjects
                .filter(project => project.artistName === 'JOY-S')
                .map((project, index) => (
                  <WorkItem
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredProject === project.id}
                    onProjectClick={handleProjectClick}
                  />
                ))}
            </div>
            {/* JOY-S YouTube Videos */}
            <div className="mt-8 mb-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">Videos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/alolSBasznk" 
                    title="JOY-S - Red Thread"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/QKwqqkYws_s" 
                    title="JOY-S Video 2"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="aspect-video">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/zGIbyx3Sx34" 
                    title="JOY-S Video 3"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            {/* JOY-S SoundCloud */}
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4 text-[#666]">BLEU Teaser</h4>
              <iframe 
                width="100%" 
                height="166" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/208092275&color=%230c6689&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videos={selectedVideos}
        externalLink={modalExternalLink}
        title={modalTitle}
        galleryImages={modalGalleryImages}
        description={modalDescription}
      />
    </div>
  );
};

interface WorkItemProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onProjectClick: (project: Project) => void;
  onHover: (id: string | null) => void;
}

const WorkItem: React.FC<WorkItemProps> = ({ 
  project, 
  index, 
  isHovered, 
  onHover,
  onProjectClick
}) => {
  const { language } = useLanguage();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [project.id]);

  const handleClick = () => {
    onProjectClick(project);
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

            {/* Special Page Badge for Sen no Tsudoi and Distant Echo */}
            {(project.id === '20' || project.id === '4-2') && (
              <motion.div
                className="absolute top-16 left-4 text-[9px] font-bold uppercase tracking-widest font-mono text-white bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 backdrop-blur-md border border-white/30 shadow-lg"
                animate={{ 
                  boxShadow: ['0 0 10px rgba(147, 51, 234, 0.5)', '0 0 20px rgba(147, 51, 234, 0.8)', '0 0 10px rgba(147, 51, 234, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                ✨ Special Page
              </motion.div>
            )}

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

        {/* SoundCloud Embed */}
        {project.embedCode && (
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div dangerouslySetInnerHTML={{ __html: project.embedCode }} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WorkGrid;