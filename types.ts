
export enum ThemeType {
  VOID_TECH = 'VOID_TECH',
  DAYLIGHT = 'DAYLIGHT',
  CYBER_PULSE = 'CYBER_PULSE',
  ZENITH = 'ZENITH'
}

export interface ResourceState {
  cpuLimit: number;
  ramLimit: number;
  currentCpu: number;
  currentRam: number;
  isThrottled: boolean;
}

export type SearchMode = 'GOOGLE' | 'KORE_AI';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface AIResponse {
  text: string;
  isLoading: boolean;
  error?: string;
}
