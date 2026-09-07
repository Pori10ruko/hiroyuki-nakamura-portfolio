export interface Release {
  title: string | { en: string; ja: string; zh: string };
  year: string;
  image: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    cd?: string;
  };
}

export interface SubCategory {
  name: string;
  releases: Release[];
}

export interface Project {
  id: string;
  title: string | { en: string; ja: string; zh: string };
  category: string;
  genre: string;
  year: string;
  image: string;
  description: string | { en: string; ja: string; zh: string };
  link?: string;
  tags?: string[];
  subCategories?: SubCategory[];
  videos?: (string | { id: string; title: string })[];
  externalLink?: string;
  embedCode?: string;
  artistName?: string;
}

export enum ViewState {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  VIEWING_PROJECT = 'VIEWING_PROJECT'
}
export interface FeaturedWork {
  id: string;
  note: { en: string; ja: string; zh: string };
}

export interface VideoEntry {
  id: string;
  title: string;
  channel: string;
  group: string;
  workId?: string;
  artist?: string;
}

export interface HeroPhoto {
  src: string;
  alt: string;
  caption: { en: string; ja: string; zh: string };
}
