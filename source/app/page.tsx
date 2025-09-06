import { Suspense } from 'react';
import { Header } from '@/components/layout';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
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
    category: data.category as any, // Type assertion for category compatibility
    theme: data.themes,
    mood: 'peaceful' as const, // Default mood, could be enhanced
    imageUrl: data.image?.filename || '',
    useCount: 0,
    tags: data.tags,
  };
}

function transformVideoData(data: VideoData): Video {
  return {
    id: data.id,
    title: data.title,
    url: data.url,
    creator: data.creator,
    creatorChannel: data.creatorChannel,
    category: data.category as any, // Type assertion for category compatibility
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
    <section className="section bg-[var(--theme-primary)]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <LoadingSpinner size="lg" text={`Loading ${title}...`} />
        </div>
      </div>
    </section>
  );
}

// Main page component
export default async function HomePage() {
  // Load content data on the server
  const contentData = await getContentData();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header showThemeSwitcher={true} showNavigation={false} />

      {/* Welcome Section */}
      <section className="section bg-[var(--theme-background)]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-[var(--theme-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Morning Affirmations
            </h1>
            <p 
              className="text-xl md:text-2xl text-[var(--theme-text-secondary)] mb-8"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Start your day with intention and purpose
            </p>
          </div>
        </div>
      </section>

      {/* Theme Switcher */}
      <section className="section bg-[var(--theme-primary)]">
        <div className="container mx-auto px-4">
          <ThemeSwitcher />
        </div>
      </section>

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

      {/* Footer */}
      <footer className="section bg-[var(--theme-secondary)]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p 
              className="text-[var(--theme-text-secondary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Made with ❤️ for your daily wellness journey
            </p>
            <p className="text-sm text-[var(--theme-text-secondary)] mt-2">
              © 2024 Morning Affirmations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}