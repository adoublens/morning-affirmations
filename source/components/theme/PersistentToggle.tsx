'use client';

interface PersistentToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function PersistentToggle({ 
  checked, 
  onChange, 
  className = '' 
}: PersistentToggleProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Toggle Switch */}
      <button
        onClick={handleToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:ring-offset-2
          ${checked 
            ? 'bg-[var(--theme-accent)]' 
            : 'bg-[var(--theme-secondary)]'
          }
        `}
        role="switch"
        aria-checked={checked}
        aria-label="Toggle theme persistence"
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>

      {/* Label */}
      <div className="flex flex-col">
        <span className={`
          text-sm font-medium transition-colors duration-300
          ${checked 
            ? 'text-[var(--theme-accent)]' 
            : 'text-[var(--theme-text-secondary)]'
          }
        `}>
          {checked ? 'Theme Saved' : 'Random Theme'}
        </span>
        <span className="text-xs text-[var(--theme-text-secondary)]">
          {checked 
            ? 'Your theme choice will be remembered' 
            : 'A new theme will be selected each time'
          }
        </span>
      </div>

      {/* Icon */}
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
        ${checked 
          ? 'bg-[var(--theme-accent)] bg-opacity-20' 
          : 'bg-[var(--theme-secondary)]'
        }
      `}>
        {checked ? (
          <svg 
            className="w-4 h-4 text-[var(--theme-accent)]" 
            fill="currentColor" 
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg 
            className="w-4 h-4 text-[var(--theme-text-secondary)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )}
      </div>
    </div>
  );
}
