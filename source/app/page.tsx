'use client';

import { useState } from 'react';
import { useTheme } from '@/components/theme/useTheme';
import { LoadingSpinner, LoadingDots, LoadingPulse, ErrorBoundary, ErrorFallback } from '@/components/ui';
import { Header } from '@/components/layout';
import { ThemeContextTest } from '@/components/layout/ThemeContextTest';
import { ContentSelectorTest } from '@/components/content/ContentSelectorTest';

// Test component that can trigger an error for ErrorBoundary testing
function ErrorTestComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error triggered by the ErrorTestComponent');
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Click the button below to trigger an error and test the ErrorBoundary component.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="btn btn-secondary w-full"
      >
        Trigger Error
      </button>
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header showThemeSwitcher={true} showNavigation={false} />

      {/* Welcome Section */}
      <section className="section bg-[var(--theme-background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-text-primary)] mb-4">
            Welcome to Your Morning
          </h2>
          <p className="text-lg md:text-xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto">
            Start your day with intention, positivity, and purpose. Choose your theme above to customize your experience.
          </p>
        </div>
      </section>

      {/* Theme Demo */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Theme Preview
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Typography Demo */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <h4 className="mb-2 font-heading">Heading Font (var(--font-heading))</h4>
              <p className="text-sm mb-4 font-body">This demonstrates the theme&apos;s body font family.</p>
              <span className="font-accent text-lg">Accent Font (var(--font-accent))</span>
              <br />
              <span className="font-display text-lg">Display Font (var(--font-display))</span>
            </div>

            {/* Colors Demo */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'var(--theme-primary)'}}></div>
                  <span className="text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'var(--theme-secondary)'}}></div>
                  <span className="text-sm">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'var(--theme-accent)'}}></div>
                  <span className="text-sm">Accent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'var(--theme-background)'}}></div>
                  <span className="text-sm">Background</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{backgroundColor: 'var(--theme-surface)'}}></div>
                  <span className="text-sm">Surface</span>
                </div>
              </div>
            </div>

            {/* Buttons Demo */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Interactive Elements</h3>
              <div className="space-y-3">
                <button className="btn btn-primary w-full">
                  Primary Button
                </button>
                <button className="btn btn-secondary w-full">
                  Secondary Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Font Demonstration */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Font Demonstration
          </h2>
          <div className="card max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Current Theme: {theme.currentTheme}</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-heading text-lg mb-2">Heading Font (var(--font-heading))</h5>
                    <p className="font-heading text-2xl">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Body Font (var(--font-body))</h5>
                    <p className="font-body text-lg">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Accent Font (var(--font-accent))</h5>
                    <p className="font-accent text-xl">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Display Font (var(--font-display))</h5>
                    <p className="font-display text-xl">The quick brown fox jumps over the lazy dog</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Variables Demo */}
      <section className="section">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            CSS Custom Properties
          </h2>
          <div className="card max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Current Theme: {theme.currentTheme}</h4>
                <div className="space-y-2 text-sm">
                  <div>Primary: <span className="font-mono text-blue-600">var(--theme-primary)</span></div>
                  <div>Background: <span className="font-mono text-blue-600">var(--theme-background)</span></div>
                  <div>Text: <span className="font-mono text-blue-600">var(--theme-text-primary)</span></div>
                  <div>Font: <span className="font-mono text-blue-600">var(--font-heading)</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Available Themes</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E8F4F8]"></span>
                    Peaceful - Calm and serene
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFE4B5]"></span>
                    Energetic - Vibrant and dynamic
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#E6E6FA]"></span>
                    Restorative - Healing and nurturing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Selector Test Section */}
      <section className="section bg-[var(--theme-background)]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--theme-text-primary)]">
            Content Selection Test
          </h2>
          <ContentSelectorTest />
        </div>
      </section>

      {/* UI Components Test Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            UI Components Test
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loading Spinners Test */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Loading Spinners</h3>
              <div className="space-y-4">
                <LoadingSpinner size="sm" text="Small spinner" />
                <LoadingSpinner size="md" text="Medium spinner" />
                <LoadingSpinner size="lg" text="Large spinner" />
                <LoadingDots text="Loading dots" />
                <LoadingPulse text="Pulse animation" />
              </div>
            </div>

            {/* Error Boundary Test */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Error Boundary Test</h3>
              <ErrorBoundary>
                <ErrorTestComponent />
              </ErrorBoundary>
            </div>

            {/* Error Fallback Test */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Error Fallback Test</h3>
              <ErrorFallback
                error={new Error('This is a test error for demonstration')}
                title="Test Error"
                message="This is a demonstration of the error fallback component."
                showDetails={true}
                resetError={() => console.log('Error reset clicked')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Morning Affirmations. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>

      {/* Theme Context Test (temporary) */}
      <ThemeContextTest />
    </div>
  );
}
