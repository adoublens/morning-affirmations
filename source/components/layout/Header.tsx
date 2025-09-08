'use client';

import React, { useState } from 'react';
import { useTheme } from '@/components/theme/useTheme';

interface HeaderProps {
  className?: string;
  showThemeSwitcher?: boolean;
  showNavigation?: boolean;
}

export function Header({ 
  className = '', 
  showThemeSwitcher = true, 
  showNavigation = false 
}: HeaderProps) {
  const { theme, setTheme, togglePersistence, toggleRandom, getRandomTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const themes = [
    { id: 'peaceful', name: 'Peaceful', description: 'Calm and serene' },
    { id: 'energetic', name: 'Energetic', description: 'Vibrant and dynamic' },
    { id: 'restorative', name: 'Restorative', description: 'Healing and nurturing' }
  ];

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
  };

  const handleRandomTheme = () => {
    const randomTheme = getRandomTheme();
    setTheme(randomTheme.id);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`
      w-full bg-[var(--theme-surface)] border-b-2 border-[var(--theme-border)]
      shadow-[var(--shadow-md)] sticky top-0 z-50
      ${className}
    `}>
      <div className="container mx-auto px-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--theme-accent)] 
                          flex items-center justify-center shadow-[var(--shadow-sm)]">
              <svg 
                className="w-6 h-6 md:w-7 md:h-7 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-[var(--theme-text-primary)] 
                           font-[var(--font-heading)]">
                Morning Affirmations
              </h1>
              <p className="text-xs md:text-sm text-[var(--theme-text-secondary)] 
                          font-[var(--font-body)] hidden sm:block">
                Start your day with intention and purpose
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className=" p-2 rounded-lg text-[var(--theme-text-primary)] 
                     hover:bg-[var(--theme-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className=" border-t border-[var(--theme-border)] py-4">
            {showThemeSwitcher && (
              <div className="space-y-4">
                {/* Mobile Theme Buttons */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] mb-2">
                    Choose Theme
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {themes.map((themeItem) => (
                      <button
                        key={themeItem.id}
                        onClick={() => {
                          handleThemeChange(themeItem.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                          px-4 py-3 rounded-lg text-left font-medium transition-all duration-300
                          border-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]
                          ${theme.currentTheme === themeItem.id
                            ? 'bg-[var(--theme-accent)] text-white border-[var(--theme-accent)]'
                            : 'bg-[var(--theme-primary)] text-[var(--theme-text-primary)] border-[var(--theme-border)] hover:bg-[var(--theme-hover)]'
                          }
                        `}
                      >
                        <div className="font-semibold">{themeItem.name}</div>
                        <div className="text-xs opacity-80">{themeItem.description}</div>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        handleRandomTheme();
                        setIsMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 rounded-lg text-left font-medium transition-all duration-300
                               bg-[var(--theme-secondary)] text-[var(--theme-text-primary)] 
                               border-2 border-[var(--theme-border)] hover:bg-[var(--theme-hover)]
                               focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    >
                      <div className="font-semibold">🎲 Random Theme</div>
                      <div className="text-xs opacity-80">Let us choose for you</div>
                    </button>
                  </div>
                </div>

                {/* Mobile Theme Controls */}
                <div className="pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] mb-3">
                    Settings
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-[var(--theme-text-secondary)]">
                        Save theme selection
                      </span>
                      <input
                        type="checkbox"
                        checked={theme.isPersistent}
                        onChange={togglePersistence}
                        className="w-4 h-4 text-[var(--theme-accent)] bg-[var(--theme-primary)] 
                                 border-[var(--theme-border)] rounded focus:ring-[var(--theme-accent)]"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-[var(--theme-text-secondary)]">
                        Random theme mode
                      </span>
                      <input
                        type="checkbox"
                        checked={theme.isRandom}
                        onChange={toggleRandom}
                        className="w-4 h-4 text-[var(--theme-accent)] bg-[var(--theme-primary)] 
                                 border-[var(--theme-border)] rounded focus:ring-[var(--theme-accent)]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation (if enabled) */}
            {showNavigation && (
              <div className="pt-4 border-t border-[var(--theme-border)] mt-4">
                <nav className="space-y-2">
                  <a 
                    href="#affirmations" 
                    className="block px-4 py-2 text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover)] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Today's Affirmation
                  </a>
                  <a 
                    href="#videos" 
                    className="block px-4 py-2 text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover)] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Video Resources
                  </a>
                  <a 
                    href="#about" 
                    className="block px-4 py-2 text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover)] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </a>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

// Compact header variant for smaller spaces
export function CompactHeader({ className = '' }: { className?: string }) {
  const { theme, setTheme, getRandomTheme } = useTheme();

  const handleRandomTheme = () => {
    const randomTheme = getRandomTheme();
    setTheme(randomTheme.id);
  };

  return (
    <header className={`
      w-full bg-[var(--theme-surface)] border-b border-[var(--theme-border)]
      shadow-[var(--shadow-sm)] ${className}
    `}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-[var(--theme-text-primary)] font-[var(--font-heading)]">
              Morning Affirmations
            </h1>
          </div>
          <button
            onClick={handleRandomTheme}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-[var(--theme-secondary)] 
                     text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover)] 
                     transition-colors duration-200"
            title="Random theme"
          >
            🎲
          </button>
        </div>
      </div>
    </header>
  );
}
