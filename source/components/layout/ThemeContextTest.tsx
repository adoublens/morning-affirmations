'use client';

import { useTheme } from '@/components/theme/useTheme';

export function ThemeContextTest() {
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 bg-[var(--theme-surface)] border border-[var(--theme-border)] 
                    rounded-lg p-3 shadow-lg text-xs text-[var(--theme-text-secondary)] z-40">
      <div className="font-semibold text-[var(--theme-text-primary)] mb-1">
        Theme Context Test
      </div>
      <div>Current: {theme.currentTheme}</div>
      <div>Persistent: {theme.isPersistent ? 'Yes' : 'No'}</div>
      <div>Random: {theme.isRandom ? 'Yes' : 'No'}</div>
      <div>Available: {theme.availableThemes.length} themes</div>
    </div>
  );
}
