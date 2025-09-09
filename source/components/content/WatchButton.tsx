'use client';

interface WatchButtonProps {
  url: string;
  title: string;
}

export function WatchButton({ url, title }: WatchButtonProps) {
  const handleWatchClick = () => {
    // Open in new tab
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleWatchClick}
      className="w-full bg-[var(--theme-accent)] text-[var(--theme-text-primary)] font-semibold !py-3 !px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 group"
      aria-label={`Watch video: ${title}`}
    >
      <svg 
        className="!w-5 !h-5 !mr-2 group-hover:scale-110 transition-transform duration-200" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
      </svg>
      <span>Watch Video</span>
      
    </button>
  );
}
