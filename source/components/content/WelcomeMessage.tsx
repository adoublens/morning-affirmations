'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';

interface WelcomeMessageProps {
  data: {
    themes: {
      [key: string]: {
        timeRanges: Array<{
          id: string;
          startTime: string;
          endTime: string;
          messages: string[];
        }>;
      };
    };
  };
}

export function WelcomeMessage({ data }: WelcomeMessageProps) {
  const { theme } = useTheme();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selectMessage = () => {
      try {
        setIsLoading(true);
        
        // Convert data structure to match ContentSelector expectations
        const welcomeMessages = Object.entries(data.themes).map(([themeName, themeData]) => ({
          theme: [themeName],
          isActive: true,
          timeRanges: themeData.timeRanges
        }));

        const selector = ContentSelector.getInstance();
        const currentTime = new Date();
        
        // Get the selected message
        const selectedMessage = selector.selectWelcomeMessage(
          welcomeMessages,
          theme.currentTheme,
          currentTime
        );
        
        setMessage(selectedMessage);
        
        
      } catch (error) {
        console.error('Error selecting welcome message:', error);
        setMessage('Good morning!');
      } finally {
        setIsLoading(false);
      }
    };

    selectMessage();
  }, [data, theme.currentTheme]);

  if (isLoading) {
    return (
      <section className="welcome-message-section">
        <div className="container mx-auto px-4 text-center !mt-8 !mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--theme-primary)] rounded-lg mb-2"></div>
            <div className="h-4 bg-[var(--theme-secondary)] rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="welcome-message-section">
      <div className="container mx-auto px-4 text-center !mt-8 !mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--theme-text-primary)]">
          {message}
        </h2>
      </div>
    </section>
  );
}
