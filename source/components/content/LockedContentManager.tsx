'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { contentSelector } from '@/lib/content/contentSelector';
import { Affirmation, Video, LockedContent } from '@/types/content';
import { AffirmationsDisplay } from './AffirmationsDisplay';
import { VideoGrid } from './VideoGrid';
import { ContentUnavailableError } from '@/components/ui';

interface LockedContentManagerProps {
  affirmations: Affirmation[];
  videos: Video[];
  welcomeMessages: any; // Keep welcome messages time-based
}

export function LockedContentManager({ 
  affirmations, 
  videos, 
  welcomeMessages 
}: LockedContentManagerProps) {
  const { theme } = useTheme();
  const [lockedContent, setLockedContent] = useState<LockedContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<{
    affirmation: Affirmation;
    videos: Map<string, Video>;
  } | null>(null);
  const isInitialized = useRef(false);

  // Initialize content on mount
  useEffect(() => {
    if (!isInitialized.current) {
      console.log('LockedContentManager: Initializing content');
      
      // Check if we have locked content from localStorage
      if (theme.isLocked) {
        const existingLocked = contentSelector.getLockedContent();
        if (existingLocked) {
          console.log('LockedContentManager: Found existing locked content');
          setLockedContent(existingLocked);
          setCurrentContent({
            affirmation: existingLocked.affirmation,
            videos: existingLocked.videos,
          });
        } else {
          // No locked content, generate new content
          console.log('LockedContentManager: No locked content, generating new');
          const dynamicContent = contentSelector.selectContentWithLock(
            affirmations, 
            videos, 
            theme.currentTheme, 
            false
          );
          setCurrentContent(dynamicContent);
        }
      } else {
        // Not locked, generate dynamic content
        console.log('LockedContentManager: Not locked, generating dynamic content');
        const dynamicContent = contentSelector.selectContentWithLock(
          affirmations, 
          videos, 
          theme.currentTheme, 
          false
        );
        setCurrentContent(dynamicContent);
      }
      
      isInitialized.current = true;
      setIsLoading(false);
    }
  }, []); // Only run on mount

  // Handle lock state changes
  useEffect(() => {
    if (!isInitialized.current) return; // Skip if not initialized yet

    console.log('LockedContentManager: Lock state changed, isLocked:', theme.isLocked);

    if (theme.isLocked && !lockedContent && currentContent) {
      // Just got locked, lock the current content
      console.log('LockedContentManager: Locking current content');
      const newLockedContent: LockedContent = {
        theme: theme.currentTheme,
        affirmation: currentContent.affirmation,
        videos: currentContent.videos,
        lockedAt: new Date(),
      };
      contentSelector.saveLockedContent(newLockedContent);
      setLockedContent(newLockedContent);
    } else if (!theme.isLocked && lockedContent) {
      // Just got unlocked, clear locked content and generate new dynamic content
      console.log('LockedContentManager: Unlocking content');
      contentSelector.clearLockedContent();
      setLockedContent(null);
      
      // Generate new dynamic content
      const dynamicContent = contentSelector.selectContentWithLock(
        affirmations, 
        videos, 
        theme.currentTheme, 
        false
      );
      setCurrentContent(dynamicContent);
    }
  }, [theme.isLocked, lockedContent, currentContent, affirmations, videos, theme.currentTheme]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-32 bg-[var(--theme-surface)] rounded-lg mb-4"></div>
          <div className="h-48 bg-[var(--theme-surface)] rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <ContentUnavailableError onRefresh={() => window.location.reload()} />
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="space-y-8">
        <ContentUnavailableError onRefresh={() => window.location.reload()} />
      </div>
    );
  }

  // Check if locked content is still available
  if (theme.isLocked && lockedContent) {
    const isAffirmationAvailable = affirmations.some(a => a.id === lockedContent.affirmation.id);
    const isVideosAvailable = Array.from(lockedContent.videos.values()).every(video => 
      videos.some(v => v.id === video.id)
    );

    if (!isAffirmationAvailable || !isVideosAvailable) {
      return (
        <div className="space-y-8">
          <ContentUnavailableError onRefresh={() => window.location.reload()} />
        </div>
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Affirmations Display */}
      <AffirmationsDisplay 
        affirmations={[currentContent.affirmation]} 
        isLocked={theme.isLocked}
      />
      
      {/* Video Grid */}
      <VideoGrid 
        videos={Array.from(currentContent.videos.values())} 
        isLocked={theme.isLocked}
      />
    </div>
  );
}
