// Theme Types
export type {
  Theme,
  ThemeColors,
  ThemeFonts,
  ThemeConfig,
  ThemeContextType
} from './theme';

// Content Types
export type {
  Affirmation,
  AffirmationCategory,
  Video,
  VideoCategory,
  WelcomeMessage,
  ContentMetadata,
  ContentSelection
} from './content';

// UI Types
export type {
  BaseComponentProps,
  LoadingProps,
  ErrorProps,
  ThemeButtonProps,
  ThemeSwitcherProps,
  PersistentToggleProps,
  WelcomeMessageProps,
  AffirmationsDisplayProps,
  AffirmationImageProps,
  AffirmationTextProps,
  AffirmationAuthorProps,
  AffirmationCategoryProps,
  VideoGridProps,
  VideoCardProps,
  VideoThumbnailProps,
  VideoInfoProps,
  WatchButtonProps,
  HeaderProps,
  AnimationProps,
  ResponsiveProps
} from './ui';

// Re-export commonly used types
export type { ReactNode } from 'react';
