export interface Sher {
  id: number;
  hindi: {
    text: string;
    poet: string;
  };
  english: {
    text: string;
    poet: string;
  };
  audioFile: string;
  genre: Genre;
  credits: {
    originalPoet: string;
    translator?: string;
    audioArtist: string;
    source?: string;
  };
}

export type Language = 'hindi' | 'english';

export type ViewMode = 'normal' | 'flow';

export type Genre = 'Love' | 'Emotional' | 'Philosophy' | 'Nature' | 'Spiritual' | 'Motivation';

export const GENRES: Genre[] = ['Love', 'Emotional', 'Philosophy', 'Nature', 'Spiritual', 'Motivation'];