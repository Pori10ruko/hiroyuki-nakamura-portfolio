import React, { useEffect, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: { id: string; title: string }[];
  externalLink?: string;
  title?: string;
  galleryImages?: string[];
  description?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

export default function VideoModal({ isOpen, onClose, videos, externalLink, title, galleryImages, description }: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Escape to close, lock body scroll while open.
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

  // Move focus into the dialog on open, restore it to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      previouslyFocused.current?.focus();
    }
  }, [isOpen]);

  // Basic focus trap: keep Tab/Shift+Tab cycling within the dialog.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const nodeList = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const focusable: HTMLElement[] = Array.prototype.filter.call(nodeList, (el: HTMLElement) => el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      onKeyDown={handleKeyDown}
      style={{ backgroundColor: 'rgba(22,20,18,.92)' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'video-modal-title' : undefined}
        aria-label={title ? undefined : 'Video'}
        onClick={(e) => e.stopPropagation()}
        className="bg-paper text-ink w-full max-w-5xl max-h-[90vh] overflow-y-auto relative"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 uppercase text-[11px] tracking-[0.16em] text-mute hover:text-ink transition-colors"
        >
          Close
        </button>

        <div className="p-8 space-y-6">
          {title && (
            <h2 id="video-modal-title" className="text-2xl font-serif font-normal text-ink mb-4">
              {title}
            </h2>
          )}

          {description && <div className="mb-6 text-mute text-sm leading-[1.7] whitespace-pre-line">{description}</div>}

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 text-[11px] uppercase tracking-[0.16em] text-mute hover:text-ink transition-colors"
            >
              View Album Details →
            </a>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="space-y-2">
                <h3 className="text-sm text-mute">{video.title}</h3>
                <div className="aspect-video bg-ink overflow-hidden">
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

          {galleryImages && galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-6">
              {galleryImages.map((image, index) => (
                <img key={index} src={image} alt={`Gallery ${index + 1}`} className="w-full h-auto object-cover" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
