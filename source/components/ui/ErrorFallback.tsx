'use client';

import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showDetails?: boolean;
  className?: string;
}

export function ErrorFallback({
  error,
  resetError,
  title = 'Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  showDetails = false,
  className = ''
}: ErrorFallbackProps) {
  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      // Fallback: reload the page
      window.location.reload();
    }
  };

  return (
    <div className={`
      flex flex-col items-center justify-center min-h-[400px] p-8 text-center
      bg-[var(--theme-surface)] border-2 border-[var(--theme-border)]
      rounded-[var(--border-radius)] shadow-[var(--shadow-lg)]
      ${className}
    `}>
      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--theme-accent)] bg-opacity-20 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-[var(--theme-accent)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
      </div>

      {/* Error Title */}
      <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-4">
        {title}
      </h2>

      {/* Error Message */}
      <p className="text-[var(--theme-text-secondary)] mb-6 max-w-md">
        {message}
      </p>

      {/* Error Details (if enabled and error exists) */}
      {showDetails && error && (
        <details className="mb-6 w-full max-w-2xl">
          <summary className="cursor-pointer text-[var(--theme-text-accent)] font-medium mb-2">
            Technical Details
          </summary>
          <div className="p-4 bg-[var(--theme-background)] rounded border text-left text-sm font-mono text-[var(--theme-text-secondary)] overflow-auto">
            <div className="mb-2">
              <strong>Error:</strong> {error.name}
            </div>
            <div className="mb-2">
              <strong>Message:</strong> {error.message}
            </div>
            {error.stack && (
              <div>
                <strong>Stack Trace:</strong>
                <pre className="mt-2 whitespace-pre-wrap text-xs">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        </details>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleRetry}
          className="btn btn-primary px-6 py-3"
          aria-label="Try again"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Try Again
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="btn btn-secondary px-6 py-3"
          aria-label="Go to home page"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
            />
          </svg>
          Go Home
        </button>
      </div>

      {/* Additional Help */}
      <div className="mt-8 text-sm text-[var(--theme-text-secondary)]">
        <p>
          If this problem persists, please{' '}
          <a 
            href="mailto:support@morningaffirmations.com" 
            className="text-[var(--theme-text-accent)] hover:underline"
          >
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// Simple error message component for smaller errors
export function ErrorMessage({
  message,
  onRetry,
  className = ''
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={`
      flex items-center justify-center p-4 bg-red-50 border border-red-200 
      rounded-[var(--border-radius)] text-red-700 ${className}
    `}>
      <svg 
        className="w-5 h-5 mr-2 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 text-red-600 hover:text-red-800 underline text-sm"
          aria-label="Retry"
        >
          Retry
        </button>
      )}
    </div>
  );
}
