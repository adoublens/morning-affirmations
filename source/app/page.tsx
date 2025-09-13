import { Suspense } from 'react';
import { Header } from '@/components/layout';
import { WelcomeMessage } from '@/components/content/WelcomeMessage';
import { AffirmationsDisplay } from '@/components/content/AffirmationsDisplay';
import { VideoGrid } from '@/components/content/VideoGrid';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getContentData, AffirmationData, VideoData } from '@/lib/utils/getContentData';
import { Affirmation, Video } from '@/types/content';

// Data transformation functions
function transformAffirmationData(data: AffirmationData): Affirmation {
  return {
    id: data.id,
    text: data.text,
    author: data.author,
    category: data.category as Affirmation['category'], // Type assertion for category compatibility
    mood: 'peaceful' as const, // Default mood, could be enhanced
    imageUrl: data.image?.filename || '',
    useCount: 0,
  };
}

function transformVideoData(data: VideoData): Video {
  return {
    id: data.id,
    title: data.title,
    url: data.url,
    creator: data.creator,
    creatorChannel: data.creatorChannel,
    category: data.category as Video['category'], // Type assertion for category compatibility
    themes: data.themes,
    mood: 'peaceful' as const, // Default mood, could be enhanced
    useCount: 0,
    thumbnail: data.thumbnail,
    tags: data.tags,
    active: data.active,
  };
}

// Loading component for Suspense fallback
function SectionLoading({ title }: { title: string }) {
  return (
    <section className="newsletter-section">
      <div className="newsletter-card text-center">
        <LoadingSpinner size="lg" text={`Loading ${title}...`} />
      </div>
    </section>
  );
}

// Main page component
export default async function HomePage() {
  // Load content data on the server
  const contentData = await getContentData();

  return (
    <div className="min-h-screen bg-[var(--theme-background)]">
      {/* Single Column Newsletter Layout */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header */}
        <Header showThemeSwitcher={true} showNavigation={false} />

        {/* Welcome Message with Suspense */}
        <Suspense fallback={<SectionLoading title="welcome message" />}>
          <WelcomeMessage data={contentData.welcomeMessages} />
        </Suspense>

        {/* Main Affirmation with Suspense */}
        <Suspense fallback={<SectionLoading title="today's affirmation" />}>
          <AffirmationsDisplay affirmations={contentData.affirmations.map(transformAffirmationData)} />
        </Suspense>

        {/* Video Resources with Suspense */}
        <Suspense fallback={<SectionLoading title="video resources" />}>
          <VideoGrid videos={contentData.videos.map(transformVideoData)} />
        </Suspense>

        {/* Theme Switcher */}
        <section className="newsletter-section">
          {/* <ThemeSwitcher /> */}
        </section>        

        {/* Footer */}
        <footer className="newsletter-section text-center">
          <p 
            className="text-[var(--theme-text-secondary)] mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Made with ❤️ for your daily wellness journey
          </p>
          <p className="text-sm text-[var(--theme-text-secondary)]">
            © 2025 Daily Affirmations
          </p>
        </footer>
      </div>
    </div>
  );
}
