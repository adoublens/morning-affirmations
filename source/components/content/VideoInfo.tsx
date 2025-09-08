'use client';

import { Video } from '@/types/content';

interface VideoInfoProps {
  video: Video;
  category: string;
}

export function VideoInfo({ video, category }: VideoInfoProps) {
  return (
    <div className="mb-0">
      {/* Video Title */}
      <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-3 line-clamp-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
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
    </div>
  );
}
