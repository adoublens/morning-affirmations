'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-20 w-20',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div 
        className={`
          animate-spin rounded-full border-4 border-transparent
          border-t-[var(--theme-accent)] border-r-[var(--theme-accent)]
          ${sizeClasses[size]}
        `}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {text && (
        <p className={`mt-4 text-[var(--theme-text-secondary)] ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Alternative spinner with dots animation
export function LoadingDots({ 
  text = 'Loading...', 
  className = '' 
}: Omit<LoadingSpinnerProps, 'size'>) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="flex space-x-2" role="status" aria-label="Loading">
        <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      {text && (
        <p className="mt-4 text-[var(--theme-text-secondary)] text-base">
          {text}
        </p>
      )}
    </div>
  );
}

// Pulse loading animation
export function LoadingPulse({ 
  text = 'Loading...', 
  className = '' 
}: Omit<LoadingSpinnerProps, 'size'>) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div 
        className="w-12 h-12 bg-[var(--theme-accent)] rounded-full animate-pulse"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {text && (
        <p className="mt-4 text-[var(--theme-text-secondary)] text-base">
          {text}
        </p>
      )}
    </div>
  );
}
