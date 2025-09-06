'use client';

import { useState } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { LoadingSpinner, ErrorBoundary, ErrorFallback } from '@/components/ui';
import { Header } from '@/components/layout';
import { ThemeContextTest } from '@/components/layout/ThemeContextTest';
import { ContentSelectorTest } from '@/components/content/ContentSelectorTest';
import { ClientDataFetcher } from '@/components/content/ClientDataFetcher';
import { WelcomeMessage } from '@/components/content/WelcomeMessage';
import { WelcomeMessageTest } from '@/components/content/WelcomeMessageTest';
import { AffirmationsDisplay } from '@/components/content/AffirmationsDisplay';
import { AffirmationsDisplayTest } from '@/components/content/AffirmationsDisplayTest';
import { VideoGrid } from '@/components/content/VideoGrid';
import { VideoGridTest } from '@/components/content/VideoGridTest';
import { ErrorTestComponent } from '@/components/content/ErrorTestComponent';

// Mock welcome message data for testing
const mockWelcomeData = {
  themes: {
    peaceful: {
      timeRanges: [
        {
          id: 'early-morning',
          startTime: '05:00',
          endTime: '08:59',
          messages: [
            'Good morning, gentle soul',
            'Welcome to a peaceful new day',
            'Rise slowly, breathe deeply',
            'Good morning, peaceful one',
            'Hello, tranquil morning'
          ]
        },
        {
          id: 'morning',
          startTime: '09:00',
          endTime: '11:59',
          messages: [
            'Good morning, peaceful soul',
            'Hello, serene morning',
            'Morning peace to you',
            'Good morning, calm spirit',
            'Welcome to your peaceful morning'
          ]
        },
        {
          id: 'afternoon',
          startTime: '12:00',
          endTime: '16:59',
          messages: [
            'Good afternoon, peaceful one',
            'Hello, tranquil afternoon',
            'Afternoon peace to you',
            'Good afternoon, serene soul',
            'Welcome to your peaceful afternoon'
          ]
        },
        {
          id: 'evening',
          startTime: '17:00',
          endTime: '20:59',
          messages: [
            'Good evening, peaceful soul',
            'Hello, gentle evening',
            'Evening peace to you',
            'Good evening, tranquil one',
            'Welcome to your peaceful evening'
          ]
        },
        {
          id: 'night',
          startTime: '21:00',
          endTime: '04:59',
          messages: [
            'Good night, peaceful one',
            'Hello, gentle night',
            'Night peace to you',
            'Good night, serene soul',
            'Welcome to your peaceful night'
          ]
        }
      ]
    },
    energetic: {
      timeRanges: [
        {
          id: 'early-morning',
          startTime: '05:00',
          endTime: '08:59',
          messages: [
            'Good morning early bird!',
            'Rise and shine, beautiful soul!',
            'Welcome to a brand new day!',
            'Good morning, world!',
            'Hello, sunshine!'
          ]
        },
        {
          id: 'morning',
          startTime: '09:00',
          endTime: '11:59',
          messages: [
            'Good morning!',
            'Hello, beautiful day!',
            'Morning blessings to you!',
            'Good morning, amazing person!',
            'Welcome to your morning!'
          ]
        },
        {
          id: 'afternoon',
          startTime: '12:00',
          endTime: '16:59',
          messages: [
            'Good afternoon!',
            'Hello, afternoon!',
            'Afternoon blessings!',
            'Good afternoon, wonderful soul!',
            'Welcome to your afternoon!'
          ]
        },
        {
          id: 'evening',
          startTime: '17:00',
          endTime: '20:59',
          messages: [
            'Good evening!',
            'Hello, evening!',
            'Evening blessings!',
            'Good evening, amazing soul!',
            'Welcome to your evening!'
          ]
        },
        {
          id: 'night',
          startTime: '21:00',
          endTime: '04:59',
          messages: [
            'Good night!',
            'Hello, night!',
            'Night blessings!',
            'Good night, wonderful soul!',
            'Welcome to your night!'
          ]
        }
      ]
    },
    restorative: {
      timeRanges: [
        {
          id: 'early-morning',
          startTime: '05:00',
          endTime: '08:59',
          messages: [
            'Good morning, thoughtful one',
            'Welcome to a contemplative day',
            'Rise with purpose, gentle soul',
            'Good morning, reflective spirit',
            'Hello, mindful morning'
          ]
        },
        {
          id: 'morning',
          startTime: '09:00',
          endTime: '11:59',
          messages: [
            'Good morning, contemplative soul',
            'Hello, thoughtful morning',
            'Morning reflection to you',
            'Good morning, mindful one',
            'Welcome to your restorative morning'
          ]
        },
        {
          id: 'afternoon',
          startTime: '12:00',
          endTime: '16:59',
          messages: [
            'Good afternoon, thoughtful one',
            'Hello, contemplative afternoon',
            'Afternoon reflection to you',
            'Good afternoon, mindful soul',
            'Welcome to your restorative afternoon'
          ]
        },
        {
          id: 'evening',
          startTime: '17:00',
          endTime: '20:59',
          messages: [
            'Good evening, contemplative soul',
            'Hello, thoughtful evening',
            'Evening reflection to you',
            'Good evening, mindful one',
            'Welcome to your restorative evening'
          ]
        },
        {
          id: 'night',
          startTime: '21:00',
          endTime: '04:59',
          messages: [
            'Good night, thoughtful one',
            'Hello, contemplative night',
            'Night reflection to you',
            'Good night, mindful soul',
            'Welcome to your restorative night'
          ]
        }
      ]
    }
  }
};

// Mock affirmations data for testing
const mockAffirmations = [
  {
    id: 'affirmation-001',
    text: 'Gratitude, peace, and joy are ways that God communicates with us. During these times, we are feeling a real connection with God, though we might not initially identify it as such.',
    author: 'Faith',
    category: 'spiritual',
    theme: ['peaceful', 'energetic'],
    tags: ['gratitude', 'peace', 'joy', 'faith', 'connection'],
    image: {
      filename: 'spiritual-connection.jpg',
      alt: 'Peaceful spiritual connection'
    },
    active: true
  },
  {
    id: 'affirmation-002',
    text: 'I am worthy of love, respect, and all the good things life has to offer. My self-worth comes from within and cannot be diminished by external circumstances.',
    author: 'Self-Love',
    category: 'self-esteem',
    theme: ['peaceful', 'restorative'],
    tags: ['self-worth', 'love', 'respect', 'inner-strength'],
    image: {
      filename: 'self-worth.jpg',
      alt: 'Self-worth and inner strength'
    },
    active: true
  },
  {
    id: 'affirmation-003',
    text: 'I am confident in my abilities and trust in my capacity to overcome any challenge. Every obstacle is an opportunity for growth and learning.',
    author: 'Confidence',
    category: 'confidence',
    theme: ['energetic', 'restorative'],
    tags: ['confidence', 'growth', 'challenges', 'learning'],
    image: {
      filename: 'confidence-growth.jpg',
      alt: 'Confidence and personal growth'
    },
    active: true
  },
  {
    id: 'affirmation-004',
    text: 'I am a creative being with unlimited potential. My imagination is a powerful tool that helps me manifest my dreams into reality.',
    author: 'Creativity',
    category: 'creativity',
    theme: ['energetic', 'peaceful'],
    tags: ['creativity', 'imagination', 'dreams', 'manifestation'],
    image: {
      filename: 'creativity-manifestation.jpg',
      alt: 'Creative expression and manifestation'
    },
    active: true
  },
  {
    id: 'affirmation-005',
    text: 'I attract abundance and prosperity into my life through positive thinking and aligned action. Money flows to me easily and effortlessly.',
    author: 'Wealth',
    category: 'wealth',
    theme: ['energetic', 'restorative'],
    tags: ['abundance', 'prosperity', 'money', 'positive-thinking'],
    image: {
      filename: 'abundance-prosperity.jpg',
      alt: 'Abundance and prosperity'
    },
    active: true
  }
];

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
    category: 'motivation' as const,
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
    id: 'video-002',
    title: '45 min Yin Yoga for Tight Hips & Legs - LOWER BODY DEEP STRETCH',
    description: 'A deep stretch yoga practice for tight hips and legs to start your day with flexibility',
    url: 'https://www.youtube.com/watch?v=_h24enAaET4',
    thumbnailUrl: '/images/videos/_h24enAaET4-thumbnail.jpg',
    duration: '45:00',
    creator: 'Yoga with Kassandra',
    creatorChannel: 'https://www.youtube.com/@UCX32D3gKXENrhOXdZjWWtMA',
    category: 'yoga' as const,
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
    id: 'video-003',
    title: '15 min Morning Yin Yoga Stretch - NO PROPS (with Luna!)',
    description: 'A gentle morning yoga stretch perfect for starting your day with energy and flexibility',
    url: 'https://www.youtube.com/watch?v=-JuN7kZbbvg',
    thumbnailUrl: '/images/videos/-JuN7kZbbvg-thumbnail.jpg',
    duration: '15:00',
    creator: 'Yoga with Kassandra',
    creatorChannel: 'https://www.youtube.com/@UCX32D3gKXENrhOXdZjWWtMA',
    category: 'yoga' as const,
    theme: ['energetic'],
    mood: 'energetic' as const,
    useCount: 0,
    thumbnail: {
      filename: '-JuN7kZbbvg-thumbnail.jpg',
      alt: 'Thumbnail for 15 min Morning Yin Yoga Stretch - NO PROPS (with Luna!)'
    },
    tags: ['yoga with kassandra', 'full body stretch yoga', 'static stretching', 'morning yoga', 'yin yoga'],
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
    category: 'wellness' as const,
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
  {
    id: 'video-005',
    title: '20 min Morning Yin Yoga - Wake up & STRETCH! (NO PROPS)',
    description: 'A gentle morning yoga practice to wake up and stretch your body without props',
    url: 'https://www.youtube.com/watch?v=0StlPV3X_2I',
    thumbnailUrl: '/images/videos/0StlPV3X_2I-thumbnail.jpg',
    duration: '20:00',
    creator: 'Yoga with Kassandra',
    creatorChannel: 'https://www.youtube.com/@UCX32D3gKXENrhOXdZjWWtMA',
    category: 'yoga' as const,
    theme: ['peaceful'],
    mood: 'peaceful' as const,
    useCount: 0,
    thumbnail: {
      filename: '0StlPV3X_2I-thumbnail.jpg',
      alt: 'Thumbnail for 20 min Morning Yin Yoga - Wake up & STRETCH! (NO PROPS)'
    },
    tags: ['yoga with kassandra', 'static stretching', 'yin yoga', 'morning yoga', 'yoga for beginners'],
    active: true
  }
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header showThemeSwitcher={true} showNavigation={false} />

      {/* Welcome Section */}
      <section className="section bg-[var(--theme-background)]">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 text-[var(--theme-text-primary)]">
            Morning Affirmations
          </h1>
          <p className="text-xl md:text-2xl text-center text-[var(--theme-text-secondary)] mb-8">
            Start your day with intention and purpose
          </p>
        </div>
      </section>

      {/* Welcome Message Component */}
      <WelcomeMessage data={mockWelcomeData} />

      {/* Affirmations Display Component */}
      <AffirmationsDisplay affirmations={mockAffirmations} />

      {/* Video Grid Component */}
      <VideoGrid videos={mockVideos} />

      {/* Theme Preview Section */}
      <section className="section bg-[var(--theme-primary)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
            Current Theme: {theme.currentTheme}
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-[var(--theme-text-secondary)] mb-4">
              Theme persistence: {theme.isPersistent ? 'Enabled' : 'Disabled'}
            </p>
            <p className="text-lg text-[var(--theme-text-secondary)] mb-4">
              Random mode: {theme.isRandom ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
      </section>

      {/* Font Demonstration Section */}
      <section className="section bg-[var(--theme-background)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
            Typography Preview
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 text-[var(--theme-text-primary)]" style={{ fontFamily: 'var(--font-primary)' }}>
                Primary Font - {theme.currentTheme === 'peaceful' ? 'Quicksand' : theme.currentTheme === 'energetic' ? 'Poppins' : 'Merriweather'}
              </h3>
              <p className="text-lg text-[var(--theme-text-secondary)]" style={{ fontFamily: 'var(--font-secondary)' }}>
                Secondary Font - {theme.currentTheme === 'peaceful' ? 'Lora' : theme.currentTheme === 'energetic' ? 'Open Sans' : 'Source Sans Pro'}
              </p>
              <p className="text-xl text-[var(--theme-accent)]" style={{ fontFamily: 'var(--font-accent)' }}>
                Accent Font - {theme.currentTheme === 'peaceful' ? 'Dancing Script' : theme.currentTheme === 'energetic' ? 'Pacifico' : 'Playfair Display'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Variables Demo */}
      <section className="section bg-[var(--theme-secondary)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
            CSS Custom Properties
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[var(--theme-primary)] rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[var(--theme-text-primary)]">Primary Colors</h3>
                <ul className="space-y-2 text-[var(--theme-text-secondary)]">
                  <li>Primary: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-primary)</span></li>
                  <li>Secondary: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-secondary)</span></li>
                  <li>Accent: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-accent)</span></li>
                </ul>
              </div>
              <div className="p-6 bg-[var(--theme-background)] rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[var(--theme-text-primary)]">Background Colors</h3>
                <ul className="space-y-2 text-[var(--theme-text-secondary)]">
                  <li>Background: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-background)</span></li>
                  <li>Surface: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-surface)</span></li>
                  <li>Text: <span className="font-mono text-sm bg-white px-2 py-1 rounded">var(--theme-text-primary)</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Fetching Test Section */}
      <ClientDataFetcher />

      {/* Welcome Message Test Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Welcome Message Test
          </h2>
          <WelcomeMessageTest />
        </div>
      </section>

      {/* Affirmations Display Test Section */}
      <section className="section bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Affirmations Display Test
          </h2>
          <AffirmationsDisplayTest />
        </div>
      </section>

      {/* Video Grid Test Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Video Grid Test
          </h2>
          <VideoGridTest />
        </div>
      </section>

      {/* Content Selector Test Section - Temporarily commented out */}
      {/* <section className="section bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Content Selection Test
          </h2>
          <ContentSelectorTest />
        </div>
      </section> */}

      {/* UI Components Test Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            UI Components Test
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Loading Spinners */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Loading Spinners</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" text="Small" />
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" text="Medium" />
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" text="Large" />
                </div>
              </div>
            </div>

            {/* Loading Variations */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Loading Variations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" text="Small" />
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" text="Medium" />
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" text="Large" />
                </div>
              </div>
            </div>

            {/* Error Boundary Test */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Error Boundary Test</h3>
              <ErrorBoundary fallback={<ErrorFallback title="Test Error" message="This is a test error fallback" />}>
                <ErrorTestComponent />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--theme-primary)] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--theme-text-secondary)]">
            Built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Theme Context Test (temporary) */}
      <ThemeContextTest />
    </div>
  );
}