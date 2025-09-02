'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState('peaceful');

  const themes = [
    { id: 'peaceful', name: 'Peaceful', description: 'Calm and serene' },
    { id: 'energetic', name: 'Energetic', description: 'Vibrant and dynamic' },
    { id: 'restorative', name: 'Restorative', description: 'Healing and nurturing' }
  ];

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-gradient">
            Morning Affirmations
          </h1>
          <p className="text-center text-lg mt-2 text-gray-600">
            Start your day with positivity and purpose
          </p>
        </div>
      </header>

      {/* Theme Switcher */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Choose Your Theme
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentTheme === theme.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
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
              <p className="text-sm mb-4 font-body">This demonstrates the theme's body font family.</p>
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
                <h4 className="font-semibold mb-3">Current Theme: {currentTheme}</h4>
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
                <h4 className="font-semibold mb-3">Current Theme: {currentTheme}</h4>
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
                  {themes.map((theme) => (
                    <li key={theme.id} className="flex items-center gap-2">
                      <span 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: theme.id === 'peaceful' ? '#E8F4F8' :
                                          theme.id === 'energetic' ? '#FFE4B5' :
                                          '#E6E6FA'
                        }}
                      ></span>
                      {theme.name} - {theme.description}
                    </li>
                  ))}
                </ul>
              </div>
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
    </div>
  );
}
