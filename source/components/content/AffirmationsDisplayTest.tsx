'use client';

import { useState, useEffect } from 'react';
import { ContentSelector } from '@/lib/content/contentSelector';
import { AffirmationsDisplay } from './AffirmationsDisplay';
import { Affirmation } from '@/types/content';

// Mock affirmations data for testing
const mockAffirmations: Affirmation[] = [
  {
    id: 'affirmation-001',
    text: 'Gratitude, peace, and joy are ways that God communicates with us. During these times, we are feeling a real connection with God, though we might not initially identify it as such.',
    author: 'Faith',
    category: 'gratitude',
    mood: 'peaceful',
    imageUrl: 'spiritual-connection.jpg',
    useCount: 0
  },
  {
    id: 'affirmation-002',
    text: 'I am worthy of love, respect, and all the good things life has to offer. My self-worth comes from within and cannot be diminished by external circumstances.',
    author: 'Self-Love',
    category: 'self-love',
    mood: 'peaceful',
    imageUrl: 'self-worth.jpg',
    useCount: 0
  },
  {
    id: 'affirmation-003',
    text: 'I am confident in my abilities and trust in my capacity to overcome any challenge. Every obstacle is an opportunity for growth and learning.',
    author: 'Confidence',
    category: 'confidence',
    mood: 'energetic',
    imageUrl: 'confidence-growth.jpg',
    useCount: 0
  },
  {
    id: 'affirmation-004',
    text: 'I am a creative being with unlimited potential. My imagination is a powerful tool that helps me manifest my dreams into reality.',
    author: 'Creativity',
    category: 'creativity',
    mood: 'energetic',
    imageUrl: 'creativity-manifestation.jpg',
    useCount: 0
  },
  {
    id: 'affirmation-005',
    text: 'I attract abundance and prosperity into my life through positive thinking and aligned action. Money flows to me easily and effortlessly.',
    author: 'Wealth',
    category: 'gratitude',
    mood: 'energetic',
    imageUrl: 'abundance-prosperity.jpg',
    useCount: 0
  }
];

export function AffirmationsDisplayTest() {
  const [testResults, setTestResults] = useState<{
    [theme: string]: {
      selected: Affirmation | null;
      available: number;
      filtered: Affirmation[];
      error?: string;
    };
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const testAffirmations = () => {
      const results: { [theme: string]: { selected: Affirmation | null; available: number; filtered: Affirmation[]; error?: string } } = {};
      const selector = ContentSelector.getInstance();

      // Test each theme
      const themes = ['peaceful', 'energetic', 'restorative'];
      
      themes.forEach(themeName => {
        try {
          // Since affirmations no longer have themes, all affirmations are available
          const availableAffirmations = mockAffirmations;
          
          // Select one affirmation for this theme
          const selected = selector.selectAffirmation(mockAffirmations);
          
          results[themeName] = {
            selected,
            available: availableAffirmations.length,
            filtered: availableAffirmations
          };
        } catch (error) {
          results[themeName] = {
            selected: null,
            available: 0,
            filtered: [],
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      setTestResults(results);
      setIsLoading(false);
    };

    testAffirmations();
  }, []);

  if (isLoading) {
    return (
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Affirmations Display Test</h3>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Affirmations Display */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Current Affirmation Display</h3>
        <AffirmationsDisplay affirmations={mockAffirmations} />
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
                    <span>{result.available} affirmations</span>
                  </div>
                  
                  {result.selected && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Selected: </span>
                        <span className="text-[var(--theme-text-secondary)]">
                          {result.selected.author} - {result.selected.category}
                        </span>
                      </div>
                      
                      <div className="text-xs text-[var(--theme-text-secondary)] line-clamp-3">
                        &ldquo;{result.selected.text}&rdquo;
                      </div>
                    </div>
                  )}
                  
                  <div className="text-sm">
                    <span className="font-medium">Available: </span>
                    <span className="text-[var(--theme-text-secondary)]">
                      {result.available} affirmations
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Affirmations Overview */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Available Affirmations Overview</h3>
        
        <div className="space-y-4">
          {mockAffirmations.map((affirmation) => (
            <div key={affirmation.id} className="border border-[var(--theme-secondary)] rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-sm">{affirmation.author}</span>
                    <span className="text-xs px-2 py-1 bg-[var(--theme-secondary)] rounded-full">
                      {affirmation.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--theme-text-secondary)] line-clamp-2">
                    {affirmation.text}
                  </p>
                </div>
                {affirmation.image && (
                  <div className="ml-4 w-16 h-16 bg-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--theme-accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* Theme Filtering Test */}
      <div className="card max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Theme Filtering Test</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['peaceful', 'energetic', 'restorative'].map(themeName => {
          // Since affirmations no longer have themes, all affirmations are available
          const availableAffirmations = mockAffirmations;
            
            return (
              <div key={themeName} className="border border-[var(--theme-secondary)] rounded-lg p-4">
                <h4 className="font-semibold mb-2 capitalize">{themeName} Theme</h4>
                <div className="text-sm text-[var(--theme-text-secondary)]">
                  <div className="mb-2">
                    <span className="font-medium">{availableAffirmations.length}</span> affirmations available
                  </div>
                  <div className="space-y-1">
                    {availableAffirmations.slice(0, 3).map(aff => (
                      <div key={aff.id} className="text-xs">
                        {aff.author} - {aff.category}
                      </div>
                    ))}
                    {availableAffirmations.length > 3 && (
                      <div className="text-xs text-[var(--theme-accent)]">
                        ...and {availableAffirmations.length - 3} more
                      </div>
                    )}
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
