'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';
import { VideoGrid } from './VideoGrid';
import { Video } from '@/types/content';

// Mock videos data for testing
const mockVideos = [
  {
    id: 'video-001',
    title: 'Powerful Positive Morning Affirmations ☀️ start your day w/ bright beautiful energy',
    description: 'Start your day with powerful positive affirmations to boost your energy and mindset',
    url: 'https://www.youtube.com/watch?v=uT6ASPy2Dbs',
    thumbnailUrl: '/images/videos/_1wjEs4iFEk-thumbnail.jpg',
    duration: '10:30',
    creator: 'Lavendaire',
    creatorChannel: 'https://www.youtube.com/@Lavendaire',
    category: 'artsy-creative',
    theme: ['energetic'],
    mood: 'energetic' as const,
    useCount: 0,
    thumbnail: {
      filename: '_1wjEs4iFEk-thumbnail.jpg',
      alt: 'Morning affirmations video thumbnail'
    },
    tags: ['morning', 'affirmations', 'positive', 'energy'],
    active: true
  },
  {
    id: 'AFezAAVFs1M',
    title: 'You Will See The Goodness Of The Lord | A Blessed Morning Prayer To Start Your Day',
    description: undefined,
    url: 'https://www.youtube.com/watch?v=AFezAAVFs1M',
    thumbnailUrl: '/images/videos/AFezAAVFs1M-thumbnail.jpg',
    duration: undefined,
    creator: 'Grace For Purpose Prayers',
    creatorChannel: 'https://www.youtube.com/@UCvu624igK22l4CVRn59pClA',
    category: 'bible',
    theme: ['restorative', 'peaceful', 'energetic'],
    mood: undefined,
    useCount: 0,
    thumbnail: {
      filename: 'AFezAAVFs1M-thumbnail.jpg',
      alt: 'Thumbnail for You Will See The Goodness Of The Lord | A Blessed Morning Prayer To Start Your Day'
    },
    tags: [
      'Meditation',
      'Christian',
      'Sleep',
      'Relaxation',
      'Godly',
      'Meditate',
      'Abide',
      'Peaceful',
      'Scriptures',
      'Bible Talkdown',
      'Sermon'
    ],
    active: true
  },
  {
    id: 'video-002',
    title: '45 min Yin Yoga for Tight Hips & Legs - LOWER BODY DEEP STRETCH',
    description: 'A deep stretch yoga practice for tight hips and legs to start your day with flexibility',
    url: 'https://www.youtube.com/watch?v=_h24enAaET4',
    thumbnailUrl: '/images/videos/_h24enAaET4-thumbnail.jpg',
    duration: '45:00',
    creator: 'Yoga with Kassandra',
    creatorChannel: 'https://www.youtube.com/@UCX32D3gKXENrhOXdZjWWtMA',
    category: 'yoga',
    theme: ['energetic', 'peaceful', 'restorative'],
    mood: 'peaceful' as const,
    useCount: 0,
    thumbnail: {
      filename: '_h24enAaET4-thumbnail.jpg',
      alt: 'Thumbnail for 45 min Yin Yoga for Tight Hips & Legs - LOWER BODY DEEP STRETCH'
    },
    tags: ['yoga with kassandra', 'yin yoga for hips', 'yin yoga deep stretch', 'morning yoga', 'flexibility'],
    active: true
  },
  {
    id: 'video-004',
    title: "#kinetic #artist Damien Bénéteau's hypnotic #sculpture - Spherical Variations - on display at HOFA",
    description: 'A mesmerizing kinetic sculpture that brings art and movement together for inspiration',
    url: 'https://www.youtube.com/watch?v=0mfd5qlJjGI',
    thumbnailUrl: '/images/videos/0mfd5qlJjGI-thumbnail.jpg',
    duration: '2:30',
    creator: 'HOFA Gallery',
    creatorChannel: 'https://www.youtube.com/@UCS323lnQprTegOIx8YNLcZA',
    category: 'artsy-creative',
    theme: ['peaceful', 'energetic', 'restorative'],
    mood: 'peaceful' as const,
    useCount: 0,
    thumbnail: {
      filename: '0mfd5qlJjGI-thumbnail.jpg',
      alt: "Thumbnail for #kinetic #artist Damien Bénéteau's hypnotic #sculpture - Spherical Variations - on display at HOFA"
    },
    tags: ['kinetic art', 'sculpture', 'inspiration', 'creativity', 'art'],
    active: true
  },
];

export function VideoGridTest() {
  const { theme } = useTheme();
  const [testResults, setTestResults] = useState<{
    [theme: string]: {
      selected: Map<string, any>;
      available: number;
      filtered: any[];
    };
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testVideos = () => {
      const results: any = {};
      const selector = ContentSelector.getInstance();

      // Test each theme
      const themes = ['peaceful', 'energetic', 'restorative'];
      
      themes.forEach(themeName => {
        try {
          // Get videos that match this theme
          const themeVideos = mockVideos.filter(video => 
            video.theme.includes(themeName) && video.active
          );
          
          // Select videos for this theme
          const selected = selector.selectVideos(mockVideos, themeName);
          
          results[themeName] = {
            selected,
            available: themeVideos.length,
            filtered: themeVideos
          };
        } catch (error) {
          results[themeName] = {
            selected: new Map(),
            available: 0,
            filtered: [],
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      setTestResults(results);
      setIsLoading(false);
    };

    testVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Video Grid Test</h3>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Video Grid Display */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Current Video Grid Display</h3>
        <VideoGrid videos={mockVideos} />
      </div>

      {/* Test Results by Theme */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Test Results by Theme</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(testResults).map(([themeName, result]) => (
            <div key={themeName} className="border border-[var(--theme-secondary)] rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 capitalize">{themeName} Theme</h4>
              
              {result.error ? (
                <div className="text-red-600 text-sm">
                  Error: {result.error}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Available: </span>
                    <span>{result.available} videos</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Selected: </span>
                    <span>{result.selected.size} categories</span>
                  </div>
                  
                  <div className="space-y-2">
                    {Array.from(result.selected.entries()).map(([category, video]) => (
                      <div key={category} className="text-xs">
                        <span className="font-medium capitalize">{category.replace('-', ' ')}: </span>
                        <span className="text-[var(--theme-text-secondary)]">
                          {video.creator} - {video.title.substring(0, 30)}...
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Themes: </span>
                    <span className="text-[var(--theme-text-secondary)]">
                      {result.filtered.map(video => video.theme.join(', ')).join('; ')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Videos Overview */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Available Videos Overview</h3>
        
        <div className="space-y-4">
          {mockVideos.map((video, index) => (
            <div key={video.id} className="border border-[var(--theme-secondary)] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{video.creator}</span>
                    <span className="text-xs px-2 py-1 bg-[var(--theme-secondary)] rounded-full">
                      {video.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--theme-text-secondary)] line-clamp-2">
                    {video.title}
                  </p>
                </div>
                {video.thumbnail && (
                  <div className="ml-4 w-16 h-16 bg-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--theme-accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-[var(--theme-text-secondary)]">
                <span>Themes:</span>
                <div className="flex space-x-1">
                  {video.theme.map(theme => (
                    <span key={theme} className="px-2 py-1 bg-[var(--theme-accent)] bg-opacity-20 rounded">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              
              {video.tags && video.tags.length > 0 && (
                <div className="flex items-center space-x-2 text-xs text-[var(--theme-text-secondary)] mt-2">
                  <span>Tags:</span>
                  <div className="flex space-x-1">
                    {video.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-[var(--theme-secondary)] rounded">
                        #{tag}
                      </span>
                    ))}
                    {video.tags.length > 3 && (
                      <span className="px-2 py-1 bg-[var(--theme-secondary)] rounded">
                        +{video.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Distribution Test */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Category Distribution Test</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {['motivation', 'inspiration', 'yoga', 'meditation', 'wellness'].map(category => {
            const categoryVideos = mockVideos.filter(video => 
              video.category === category && video.active
            );
            
            return (
              <div key={category} className="border border-[var(--theme-secondary)] rounded-lg p-4">
                <h4 className="font-semibold mb-2 capitalize">{category.replace('-', ' ')}</h4>
                <div className="text-sm text-[var(--theme-text-secondary)]">
                  <div className="mb-2">
                    <span className="font-medium">{categoryVideos.length}</span> videos available
                  </div>
                  <div className="space-y-1">
                    {categoryVideos.map(video => (
                      <div key={video.id} className="text-xs">
                        {video.creator}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
