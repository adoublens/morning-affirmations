export interface Theme {
  id: string;
  name: string;
  displayName: string;
  description: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  mood: 'peaceful' | 'energetic' | 'restorative';
  isActive: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
  shadow: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
  accent: string;
  display: string;
}

export interface ThemeConfig {
  currentTheme: string;
  isPersistent: boolean;
  isRandom: boolean;
  availableThemes: Theme[];
}

export interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (themeId: string) => void;
  togglePersistence: () => void;
  toggleRandom: () => void;
  getRandomTheme: () => Theme;
}
