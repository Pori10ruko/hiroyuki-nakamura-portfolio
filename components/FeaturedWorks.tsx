import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, FEATURED_WORKS } from '../constants';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

// Home's "7 curated works" row — FEATURED_WORKS gives the order + a
// per-work note; each id is resolved against PROJECTS for the rest of the
// card. Replaces the pre-9/6 build's PROJECTS.slice(0, 6).
const FeaturedWorks: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const items = FEATURED_WORKS.map((fw) => {
    const project = PROJECTS.find((p) => p.id === fw.id);
    return project ? { project, note: fw.note } : null;
  }).filter((v): v is { project: Project; note: typeof FEATURED_WORKS[number]['note'] } => v !== null);

  return (
    <section className="relative text-ink py-16 md:py-24">
      <div className="px-4 md:px-12 mb-8 md:mb-12">
        <h2
          className="font-serif text-ink"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
        >
          {t.work}
        </h2>
        <div className="h-px bg-line mt-4" aria-hidden="true" />
      </div>
      <div className="flex gap-6 md:gap-12 lg:gap-16 px-4 md:px-12 items-start overflow-x-auto pb-8">
        {items.map(({ project, note }, index) => (
          <FeaturedWorkCard key={project.id} project={project} index={index} note={note[language]} />
        ))}
      </div>
    </section>
  );
};

const FeaturedWorkCard: React.FC<{ project: Project; index: number; note: string }> = ({ project, index, note }) => {
  const { language } = useLanguage();
  const title = typeof project.title === 'string' ? project.title : project.title[language];
  const cardClass =
    'group relative w-[75vw] sm:w-[60vw] md:w-[35vw] lg:w-[24vw] aspect-square flex-shrink-0 block';

  const body = (
    <>
      <div className="absolute -top-8 md:-top-10 left-0 font-mono text-xs text-mute">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </div>
      <div className="w-full h-full relative overflow-hidden border border-line bg-paper">
        <img
          src={project.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4 md:mt-6 text-left">
        <h3 className="font-serif text-xl md:text-2xl leading-tight text-ink">{title}</h3>
        <p className="mt-2 font-mono text-xs text-mute">
          {project.category} · {project.year}
        </p>
        <p className="mt-2 text-[13px] leading-[1.6] text-mute max-w-[34ch]">{note}</p>
      </div>
    </>
  );

  const { link } = project;
  if (!link) {
    return (
      <Link to="/work" className={cardClass}>
        {body}
      </Link>
    );
  }
  if (link.startsWith('/#/')) {
    return (
      <Link to={link.replace('/#', '')} className={cardClass}>
        {body}
      </Link>
    );
  }
  if (/^https?:\/\//.test(link)) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {body}
      </a>
    );
  }
  return (
    <a href={link} className={cardClass}>
      {body}
    </a>
  );
};

export default FeaturedWorks;
