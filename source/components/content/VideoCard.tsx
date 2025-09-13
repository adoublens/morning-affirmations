'use client';

import { VideoThumbnail } from './VideoThumbnail';
import { VideoInfo } from './VideoInfo';
import { WatchButton } from './WatchButton';
import { Video } from '@/types/content';

interface VideoCardProps {
  video: Video;
  category: string;
}

export function VideoCard({ video, category }: VideoCardProps) {
  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      'affirmations': 'bg-purple-100 text-purple-800 border-purple-200',
      'bible': 'bg-blue-100 text-blue-800 border-blue-200',
      'yoga': 'bg-green-100 text-green-800 border-green-200',
      'meditation': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'artsy-creative': 'bg-pink-100 text-pink-800 border-pink-200',
    };
    
    return categoryColors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (category: string) => {
    const categoryIcons: { [key: string]: string } = {
      'affirmations': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      'bible': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'yoga': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      'meditation': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
      'artsy-creative': 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
    };
    
    return categoryIcons[category] || 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z';
  };

  return (
    <div className="video-card !mb-10 !p-5 bg-[var(--theme-primary)] border-2 border-[var(--theme-secondary)] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Video Thumbnail */}
        <div className="flex-shrink-0 md:w-80">
          <VideoThumbnail 
            thumbnail={video.thumbnail}
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex flex-col justify-between">
          {/* Category Badge */}
          <div className="mb-4">
            <div className={`inline-flex items-center !px-3 !py-1 rounded-full text-sm font-medium !border ${getCategoryColor(category)}`} style={{ fontFamily: 'var(--font-accent)' }}>
              <svg className="!w-4 !h-4 !mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d={getCategoryIcon(category)} clipRule="evenodd" />
              </svg>
              <span className="capitalize">{category.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Video Info */}
          <VideoInfo 
            video={video}
          />

          {/* Watch Button */}
          <div className="mt-4">
            <WatchButton 
              url={video.url}
              title={video.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
