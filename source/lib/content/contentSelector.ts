import { Affirmation, Video, WelcomeMessage } from '@/types/content';

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
  selectAffirmation(affirmations: Affirmation[], theme: string): Affirmation {
    // Filter affirmations by theme
    const themeAffirmations = affirmations.filter(
      aff => aff.theme.includes(theme as Theme)
    );
    
    if (themeAffirmations.length === 0) {
      // Fallback to any affirmation
      if (affirmations.length === 0) {
        throw new Error('No affirmations available');
      }
      return this.selectRandom(affirmations);
    }

    // Filter out recently used affirmations (within 7 days)
    const available = this.filterRecentlyUsed(themeAffirmations, 'affirmations', 7);
    
    if (available.length === 0) {
      // Reset if all have been used recently
      this.lastUsed.delete('affirmations');
      this.lastUsedTimestamps.delete('affirmations');
      return this.selectRandom(themeAffirmations);
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
      video.theme.includes(theme as Theme)
    );
    
    const selectedVideos = new Map<string, Video>();
    const categories = ['affirmations', 'bible', 'yoga', 'meditation', 'artsy-creative'];
    
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
   * @param messages - Welcome message data structure
   * @param theme - Current theme ID
   * @param currentTime - Current date/time
   * @returns Selected welcome message
   */
  selectWelcomeMessage(messages: WelcomeMessage[], theme: string, currentTime: Date): string {
    // Filter messages by theme
    const themeMessages = messages.filter(msg => 
      msg.theme.includes(theme as Theme) && msg.isActive
    );
    
    if (themeMessages.length === 0) {
      return 'Good morning!';
    }
    
    const hour = currentTime.getHours();
    const timeRange = this.getTimeRange(hour);
    
    // Find messages that match the current time range
    const timeRangeMessages = themeMessages.filter(msg => {
      const startHour = parseInt(msg.timeRange.start.split(':')[0]);
      const endHour = parseInt(msg.timeRange.end.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
    
    if (timeRangeMessages.length > 0) {
      return this.selectRandom(timeRangeMessages).text;
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
    const availableItems = items.filter((item, index) => {
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
    const themeAffirmations = affirmations.filter(
      aff => aff.theme.includes(theme as Theme)
    );
    
    const themeVideos = videos.filter(
      video => video.theme.includes(theme as Theme)
    );
    
    const categories: Record<string, number> = {};
    const categoryList = ['affirmations', 'bible', 'yoga', 'meditation', 'artsy-creative'];
    
    categoryList.forEach(category => {
      categories[category] = themeVideos.filter(video => video.category === category).length;
    });
    
    return {
      affirmations: themeAffirmations.length,
      videos: themeVideos.length,
      categories
    };
  }
}

// Export a default instance for convenience
export const contentSelector = ContentSelector.getInstance();
