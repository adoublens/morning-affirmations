export interface Affirmation {
  id: string;
  text: string;
  author: string;
  category: AffirmationCategory;
  theme: string[];
  mood: 'peaceful' | 'energetic' | 'restorative';
  imageUrl: string;
  lastUsed?: Date;
  useCount: number;
  tags: string[];
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
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: string;
  category: VideoCategory;
  theme: string[];
  mood: 'peaceful' | 'energetic' | 'restorative';
  lastUsed?: Date;
  useCount: number;
  tags: string[];
}

export type VideoCategory = 
  | 'meditation'
  | 'yoga'
  | 'motivation'
  | 'mindfulness'
  | 'breathing'
  | 'stretching'
  | 'workout'
  | 'relaxation'
  | 'inspiration'
  | 'wellness';

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
