'use client';

import React from 'react';
import { useTheme } from '@/components/theme/useTheme';

interface LockBannerProps {
  className?: string;
}

export function LockBanner({ className = '' }: LockBannerProps) {
  const { theme, toggleLock } = useTheme();

  if (!theme.isLocked) {
    return null;
  }

  return (
    <div className={`
      w-full bg-[var(--theme-secondary)] text-white py-3 px-4
      border-b border-[var(--theme-border)] shadow-[var(--shadow-sm)]
      ${className}
    `}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center !space-x-1">
          <svg 
            className="w-5 h-5 [var(--text-primary)]" 
            fill="none" 
            stroke="var(--theme-text-primary)" 
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
          <div>
          <p className="text-sm font-medium !pt-3 !pl-3 !pr-3">
              Content is locked<br/>
              <span className="text-xs opacity-90">
              Theme, affirmations, and videos are static. Unlock in settings to enable changes.
            </span>
            </p>
          
          </div>
        </div>
        <button
          onClick={toggleLock}
          className="
            !px-3 !py-1 !text-xs !font-medium bg-[var(--theme-accent)] hover:bg-white/30
            rounded-lg transition-colors duration-200 focus:outline-none
            focus:ring-2 focus:ring-white/50
          "
          aria-label="Unlock content"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
