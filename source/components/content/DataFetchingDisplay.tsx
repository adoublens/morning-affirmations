'use client';

import { ContentData } from '@/lib/utils/getContentData';

interface DataFetchingDisplayProps {
  contentData: ContentData;
}

export function DataFetchingDisplay({ contentData }: DataFetchingDisplayProps) {
  const stats = {
    affirmations: contentData.affirmations.length,
    videos: contentData.videos.length,
    themes: contentData.themes.length,
    welcomeMessageThemes: Object.keys(contentData.welcomeMessages.themes).length
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Data Fetching Test</h3>
      
      {/* Success Message */}
      <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg mb-6">
        <h4 className="font-semibold mb-2">✅ Data Successfully Loaded!</h4>
        <p>All content data has been loaded from JSON files.</p>
      </div>

      {/* Statistics */}
      <div className="mb-6 p-4 bg-[var(--theme-primary)] rounded-lg">
        <h4 className="font-semibold mb-3">Content Statistics:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--theme-accent)]">{stats.affirmations}</div>
            <div>Affirmations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--theme-accent)]">{stats.videos}</div>
            <div>Videos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--theme-accent)]">{stats.themes}</div>
            <div>Themes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--theme-accent)]">{stats.welcomeMessageThemes}</div>
            <div>Welcome Themes</div>
          </div>
        </div>
      </div>

      {/* Sample Data Preview */}
      <div className="space-y-4">
        {/* Sample Affirmation */}
        {contentData.affirmations.length > 0 && (
          <div className="p-4 bg-[var(--theme-surface)] rounded-lg">
            <h4 className="font-semibold mb-2">Sample Affirmation:</h4>
            <div className="text-sm">
              <p className="mb-2">"{contentData.affirmations[0].text}"</p>
              <div className="text-[var(--theme-text-secondary)]">
                <div>ID: {contentData.affirmations[0].id}</div>
                <div>Category: {contentData.affirmations[0].category}</div>
                <div>Themes: {contentData.affirmations[0].themes.join(', ') || 'None'}</div>
                <div>Active: {contentData.affirmations[0].active ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Video */}
        {contentData.videos.length > 0 && (
          <div className="p-4 bg-[var(--theme-surface)] rounded-lg">
            <h4 className="font-semibold mb-2">Sample Video:</h4>
            <div className="text-sm">
              <p className="mb-2 font-medium">{contentData.videos[0].title}</p>
              <div className="text-[var(--theme-text-secondary)]">
                <div>Creator: {contentData.videos[0].creator}</div>
                <div>Category: {contentData.videos[0].category}</div>
                <div>Themes: {contentData.videos[0].themes.join(', ')}</div>
                <div>Active: {contentData.videos[0].active ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Theme */}
        {contentData.themes.length > 0 && (
          <div className="p-4 bg-[var(--theme-surface)] rounded-lg">
            <h4 className="font-semibold mb-2">Sample Theme:</h4>
            <div className="text-sm">
              <p className="mb-2 font-medium">{contentData.themes[0].name}</p>
              <div className="text-[var(--theme-text-secondary)]">
                <div>ID: {contentData.themes[0].id}</div>
                <div>Description: {contentData.themes[0].description}</div>
                <div>Primary Color: {contentData.themes[0].colors.primary}</div>
                <div>Active: {contentData.themes[0].active ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        )}

        {/* App Config */}
        <div className="p-4 bg-[var(--theme-surface)] rounded-lg">
          <h4 className="font-semibold mb-2">App Configuration:</h4>
          <div className="text-sm">
            <div className="text-[var(--theme-text-secondary)]">
              <div>Name: {contentData.appConfig.app.name}</div>
              <div>Version: {contentData.appConfig.app.version}</div>
              <div>Default Theme: {contentData.appConfig.ui.defaultTheme}</div>
              <div>Theme Switching: {contentData.appConfig.features.themeSwitching ? 'Enabled' : 'Disabled'}</div>
              <div>Randomization: {contentData.appConfig.features.randomization ? 'Enabled' : 'Disabled'}</div>
            </div>
          </div>
        </div>

        {/* Welcome Messages Sample */}
        <div className="p-4 bg-[var(--theme-surface)] rounded-lg">
          <h4 className="font-semibold mb-2">Welcome Messages Sample:</h4>
          <div className="text-sm">
            {Object.entries(contentData.welcomeMessages.themes).map(([theme, data]) => (
              <div key={theme} className="mb-2">
                <div className="font-medium capitalize">{theme} Theme:</div>
                <div className="text-[var(--theme-text-secondary)] ml-2">
                  {data.timeRanges.length} time ranges available
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
