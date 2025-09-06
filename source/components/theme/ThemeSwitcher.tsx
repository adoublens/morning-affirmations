'use client';

import { useTheme } from './useTheme';
import { ThemeButton } from './ThemeButton';
import { PersistentToggle } from './PersistentToggle';

interface ThemeSwitcherProps {
  className?: string;
  showTitle?: boolean;
  showDescription?: boolean;
}

export function ThemeSwitcher({ 
  className = '',
  showTitle = true,
  showDescription = true 
}: ThemeSwitcherProps) {
  const { theme, setTheme, togglePersistence, getRandomTheme } = useTheme();

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
  };

  const handlePersistentToggle = (checked: boolean) => {
    togglePersistence();
  };

  const handleRandomTheme = () => {
    const randomTheme = getRandomTheme();
    setTheme(randomTheme.id);
  };

  const themes = [
    {
      id: 'peaceful',
      name: 'Peaceful',
      description: 'Relaxed, gentle, calm'
    },
    {
      id: 'energetic', 
      name: 'Energetic',
      description: 'Vibrant, enthusiastic, creative'
    },
    {
      id: 'restorative',
      name: 'Restorative', 
      description: 'Contemplative, thoughtful, mindful'
    }
  ];

  return (
    <div className={`theme-switcher ${className}`}>
      {/* Header */}
      {(showTitle || showDescription) && (
        <div className="text-center mb-8">
          {showTitle && (
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
              Choose Your Mood
            </h2>
          )}
          {showDescription && (
            <p className="text-lg text-[var(--theme-text-secondary)] max-w-2xl mx-auto">
              Select a theme that matches how you're feeling today. Each theme offers a unique experience with different colors, fonts, and content.
            </p>
          )}
        </div>
      )}

      {/* Theme Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {themes.map((themeOption) => (
          <ThemeButton
            key={themeOption.id}
            themeId={themeOption.id}
            themeName={themeOption.name}
            isActive={theme.currentTheme === themeOption.id}
            onClick={() => handleThemeChange(themeOption.id)}
          />
        ))}
      </div>

      {/* Controls Section */}
      <div className="bg-[var(--theme-primary)] border-2 border-[var(--theme-secondary)] rounded-xl p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Persistent Toggle */}
          <div className="flex-1">
            <PersistentToggle
              checked={theme.isPersistent}
              onChange={handlePersistentToggle}
            />
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-12 bg-[var(--theme-secondary)]"></div>

          {/* Random Theme Button */}
          <div className="flex-1">
            <button
              onClick={handleRandomTheme}
              className="w-full lg:w-auto flex items-center justify-center space-x-3 px-6 py-3 bg-[var(--theme-secondary)] text-[var(--theme-text-primary)] rounded-lg font-medium hover:bg-[var(--theme-accent)] hover:text-white transition-all duration-300 hover:scale-105"
              aria-label="Get a random theme"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Random Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Theme Info */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-[var(--theme-text-secondary)]">
          <span className="w-2 h-2 bg-[var(--theme-accent)] rounded-full"></span>
          <span className="capitalize font-medium">{theme.currentTheme} Theme</span>
          <span>•</span>
          <span>{theme.isPersistent ? 'Saved' : 'Temporary'}</span>
        </div>
      </div>
    </div>
  );
}
