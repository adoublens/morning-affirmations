'use client';

import { useState, useEffect } from 'react';
import { DataFetchingDisplay } from './DataFetchingDisplay';
import { LoadingSpinner } from '@/components/ui';

// Mock data for client-side testing
const mockContentData = {
  affirmations: [
    {
      id: 'mock-1',
      text: 'I am grateful for this new day and all the possibilities it brings.',
      author: 'Test Author',
      category: 'gratitude',
      themes: ['peaceful', 'energetic'],
      tags: ['gratitude', 'morning'],
      image: {
        filename: 'mock-image.jpg',
        alt: 'Mock affirmation image'
      },
      active: true
    }
  ],
  videos: [
    {
      id: 'mock-video-1',
      title: 'Mock Video Title',
      url: 'https://youtube.com/watch?v=mock',
      creator: 'Mock Creator',
      creatorChannel: 'https://youtube.com/@mock',
      category: 'meditation',
      themes: ['peaceful'],
      thumbnail: {
        filename: 'mock-thumbnail.jpg',
        alt: 'Mock video thumbnail'
      },
      tags: ['meditation', 'peaceful'],
      active: true
    }
  ],
  welcomeMessages: {
    themes: {
      peaceful: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning, peaceful soul', 'Welcome to a serene day']
          }
        ]
      },
      energetic: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning!', 'Let\'s make today amazing!']
          }
        ]
      },
      restorative: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning, thoughtful one', 'Welcome to a contemplative day']
          }
        ]
      }
    }
  },
  themes: [
    {
      id: 'peaceful',
      name: 'Peaceful',
      description: 'Calm and serene',
      colors: {
        primary: '#E8F4F8',
        secondary: '#B8E6B8',
        accent: '#87CEEB',
        text: '#2F4F4F',
        background: '#F0F8FF',
        backgroundTransition: '#E6F3FF'
      },
      fonts: {
        primary: 'Quicksand',
        secondary: 'Lora',
        accent: 'Dancing Script'
      },
      fontWeights: {
        primary: '300',
        secondary: '400',
        accent: '500'
      },
      transitions: {
        backgroundDuration: '3000',
        backgroundEasing: 'ease-in-out'
      },
      active: true
    }
  ],
  appConfig: {
    app: {
      name: 'Morning Affirmations',
      version: '1.0.0',
      description: 'Daily affirmations and wellness resources'
    },
    features: {
      themeSwitching: true,
      persistentThemes: true,
      randomization: true,
      offlineMode: false
    },
    ui: {
      defaultTheme: 'peaceful',
      autoThemeSwitch: false,
      animationSpeed: 'normal',
      showThumbnails: true,
      showTimestamps: false
    },
    performance: {
      maxRetries: 3,
      timeout: 5000
    }
  }
};

export function ClientDataFetcher() {
  const [contentData, setContentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContentData(mockContentData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="card max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Data Fetching Test</h3>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" text="Loading content data..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Data Fetching Test</h3>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h4 className="font-semibold mb-2">Error Loading Data:</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="card max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Data Fetching Test</h3>
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          <p>No content data available</p>
        </div>
      </div>
    );
  }

  return (
    <section className="section bg-[var(--theme-background)]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
          Data Fetching Test
        </h2>
        <DataFetchingDisplay contentData={contentData} />
      </div>
    </section>
  );
}
