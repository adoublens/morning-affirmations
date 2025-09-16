'use client';

import React from 'react';

interface ContentUnavailableErrorProps {
  className?: string;
  onRefresh?: () => void;
}

export function ContentUnavailableError({ 
  className = '', 
  onRefresh 
}: ContentUnavailableErrorProps) {
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`
      p-6 text-center bg-[var(--theme-surface)] border-2 border-[var(--theme-border)]
      rounded-lg shadow-[var(--shadow-sm)]
      ${className}
    `}>
      <div className="mb-4">
        <svg 
          className="w-12 h-12 mx-auto text-[var(--theme-text-secondary)] mb-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
        <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2">
          Content No Longer Available
        </h3>
        <p className="text-[var(--theme-text-secondary)] mb-4">
          This content is no longer available. Please refresh to get new content.
        </p>
      </div>
      
      <button
        onClick={handleRefresh}
        className="
          px-4 py-2 bg-[var(--theme-accent)] text-white font-medium
          rounded-lg hover:bg-[var(--theme-accent)]/90 transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]/50
        "
      >
        Refresh Content
      </button>
    </div>
  );
}
