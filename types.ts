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
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  VIEWING_PROJECT = 'VIEWING_PROJECT'
}