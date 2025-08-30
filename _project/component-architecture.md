# Component Architecture - Detailed Component Breakdown and Relationships

## Component Hierarchy Overview

```
App Root
├── ThemeProvider (Context Provider)
├── RootLayout
│   ├── Header
│   └── Main Content
│       ├── ThemeSwitcher
│       ├── WelcomeMessage
│       ├── AffirmationsDisplay
│       └── VideoGrid
└── ErrorBoundary
```

---

## Core Component Relationships

### 1. **ThemeProvider** - Global State Management
**Location**: `components/theme/ThemeProvider.tsx`  
**Type**: Context Provider (Client Component)  
**Purpose**: Manages theme state across the entire application

**Dependencies**:
- React Context API
- useReducer for state management
- localStorage for persistence

**Provides**:
- `currentTheme`: Active theme (peaceful/energetic/restorative)
- `isPersistent`: Whether theme should be saved
- `isRandom`: Whether to use random theme selection
- `availableThemes`: Array of all available themes

**Consumed By**:
- All theme-aware components
- ThemeSwitcher
- Content components for theme-specific styling

---

## Layout Components

### 2. **RootLayout** - Application Shell
**Location**: `app/layout.tsx`  
**Type**: Server Component  
**Purpose**: Provides the base HTML structure and theme context

**Structure**:
```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Morning Affirmations</title>
      </head>
      <body>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Dependencies**:
- ThemeProvider
- ErrorBoundary
- Global CSS imports

**Provides**:
- HTML document structure
- Theme context wrapper
- Error boundary protection

---

## Main Page Components

### 3. **HomePage** - Main Application Page
**Location**: `app/page.tsx`  
**Type**: Server Component  
**Purpose**: Orchestrates the main page layout and data fetching

**Data Flow**:
```
getContentData() → ContentData → Components
```

**Component Structure**:
```typescript
export default async function HomePage() {
  const contentData = await getContentData()
  
  return (
    <main>
      <Header />
      <ThemeSwitcher />
      <Suspense fallback={<LoadingSpinner />}>
        <WelcomeMessage data={contentData.welcomeMessages} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AffirmationsDisplay affirmations={contentData.affirmations} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <VideoGrid videos={contentData.videos} />
      </Suspense>
    </main>
  )
}
```

**Dependencies**:
- getContentData utility
- All content components
- Suspense boundaries

**Provides**:
- Page structure
- Data to child components
- Loading states

---

## Theme Management Components

### 4. **ThemeSwitcher** - Theme Selection Interface
**Location**: `components/theme/ThemeSwitcher.tsx`  
**Type**: Client Component  
**Purpose**: Allows users to switch between themes and control persistence

**Component Structure**:
```typescript
export function ThemeSwitcher() {
  const { state, dispatch } = useTheme()
  
  return (
    <div className="theme-switcher">
      <div className="theme-buttons">
        {state.availableThemes.map(theme => (
          <ThemeButton 
            key={theme}
            theme={theme}
            isActive={state.currentTheme === theme}
            onClick={() => handleThemeChange(theme)}
          />
        ))}
      </div>
      <PersistentToggle 
        checked={state.isPersistent}
        onChange={handlePersistentToggle}
      />
    </div>
  )
}
```

**Sub-Components**:
- `ThemeButton`: Individual theme selection button
- `PersistentToggle`: Checkbox for theme persistence

**State Interactions**:
- Reads: `currentTheme`, `isPersistent`, `availableThemes`
- Writes: `SET_THEME`, `SET_PERSISTENT`, `SET_RANDOM`

**Styling**:
- Uses theme context for dynamic colors
- Responsive button layout
- Active state indicators

---

## Content Display Components

### 5. **WelcomeMessage** - Time-Based Greeting
**Location**: `components/content/WelcomeMessage.tsx`  
**Type**: Client Component  
**Purpose**: Displays contextual welcome messages based on time and theme

**Component Structure**:
```typescript
export function WelcomeMessage({ data }: WelcomeMessageProps) {
  const { state } = useTheme()
  const [message, setMessage] = useState<string>('')
  
  useEffect(() => {
    const selector = ContentSelector.getInstance()
    const selectedMessage = selector.selectWelcomeMessage(
      data, 
      state.currentTheme, 
      new Date()
    )
    setMessage(selectedMessage)
  }, [data, state.currentTheme])
  
  return (
    <section className="welcome-message">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        {message}
      </h2>
    </section>
  )
}
```

**Data Flow**:
```
WelcomeMessage → ContentSelector → Time + Theme → Message
```

**Dependencies**:
- useTheme hook
- ContentSelector utility
- Welcome message data

**Features**:
- Time-aware message selection
- Theme-specific content
- Automatic updates on theme change

---

### 6. **AffirmationsDisplay** - Main Affirmation Showcase
**Location**: `components/content/AffirmationsDisplay.tsx`  
**Type**: Client Component  
**Purpose**: Displays the selected affirmation with image and metadata

**Component Structure**:
```typescript
export function AffirmationsDisplay({ affirmations }: AffirmationsDisplayProps) {
  const { state } = useTheme()
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const selector = ContentSelector.getInstance()
    const selected = selector.selectAffirmation(affirmations, state.currentTheme)
    setCurrentAffirmation(selected)
    setIsLoading(false)
  }, [affirmations, state.currentTheme])
  
  if (isLoading) return <LoadingSpinner />
  if (!currentAffirmation) return <NoAffirmationMessage />
  
  return (
    <section className="affirmation-section">
      <AffirmationImage image={currentAffirmation.image} />
      <AffirmationText text={currentAffirmation.text} />
      <AffirmationAuthor author={currentAffirmation.author} />
      <AffirmationCategory category={currentAffirmation.category} />
    </section>
  )
}
```

**Sub-Components**:
- `AffirmationImage`: Displays affirmation image with fallback
- `AffirmationText`: Main affirmation quote display
- `AffirmationAuthor`: Author attribution
- `AffirmationCategory`: Category badge

**Data Flow**:
```
Affirmations Array → ContentSelector → Filtered by Theme → Random Selection → Display
```

**State Management**:
- Local state for current affirmation
- Loading state management
- Theme change reactivity

---

### 7. **VideoGrid** - Resource Video Display
**Location**: `components/content/VideoGrid.tsx`  
**Type**: Client Component  
**Purpose**: Shows curated videos for each category based on current theme

**Component Structure**:
```typescript
export function VideoGrid({ videos }: VideoGridProps) {
  const { state } = useTheme()
  const [selectedVideos, setSelectedVideos] = useState<Map<string, Video>>(new Map())
  
  useEffect(() => {
    const selector = ContentSelector.getInstance()
    const selected = selector.selectVideos(videos, state.currentTheme)
    setSelectedVideos(selected)
  }, [videos, state.currentTheme])
  
  return (
    <section className="video-grid-section">
      <h2>Today's Resources</h2>
      <div className="video-grid">
        {categories.map(category => (
          <VideoCard 
            key={category}
            category={category}
            video={selectedVideos.get(category)}
          />
        ))}
      </div>
    </section>
  )
}
```

**Sub-Components**:
- `VideoCard`: Individual video display card
- `VideoThumbnail`: Video thumbnail image
- `VideoInfo`: Video metadata and description
- `WatchButton`: External link to video

**Data Flow**:
```
Videos Array → ContentSelector → Filter by Theme → Select by Category → Grid Display
```

**Categories**:
- Affirmations
- Bible
- Yoga
- Meditation
- Artsy-Creative

---

## Utility Components

### 8. **ContentSelector** - Content Selection Logic
**Location**: `lib/content/contentSelector.ts`  
**Type**: Utility Class (Singleton)  
**Purpose**: Manages content selection, rotation, and avoidance logic

**Class Structure**:
```typescript
export class ContentSelector {
  private static instance: ContentSelector
  private lastUsed: Map<string, string[]> = new Map()
  
  static getInstance(): ContentSelector {
    if (!ContentSelector.instance) {
      ContentSelector.instance = new ContentSelector()
    }
    return ContentSelector.instance
  }
  
  selectAffirmation(affirmations: Affirmation[], theme: string): Affirmation
  selectVideos(videos: Video[], theme: string): Map<string, Video>
  selectWelcomeMessage(messages: WelcomeMessage, theme: string, currentTime: Date): string
}
```

**Key Methods**:
- `selectAffirmation()`: Chooses affirmation with 7-day avoidance
- `selectVideos()`: Selects videos for each category with 5-day avoidance
- `selectWelcomeMessage()`: Time and theme-based message selection

**Avoidance Logic**:
- Tracks recently used content IDs
- Prevents repetition within specified timeframes
- Automatically resets when all content has been used

---

## UI Components

### 9. **LoadingSpinner** - Loading State Indicator
**Location**: `components/ui/LoadingSpinner.tsx`  
**Type**: Client Component  
**Purpose**: Provides visual feedback during content loading

**Component Structure**:
```typescript
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  )
}
```

**Usage**:
- Suspense fallback
- Component loading states
- Data fetching indicators

---

### 10. **ErrorBoundary** - Error Handling
**Location**: `components/ui/ErrorBoundary.tsx`  
**Type**: Class Component  
**Purpose**: Catches and handles React component errors gracefully

**Component Structure**:
```typescript
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
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />
    }
    return this.props.children
  }
}
```

**Error Handling**:
- Catches component errors
- Provides retry functionality
- Logs error information
- Graceful fallback UI

---

## Data Flow Architecture

### Component Communication Pattern

```
ThemeProvider (Context)
    ↓
ThemeSwitcher (Dispatch Actions)
    ↓
Theme State Changes
    ↓
All Components Re-render with New Theme
    ↓
ContentSelector Filters Content by Theme
    ↓
Components Display Theme-Appropriate Content
```

### Data Fetching Flow

```
Server Component (HomePage)
    ↓
getContentData() (File System)
    ↓
JSON Data Parsing
    ↓
Props to Client Components
    ↓
ContentSelector Processing
    ↓
State Updates
    ↓
UI Re-renders
```

---

## Component Dependencies Map

### Direct Dependencies
```
HomePage
├── getContentData()
├── ThemeSwitcher
├── WelcomeMessage
├── AffirmationsDisplay
└── VideoGrid

ThemeSwitcher
├── useTheme()
└── ThemeProvider

WelcomeMessage
├── useTheme()
├── ContentSelector
└── Welcome message data

AffirmationsDisplay
├── useTheme()
├── ContentSelector
└── Affirmations data

VideoGrid
├── useTheme()
├── ContentSelector
└── Videos data
```

### Shared Dependencies
```
All Components
├── ThemeProvider (Context)
├── CSS Custom Properties
└── Google Fonts

Client Components
├── React Hooks
├── State Management
└── Event Handlers

Content Components
├── ContentSelector
├── Data Structures
└── Theme Filtering
```

---

## Performance Considerations

### Component Optimization Strategies

1. **Memoization**
   - `useMemo` for expensive computations
   - `useCallback` for stable function references
   - `React.memo` for component memoization

2. **Lazy Loading**
   - Dynamic imports for heavy components
   - Suspense boundaries for progressive loading
   - Code splitting by route

3. **State Management**
   - Local state for component-specific data
   - Context for global theme state
   - Efficient re-renders with proper dependencies

4. **Data Fetching**
   - Server-side data loading
   - Client-side content selection
   - Caching strategies for repeated selections

---

## Accessibility Features

### Component Accessibility Implementation

1. **Semantic HTML**
   - Proper heading hierarchy
   - Semantic section elements
   - ARIA labels and descriptions

2. **Keyboard Navigation**
   - Focus management
   - Tab order optimization
   - Keyboard shortcuts for theme switching

3. **Screen Reader Support**
   - Descriptive alt text
   - ARIA live regions
   - Status announcements

4. **Color and Contrast**
   - WCAG AA compliance
   - Theme-specific contrast ratios
   - High contrast mode support

---

## Responsive Design

### Component Responsiveness

1. **Mobile-First Approach**
   - Base styles for mobile
   - Progressive enhancement for larger screens
   - Touch-friendly interactions

2. **Breakpoint Strategy**
   - Small: 320px - 768px
   - Medium: 768px - 1024px
   - Large: 1024px+

3. **Layout Adaptations**
   - Grid to single column on mobile
   - Flexible spacing and sizing
   - Optimized typography scaling

---

## Testing Strategy

### Component Testing Approach

1. **Unit Tests**
   - Individual component rendering
   - Props validation
   - State management logic

2. **Integration Tests**
   - Component interactions
   - Theme switching behavior
   - Content selection logic

3. **Accessibility Tests**
   - Screen reader compatibility
   - Keyboard navigation
   - Color contrast validation

4. **Performance Tests**
   - Render performance
   - Memory usage
   - Bundle size analysis

---

## Data and Asset Storage Structure

### JSON Content Files Location
**Directory**: `data/` (root level)

```
data/
├── affirmations.json             # Affirmation content and metadata
├── youtube-videos.json           # Video content and metadata  
├── welcome-messages.json         # Time-based welcome messages
├── themes.json                   # Theme definitions and colors
├── app-config.json              # Application configuration
└── user-preferences.json        # User preferences (optional)
```

**Access Pattern**: Server-side data fetching in `getContentData()` utility
- Files are read at build time or server-side
- No client-side access to raw JSON files
- Data is passed as props to client components

### Thumbnail Images Storage
**Directory**: `public/images/` (Next.js public folder)

```
public/images/
├── affirmations/                 # Affirmation thumbnail images
│   ├── affirmation-001.jpg
│   ├── affirmation-002.jpg
│   └── ...
├── videos/                       # Video thumbnail images
│   ├── video-001.jpg
│   ├── video-002.jpg
│   └── ...
└── themes/                       # Theme-specific decorative images
    ├── peaceful-bg.jpg
    ├── energetic-bg.jpg
    └── restorative-bg.jpg
```

**Access Pattern**: Direct URL references in JSON data
- Images referenced by filename in JSON content
- URLs constructed as `/images/{category}/{filename}`
- Next.js automatically serves from public folder
- Optimized with Next.js Image component

### Data Access Flow

```
JSON Files (data/) → getContentData() → Server Components → Props → Client Components
     ↓
Image Files (public/images/) → JSON References → Next.js Image Component → Display
```

### File Naming Conventions
- **JSON Files**: kebab-case with descriptive names
- **Images**: descriptive-name-with-id.jpg (e.g., `morning-sunrise-001.jpg`)
- **Consistent IDs**: Match between JSON content and image filenames

### Security Considerations
- **JSON Files**: Server-side only, not exposed to client
- **Images**: Public access, ensure no sensitive content
- **Validation**: JSON schema validation for data integrity
- **Backup**: Version control for content, separate backup for images

This component architecture provides a solid foundation for building a maintainable, scalable, and performant Morning Affirmations application with clear separation of concerns and efficient data flow.
