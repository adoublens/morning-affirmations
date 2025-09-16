import { Affirmation, Video, LockedContent } from '@/types/content';

type Theme = 'peaceful' | 'energetic' | 'restorative';

/**
 * ContentSelector - Singleton class for managing content selection and rotation
 * 
 * Features:
 * - Singleton pattern for consistent state across the app
 * - Theme-based content filtering
 * - Avoidance logic to prevent repetition
 * - Time-based welcome message selection
 * - Fallback handling for missing content
 */
export class ContentSelector {
  private static instance: ContentSelector;
  private lastUsed: Map<string, string[]> = new Map();
  private lastUsedTimestamps: Map<string, number[]> = new Map();

  private constructor() {
    // Private constructor for singleton pattern
  }

  /**
   * Get the singleton instance of ContentSelector
   */
  static getInstance(): ContentSelector {
    if (!ContentSelector.instance) {
      ContentSelector.instance = new ContentSelector();
    }
    return ContentSelector.instance;
  }

  /**
   * Select a random affirmation for the current theme
   * @param affirmations - Array of all affirmations
   * @param theme - Current theme ID
   * @returns Selected affirmation
   */
  selectAffirmation(affirmations: Affirmation[]): Affirmation {
    // Since affirmations no longer have themes, select from all available affirmations
    if (affirmations.length === 0) {
      throw new Error('No affirmations available');
    }

    // Filter out recently used affirmations (within 7 days)
    const available = this.filterRecentlyUsed(affirmations, 'affirmations', 7);
    
    if (available.length === 0) {
      // Reset if all have been used recently
      this.lastUsed.delete('affirmations');
      this.lastUsedTimestamps.delete('affirmations');
      return this.selectRandom(affirmations);
    }

    const selected = this.selectRandom(available);
    this.recordUsage('affirmations', selected.id);
    
    return selected;
  }

  /**
   * Select videos for each category in the current theme
   * @param videos - Array of all videos
   * @param theme - Current theme ID
   * @returns Map of category to selected video
   */
  selectVideos(videos: Video[], theme: string): Map<string, Video> {
    const themeVideos = videos.filter(video =>
      video.themes && video.themes.includes(theme as Theme)
    );
    
    const selectedVideos = new Map<string, Video>();
    const categories = ['affirmations', 'yoga', 'bible', 'artsy-creative'];
    
    categories.forEach(category => {
      const categoryVideos = themeVideos.filter(video => video.category === category);
      
      if (categoryVideos.length > 0) {
        const available = this.filterRecentlyUsed(categoryVideos, `videos-${category}`, 5);
        
        if (available.length === 0) {
          // Reset if all have been used recently
          this.lastUsed.delete(`videos-${category}`);
          this.lastUsedTimestamps.delete(`videos-${category}`);
        }
        
        const selected = this.selectRandom(available.length > 0 ? available : categoryVideos);
        selectedVideos.set(category, selected);
        this.recordUsage(`videos-${category}`, selected.id);
      }
    });
    
    return selectedVideos;
  }

  /**
   * Select welcome message based on time and theme
   * @param messages - Welcome message data structure (array of theme objects)
   * @param theme - Current theme ID
   * @param currentTime - Current date/time
   * @returns Selected welcome message
   */
  selectWelcomeMessage(messages: Array<{ theme: string[]; isActive: boolean; timeRanges: Array<{ id: string; startTime: string; endTime: string; messages: string[] }> }>, theme: string, currentTime: Date): string {
    // Find the theme data
    const themeData = messages.find(msg => 
      msg.theme && msg.theme.includes(theme as Theme) && msg.isActive
    );
    
    if (!themeData || !themeData.timeRanges) {
      return 'Good morning!';
    }
    
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const currentTimeMinutes = hour * 60 + minute;
    
    // Find the appropriate time range
    const activeTimeRange = themeData.timeRanges.find((range: { startTime: string; endTime: string }) => {
      const [startHour, startMinute] = range.startTime.split(':').map(Number);
      const [endHour, endMinute] = range.endTime.split(':').map(Number);
      
      const startTimeMinutes = startHour * 60 + startMinute;
      const endTimeMinutes = endHour * 60 + endMinute;
      
      // Handle overnight ranges (e.g., 21:00 to 04:59)
      if (startTimeMinutes > endTimeMinutes) {
        return currentTimeMinutes >= startTimeMinutes || currentTimeMinutes <= endTimeMinutes;
      }
      
      return currentTimeMinutes >= startTimeMinutes && currentTimeMinutes <= endTimeMinutes;
    });
    
    if (activeTimeRange && activeTimeRange.messages && activeTimeRange.messages.length > 0) {
      // Filter out recently used messages for this time range
      const key = `welcome-${theme}-${activeTimeRange.id}`;
      const availableMessages = this.filterRecentlyUsed(
        activeTimeRange.messages.map((msg: string, index: number) => ({ id: `${activeTimeRange.id}-${index}`, text: msg })),
        key,
        1 // 1 day avoidance for welcome messages
      );
      
      if (availableMessages.length === 0) {
        // Reset if all messages have been used recently
        this.lastUsed.delete(key);
        const allMessages = activeTimeRange.messages.map((msg: string, index: number) => ({ id: `${activeTimeRange.id}-${index}`, text: msg }));
        const selected = this.selectRandom(allMessages) as { id: string; text: string };
        this.recordUsage(key, selected.id);
        return selected.text;
      }
      
      const selected = this.selectRandom(availableMessages) as { id: string; text: string };
      this.recordUsage(key, selected.id);
      return selected.text;
    }
    
    return 'Good morning!';
  }

  /**
   * Get time range based on hour
   * @param hour - Current hour (0-23)
   * @returns Time range ID
   */
  private getTimeRange(hour: number): string {
    if (hour >= 5 && hour < 9) return 'early-morning';
    if (hour >= 9 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }

  /**
   * Filter out recently used content
   * @param items - Array of content items
   * @param key - Storage key for this content type
   * @param days - Number of days to avoid repetition
   * @returns Filtered array of available items
   */
  private filterRecentlyUsed<T extends { id: string }>(
    items: T[], 
    key: string, 
    days: number
  ): T[] {
    const recentlyUsed = this.lastUsed.get(key) || [];
    const timestamps = this.lastUsedTimestamps.get(key) || [];
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    
    // Filter out items used within the cutoff time
    const availableItems = items.filter((item) => {
      const itemIndex = recentlyUsed.indexOf(item.id);
      if (itemIndex === -1) return true; // Not used recently
      
      const lastUsedTime = timestamps[itemIndex];
      return lastUsedTime < cutoffTime;
    });
    
    return availableItems;
  }

  /**
   * Select a random item from an array
   * @param items - Array of items to choose from
   * @returns Randomly selected item
   */
  private selectRandom<T>(items: T[]): T {
    if (items.length === 0) {
      throw new Error('Cannot select from empty array');
    }
    return items[Math.floor(Math.random() * items.length)];
  }

  /**
   * Record usage of a content item
   * @param key - Storage key for this content type
   * @param id - ID of the used item
   */
  private recordUsage(key: string, id: string): void {
    const current = this.lastUsed.get(key) || [];
    const timestamps = this.lastUsedTimestamps.get(key) || [];
    
    // Add new usage
    current.push(id);
    timestamps.push(Date.now());
    
    // Keep only last 30 entries to prevent memory bloat
    if (current.length > 30) {
      current.splice(0, current.length - 30);
      timestamps.splice(0, timestamps.length - 30);
    }
    
    this.lastUsed.set(key, current);
    this.lastUsedTimestamps.set(key, timestamps);
  }

  /**
   * Get usage statistics for debugging
   * @returns Object with usage statistics
   */
  getUsageStats(): Record<string, { count: number; lastUsed: string[] }> {
    const stats: Record<string, { count: number; lastUsed: string[] }> = {};
    
    this.lastUsed.forEach((items, key) => {
      stats[key] = {
        count: items.length,
        lastUsed: items.slice(-5) // Last 5 items
      };
    });
    
    return stats;
  }

  /**
   * Clear all usage history (for testing or reset)
   */
  clearUsageHistory(): void {
    this.lastUsed.clear();
    this.lastUsedTimestamps.clear();
  }

  /**
   * Get available content for a specific theme
   * @param affirmations - Array of all affirmations
   * @param videos - Array of all videos
   * @param theme - Theme ID
   * @returns Object with available content counts
   */
  getAvailableContent(affirmations: Affirmation[], videos: Video[], theme: string): {
    affirmations: number;
    videos: number;
    categories: Record<string, number>;
  } {
    // Since affirmations no longer have themes, count all available affirmations
    const themeVideos = videos.filter(
      video => video.themes.includes(theme as Theme)
    );
    
    const categories: Record<string, number> = {};
    const categoryList = ['affirmations', 'bible', 'yoga', 'meditation', 'artsy-creative'];
    
    categoryList.forEach(category => {
      categories[category] = themeVideos.filter(video => video.category === category).length;
    });
    
    return {
      affirmations: affirmations.length, // All affirmations are available
      videos: themeVideos.length,
      categories
    };
  }

  /**
   * Lock current content for persistent display
   * @param affirmations - Array of all affirmations
   * @param videos - Array of all videos
   * @param theme - Current theme ID
   * @returns LockedContent object with current selections
   */
  lockCurrentContent(affirmations: Affirmation[], videos: Video[], theme: string): LockedContent {
    const selectedAffirmation = this.selectAffirmation(affirmations);
    const selectedVideos = this.selectVideos(videos, theme);
    
    return {
      theme,
      affirmation: selectedAffirmation,
      videos: selectedVideos,
      lockedAt: new Date(),
    };
  }

  /**
   * Get locked content from localStorage
   * @returns LockedContent or null if not found
   */
  getLockedContent(): LockedContent | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem('morning-affirmations-locked-content');
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      
      // Convert videos Map back from serialized format
      const videosMap = new Map<string, Video>();
      if (parsed.videos && Array.isArray(parsed.videos)) {
        parsed.videos.forEach(([key, value]: [string, Video]) => {
          videosMap.set(key, value);
        });
      }
      
      return {
        ...parsed,
        videos: videosMap,
        lockedAt: new Date(parsed.lockedAt),
      };
    } catch (error) {
      console.error('Error loading locked content:', error);
      return null;
    }
  }

  /**
   * Save locked content to localStorage
   * @param lockedContent - Content to lock
   */
  saveLockedContent(lockedContent: LockedContent): void {
    if (typeof window === 'undefined') return;
    
    try {
      // Convert videos Map to serializable format
      const serializable = {
        ...lockedContent,
        videos: Array.from(lockedContent.videos.entries()),
      };
      
      localStorage.setItem('morning-affirmations-locked-content', JSON.stringify(serializable));
    } catch (error) {
      console.error('Error saving locked content:', error);
    }
  }

  /**
   * Clear locked content from localStorage
   */
  clearLockedContent(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('morning-affirmations-locked-content');
  }

  /**
   * Select content based on lock state
   * @param affirmations - Array of all affirmations
   * @param videos - Array of all videos
   * @param theme - Current theme ID
   * @param isLocked - Whether content is locked
   * @returns Object with selected content
   */
  selectContentWithLock(
    affirmations: Affirmation[], 
    videos: Video[], 
    theme: string, 
    isLocked: boolean
  ): { affirmation: Affirmation; videos: Map<string, Video> } {
    if (isLocked) {
      const lockedContent = this.getLockedContent();
      if (lockedContent) {
        return {
          affirmation: lockedContent.affirmation,
          videos: lockedContent.videos,
        };
      }
    }
    
    // Fallback to dynamic selection
    return {
      affirmation: this.selectAffirmation(affirmations),
      videos: this.selectVideos(videos, theme),
    };
  }

  /**
   * Get current content selection (for debugging)
   * @returns Current selection state
   */
  getCurrentSelection(): { 
    hasLockedContent: boolean; 
    lockedContent: LockedContent | null;
    lastUsed: Record<string, { count: number; lastUsed: string[] }>;
  } {
    return {
      hasLockedContent: this.getLockedContent() !== null,
      lockedContent: this.getLockedContent(),
      lastUsed: this.getUsageStats(),
    };
  }
}

// Export a default instance for convenience
export const contentSelector = ContentSelector.getInstance();
