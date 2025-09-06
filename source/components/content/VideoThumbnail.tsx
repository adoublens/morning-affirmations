'use client';

import { useState } from 'react';
import Image from 'next/image';

interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoId: string;
  title: string;
}

export function VideoThumbnail({ thumbnailUrl, videoId, title }: VideoThumbnailProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <div className="mb-4">
        <div className="relative w-full h-48 bg-[var(--theme-secondary)] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-[var(--theme-text-secondary)]">
              <div className="w-16 h-16 mx-auto mb-3 bg-[var(--theme-accent)] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Video Thumbnail</p>
              <p className="text-xs opacity-75">Click to watch</p>
            </div>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-[var(--theme-secondary)] animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className={`relative overflow-hidden rounded-lg transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={`${title} video thumbnail`}
              width={400}
              height={300}
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            />
          ) : (
            <div className="w-full h-full bg-[var(--theme-secondary)] flex items-center justify-center">
              <div className="text-center text-[var(--theme-text-secondary)]">
                <div className="w-16 h-16 mx-auto mb-3 bg-[var(--theme-accent)] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Video Thumbnail</p>
                <p className="text-xs opacity-75">Click to watch</p>
              </div>
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200">
            <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
