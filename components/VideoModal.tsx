import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: { id: string; title: string }[];
  externalLink?: string;
  title?: string;
  galleryImages?: string[];
  description?: string;
}

export default function VideoModal({ isOpen, onClose, videos, externalLink, title, galleryImages, description }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Videos grid */}
            <div className="p-8 space-y-6">
              {title && <h2 className="text-2xl font-light text-white mb-4">{title}</h2>}
              
              {/* Description */}
              {description && (
                <div className="mb-6 text-white/80 text-sm leading-relaxed whitespace-pre-line">
                  {description}
                </div>
              )}
              
              {/* External Link */}
              {externalLink && (
                <a 
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-6 text-white/80 hover:text-white transition-colors underline"
                >
                  View Album Details →
                </a>
              )}
              
              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div key={video.id} className="space-y-2">
                    <h3 className="text-sm text-white/70 font-light">{video.title}</h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gallery Images */}
              {galleryImages && galleryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {galleryImages.map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`Gallery ${index + 1}`} 
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
