'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';
import { VideoCard } from './VideoCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Video } from '@/types/content';

interface VideoGridProps {
  videos: Video[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  const { theme } = useTheme();
  const [selectedVideos, setSelectedVideos] = useState<Map<string, Video>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!videos || videos.length === 0) {
          throw new Error('No videos available');
        }

        const selector = ContentSelector.getInstance();
        const selected = selector.selectVideos(videos, theme.currentTheme);
        
        setSelectedVideos(selected);
      } catch (err) {
        console.error('Error selecting videos:', err);
        setError(err instanceof Error ? err.message : 'Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    selectVideos();
  }, [videos, theme.currentTheme]);

  if (isLoading) {
    return (
      <section className="video-grid-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <LoadingSpinner size="lg" text="Loading today's videos..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="video-grid-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Unable to Load Videos
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = ['yoga', 'bible', 'artsy-creative'];

  return (
    <section className="video-grid-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Today's Resources
            </h2>
            <p className="text-lg text-[var(--theme-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
              Curated videos to inspire and guide your journey
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => {
              const video = selectedVideos.get(category);
              if (!video) return null;

              return (
                <VideoCard
                  key={category}
                  video={video}
                  category={category}
                />
              );
            })}
          </div>

          {/* Theme Info */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-sm text-[var(--theme-text-secondary)]">
              <span className="w-2 h-2 bg-[var(--theme-accent)] rounded-full"></span>
              <span className="capitalize">{theme.currentTheme} Theme</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
