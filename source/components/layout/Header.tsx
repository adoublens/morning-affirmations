'use client';

import React, { useState, useEffect } from 'react';
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
  const [currentTimeRange, setCurrentTimeRange] = useState<string>('afternoon');

  // Get time range based on current hour (same logic as ContentSelector)
  const getTimeRange = (hour: number): string => {
    if (hour >= 5 && hour < 9) return 'early-morning';
    if (hour >= 9 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  // Update time range on mount and every minute
  useEffect(() => {
    const updateTimeRange = () => {
      const now = new Date();
      const timeRange = getTimeRange(now.getHours());
      setCurrentTimeRange(timeRange);
    };

    // Update immediately
    updateTimeRange();

    // Update every minute
    const interval = setInterval(updateTimeRange, 60000);

    return () => clearInterval(interval);
  }, []);

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

  // Get SVG icon based on time range
  const getTimeBasedIcon = (timeRange: string) => {
    const iconProps = {
      className: "w-6 h-6 md:w-7 md:h-7 text-white",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      "aria-hidden": true
    };

    switch (timeRange) {
      case 'early-morning':
        // Coffee cup icon
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v4" 
            />
          </svg>
        );
      
      case 'morning':
        // Sunrise icon
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12h2m14 0h2M12 3v2m0 14v2" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6.343 6.343l1.414 1.414m8.485 0l1.414-1.414M6.343 17.657l1.414-1.414m8.485 0l1.414 1.414" 
            />
          </svg>
        );
      
      case 'afternoon':
        // Sun icon (current)
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        );
      
      case 'evening':
        // Sunset icon
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12h2m14 0h2M12 3v2m0 14v2" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6.343 6.343l1.414 1.414m8.485 0l1.414-1.414M6.343 17.657l1.414-1.414m8.485 0l1.414 1.414" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M2 12h20M4 12h16M6 12h12M8 12h8" 
            />
          </svg>
        );
      
      case 'night':
        // Moon icon
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1" 
            />
          </svg>
        );
      
      default:
        // Default sun icon
        return (
          <svg {...iconProps}>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        );
    }
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
          <div className="flex items-center space-x-5">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--theme-accent)] 
                          flex items-center justify-center shadow-[var(--shadow-sm)]">
              {getTimeBasedIcon(currentTimeRange)}
            </div>
            <div className="flex flex-col !ml-4">
              <h1 className="text-xl md:text-2xl font-bold text-[var(--theme-text-primary)] 
                           font-[var(--font-heading)] mb-0">
                Daily Affirmations
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
          <div className=" !mb-8 border-t border-[var(--theme-border)] py-4">
            {showThemeSwitcher && (
              <div className="space-y-4">
                {/* Mobile Theme Buttons */}
                <div className="space-y-2 !pt-4">
                  <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] !mb-3">
                    Choose Your Theme <span className="text-xs text-[var(--theme-text-secondary)]">(current theme is &apos;{theme.currentTheme}&apos;)</span>
                  </h3>
                  <div className="grid grid-cols-1 !gap-2">
                    {themes.map((themeItem) => (
                      <button
                        key={themeItem.id}
                        onClick={() => {
                          handleThemeChange(themeItem.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                          !px-4 !py-3 rounded-lg text-left font-medium transition-all duration-300
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
                      className="!px-4 !py-3 rounded-lg text-left font-medium transition-all duration-300
                               bg-[var(--theme-primary)] text-[var(--theme-text-primary)] 
                               border-2 border-[var(--theme-border)] hover:bg-[var(--theme-hover)]
                               focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
                    >
                      <div className="font-semibold">Random Theme 🎲 </div>
                      <div className="text-xs opacity-80">Let us choose for you</div>
                    </button>
                  </div>
                </div>

                {/* Mobile Theme Controls */}
                <div className="!pt-4 border-t border-[var(--theme-border)]">
                  <h3 className="text-sm font-semibold text-[var(--theme-text-primary)] !mb-3">
                    Settings
                  </h3>
                  <div className="!space-y-3">
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
                    Today&apos;s Affirmation
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
  const { setTheme, getRandomTheme } = useTheme();

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
            Daily Affirmations
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
