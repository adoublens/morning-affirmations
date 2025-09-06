import { promises as fs } from 'fs';
import path from 'path';
import { Affirmation, Video, WelcomeMessage, ThemeConfig } from '@/types/content';

/**
 * Content data structure returned by getContentData
 */
export interface ContentData {
  affirmations: Affirmation[];
  videos: Video[];
  welcomeMessages: WelcomeMessage;
  themes: ThemeConfig[];
  appConfig: {
    app: {
      name: string;
      version: string;
      description: string;
    };
    features: {
      themeSwitching: boolean;
      persistentThemes: boolean;
      randomization: boolean;
      offlineMode: boolean;
    };
    ui: {
      defaultTheme: string;
      autoThemeSwitch: boolean;
      animationSpeed: string;
      showThumbnails: boolean;
      showTimestamps: boolean;
    };
    performance: {
      maxRetries: number;
      timeout: number;
    };
  };
}

/**
 * Error class for content data loading errors
 */
export class ContentDataError extends Error {
  constructor(message: string, public filePath?: string) {
    super(message);
    this.name = 'ContentDataError';
  }
}

/**
 * Load all content data from JSON files
 * @returns Promise<ContentData> - All content data
 * @throws ContentDataError - If any file fails to load
 */
export async function getContentData(): Promise<ContentData> {
  const dataDir = path.join(process.cwd(), 'data');
  
  try {
    // Load all JSON files in parallel
    const [
      affirmationsData,
      videosData,
      welcomeMessagesData,
      themesData,
      appConfigData
    ] = await Promise.all([
      loadJsonFile(path.join(dataDir, 'affirmations.json')),
      loadJsonFile(path.join(dataDir, 'youtube-videos.json')),
      loadJsonFile(path.join(dataDir, 'welcome-messages.json')),
      loadJsonFile(path.join(dataDir, 'themes.json')),
      loadJsonFile(path.join(dataDir, 'app-config.json'))
    ]);

    // Parse JSON data
    const affirmations = JSON.parse(affirmationsData);
    const videos = JSON.parse(videosData);
    const welcomeMessages = JSON.parse(welcomeMessagesData);
    const themes = JSON.parse(themesData);
    const appConfig = JSON.parse(appConfigData);

    // Validate data structure
    validateContentData({ affirmations, videos, welcomeMessages, themes, appConfig });

    return {
      affirmations,
      videos,
      welcomeMessages,
      themes,
      appConfig
    };
  } catch (error) {
    if (error instanceof ContentDataError) {
      throw error;
    }
    
    console.error('Error loading content data:', error);
    throw new ContentDataError(
      `Failed to load content data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Load a JSON file with error handling
 * @param filePath - Path to the JSON file
 * @returns Promise<string> - File contents
 * @throws ContentDataError - If file cannot be read
 */
async function loadJsonFile(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    const fileName = path.basename(filePath);
    throw new ContentDataError(
      `Failed to load ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      filePath
    );
  }
}

/**
 * Validate content data structure
 * @param data - Content data to validate
 * @throws ContentDataError - If validation fails
 */
function validateContentData(data: any): void {
  const { affirmations, videos, welcomeMessages, themes, appConfig } = data;

  // Validate affirmations
  if (!Array.isArray(affirmations)) {
    throw new ContentDataError('Affirmations data must be an array');
  }

  // Validate videos
  if (!Array.isArray(videos)) {
    throw new ContentDataError('Videos data must be an array');
  }

  // Validate welcome messages
  if (!welcomeMessages || typeof welcomeMessages !== 'object') {
    throw new ContentDataError('Welcome messages data must be an object');
  }

  // Validate themes
  if (!Array.isArray(themes)) {
    throw new ContentDataError('Themes data must be an array');
  }

  // Validate app config
  if (!appConfig || typeof appConfig !== 'object') {
    throw new ContentDataError('App config data must be an object');
  }

  // Basic structure validation
  if (!welcomeMessages.themes) {
    throw new ContentDataError('Welcome messages must have themes property');
  }

  if (!appConfig.app || !appConfig.features || !appConfig.ui) {
    throw new ContentDataError('App config must have app, features, and ui properties');
  }
}

/**
 * Load content data with fallback for missing files
 * @returns Promise<Partial<ContentData>> - Content data with fallbacks
 */
export async function getContentDataWithFallback(): Promise<Partial<ContentData>> {
  const dataDir = path.join(process.cwd(), 'data');
  const result: Partial<ContentData> = {};

  // Define file mappings
  const fileMappings = [
    { key: 'affirmations' as keyof ContentData, file: 'affirmations.json', fallback: [] },
    { key: 'videos' as keyof ContentData, file: 'youtube-videos.json', fallback: [] },
    { key: 'welcomeMessages' as keyof ContentData, file: 'welcome-messages.json', fallback: getDefaultWelcomeMessages() },
    { key: 'themes' as keyof ContentData, file: 'themes.json', fallback: [] },
    { key: 'appConfig' as keyof ContentData, file: 'app-config.json', fallback: getDefaultAppConfig() }
  ];

  // Load each file with fallback
  for (const mapping of fileMappings) {
    try {
      const filePath = path.join(dataDir, mapping.file);
      const data = await fs.readFile(filePath, 'utf-8');
      result[mapping.key] = JSON.parse(data);
    } catch (error) {
      console.warn(`Failed to load ${mapping.file}, using fallback:`, error);
      result[mapping.key] = mapping.fallback;
    }
  }

  return result;
}

/**
 * Get default welcome messages structure
 */
function getDefaultWelcomeMessages(): WelcomeMessage {
  return {
    themes: {
      peaceful: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning!', 'Welcome to a peaceful day']
          }
        ]
      },
      energetic: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning!', 'Let\'s make today amazing!']
          }
        ]
      },
      restorative: {
        timeRanges: [
          {
            id: 'morning',
            startTime: '06:00',
            endTime: '11:59',
            messages: ['Good morning!', 'Take time to nurture yourself today']
          }
        ]
      }
    }
  };
}

/**
 * Get default app configuration
 */
function getDefaultAppConfig() {
  return {
    app: {
      name: 'Morning Affirmations',
      version: '1.0.0',
      description: 'Daily affirmations and wellness resources'
    },
    features: {
      themeSwitching: true,
      persistentThemes: true,
      randomization: true,
      offlineMode: false
    },
    ui: {
      defaultTheme: 'peaceful',
      autoThemeSwitch: false,
      animationSpeed: 'normal',
      showThumbnails: true,
      showTimestamps: false
    },
    performance: {
      maxRetries: 3,
      timeout: 5000
    }
  };
}

/**
 * Check if content data files exist
 * @returns Promise<boolean> - True if all files exist
 */
export async function checkContentDataFiles(): Promise<boolean> {
  const dataDir = path.join(process.cwd(), 'data');
  const requiredFiles = [
    'affirmations.json',
    'youtube-videos.json',
    'welcome-messages.json',
    'themes.json',
    'app-config.json'
  ];

  try {
    const fileChecks = await Promise.all(
      requiredFiles.map(async (file) => {
        try {
          await fs.access(path.join(dataDir, file));
          return true;
        } catch {
          return false;
        }
      })
    );

    return fileChecks.every(exists => exists);
  } catch {
    return false;
  }
}
