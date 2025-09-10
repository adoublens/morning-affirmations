'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';
import { AffirmationImage } from './AffirmationImage';
import { AffirmationText } from './AffirmationText';
import { AffirmationAuthor } from './AffirmationAuthor';
import { AffirmationCategory } from './AffirmationCategory';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Affirmation } from '@/types/content';

interface AffirmationsDisplayProps {
  affirmations: Affirmation[];
}

export function AffirmationsDisplay({ affirmations }: AffirmationsDisplayProps) {
  const { theme } = useTheme();
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const selectAffirmation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!affirmations || affirmations.length === 0) {
          throw new Error('No affirmations available');
        }

        const selector = ContentSelector.getInstance();
        const selected = selector.selectAffirmation(affirmations, theme.currentTheme);
        
        setCurrentAffirmation(selected);
      } catch (err) {
        console.error('Error selecting affirmation:', err);
        setError(err instanceof Error ? err.message : 'Failed to load affirmation');
      } finally {
        setIsLoading(false);
      }
    };

    selectAffirmation();
  }, [affirmations, theme.currentTheme, retryCount]);

  if (isLoading) {
    return (
      <section className="affirmations-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner size="lg" text="Loading your affirmation..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="affirmations-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Unable to Load Affirmation
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => setRetryCount(prev => prev + 1)}
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

  if (!currentAffirmation) {
    return (
      <section className="affirmations-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Affirmation Available
              </h3>
              <p className="text-gray-600">
                We couldn't find an affirmation for your current theme. Please try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="affirmations-section">
      <div className="container mx-auto px-4 !mb-10">
        <div className="max-w-4xl mx-auto">

          {/* Main Affirmation Card */}
          <div className="bg-[var(--theme-primary)] border-2 border-[var(--theme-secondary)] rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center space-y-8">
              {/* Affirmation Image - Always show an image */}
              <AffirmationImage 
                image={{ 
                  filename: currentAffirmation.imageUrl || '', 
                  alt: `Affirmation ${currentAffirmation.id}` 
                }}
                affirmationId={currentAffirmation.id}
              />

              {/* Affirmation Text */}
              <AffirmationText 
                text={currentAffirmation.text}
                category={currentAffirmation.category}
              />

              {/* Author */}
              <AffirmationAuthor 
                author={currentAffirmation.author}
                category={currentAffirmation.category}
              />

              {/* Category Badge */}
              <AffirmationCategory 
                category={currentAffirmation.category}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
