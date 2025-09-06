'use client';

import { Video } from '@/types/content';

interface VideoInfoProps {
  video: Video;
  category: string;
}

export function VideoInfo({ video, category }: VideoInfoProps) {
  return (
    <div className="mb-4">
      {/* Video Title */}
      <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2 line-clamp-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
        {video.title}
      </h3>
      
      {/* Creator Info */}
      {video.creator && (
        <div className="mb-3">
          <div className="flex items-center space-x-2 text-[var(--theme-text-secondary)]">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-body)' }}>{video.creator}</span>
          </div>
        </div>
      )}

      {/* Tags */}
      {video.tags && video.tags.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-[var(--theme-secondary)] text-[var(--theme-text-secondary)] rounded-full border border-[var(--theme-accent)] opacity-75"
              >
                #{tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--theme-secondary)] text-[var(--theme-text-secondary)] rounded-full border border-[var(--theme-accent)] opacity-75">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Duration/Status Info */}
      <div className="flex items-center justify-between text-xs text-[var(--theme-text-secondary)]">
        <div className="flex items-center space-x-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Video</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="capitalize">{category.replace('-', ' ')}</span>
        </div>
      </div>
    </div>
  );
}
