'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ThemeConfig, ThemeContextType, Theme } from '@/types/theme';

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

// Available themes data
const availableThemes: Theme[] = [
  {
    id: 'peaceful',
    name: 'Peaceful',
    displayName: 'Peaceful',
    description: 'Calm and serene',
    mood: 'peaceful',
    isActive: true,
    colors: {
      primary: '#E8F4F8',
      secondary: '#B8E6B8',
      accent: '#87CEEB',
      background: '#F0F8FF',
      surface: '#F8FBFF',
      text: {
        primary: '#2F4F4F',
        secondary: '#5F7F7F',
        accent: '#4682B4',
      },
      border: '#D1E7DD',
      shadow: '#E3F2FD',
    },
    fonts: {
      heading: 'Quicksand',
      body: 'Lora',
      accent: 'Dancing Script',
      display: 'Pacifico',
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
      primary: '#FFE4B5',
      secondary: '#FFB6C1',
      accent: '#FFD700',
      background: '#FFF8DC',
      surface: '#FFFEF7',
      text: {
        primary: '#4A4A4A',
        secondary: '#696969',
        accent: '#DAA520',
      },
      border: '#FFE4E1',
      shadow: '#FFFACD',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans',
      accent: 'Pacifico',
      display: 'Pacifico',
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
      primary: '#E6E6FA',
      secondary: '#DDA0DD',
      accent: '#9370DB',
      background: '#F8F8FF',
      surface: '#FAFAFF',
      text: {
        primary: '#696969',
        secondary: '#808080',
        accent: '#6A5ACD',
      },
      border: '#E0E0FF',
      shadow: '#F0F0FF',
    },
    fonts: {
      heading: 'Merriweather',
      body: 'Source Sans Pro',
      accent: 'Playfair Display',
      display: 'Pacifico',
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

  // Apply theme to document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.currentTheme);
    }
  }, [state.currentTheme]);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && state.isPersistent) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, state.currentTheme);
      localStorage.setItem(STORAGE_KEYS.IS_PERSISTENT, JSON.stringify(state.isPersistent));
      localStorage.setItem(STORAGE_KEYS.IS_RANDOM, JSON.stringify(state.isRandom));
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
