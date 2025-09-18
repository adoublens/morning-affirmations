export interface Affirmation {
  id: string; // property
  text: string; // property
  author: string; // property
  category: AffirmationCategory;
  mood: 'peaceful' | 'energetic' | 'restorative'; // union type - it means the mood property can be ONE of these three specific string values
  imageUrl: string; // property
  lastUsed?: Date; // property
  useCount: number; // property
}

export type AffirmationCategory = 
  | 'self-love'
  | 'confidence'
  | 'gratitude'
  | 'success'
  | 'health'
  | 'relationships'
  | 'creativity'
  | 'mindfulness'
  | 'motivation'
  | 'peace';

export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  creator: string;
  creatorChannel: string;
  category: VideoCategory;
  themes: string[];
  mood?: 'peaceful' | 'energetic' | 'restorative'; // union type - it means the mood property can be ONE of these three specific string values
  lastUsed?: Date;
  useCount: number;
  thumbnail: {
    filename: string;
    alt: string;
  };
  tags: string[];
  active: boolean;
}

export type VideoCategory = 
  | 'yoga'
  | 'bible'
  | 'artsy-creative';

export interface WelcomeMessage {
  id: string;
  text: string;
  timeRange: {
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
  theme: string[];
  mood: 'peaceful' | 'energetic' | 'restorative';
  isActive: boolean;
}

export interface ContentMetadata {
  totalAffirmations: number;
  totalVideos: number;
  totalWelcomeMessages: number;
  lastUpdated: Date;
  version: string;
}

export interface ContentSelection {
  affirmation: Affirmation;
  video: Video;
  welcomeMessage: WelcomeMessage;
  selectedAt: Date;
}

export interface LockedContent {
  theme: string;
  affirmation: Affirmation;
  videos: Map<string, Video>;
  lockedAt: Date;
}