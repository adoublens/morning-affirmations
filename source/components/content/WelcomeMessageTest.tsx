'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { ContentSelector } from '@/lib/content/contentSelector';

// Mock welcome message data matching the actual structure
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

export function WelcomeMessageTest() {
  const { theme } = useTheme();
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [testResults, setTestResults] = useState<{
    [theme: string]: {
      [timeRange: string]: string[];
    };
  }>({});

  // Set current time after hydration to avoid hydration mismatch
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testWelcomeMessages = () => {
      const selector = ContentSelector.getInstance();
      const results: { [theme: string]: { [timeRange: string]: string[] } } = {};

      // Test all themes and time ranges
      Object.keys(mockWelcomeData.themes).forEach(themeName => {
        results[themeName] = {};
        
        // Convert to ContentSelector format
        const welcomeMessages = [{
          theme: [themeName],
          isActive: true,
          timeRanges: mockWelcomeData.themes[themeName as keyof typeof mockWelcomeData.themes].timeRanges
        }];

        // Test each time range
        mockWelcomeData.themes[themeName as keyof typeof mockWelcomeData.themes].timeRanges.forEach(timeRange => {
          const testTimes = [
            timeRange.startTime,
            timeRange.endTime,
            // Test middle of range
            timeRange.startTime.split(':')[0] + ':' + 
            Math.floor((parseInt(timeRange.startTime.split(':')[1]) + parseInt(timeRange.endTime.split(':')[1])) / 2).toString().padStart(2, '0')
          ];

          const messages: string[] = [];
          testTimes.forEach(timeStr => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            const testTime = new Date();
            testTime.setHours(hours, minutes, 0, 0);
            
            try {
              const message = selector.selectWelcomeMessage(welcomeMessages, themeName, testTime);
              messages.push(message);
            } catch (error) {
              messages.push('Error: ' + (error as Error).message);
            }
          });
          
          results[themeName][timeRange.id] = messages;
        });
      });

      setTestResults(results);
    };

    testWelcomeMessages();
  }, []);

  useEffect(() => {
    const updateCurrentMessage = () => {
      const selector = ContentSelector.getInstance();
      const welcomeMessages = [{
        theme: [theme.currentTheme],
        isActive: true,
        timeRanges: mockWelcomeData.themes[theme.currentTheme as keyof typeof mockWelcomeData.themes].timeRanges
      }];

      const currentTime = new Date();
      const message = selector.selectWelcomeMessage(welcomeMessages, theme.currentTheme, currentTime);
      setCurrentMessage(message);

      // Determine current time range
      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const currentTimeMinutes = hour * 60 + minute;

      const activeTimeRange = mockWelcomeData.themes[theme.currentTheme as keyof typeof mockWelcomeData.themes].timeRanges.find(range => {
        const [startHour, startMinute] = range.startTime.split(':').map(Number);
        const [endHour, endMinute] = range.endTime.split(':').map(Number);
        
        const startTimeMinutes = startHour * 60 + startMinute;
        const endTimeMinutes = endHour * 60 + endMinute;
        
        if (startTimeMinutes > endTimeMinutes) {
          return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
        }
        
        return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
      });

      setTimeRange(activeTimeRange?.id || 'unknown');
    };

    updateCurrentMessage();
  }, [theme.currentTheme]);

  return (
    <div className="card max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Welcome Message Test</h3>
      
      {/* Current Message Display */}
      <div className="mb-6 p-4 bg-[var(--theme-primary)] rounded-lg">
        <h4 className="font-semibold mb-2">Current Message:</h4>
        <div className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">
          &ldquo;{currentMessage}&rdquo;
        </div>
        <div className="text-sm text-[var(--theme-text-secondary)]">
          <span className="capitalize">{timeRange.replace('-', ' ')}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{theme.currentTheme}</span>
          <span className="mx-2">•</span>
          <span>{currentTime || '--:--'}</span>
        </div>
      </div>

      {/* Test Results by Theme and Time Range */}
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">Test Results by Theme and Time Range:</h4>
        
        {Object.entries(testResults).map(([themeName, themeResults]) => (
          <div key={themeName} className="border border-[var(--theme-secondary)] rounded-lg p-4">
            <h5 className="font-semibold text-lg mb-3 capitalize">{themeName} Theme</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(themeResults).map(([timeRangeId, messages]) => (
                <div key={timeRangeId} className="bg-[var(--theme-surface)] rounded-lg p-3">
                  <h6 className="font-medium mb-2 capitalize">{timeRangeId.replace('-', ' ')}</h6>
                  <div className="space-y-1 text-sm">
                    {messages.map((message, index) => (
                      <div key={index} className="text-[var(--theme-text-secondary)]">
                        &ldquo;{message}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Available Messages by Theme */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg mb-3">Available Messages by Theme:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(mockWelcomeData.themes).map(([themeName, themeData]) => (
            <div key={themeName} className="border border-[var(--theme-secondary)] rounded-lg p-4">
              <h5 className="font-semibold mb-3 capitalize">{themeName} Theme</h5>
              <div className="space-y-2 text-sm">
                {themeData.timeRanges.map(timeRange => (
                  <div key={timeRange.id}>
                    <div className="font-medium capitalize">{timeRange.id.replace('-', ' ')}</div>
                    <div className="text-[var(--theme-text-secondary)]">
                      {timeRange.messages.length} messages available
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
