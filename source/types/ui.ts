import { ReactNode } from 'react';
import { Theme } from './theme';
import { Affirmation, Video, WelcomeMessage } from './content';

// Common UI Props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
}

export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export interface ErrorProps extends BaseComponentProps {
  error: Error;
  resetError: () => void;
  showDetails?: boolean;
}

// Theme Component Props
export interface ThemeButtonProps extends BaseComponentProps {
  theme: Theme;
  isActive: boolean;
  onClick: (themeId: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export interface ThemeSwitcherProps extends BaseComponentProps { // This is an example of inheritance (LoadingProps IS-A BaseComponentProps)
  currentTheme: string;
  availableThemes: Theme[];
  onThemeChange: (themeId: string) => void;
  isPersistent: boolean;
  onPersistenceToggle: () => void;
  isRandom: boolean;
  onRandomToggle: () => void;
}

export interface PersistentToggleProps extends BaseComponentProps {
  isPersistent: boolean;
  onToggle: () => void;
  label?: string;
}

// Content Component Props
export interface WelcomeMessageProps extends BaseComponentProps {
  message: WelcomeMessage;
  currentTime: Date;
  theme: Theme;
}

export interface AffirmationsDisplayProps extends BaseComponentProps {
  affirmation: Affirmation;
  theme: Theme;
  onRefresh?: () => void;
  showCategory?: boolean;
  showAuthor?: boolean;
}

export interface AffirmationImageProps extends BaseComponentProps {
  imageUrl: string;
  alt: string;
  fallbackText?: string;
  size?: 'sm' | 'md' | 'lg';
  theme: Theme;
}

export interface AffirmationTextProps extends BaseComponentProps {
  text: string;
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
  maxLines?: number;
}

export interface AffirmationAuthorProps extends BaseComponentProps {
  author: string;
  theme: Theme;
  showIcon?: boolean;
}

export interface AffirmationCategoryProps extends BaseComponentProps {
  category: string;
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
}

export interface VideoGridProps extends BaseComponentProps {
  videos: Video[];
  theme: Theme;
  category?: string;
  maxVideos?: number;
  onVideoSelect?: (video: Video) => void;
}

export interface VideoCardProps extends BaseComponentProps {
  video: Video;
  theme: Theme;
  onSelect?: (video: Video) => void;
  showCategory?: boolean;
  showDuration?: boolean;
}

export interface VideoThumbnailProps extends BaseComponentProps {
  thumbnail: {
    filename: string;
    alt: string;
  };
  title: string;
  duration?: string;
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
}

export interface VideoInfoProps extends BaseComponentProps {
  video: Video;
  theme: Theme;
  showDescription?: boolean;
  showTags?: boolean;
}

export interface WatchButtonProps extends BaseComponentProps {
  video: Video;
  theme: Theme;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

// Layout Component Props
export interface HeaderProps extends BaseComponentProps {
  title?: string;
  theme: Theme;
  showThemeSwitcher?: boolean;
  showNavigation?: boolean;
}

// Animation and Transition Props
export interface AnimationProps {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  duration?: number;
  delay?: number;
}

// Responsive Props
export interface ResponsiveProps {
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  '2xl'?: boolean;
}
