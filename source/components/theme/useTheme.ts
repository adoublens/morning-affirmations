'use client';

import { useTheme as useThemeContext } from './ThemeProvider';
import { ThemeContextType } from '@/types/theme';

/**
 * Custom hook to access theme context
 * 
 * @returns ThemeContextType - The theme context with current theme state and actions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, togglePersistence } = useTheme();
 *   
 *   return (
 *     <div>
 *       <p>Current theme: {theme.currentTheme}</p>
 *       <button onClick={() => setTheme('energetic')}>
 *         Switch to Energetic
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextType {
  return useThemeContext();
}

// Re-export the hook from ThemeProvider for convenience
export { useTheme as useThemeContext } from './ThemeProvider';
