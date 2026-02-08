
export enum ThemeType {
  VOID_TECH = 'VOID_TECH',
  DAYLIGHT = 'DAYLIGHT',
  CYBER_PULSE = 'CYBER_PULSE',
  ZENITH = 'ZENITH'
}

export interface Tab {
  id: string;
  title: string;
  url?: string;
  type: 'home' | 'search' | 'ai';
  searchQuery?: string;
}

export interface UserSession {
  email: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

export type SearchMode = 'GOOGLE' | 'KORE_AI';

export interface AIResponse {
  text: string;
  isLoading: boolean;
  groundingLinks?: Array<{ title: string; uri: string }>;
}
