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
  const { theme, setTheme, togglePersistence, toggleRandom, toggleLock, getRandomTheme } = useTheme();
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
         // Sunrise icon
         return (
          <svg {...iconProps}>
             <path d="M23,16a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,16Zm-5,5a1,1,0,0,0,0-2H6a1,1,0,0,0,0,2ZM7,12a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A5,5,0,0,0,7,12Zm4-7a1,1,0,0,0,2,0V4a1,1,0,0,0-2,0Zm7,7a1,1,0,0,0,1,1h1a1,1,0,0,0,0-2H19A1,1,0,0,0,18,12ZM4,11a1,1,0,0,0,0,2H5a1,1,0,0,0,0-2ZM5.636,5.636a1,1,0,0,0,0,1.414l.707.707A1,1,0,0,0,7.757,6.343L7.05,5.636A1,1,0,0,0,5.636,5.636Zm11.314,0-.707.707a1,1,0,1,0,1.414,1.414l.707-.707A1,1,0,1,0,16.95,5.636Z" fill="#ffffff"/>
          </svg>
        
        );
      
      case 'morning':
       // Coffee cup icon
       return (
        <svg {...iconProps}  viewBox="0 60 490 490">
 
        <g>
          <g>
            <path 
              fill="#ffffff" 
              stroke="#ffffff"  
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M410.301,133.26H10.521v103.866c0,60.187,28.217,113.902,72.113,148.627H10.521v21.041 C10.521,464.805,57.716,512,115.725,512h168.33c58.01,0,105.205-47.195,105.205-105.205v-21.041h-71.989 c23.489-18.581,42.485-42.598,55.072-70.137h37.958c50.276,0,91.178-40.902,91.178-91.178 C501.479,174.163,460.577,133.26,410.301,133.26z M343.573,427.836c-8.684,24.493-32.085,42.082-59.518,42.082h-168.33 c-27.432,0-50.832-17.589-59.517-42.082H343.573z M347.304,237.126c0,81.249-66.101,147.351-147.351,147.351 s-147.351-66.1-147.351-147.351v-61.784h294.702V237.126z M410.301,273.534h-24.44c2.305-11.787,3.525-23.956,3.525-36.408 v-61.784h20.915c27.071,0,49.096,22.024,49.096,49.096S437.373,273.534,410.301,273.534z"
            />
          </g>
          <g>
            <g>
              <rect x="136.767" width="42.082" height="91.178"/>
            </g>
          </g>
          <g>
            <g>
              <rect x="220.932" width="42.082" height="91.178"/>
            </g>
          </g>
        </g>
      
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
            <path d="M23,16a1,1,0,0,1-1,1H2a1,1,0,0,1,0-2H22A1,1,0,0,1,23,16Zm-5,3H6a1,1,0,0,0,0,2H18a1,1,0,0,0,0-2ZM3,12a1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9,9,0,0,0,3,12Z" fill="#ffffff"/>
          </svg>
        );
      
      case 'night':
        // Moon icon
        return (
          <svg {...iconProps}>
            <path d="M13.5 8H16.5L13.5 11H16.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M18 2H22L18 6H22" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" fill="#ffffff"/>
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
            <div className="flex flex-col !ml-4 !mt-4">
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

          {/* Lock Status & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {/* Lock Icon */}
            {/*theme.isLocked && (
              <div className="flex items-center space-x-1 text-[var(--theme-accent)] !pr-2" title="Content is locked">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
                <span className="text-xs font-medium hidden sm:inline">Locked</span>
              </div>
            )*/}
            
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
                        disabled={theme.isLocked}
                        className={`
                          !px-4 !py-3 rounded-lg text-left font-medium transition-all duration-300
                          border-2 focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]
                          ${theme.currentTheme === themeItem.id
                            ? 'bg-[var(--theme-accent)] text-white border-[var(--theme-accent)]'
                            : 'bg-[var(--theme-primary)] text-[var(--theme-text-primary)] border-[var(--theme-border)] hover:bg-[var(--theme-hover)]'
                          }
                          ${theme.isLocked ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        title={theme.isLocked ? 'Unlock content to change themes' : ''}
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
                      disabled={theme.isLocked}
                      className="!px-4 !py-3 rounded-lg text-left font-medium transition-all duration-300
                               bg-[var(--theme-primary)] text-[var(--theme-text-primary)] 
                               border-2 border-[var(--theme-border)] hover:bg-[var(--theme-hover)]
                               focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      title={theme.isLocked ? 'Unlock content to change themes' : ''}
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
                        disabled={theme.isLocked}
                        className="w-4 h-4 text-[var(--theme-accent)] bg-[var(--theme-primary)] 
                                 border-[var(--theme-border)] rounded focus:ring-[var(--theme-accent)]
                                 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={theme.isLocked}
                        className="w-4 h-4 text-[var(--theme-accent)] bg-[var(--theme-primary)] 
                                 border-[var(--theme-border)] rounded focus:ring-[var(--theme-accent)]
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-[var(--theme-text-secondary)]">
                        Lock content
                      </span>
                      <input
                        type="checkbox"
                        checked={theme.isLocked}
                        onChange={toggleLock}
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
