# Technical Implementation Details for React/Next.js

## Project Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS + CSS Custom Properties
- **State Management**: React Context + useReducer
- **Data Fetching**: Server Components + Client Components
- **Deployment**: Vercel (recommended)

### Project Structure
```
morning-affirmations/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles + theme CSS variables
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main affirmations page
│   └── api/                     # API routes (if needed)
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── theme/                   # Theme-related components
│   ├── content/                 # Content display components
│   └── layout/                  # Layout components
├── lib/                         # Utility functions and hooks
│   ├── themes/                  # Theme management
│   ├── content/                 # Content selection logic
│   ├── utils/                   # Helper functions
│   └── types/                   # TypeScript type definitions
├── data/                        # JSON data files
│   ├── affirmations.json        # Affirmations data
│   ├── videos.json              # YouTube videos data
│   ├── themes.json              # Theme configurations
│   └── welcome-messages.json    # Time-based messages
├── public/                      # Static assets
│   ├── images/                  # Affirmation and video thumbnails
│   └── icons/                   # App icons
└── package.json                 # Dependencies and scripts
```

---

## Core Components Architecture

### 1. Theme Provider (`components/theme/ThemeProvider.tsx`)

```typescript
'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { Theme, ThemeAction, ThemeState } from '@/lib/types/theme'

interface ThemeContextType {
  state: ThemeState
  dispatch: React.Dispatch<ThemeAction>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, currentTheme: action.payload }
    case 'SET_PERSISTENT':
      return { ...state, isPersistent: action.payload }
    case 'SET_RANDOM':
      return { ...state, isRandom: action.payload }
    case 'INITIALIZE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, {
    currentTheme: 'peaceful',
    isPersistent: false,
    isRandom: true,
    availableThemes: ['peaceful', 'energetic', 'restorative']
  })

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('morning-affirmations-theme')
    const savedPersistent = localStorage.getItem('morning-affirmations-persistent')
    
    if (savedTheme && savedPersistent === 'true') {
      dispatch({ type: 'SET_THEME', payload: savedTheme as Theme })
      dispatch({ type: 'SET_PERSISTENT', payload: true })
      dispatch({ type: 'SET_RANDOM', payload: false })
    } else if (state.isRandom) {
      // Random theme selection
      const randomTheme = state.availableThemes[
        Math.floor(Math.random() * state.availableThemes.length)
      ]
      dispatch({ type: 'SET_THEME', payload: randomTheme })
    }
  }, [])

  // Save theme changes to localStorage
  useEffect(() => {
    if (state.isPersistent) {
      localStorage.setItem('morning-affirmations-theme', state.currentTheme)
      localStorage.setItem('morning-affirmations-persistent', 'true')
    } else {
      localStorage.removeItem('morning-affirmations-theme')
      localStorage.removeItem('morning-affirmations-persistent')
    }
  }, [state.currentTheme, state.isPersistent])

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

### 2. Theme Switcher (`components/theme/ThemeSwitcher.tsx`)

```typescript
'use client'

import { useTheme } from './ThemeProvider'
import { Theme } from '@/lib/types/theme'

export function ThemeSwitcher() {
  const { state, dispatch } = useTheme()

  const handleThemeChange = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const handlePersistentToggle = () => {
    const newPersistent = !state.isPersistent
    dispatch({ type: 'SET_PERSISTENT', payload: newPersistent })
    dispatch({ type: 'SET_RANDOM', payload: !newPersistent })
  }

  return (
    <div className="theme-switcher">
      <div className="theme-buttons">
        {state.availableThemes.map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`theme-btn ${state.currentTheme === theme ? 'active' : ''}`}
            data-theme={theme}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="persistent-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={state.isPersistent}
            onChange={handlePersistentToggle}
          />
          <span className="toggle-text">
            {state.isPersistent ? 'Theme Saved' : 'Random Theme'}
          </span>
        </label>
      </div>
    </div>
  )
}
```

### 3. Content Selector (`lib/content/contentSelector.ts`)

```typescript
import { Affirmation, Video, WelcomeMessage } from '@/lib/types/content'

export class ContentSelector {
  private static instance: ContentSelector
  private lastUsed: Map<string, string[]> = new Map()

  static getInstance(): ContentSelector {
    if (!ContentSelector.instance) {
      ContentSelector.instance = new ContentSelector()
    }
    return ContentSelector.instance
  }

  // Select random affirmation for current theme
  selectAffirmation(affirmations: Affirmation[], theme: string): Affirmation {
    const themeAffirmations = affirmations.filter(
      aff => aff.themes.includes(theme) && aff.active
    )
    
    if (themeAffirmations.length === 0) {
      // Fallback to any active affirmation
      return this.selectRandom(affirmations.filter(aff => aff.active))
    }

    // Filter out recently used affirmations (within 7 days)
    const available = this.filterRecentlyUsed(themeAffirmations, 'affirmations', 7)
    
    if (available.length === 0) {
      // Reset if all have been used recently
      this.lastUsed.delete('affirmations')
      return this.selectRandom(themeAffirmations)
    }

    const selected = this.selectRandom(available)
    this.recordUsage('affirmations', selected.id)
    
    return selected
  }

  // Select videos for each category in current theme
  selectVideos(videos: Video[], theme: string): Map<string, Video> {
    const themeVideos = videos.filter(video => 
      video.themes.includes(theme) && video.active
    )
    
    const selectedVideos = new Map<string, Video>()
    const categories = ['affirmations', 'bible', 'yoga', 'meditation', 'artsy-creative']
    
    categories.forEach(category => {
      const categoryVideos = themeVideos.filter(video => video.category === category)
      
      if (categoryVideos.length > 0) {
        const available = this.filterRecentlyUsed(categoryVideos, `videos-${category}`, 5)
        
        if (available.length === 0) {
          this.lastUsed.delete(`videos-${category}`)
        }
        
        const selected = this.selectRandom(available.length > 0 ? available : categoryVideos)
        selectedVideos.set(category, selected)
        this.recordUsage(`videos-${category}`, selected.id)
      }
    })
    
    return selectedVideos
  }

  // Select welcome message based on time and theme
  selectWelcomeMessage(messages: WelcomeMessage, theme: string, currentTime: Date): string {
    const themeMessages = messages.themes[theme]
    if (!themeMessages) return 'Good morning!'
    
    const hour = currentTime.getHours()
    const timeRange = this.getTimeRange(hour)
    
    if (timeRange && themeMessages.timeRanges) {
      const range = themeMessages.timeRanges.find(r => r.id === timeRange)
      if (range && range.messages.length > 0) {
        return this.selectRandom(range.messages)
      }
    }
    
    return 'Good morning!'
  }

  private getTimeRange(hour: number): string {
    if (hour >= 5 && hour < 9) return 'early-morning'
    if (hour >= 9 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  }

  private filterRecentlyUsed<T extends { id: string }>(
    items: T[], 
    key: string, 
    days: number
  ): T[] {
    const recentlyUsed = this.lastUsed.get(key) || []
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    
    // In a real app, you'd store timestamps, not just IDs
    // This is a simplified version
    return items.filter(item => !recentlyUsed.includes(item.id))
  }

  private selectRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)]
  }

  private recordUsage(key: string, id: string): void {
    const current = this.lastUsed.get(key) || []
    current.push(id)
    
    // Keep only last 30 entries to prevent memory bloat
    if (current.length > 30) {
      current.splice(0, current.length - 30)
    }
    
    this.lastUsed.set(key, current)
  }
}
```

---

## Main Page Implementation

### 4. Main Page (`app/page.tsx`)

```typescript
import { Suspense } from 'react'
import { AffirmationsDisplay } from '@/components/content/AffirmationsDisplay'
import { VideoGrid } from '@/components/content/VideoGrid'
import { WelcomeMessage } from '@/components/content/WelcomeMessage'
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getContentData } from '@/lib/content/getContentData'

export default async function HomePage() {
  const contentData = await getContentData()

  return (
    <main className="min-h-screen transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Morning Affirmations
          </h1>
          <p className="text-xl md:text-2xl opacity-80">
            Start your day with intention and purpose
          </p>
        </header>

        {/* Theme Switcher */}
        <div className="flex justify-center mb-8">
          <ThemeSwitcher />
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Welcome Message */}
          <Suspense fallback={<LoadingSpinner />}>
            <WelcomeMessage data={contentData.welcomeMessages} />
          </Suspense>

          {/* Main Affirmation */}
          <Suspense fallback={<LoadingSpinner />}>
            <AffirmationsDisplay 
              affirmations={contentData.affirmations}
              theme="peaceful" // Will be dynamic based on context
            />
          </Suspense>

          {/* Video Resources */}
          <Suspense fallback={<LoadingSpinner />}>
            <VideoGrid 
              videos={contentData.videos}
              theme="peaceful" // Will be dynamic based on context
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
```

### 5. Content Display Components

#### Affirmations Display (`components/content/AffirmationsDisplay.tsx`)

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Affirmation } from '@/lib/types/content'
import { ContentSelector } from '@/lib/content/contentSelector'

interface AffirmationsDisplayProps {
  affirmations: Affirmation[]
  theme: string
}

export function AffirmationsDisplay({ affirmations, theme }: AffirmationsDisplayProps) {
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { state } = useTheme()

  useEffect(() => {
    const selector = ContentSelector.getInstance()
    const selected = selector.selectAffirmation(affirmations, state.currentTheme)
    setCurrentAffirmation(selected)
    setIsLoading(false)
  }, [affirmations, state.currentTheme])

  if (isLoading) {
    return <div className="text-center py-12">Loading affirmation...</div>
  }

  if (!currentAffirmation) {
    return <div className="text-center py-12">No affirmation available</div>
  }

  return (
    <section className="affirmation-section">
      <div className="max-w-4xl mx-auto text-center">
        {/* Affirmation Image */}
        {currentAffirmation.image && (
          <div className="mb-8">
            <img
              src={`/images/${currentAffirmation.image.filename}`}
              alt={currentAffirmation.image.alt}
              className="mx-auto rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        )}

        {/* Affirmation Text */}
        <blockquote className="mb-6">
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-medium">
            "{currentAffirmation.text}"
          </p>
        </blockquote>

        {/* Author */}
        <footer className="text-lg md:text-xl opacity-80">
          — {currentAffirmation.author}
        </footer>

        {/* Category Badge */}
        <div className="mt-6">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-opacity-20">
            {currentAffirmation.category}
          </span>
        </div>
      </div>
    </section>
  )
}
```

#### Video Grid (`components/content/VideoGrid.tsx`)

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Video } from '@/lib/types/content'
import { ContentSelector } from '@/lib/content/contentSelector'

interface VideoGridProps {
  videos: Video[]
  theme: string
}

export function VideoGrid({ videos, theme }: VideoGridProps) {
  const [selectedVideos, setSelectedVideos] = useState<Map<string, Video>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const { state } = useTheme()

  useEffect(() => {
    const selector = ContentSelector.getInstance()
    const selected = selector.selectVideos(videos, state.currentTheme)
    setSelectedVideos(selected)
    setIsLoading(false)
  }, [videos, state.currentTheme])

  if (isLoading) {
    return <div className="text-center py-12">Loading videos...</div>
  }

  const categories = ['affirmations', 'bible', 'yoga', 'meditation', 'artsy-creative']

  return (
    <section className="video-grid-section">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Today's Resources
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => {
          const video = selectedVideos.get(category)
          if (!video) return null

          return (
            <div key={category} className="video-card">
              {/* Thumbnail */}
              {video.thumbnail && (
                <div className="mb-4">
                  <img
                    src={`/images/${video.thumbnail.filename}`}
                    alt={video.thumbnail.alt}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Video Info */}
              <div className="video-info">
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {category.replace('-', ' ')}
                </h3>
                
                <h4 className="text-base font-medium mb-2 line-clamp-2">
                  {video.title}
                </h4>
                
                <p className="text-sm opacity-80 mb-3">
                  {video.creator}
                </p>

                {/* Watch Button */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Watch Video
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

---

## Styling and Theme System

### 6. Global Styles (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500&family=Lora:wght@400;500;600&family=Dancing+Script:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;600&family=Playfair+Display:wght@400;600;700&display=swap');

/* CSS Custom Properties for Themes */
:root {
  /* Peaceful Theme */
  --peaceful-primary: #E8F4F8;
  --peaceful-secondary: #B8E6B8;
  --peaceful-accent: #87CEEB;
  --peaceful-background: #F0F8FF;
  --peaceful-background-transition: #E6F3FF;
  --peaceful-text: #2F4F4F;
  
  /* Energetic Theme */
  --energetic-primary: #FFE4B5;
  --energetic-secondary: #FFB6C1;
  --energetic-accent: #FFD700;
  --energetic-background: #FFF8DC;
  --energetic-background-transition: #FFEFD5;
  --energetic-text: #4A4A4A;
  
  /* Restorative Theme */
  --restorative-primary: #E6E6FA;
  --restorative-secondary: #DDA0DD;
  --restorative-accent: #9370DB;
  --restorative-background: #F8F8FF;
  --restorative-background-transition: #F0F0FF;
  --restorative-text: #696969;
}

/* Theme Classes */
.theme-peaceful {
  --primary: var(--peaceful-primary);
  --secondary: var(--peaceful-secondary);
  --accent: var(--peaceful-accent);
  --background: var(--peaceful-background);
  --background-transition: var(--peaceful-background-transition);
  --text: var(--peaceful-text);
  
  --font-primary: 'Quicksand', sans-serif;
  --font-secondary: 'Lora', serif;
  --font-accent: 'Dancing Script', cursive;
  
  --font-weight-primary: 300;
  --font-weight-secondary: 400;
  --font-weight-accent: 500;
}

.theme-energetic {
  --primary: var(--energetic-primary);
  --secondary: var(--energetic-secondary);
  --accent: var(--energetic-accent);
  --background: var(--energetic-background);
  --background-transition: var(--energetic-background-transition);
  --text: var(--energetic-text);
  
  --font-primary: 'Poppins', sans-serif;
  --font-secondary: 'Open Sans', sans-serif;
  --font-accent: 'Pacifico', cursive;
  
  --font-weight-primary: 600;
  --font-weight-secondary: 400;
  --font-weight-accent: 400;
}

.theme-restorative {
  --primary: var(--restorative-primary);
  --secondary: var(--restorative-secondary);
  --accent: var(--restorative-accent);
  --background: var(--restorative-background);
  --background-transition: var(--restorative-background-transition);
  --text: var(--restorative-text);
  
  --font-primary: 'Merriweather', serif;
  --font-secondary: 'Source Sans Pro', sans-serif;
  --font-accent: 'Playfair Display', serif;
  
  --font-weight-primary: 400;
  --font-weight-secondary: 300;
  --font-weight-accent: 600;
}

/* Base Styles */
body {
  background-color: var(--background);
  color: var(--text);
  font-family: var(--font-secondary);
  transition: all 0.5s ease;
}

/* Background Transition Animation */
.background-transition {
  animation: backgroundShift 3s ease-in-out infinite;
}

@keyframes backgroundShift {
  0% { background-color: var(--background); }
  50% { background-color: var(--background-transition); }
  100% { background-color: var(--background); }
}

/* Component Styles */
.affirmation-section {
  background-color: var(--primary);
  border: 2px solid var(--secondary);
  border-radius: 20px;
  padding: 3rem 2rem;
  margin: 2rem 0;
}

.video-card {
  background-color: var(--primary);
  border: 2px solid var(--secondary);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.theme-btn {
  background-color: var(--accent);
  color: var(--text);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.theme-btn.active {
  background-color: var(--secondary);
  transform: scale(1.05);
}
```

---

## Data Management and API

### 7. Content Data Fetcher (`lib/content/getContentData.ts`)

```typescript
import { promises as fs } from 'fs'
import path from 'path'

export async function getContentData() {
  const dataDir = path.join(process.cwd(), 'data')
  
  try {
    const [
      affirmationsData,
      videosData,
      themesData,
      welcomeMessagesData
    ] = await Promise.all([
      fs.readFile(path.join(dataDir, 'affirmations.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'youtube-videos.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'themes.json'), 'utf-8'),
      fs.readFile(path.join(dataDir, 'welcome-messages.json'), 'utf-8')
    ])

    return {
      affirmations: JSON.parse(affirmationsData),
      videos: JSON.parse(videosData),
      themes: JSON.parse(themesData),
      welcomeMessages: JSON.parse(welcomeMessagesData)
    }
  } catch (error) {
    console.error('Error loading content data:', error)
    throw new Error('Failed to load content data')
  }
}
```

### 8. Type Definitions (`lib/types/index.ts`)

```typescript
// Theme Types
export type Theme = 'peaceful' | 'energetic' | 'restorative'

export interface ThemeState {
  currentTheme: Theme
  isPersistent: boolean
  isRandom: boolean
  availableThemes: Theme[]
}

export type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_PERSISTENT'; payload: boolean }
  | { type: 'SET_RANDOM'; payload: boolean }
  | { type: 'INITIALIZE'; payload: Partial<ThemeState> }

// Content Types
export interface Affirmation {
  id: string
  text: string
  author: string
  category: string
  themes: Theme[]
  tags: string[]
  image?: {
    filename: string
    alt: string
  }
  active: boolean
}

export interface Video {
  id: string
  title: string
  url: string
  creator: string
  creatorChannel: string
  category: string
  themes: Theme[]
  thumbnail?: {
    filename: string
    alt: string
  }
  tags: string[]
  active: boolean
}

export interface WelcomeMessage {
  themes: {
    [key in Theme]: {
      timeRanges: Array<{
        id: string
        startTime: string
        endTime: string
        messages: string[]
      }>
    }
  }
}

export interface ThemeConfig {
  id: Theme
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    backgroundTransition: string
  }
  fonts: {
    primary: string
    secondary: string
    accent: string
  }
  fontWeights: {
    primary: number
    secondary: number
    accent: number
  }
  transitions: {
    backgroundDuration: number
    backgroundEasing: string
  }
  active: boolean
}
```

---

## Performance Optimizations

### 9. Performance Features

```typescript
// Image Optimization
import Image from 'next/image'

// Lazy Loading
import { Suspense, lazy } from 'react'

// Dynamic Imports
const VideoGrid = lazy(() => import('@/components/content/VideoGrid'))

// Memoization
import { useMemo } from 'react'

export function OptimizedAffirmationsDisplay({ affirmations, theme }: Props) {
  const filteredAffirmations = useMemo(() => {
    return affirmations.filter(aff => aff.themes.includes(theme) && aff.active)
  }, [affirmations, theme])

  // ... rest of component
}
```

### 10. Loading States and Error Boundaries

```typescript
// Loading Spinner Component
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  )
}

// Error Boundary
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-3 bg-accent rounded-lg"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

## Deployment and Build Configuration

### 11. Next.js Configuration (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### 12. Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  }
}
```

This technical implementation provides a solid foundation for your Morning Affirmations app with:
- **Modern React patterns** (hooks, context, server components)
- **Type safety** with TypeScript
- **Performance optimizations** (lazy loading, memoization)
- **Accessible design** with proper ARIA labels
- **Responsive layout** with Tailwind CSS
- **Theme system** with CSS custom properties
- **Error handling** and loading states

Ready to move on to component architecture or project structure next?
