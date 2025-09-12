'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ThemeContextType, Theme } from '@/types/theme';

// Theme state type
interface ThemeState {
  currentTheme: string;
  isPersistent: boolean;
  isRandom: boolean;
  availableThemes: Theme[];
}

// Theme actions
type ThemeAction =
  | { type: 'SET_THEME'; payload: string }
  | { type: 'TOGGLE_PERSISTENCE' }
  | { type: 'TOGGLE_RANDOM' }
  | { type: 'INITIALIZE_THEMES'; payload: Theme[] }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<ThemeState> };

// Initial state
const initialState: ThemeState = {
  currentTheme: 'peaceful',
  isPersistent: true,
  isRandom: false,
  availableThemes: [],
};

// Theme reducer
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        currentTheme: action.payload,
      };
    case 'TOGGLE_PERSISTENCE':
      return {
        ...state,
        isPersistent: !state.isPersistent,
      };
    case 'TOGGLE_RANDOM':
      return {
        ...state,
        isRandom: !state.isRandom,
      };
    case 'INITIALIZE_THEMES':
      return {
        ...state,
        availableThemes: action.payload,
      };
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  CURRENT_THEME: 'morning-affirmations-theme',
  IS_PERSISTENT: 'morning-affirmations-persistent',
  IS_RANDOM: 'morning-affirmations-random',
} as const;

// Available themes data - colors are defined in globals.css
const availableThemes: Theme[] = [
  {
    id: 'peaceful',
    name: 'Peaceful',
    displayName: 'Peaceful',
    description: 'Calm and serene',
    mood: 'peaceful',
    isActive: true,
    colors: {
      primary: 'var(--theme-primary)',
      secondary: 'var(--theme-secondary)',
      accent: 'var(--theme-accent)',
      background: 'var(--theme-background)',
      surface: 'var(--theme-surface)',
      text: {
        primary: 'var(--theme-text-primary)',
        secondary: 'var(--theme-text-secondary)',
        accent: 'var(--theme-text-accent)',
      },
      border: 'var(--theme-border)',
      shadow: 'var(--theme-shadow)',
    },
    fonts: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
      accent: 'var(--font-accent)',
      display: 'var(--font-display)',
    },
  },
  {
    id: 'energetic',
    name: 'Energetic',
    displayName: 'Energetic',
    description: 'Vibrant and dynamic',
    mood: 'energetic',
    isActive: true,
    colors: {
      primary: 'var(--theme-primary)',
      secondary: 'var(--theme-secondary)',
      accent: 'var(--theme-accent)',
      background: 'var(--theme-background)',
      surface: 'var(--theme-surface)',
      text: {
        primary: 'var(--theme-text-primary)',
        secondary: 'var(--theme-text-secondary)',
        accent: 'var(--theme-text-accent)',
      },
      border: 'var(--theme-border)',
      shadow: 'var(--theme-shadow)',
    },
    fonts: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
      accent: 'var(--font-accent)',
      display: 'var(--font-display)',
    },
  },
  {
    id: 'restorative',
    name: 'Restorative',
    displayName: 'Restorative',
    description: 'Healing and nurturing',
    mood: 'restorative',
    isActive: true,
    colors: {
      primary: 'var(--theme-primary)',
      secondary: 'var(--theme-secondary)',
      accent: 'var(--theme-accent)',
      background: 'var(--theme-background)',
      surface: 'var(--theme-surface)',
      text: {
        primary: 'var(--theme-text-primary)',
        secondary: 'var(--theme-text-secondary)',
        accent: 'var(--theme-text-accent)',
      },
      border: 'var(--theme-border)',
      shadow: 'var(--theme-shadow)',
    },
    fonts: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
      accent: 'var(--font-accent)',
      display: 'var(--font-display)',
    },
  },
];

// ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Initialize themes on mount
  useEffect(() => {
    dispatch({ type: 'INITIALIZE_THEMES', payload: availableThemes });
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);
      const savedPersistence = localStorage.getItem(STORAGE_KEYS.IS_PERSISTENT);
      const savedRandom = localStorage.getItem(STORAGE_KEYS.IS_RANDOM);

      const loadedState: Partial<ThemeState> = {};
      
      if (savedTheme) {
        loadedState.currentTheme = savedTheme;
      }
      if (savedPersistence !== null) {
        loadedState.isPersistent = JSON.parse(savedPersistence);
      }
      if (savedRandom !== null) {
        loadedState.isRandom = JSON.parse(savedRandom);
      }

      if (Object.keys(loadedState).length > 0) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: loadedState });
      }
    }
  }, []);

  // Apply random theme when random mode is enabled and no specific theme is persisted
  useEffect(() => {
    if (state.isRandom && !state.isPersistent && state.availableThemes.length > 0) {
      const activeThemes = state.availableThemes.filter(theme => theme.isActive);
      if (activeThemes.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeThemes.length);
        const randomTheme = activeThemes[randomIndex];
        dispatch({ type: 'SET_THEME', payload: randomTheme.id });
      }
    }
  }, [state.isRandom, state.isPersistent, state.availableThemes]);

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.currentTheme);
    }
  }, [state.currentTheme]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always save random mode setting independently
      localStorage.setItem(STORAGE_KEYS.IS_RANDOM, JSON.stringify(state.isRandom));
      
      // Only save theme and persistence when persistence is enabled
      if (state.isPersistent) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, state.currentTheme);
        localStorage.setItem(STORAGE_KEYS.IS_PERSISTENT, JSON.stringify(state.isPersistent));
      } else {
        // Clear theme persistence when disabled
        localStorage.removeItem(STORAGE_KEYS.CURRENT_THEME);
        localStorage.removeItem(STORAGE_KEYS.IS_PERSISTENT);
      }
    }
  }, [state.currentTheme, state.isPersistent, state.isRandom]);

  // Context value
  const contextValue: ThemeContextType = {
    theme: {
      currentTheme: state.currentTheme,
      isPersistent: state.isPersistent,
      isRandom: state.isRandom,
      availableThemes: state.availableThemes,
    },
    setTheme: (themeId: string) => {
      dispatch({ type: 'SET_THEME', payload: themeId });
    },
    togglePersistence: () => {
      dispatch({ type: 'TOGGLE_PERSISTENCE' });
    },
    toggleRandom: () => {
      dispatch({ type: 'TOGGLE_RANDOM' });
    },
    getRandomTheme: () => {
      const activeThemes = state.availableThemes.filter(theme => theme.isActive);
      const randomIndex = Math.floor(Math.random() * activeThemes.length);
      return activeThemes[randomIndex];
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Export the context for advanced usage
export { ThemeContext };
