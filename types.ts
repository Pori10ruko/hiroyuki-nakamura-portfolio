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