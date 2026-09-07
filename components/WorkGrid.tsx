import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PROJECTS,
  BBCO_HERO_IMAGE,
  BBCO_GALLERY_IMAGES,
  UNA_HERO_IMAGE,
  JOYS_HERO_IMAGE,
  SITA_GALLERY_IMAGES,
  SITA_DESCRIPTIONS,
  SUBCATEGORY_DESCRIPTIONS,
  GENRE_DESCRIPTIONS,
} from '../constants';
import { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import VideoModal from './VideoModal';
import { getProjectVideos, getLeftoverVideoGroups, EXTRA_EMBEDS, ResolvedVideo } from '../lib/videos';

type Translation = typeof translations['en'];

// ---------------------------------------------------------------------------
// Work Index — rebuilt from _spec/live_app.js + _spec/live.js (the `c0`
// component: taxonomy bar with counts, Index/Grid toggle, sortable columns,
// expandable rows, and a release section grouped by SOLO/BBCO/UN.a/PRODUCE/
// OTHER). See the task report for what's a simplification vs. production
// (the cursor-proximity "glow" on hover and the view-transition photo morph
// are decorative and were left out; everything else is reproduced).
// ---------------------------------------------------------------------------

type TaxonomyKey = 'spatial' | 'release' | 'commissioned' | 'education' | 'archive';

interface TaxonomyGroup {
  key: TaxonomyKey;
  genres: string[];
  label: (t: Translation) => string;
}

const TAXONOMY: TaxonomyGroup[] = [
  { key: 'spatial', genres: ['INSTALLATION', 'SPATIAL AUDIO'], label: (t) => t.taxSpatial },
  { key: 'release', genres: ['RELEASES'], label: (t) => t.taxRelease },
  { key: 'commissioned', genres: ['CLIENT WORKS'], label: (t) => t.taxCommissioned },
  { key: 'education', genres: ['EDUCATION'], label: (t) => t.taxEducation },
  { key: 'archive', genres: ['ARCHIVE'], label: (t) => t.taxArchive },
];

const RELEASE_GROUPS = ['SOLO', 'BBCO', 'UN.a', 'PRODUCE', 'OTHER'] as const;
type ReleaseGroup = typeof RELEASE_GROUPS[number];

const isRelease = (p: Project) => p.genre === 'RELEASES' || (p.tags ?? []).includes('Album');
const releaseGroupOf = (p: Project): ReleaseGroup =>
  (RELEASE_GROUPS as readonly string[]).includes(p.category) ? (p.category as ReleaseGroup) : (p.tags ?? []).includes('Solo') ? 'SOLO' : 'OTHER';

const parseYear = (year: string): number => {
  const n = parseInt(year, 10);
  return Number.isFinite(n) ? n : -Infinity;
};

const localizedTitle = (title: Project['title'], lang: 'en' | 'ja' | 'zh') =>
  typeof title === 'string' ? title : title[lang];
const localizedText = (text: string | { en: string; ja: string; zh: string }, lang: 'en' | 'ja' | 'zh') =>
  typeof text === 'string' ? text : text[lang];

const genreLabel = (genre: string, t: Translation) => {
  const group = TAXONOMY.find((g) => g.genres.includes(genre));
  return group ? group.label(t) : genre;
};

const linkLabel = (link: string) => (link.startsWith('/#/') ? 'View page' : 'Visit site');
const LinkTo: React.FC<{ href: string; className: string }> = ({ href, className }) => {
  if (href.startsWith('/#/')) {
    return (
      <Link to={href.replace('/#', '')} className={className}>
        {linkLabel(href)}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {linkLabel(href)}
    </a>
  );
};

// Every project gets a stable chronological index number (001 = oldest),
// independent of the current sort/display order.
const INDEXED_PROJECTS: (Project & { indexNo: number })[] = [...PROJECTS]
  .sort((a, b) => parseYear(a.year) - parseYear(b.year))
  .map((p, i) => ({ ...p, indexNo: i + 1 }));

// Extra images/notes shown in a project's expanded detail — mirrors
// production's per-id map (`l0`), rebuilt from constants already restored
// (SITA_*, SUBCATEGORY_DESCRIPTIONS, hero images) rather than new copy.
interface DetailExtra {
  images?: string[];
  notes?: { label: string; text: { en: string; ja: string; zh: string } }[];
}
const DETAIL_EXTRAS: Record<string, DetailExtra> = {
  '24': {
    images: [...SITA_GALLERY_IMAGES, BBCO_HERO_IMAGE],
    notes: [
      { label: 'About SITA', text: SITA_DESCRIPTIONS },
      { label: 'About BBCO', text: SUBCATEGORY_DESCRIPTIONS.BBCO },
    ],
  },
  '25-2': { images: [UNA_HERO_IMAGE], notes: [{ label: 'About UN.a', text: SUBCATEGORY_DESCRIPTIONS['UN.a'] }] },
  '39': { images: [JOYS_HERO_IMAGE], notes: [{ label: 'About OTHER', text: SUBCATEGORY_DESCRIPTIONS.OTHER }] },
  '21': { notes: [{ label: 'About SOLO', text: SUBCATEGORY_DESCRIPTIONS.SOLO }] },
  '32': { notes: [{ label: 'About PRODUCE', text: SUBCATEGORY_DESCRIPTIONS.PRODUCE }] },
};

const RELEASE_GROUP_HERO: Partial<Record<ReleaseGroup, string>> = {
  BBCO: BBCO_HERO_IMAGE,
  'UN.a': UNA_HERO_IMAGE,
  OTHER: JOYS_HERO_IMAGE,
};
const RELEASE_GROUP_GALLERY: Partial<Record<ReleaseGroup, string[]>> = {
  BBCO: BBCO_GALLERY_IMAGES,
};

type SortKey = 'no' | 'title' | 'cat' | 'year';
interface SortState {
  key: SortKey;
  dir: 'asc' | 'desc';
}

const WorkGrid: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    document.title = 'Work Index | NAKAMURA Hiroyuki';
  }, []);

  const [taxonomy, setTaxonomy] = useState<TaxonomyKey | null>(null);
  const [sort, setSort] = useState<SortState>({ key: 'year', dir: 'desc' });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedScope, setExpandedScope] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'index' | 'grid'>('grid');

  const [videoModal, setVideoModal] = useState<{ open: boolean; videos: { id: string; title: string }[]; title?: string; externalLink?: string }>({
    open: false,
    videos: [],
  });

  const activeGroup = TAXONOMY.find((g) => g.key === taxonomy) ?? null;

  const toggleExpand = (id: string, scope: string) => {
    const isOpen = expandedId === id && expandedScope === scope;
    setExpandedId(isOpen ? null : id);
    setExpandedScope(isOpen ? null : scope);
  };

  const toggleSort = (key: SortKey) => {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  const openVideos = (title: string, videos: ResolvedVideo[], externalLink?: string) => {
    setVideoModal({ open: true, videos: videos.map(({ id, title }) => ({ id, title })), title, externalLink });
  };

  const filteredSorted = useMemo(() => {
    const base = activeGroup
      ? INDEXED_PROJECTS.filter((p) => activeGroup.genres.includes(p.genre))
      : INDEXED_PROJECTS.filter((p) => !isRelease(p));
    return [...base].sort((a, b) => {
      let diff = 0;
      switch (sort.key) {
        case 'no':
          diff = a.indexNo - b.indexNo;
          break;
        case 'year':
          diff = parseYear(a.year) - parseYear(b.year);
          break;
        case 'title':
          diff = localizedTitle(a.title, language).localeCompare(localizedTitle(b.title, language));
          break;
        case 'cat':
          diff = a.genre.localeCompare(b.genre);
          break;
      }
      return sort.dir === 'asc' ? diff : -diff;
    });
  }, [activeGroup, sort, language]);

  const genreDescriptions = useMemo(() => {
    if (!activeGroup) return [];
    return activeGroup.genres
      .map((g) => GENRE_DESCRIPTIONS[g as keyof typeof GENRE_DESCRIPTIONS]?.[language])
      .filter((d): d is string => !!d);
  }, [activeGroup, language]);

  const releaseProjects = useMemo(() => INDEXED_PROJECTS.filter(isRelease), []);
  const showReleaseSection = !activeGroup || activeGroup.key === 'release';
  const showRegularListing = activeGroup?.key !== 'release';

  const allLeftoverGroups = useMemo(() => getLeftoverVideoGroups(), []);
  // 分類を選んでいるあいだは、その分類の映像だけを出す。
  // どの分類にも属さない tier（ソロピアノ演奏など）は「すべて」のときだけ出す。
  const leftoverVideoGroups = useMemo(
    () => (taxonomy === null ? allLeftoverGroups : allLeftoverGroups.filter((g) => g.tier === taxonomy)),
    [allLeftoverGroups, taxonomy]
  );
  const leftoverVideoCount = useMemo(
    () => leftoverVideoGroups.reduce((sum, g) => sum + g.videos.length, 0),
    [leftoverVideoGroups]
  );

  return (
    <div className="w-full min-h-screen px-4 md:px-12 pt-32 pb-24">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl text-ink">{t.work}</h1>
      </div>

      {/* Hover preview panel (desktop only) */}
      <div
        className="hidden md:block fixed pointer-events-none z-40 transition-opacity duration-200"
        style={{ right: '40px', top: '96px', width: '320px', height: '240px', opacity: hoveredImage ? 1 : 0 }}
      >
        {hoveredImage && <img src={hoveredImage} alt="" className="w-full h-full object-cover border border-line" />}
      </div>

      {/* Taxonomy bar */}
      <div className="mb-8">
        <div
          className="flex items-center gap-8 overflow-x-auto whitespace-nowrap border-y border-line py-3 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          <span className="text-[11px] uppercase tracking-[0.16em] text-mute shrink-0">
            All works <span className="font-mono text-[10px] ml-1">{PROJECTS.length}</span>
          </span>
          {TAXONOMY.map((group) => {
            const count = group.key === 'release' ? releaseProjects.length : PROJECTS.filter((p) => group.genres.includes(p.genre)).length;
            const active = taxonomy === group.key;
            return (
              <button
                key={group.key}
                type="button"
                onClick={() => setTaxonomy((prev) => (prev === group.key ? null : group.key))}
                className={`text-[11px] uppercase tracking-[0.16em] shrink-0 transition-colors hover:text-ink ${active ? 'text-ink' : 'text-mute'}`}
              >
                {group.label(t)} <span className="font-mono text-[10px] ml-1">{count}</span>
              </button>
            );
          })}
        </div>
        {genreDescriptions.length > 0 && (
          <div className="pt-3 max-w-3xl space-y-2">
            {genreDescriptions.map((desc, i) => (
              <p key={i} className="text-xs text-mute leading-relaxed">
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>

      {showRegularListing && (
        <>
          <div className="flex justify-end gap-6 mb-3">
            <button
              type="button"
              onClick={() => setViewMode('index')}
              className={`text-[11px] uppercase tracking-wide hover:text-ink transition-colors ${viewMode === 'index' ? 'text-ink' : 'text-mute'}`}
            >
              Index
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`text-[11px] uppercase tracking-wide hover:text-ink transition-colors ${viewMode === 'grid' ? 'text-ink' : 'text-mute'}`}
            >
              Grid
            </button>
          </div>

          {viewMode === 'index' ? (
            <div>
              <div
                className="hidden md:grid items-center border-b border-line pb-2 mb-1"
                style={{ gridTemplateColumns: '64px 24px 1fr 260px 140px 64px' }}
              >
                <SortHeader label="No." sortKey="no" sort={sort} onSort={toggleSort} />
                <span />
                <SortHeader label="Title" sortKey="title" sort={sort} onSort={toggleSort} />
                <span className="font-mono text-xs text-mute">For</span>
                <SortHeader label="Cat." sortKey="cat" sort={sort} onSort={toggleSort} />
                <SortHeader label="Year" sortKey="year" sort={sort} onSort={toggleSort} />
              </div>
              {filteredSorted.map((project) => (
                <IndexRow
                  key={project.id}
                  project={project}
                  language={language}
                  isOpen={expandedId === project.id && expandedScope === 'all'}
                  onToggle={() => toggleExpand(project.id, 'all')}
                  onHoverImage={setHoveredImage}
                  onOpenVideos={openVideos}
                />
              ))}
            </div>
          ) : (
            <ProjectGridSection
              projects={filteredSorted}
              language={language}
              columnsClass="grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              scope="all"
              expandedId={expandedScope === 'all' ? expandedId : null}
              onToggle={(id) => toggleExpand(id, 'all')}
              onOpenVideos={openVideos}
            />
          )}
        </>
      )}

      {showReleaseSection && (
        <div className={activeGroup?.key === 'release' ? 'mt-2' : 'mt-16 pt-8 border-t border-line'}>
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-ink">{t.taxRelease}</h2>
            <span className="font-mono text-xs text-mute">{releaseProjects.length}</span>
          </div>
          <div className="flex flex-col divide-y divide-line">
            {RELEASE_GROUPS.map((group) => {
              const groupProjects = releaseProjects
                .filter((p) => releaseGroupOf(p) === group)
                .sort((a, b) => parseYear(b.year) - parseYear(a.year));
              if (groupProjects.length === 0) return null;
              const desc = SUBCATEGORY_DESCRIPTIONS[group]?.[language];
              const heroImage = RELEASE_GROUP_HERO[group];
              const gallery = RELEASE_GROUP_GALLERY[group];
              const scope = `rel:${group}`;
              return (
                <div key={group} className="py-8 first:pt-0 last:pb-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink">{group}</h3>
                    <span className="font-mono text-xs text-mute">{groupProjects.length}</span>
                  </div>
                  {(desc || heroImage) && (
                    <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                      {desc && <p className="text-xs text-mute leading-relaxed max-w-2xl md:flex-1">{desc}</p>}
                      {heroImage && (
                        <img src={heroImage} alt={group} className="w-full md:w-[260px] shrink-0 aspect-[4/3] object-cover" />
                      )}
                    </div>
                  )}
                  {gallery && (
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3">
                      {gallery.map((img) => (
                        <img
                          key={img}
                          src={img}
                          alt={group}
                          className="w-full aspect-[16/10] object-cover border-r border-b border-line last:border-r-0"
                        />
                      ))}
                    </div>
                  )}
                  <ProjectGridSection
                    projects={groupProjects}
                    language={language}
                    columnsClass="grid-cols-2 md:grid-cols-4"
                    scope={scope}
                    expandedId={expandedScope === scope ? expandedId : null}
                    onToggle={(id) => toggleExpand(id, scope)}
                    onOpenVideos={openVideos}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leftover videos — the rest of the 58-video catalogue that isn't tied
          to a specific Work entry. Grouped by the same taxonomy tiers as the
          rest of the page (folded in here when /video was retired as a
          standalone page, per lib/videos.ts). Each tile shows its own title
          and opens just that video, not the whole group. */}
      {leftoverVideoGroups.length > 0 && (
        <div className="mt-16 md:mt-24 pt-12 border-t border-line">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-ink">{t.videoTitle}</h2>
            <span className="font-mono text-xs text-mute">{leftoverVideoCount}</span>
          </div>
          <div className="flex flex-col gap-10">
            {leftoverVideoGroups.map((group) => (
              <div key={group.key}>
                <h4 className="text-[11px] uppercase tracking-[0.16em] text-mute mb-4">
                  {group.literalLabel ?? t[group.labelKey!]}
                </h4>
                <div className="flex flex-wrap gap-4">
                  {group.videos.map((video) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => openVideos(video.title, [video])}
                      aria-label={`Play video: ${video.title}`}
                      className="relative w-40 md:w-48 text-left group/video focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    >
                      <div className="relative aspect-video overflow-hidden border border-line bg-line">
                        <img
                          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-ink/25 group-hover/video:bg-ink/40 transition-colors">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-paper drop-shadow-md" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-mute leading-snug line-clamp-2">{video.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <VideoModal
        isOpen={videoModal.open}
        onClose={() => setVideoModal((v) => ({ ...v, open: false }))}
        videos={videoModal.videos}
        title={videoModal.title}
        externalLink={videoModal.externalLink}
      />
    </div>
  );
};

const SortHeader: React.FC<{ label: string; sortKey: SortKey; sort: SortState; onSort: (k: SortKey) => void }> = ({
  label,
  sortKey,
  sort,
  onSort,
}) => (
  <button
    type="button"
    onClick={() => onSort(sortKey)}
    className={`text-left font-mono text-xs uppercase tracking-wide hover:text-ink transition-colors ${sort.key === sortKey ? 'text-ink' : 'text-mute'}`}
  >
    {label}
    {sort.key === sortKey ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}
  </button>
);

interface IndexRowProps {
  project: Project & { indexNo: number };
  language: 'en' | 'ja' | 'zh';
  isOpen: boolean;
  onToggle: () => void;
  onHoverImage: (src: string | null) => void;
  onOpenVideos: (title: string, videos: ResolvedVideo[], externalLink?: string) => void;
}

const IndexRow: React.FC<IndexRowProps> = ({ project, language, isOpen, onToggle, onHoverImage, onOpenVideos }) => {
  const t = translations[language];
  const title = localizedTitle(project.title, language);
  const no = String(project.indexNo).padStart(3, '0');
  const videoCount = getProjectVideos(project).length;

  return (
    <div className="border-b border-line">
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onMouseEnter={() => onHoverImage(project.image)}
        onMouseLeave={() => onHoverImage(null)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className="cursor-pointer text-mute hover:text-ink transition-colors"
      >
        <div className="hidden md:grid items-center h-[56px]" style={{ gridTemplateColumns: '64px 24px 1fr 260px 140px 64px' }}>
          <span className="font-mono text-xs">{no}</span>
          <span className="font-mono text-xs" aria-hidden={videoCount === 0}>
            {videoCount > 0 ? '▶' : ''}
          </span>
          <span className="font-serif text-xl overflow-hidden text-ellipsis whitespace-nowrap pr-4">{title}</span>
          <span className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap pr-4 text-mute">{project.category}</span>
          <span className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap pr-4">{genreLabel(project.genre, t)}</span>
          <span className="font-mono text-xs">{project.year}</span>
        </div>
        <div className="md:hidden flex items-start gap-3 h-[72px] py-2">
          <span className="font-mono text-[11px] pt-1 shrink-0">{no}</span>
          <div className="min-w-0 flex-1">
            <p className="font-serif text-[17px] overflow-hidden text-ellipsis whitespace-nowrap">{title}</p>
            <p className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap">
              {videoCount > 0 && <span aria-hidden="true">{'▶ '}</span>}
              {project.category} · {genreLabel(project.genre, t)} · {project.year}
            </p>
          </div>
        </div>
      </div>
      <div
        className="grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:duration-0"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 text-ink">
            <img src={project.image} alt="" className="w-full aspect-[4/3] object-cover" />
            <ProjectDetail project={project} language={language} onOpenVideos={onOpenVideos} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetail: React.FC<{
  project: Project;
  language: 'en' | 'ja' | 'zh';
  onOpenVideos: (title: string, videos: ResolvedVideo[], externalLink?: string) => void;
}> = ({ project, language, onOpenVideos }) => {
  const t = translations[language];
  const description = localizedText(project.description, language);
  const videos = getProjectVideos(project);
  const extra = DETAIL_EXTRAS[project.id];
  const embeds = EXTRA_EMBEDS[project.id] ?? [];
  const linkClass = 'text-[11px] uppercase tracking-wide text-mute hover:text-ink transition-colors';
  const title = localizedTitle(project.title, language);

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <p className="text-sm leading-relaxed">{description}</p>
      {project.tags && project.tags.length > 0 && <p className="font-mono text-xs text-mute">{project.tags.join(', ')}</p>}
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {project.link && <LinkTo href={project.link} className={linkClass} />}
        {project.externalLink && (
          <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
            More info
          </a>
        )}
      </div>
      {videos.length > 0 && (
        <div className="mt-1">
          <p className="font-mono text-[10px] uppercase tracking-wide text-mute mb-2">
            {t.videoTitle} ({videos.length})
          </p>
          <div className="flex flex-wrap gap-3">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => onOpenVideos(video.title, [video], project.externalLink)}
                aria-label={`${t.videoTitle}: ${video.title}`}
                className="w-40 md:w-44 text-left group/v focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <span className="relative block aspect-video overflow-hidden border border-line bg-line">
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity group-hover/v:opacity-80"
                  />
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="block w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white drop-shadow" />
                  </span>
                </span>
                <span className="mt-1.5 block text-[11px] leading-snug text-mute group-hover/v:text-ink transition-colors">
                  {video.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {extra?.images && extra.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {extra.images.map((img, i) => (
            <img key={i} src={img} alt="" className="w-full aspect-[4/3] object-cover" />
          ))}
        </div>
      )}
      {extra?.notes?.map((note, i) => (
        <div key={i}>
          <p className="font-mono text-[10px] uppercase tracking-wide text-mute mb-1">{note.label}</p>
          <p className="text-xs leading-relaxed text-mute whitespace-pre-line">{note.text[language]}</p>
        </div>
      ))}
      {embeds.map((embed, i) => (
        <div key={i}>
          <p className="font-mono text-[10px] uppercase tracking-wide text-mute mb-1">{embed.title}</p>
          <iframe width="100%" height="120" scrolling="no" frameBorder={0} allow="autoplay" src={embed.embedSrc} title={embed.title} />
        </div>
      ))}
    </div>
  );
};

interface ProjectGridSectionProps {
  projects: Project[];
  language: 'en' | 'ja' | 'zh';
  columnsClass: string;
  scope: string;
  expandedId: string | null;
  onToggle: (id: string) => void;
  onOpenVideos: (title: string, videos: ResolvedVideo[], externalLink?: string) => void;
}

const ProjectGridSection: React.FC<ProjectGridSectionProps> = ({ projects, language, columnsClass, expandedId, onToggle, onOpenVideos }) => (
  <div className={`grid ${columnsClass}`}>
    {projects.map((project) => (
      <React.Fragment key={project.id}>
        <GridCard project={project} language={language} onClick={() => onToggle(project.id)} />
        {expandedId === project.id && (
          <div style={{ gridColumn: '1 / -1' }} className="bg-paper border-b border-line">
            <div className="py-6 md:py-8 px-3 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 text-ink">
              <img src={project.image} alt="" className="w-full aspect-[4/3] object-cover" />
              <ProjectDetail project={project} language={language} onOpenVideos={onOpenVideos} />
            </div>
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

const GridCard: React.FC<{ project: Project; language: 'en' | 'ja' | 'zh'; onClick: () => void }> = ({ project, language, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
    className="bg-paper cursor-pointer border-r border-b border-line"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <img src={project.image} alt="" className="w-full h-full object-cover" />
    </div>
    <div className="px-3 py-2 border-t border-line">
      <p className="font-serif text-[17px] leading-tight overflow-hidden text-ellipsis whitespace-nowrap text-ink">
        {localizedTitle(project.title, language)}
      </p>
      <p className="font-mono text-xs text-mute overflow-hidden text-ellipsis whitespace-nowrap">
        {project.category} · {project.year}
      </p>
    </div>
  </div>
);

export default WorkGrid;
