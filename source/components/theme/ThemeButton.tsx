'use client';

import { useTheme } from './useTheme';

interface ThemeButtonProps {
  themeId: string;
  themeName: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function ThemeButton({ 
  themeId, 
  themeName, 
  isActive, 
  onClick, 
  className = '' 
}: ThemeButtonProps) {
  const { theme } = useTheme();

  const getThemeIcon = (themeId: string) => {
    const icons: { [key: string]: string } = {
      'peaceful': 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
      'energetic': 'M13 10V3L4 14h7v7l9-11h-7z',
      'restorative': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    };
    return icons[themeId] || icons['peaceful'];
  };

  const getThemeDescription = (themeId: string) => {
    const descriptions: { [key: string]: string } = {
      'peaceful': 'Relaxed, gentle, calm',
      'energetic': 'Vibrant, enthusiastic, creative',
      'restorative': 'Contemplative, thoughtful, mindful'
    };
    return descriptions[themeId] || descriptions['peaceful'];
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative group flex flex-col items-center justify-center p-4 rounded-xl
        border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1
        ${isActive 
          ? 'border-[var(--theme-accent)] bg-[var(--theme-accent)] bg-opacity-20 shadow-lg' 
          : 'border-[var(--theme-secondary)] bg-[var(--theme-primary)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)] hover:bg-opacity-10'
        }
        ${className}
      `}
      aria-label={`Switch to ${themeName} theme`}
      title={getThemeDescription(themeId)}
    >
      {/* Theme Icon */}
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-3
        transition-all duration-300
        ${isActive 
          ? 'bg-[var(--theme-accent)] text-white' 
          : 'bg-[var(--theme-secondary)] text-[var(--theme-text-secondary)] group-hover:bg-[var(--theme-accent)] group-hover:text-white'
        }
      `}>
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={getThemeIcon(themeId)} 
          />
        </svg>
      </div>

      {/* Theme Name */}
      <span className={`
        text-sm font-semibold mb-1 transition-colors duration-300
        ${isActive 
          ? 'text-[var(--theme-accent)]' 
          : 'text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)]'
        }
      `}>
        {themeName}
      </span>

      {/* Theme Description */}
      <span className="text-xs text-[var(--theme-text-secondary)] text-center leading-tight">
        {getThemeDescription(themeId)}
      </span>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--theme-accent)] rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
}
