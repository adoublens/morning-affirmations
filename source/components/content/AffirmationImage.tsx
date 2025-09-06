'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AffirmationImageProps {
  image: {
    filename: string;
    alt: string;
  };
  affirmationId: string;
}

export function AffirmationImage({ image, affirmationId }: AffirmationImageProps) {
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
      <div className="mb-8">
        <div className="w-full max-w-md mx-auto h-64 bg-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
          <div className="text-center text-[var(--theme-text-secondary)]">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--theme-accent)] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium">Image Unavailable</p>
            <p className="text-xs opacity-75">Beautiful affirmation awaits</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="relative w-full max-w-md mx-auto">
        {imageLoading && (
          <div className="absolute inset-0 bg-[var(--theme-secondary)] rounded-lg animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[var(--theme-accent)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className={`relative overflow-hidden rounded-lg shadow-lg transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}>
          <Image
            src={`/images/affirmations/${image.filename}`}
            alt={image.alt}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          
          {/* Image overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
