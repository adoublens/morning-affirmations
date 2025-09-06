'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';
import { Affirmation, Video, WelcomeMessage } from '@/types/content';

// Mock data for testing
const mockAffirmations: Affirmation[] = [
  {
    id: 'aff-1',
    text: 'I am grateful for this new day and all the opportunities it brings.',
    author: 'Test Author',
    category: 'gratitude',
    theme: ['peaceful', 'energetic'],
    mood: 'peaceful',
    imageUrl: '/images/affirmations/gratitude-1.jpg',
    useCount: 0,
    tags: ['gratitude', 'morning']
  },
  {
    id: 'aff-2',
    text: 'I am confident in my abilities and ready to tackle any challenge.',
    author: 'Test Author 2',
    category: 'confidence',
    theme: ['energetic', 'restorative'],
    mood: 'energetic',
    imageUrl: '/images/affirmations/confidence-1.jpg',
    useCount: 0,
    tags: ['confidence', 'strength']
  },
  {
    id: 'aff-3',
    text: 'I choose to focus on the positive and let go of what I cannot control.',
    author: 'Test Author 3',
    category: 'mindfulness',
    theme: ['peaceful', 'restorative'],
    mood: 'restorative',
    imageUrl: '/images/affirmations/mindfulness-1.jpg',
    useCount: 0,
    tags: ['mindfulness', 'peace']
  }
];

const mockVideos: Video[] = [
  {
    id: 'vid-1',
    title: 'Morning Yoga Flow',
    description: 'A gentle morning yoga flow to start your day',
    url: 'https://youtube.com/watch?v=test1',
    thumbnailUrl: '/images/videos/yoga-flow.jpg',
    duration: '15:30',
    category: 'yoga',
    theme: ['peaceful', 'restorative'],
    mood: 'peaceful',
    useCount: 0,
    tags: ['yoga', 'morning', 'flow']
  },
  {
    id: 'vid-2',
    title: 'High Energy Workout',
    description: 'An energizing workout to get your blood pumping',
    url: 'https://youtube.com/watch?v=test2',
    thumbnailUrl: '/images/videos/workout.jpg',
    duration: '20:00',
    category: 'workout',
    theme: ['energetic'],
    mood: 'energetic',
    useCount: 0,
    tags: ['workout', 'energy', 'fitness']
  },
  {
    id: 'vid-3',
    title: 'Meditation for Beginners',
    description: 'A simple meditation practice for beginners',
    url: 'https://youtube.com/watch?v=test3',
    thumbnailUrl: '/images/videos/meditation.jpg',
    duration: '10:00',
    category: 'meditation',
    theme: ['peaceful', 'restorative'],
    mood: 'restorative',
    useCount: 0,
    tags: ['meditation', 'mindfulness', 'calm']
  }
];

const mockWelcomeMessages: WelcomeMessage[] = [
  {
    id: 'msg-1',
    text: 'Good morning, peaceful soul',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['peaceful'],
    mood: 'peaceful',
    isActive: true
  },
  {
    id: 'msg-2',
    text: 'Welcome to a serene day',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['peaceful'],
    mood: 'peaceful',
    isActive: true
  },
  {
    id: 'msg-3',
    text: 'Good morning! Let\'s make today amazing!',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['energetic'],
    mood: 'energetic',
    isActive: true
  },
  {
    id: 'msg-4',
    text: 'Rise and shine!',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['energetic'],
    mood: 'energetic',
    isActive: true
  },
  {
    id: 'msg-5',
    text: 'Good morning, take time to nurture yourself',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['restorative'],
    mood: 'restorative',
    isActive: true
  },
  {
    id: 'msg-6',
    text: 'Welcome to your healing day',
    timeRange: { start: '06:00', end: '11:59' },
    theme: ['restorative'],
    mood: 'restorative',
    isActive: true
  }
];

export function ContentSelectorTest() {
  const { theme } = useTheme();
  const [selectedAffirmation, setSelectedAffirmation] = useState<Affirmation | null>(null);
  const [selectedVideos, setSelectedVideos] = useState<Map<string, Video>>(new Map());
  const [selectedMessage, setSelectedMessage] = useState<string>('');
  const [usageStats, setUsageStats] = useState<Record<string, { count: number; lastUsed: string[] }>>({});
  const [availableContent, setAvailableContent] = useState<{
    affirmations: number;
    videos: number;
    categories: Record<string, number>;
  } | null>(null);

  const selector = ContentSelector.getInstance();

  useEffect(() => {
    // Test content selection
    try {
      const affirmation = selector.selectAffirmation(mockAffirmations, theme.currentTheme);
      setSelectedAffirmation(affirmation);

      const videos = selector.selectVideos(mockVideos, theme.currentTheme);
      setSelectedVideos(videos);

      const message = selector.selectWelcomeMessage(mockWelcomeMessages, theme.currentTheme, new Date());
      setSelectedMessage(message);

      // Get usage statistics
      const stats = selector.getUsageStats();
      setUsageStats(stats);

      // Get available content
      const available = selector.getAvailableContent(mockAffirmations, mockVideos, theme.currentTheme);
      setAvailableContent(available);
    } catch (error) {
      console.error('Content selection error:', error);
    }
  }, [theme.currentTheme, selector]);

  const handleTestSelection = () => {
    try {
      const affirmation = selector.selectAffirmation(mockAffirmations, theme.currentTheme);
      setSelectedAffirmation(affirmation);

      const videos = selector.selectVideos(mockVideos, theme.currentTheme);
      setSelectedVideos(videos);

      const message = selector.selectWelcomeMessage(mockWelcomeMessages, theme.currentTheme, new Date());
      setSelectedMessage(message);

      // Update stats
      const stats = selector.getUsageStats();
      setUsageStats(stats);
    } catch (error) {
      console.error('Content selection error:', error);
    }
  };

  const handleClearHistory = () => {
    selector.clearUsageHistory();
    const stats = selector.getUsageStats();
    setUsageStats(stats);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Content Selector Test</h3>
      
      {/* Current Theme */}
      <div className="mb-4 p-3 bg-[var(--theme-primary)] rounded-lg">
        <strong>Current Theme:</strong> {theme.currentTheme}
      </div>

      {/* Available Content */}
      {availableContent && (
        <div className="mb-4 p-3 bg-[var(--theme-surface)] rounded-lg">
          <h4 className="font-semibold mb-2">Available Content:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>Affirmations: {availableContent.affirmations}</div>
            <div>Videos: {availableContent.videos}</div>
            {Object.entries(availableContent.categories).map(([category, count]) => (
              <div key={category}>{category}: {count}</div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Content */}
      <div className="space-y-4">
        {/* Welcome Message */}
        <div className="p-3 bg-[var(--theme-secondary)] rounded-lg">
          <h4 className="font-semibold mb-2">Welcome Message:</h4>
          <p className="text-[var(--theme-text-primary)]">"{selectedMessage}"</p>
        </div>

        {/* Selected Affirmation */}
        {selectedAffirmation && (
          <div className="p-3 bg-[var(--theme-primary)] rounded-lg">
            <h4 className="font-semibold mb-2">Selected Affirmation:</h4>
            <p className="text-[var(--theme-text-primary)] mb-2">"{selectedAffirmation.text}"</p>
            <div className="text-sm text-[var(--theme-text-secondary)]">
              <div>Author: {selectedAffirmation.author}</div>
              <div>Category: {selectedAffirmation.category}</div>
              <div>Themes: {selectedAffirmation.theme.join(', ')}</div>
            </div>
          </div>
        )}

        {/* Selected Videos */}
        {selectedVideos.size > 0 && (
          <div className="p-3 bg-[var(--theme-primary)] rounded-lg">
            <h4 className="font-semibold mb-2">Selected Videos:</h4>
            <div className="space-y-2">
              {Array.from(selectedVideos.entries()).map(([category, video]) => (
                <div key={category} className="text-sm">
                  <div className="font-medium">{category}: {video.title}</div>
                  <div className="text-[var(--theme-text-secondary)]">Duration: {video.duration}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Usage Statistics */}
      {Object.keys(usageStats).length > 0 && (
        <div className="mt-4 p-3 bg-[var(--theme-surface)] rounded-lg">
          <h4 className="font-semibold mb-2">Usage Statistics:</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(usageStats).map(([key, stats]) => (
              <div key={key}>
                <strong>{key}:</strong> {stats.count} items used, last: {stats.lastUsed.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={handleTestSelection}
          className="btn btn-primary px-4 py-2"
        >
          Test Selection
        </button>
        <button
          onClick={handleClearHistory}
          className="btn btn-secondary px-4 py-2"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}
