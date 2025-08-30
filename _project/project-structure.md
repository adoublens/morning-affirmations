# Project Structure - File Organization and Setup Instructions

## Complete Project Directory Structure

```
morning-affirmations/
├── app/                          # Next.js 15 App Router
│   ├── globals.css              # Global styles + CSS custom properties
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main affirmations page
│   ├── favicon.ico              # App icon
│   └── api/                     # API routes (if needed)
│       └── .gitkeep             # Placeholder for API routes
├── components/                   # React components
│   ├── theme/                   # Theme management components
│   │   ├── ThemeProvider.tsx    # Theme context provider
│   │   ├── ThemeSwitcher.tsx   # Theme selection interface
│   │   ├── ThemeButton.tsx      # Individual theme button
│   │   └── PersistentToggle.tsx # Theme persistence toggle
│   ├── content/                 # Content display components
│   │   ├── WelcomeMessage.tsx   # Time-based welcome message
│   │   ├── AffirmationsDisplay.tsx # Main affirmation showcase
│   │   ├── AffirmationImage.tsx # Affirmation image display
│   │   ├── AffirmationText.tsx  # Affirmation quote text
│   │   ├── AffirmationAuthor.tsx # Author attribution
│   │   ├── AffirmationCategory.tsx # Category badge
│   │   ├── VideoGrid.tsx        # Video resource grid
│   │   ├── VideoCard.tsx        # Individual video card
│   │   ├── VideoThumbnail.tsx   # Video thumbnail image
│   │   ├── VideoInfo.tsx        # Video metadata display
│   │   └── WatchButton.tsx      # External video link button
│   ├── layout/                  # Layout components
│   │   └── Header.tsx           # Application header
│   └── ui/                      # Reusable UI components
│       ├── LoadingSpinner.tsx   # Loading state indicator
│       ├── ErrorBoundary.tsx    # Error handling component
│       └── ErrorFallback.tsx    # Error fallback UI
├── lib/                         # Utility functions and classes
│   ├── content/                 # Content management utilities
│   │   └── contentSelector.ts   # Content selection logic
│   ├── theme/                   # Theme utilities
│   │   └── themeUtils.ts        # Theme helper functions
│   └── utils/                   # General utilities
│       └── getContentData.ts    # Server-side data fetching
├── types/                       # TypeScript type definitions
│   ├── content.ts               # Content-related types
│   ├── theme.ts                 # Theme-related types
│   ├── ui.ts                    # UI component types
│   └── index.ts                 # Type exports
├── data/                        # JSON content files
│   ├── affirmations.json        # Affirmation content and metadata
│   ├── youtube-videos.json      # Video content and metadata
│   ├── welcome-messages.json    # Time-based welcome messages
│   ├── themes.json              # Theme definitions and colors
│   ├── app-config.json          # Application configuration
│   └── user-preferences.json    # User preferences (optional)
├── public/                      # Static assets
│   ├── images/                  # Thumbnail and theme images
│   │   ├── affirmations/        # Affirmation thumbnail images
│   │   │   ├── affirmation-001.jpg
│   │   │   ├── affirmation-002.jpg
│   │   │   └── ...
│   │   ├── videos/              # Video thumbnail images
│   │   │   ├── video-001.jpg
│   │   │   ├── video-002.jpg
│   │   │   └── ...
│   │   └── themes/              # Theme-specific decorative images
│   │       ├── peaceful-bg.jpg
│   │       ├── energetic-bg.jpg
│   │       └── restorative-bg.jpg
│   ├── icons/                   # App icons
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── icon-192.png
│   └── fonts/                   # Local font files (if not using Google Fonts)
├── styles/                      # Additional stylesheets
│   └── components.css           # Component-specific styles
├── _project/                    # Project documentation
│   ├── RoadMap.md               # Original project roadmap
│   ├── RoadMapReviewer.md       # Roadmap analysis
│   ├── data-schemas.md          # Data structure definitions
│   ├── color-schemes.md         # Color palette specifications
│   ├── google-fonts.md          # Typography specifications
│   ├── technical-implementation.md # Technical implementation details
│   ├── component-architecture.md # Component breakdown
│   └── project-structure.md     # This file
├── .gitignore                   # Git ignore patterns
├── .eslintrc.json               # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project overview and setup
└── morning-affirmations.code-workspace # VS Code workspace
```

---

## Setup Instructions

### 1. **Initial Project Creation**

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest morning-affirmations --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Navigate to project directory
cd morning-affirmations

# Install additional dependencies
npm install @types/node
```

### 2. **Directory Structure Setup**

```bash
# Create main directories
mkdir -p components/{theme,content,layout,ui}
mkdir -p lib/{content,theme,utils}
mkdir -p types
mkdir -p data
mkdir -p public/{images/{affirmations,videos,themes},icons,fonts}
mkdir -p styles
mkdir -p app/api

# Create placeholder files
touch app/api/.gitkeep
touch styles/components.css
```

### 3. **Configuration Files Setup**

#### **next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['img.youtube.com'], // For YouTube thumbnails
    formats: ['image/webp', 'image/avif'],
  },
  // Enable static exports if needed
  // output: 'export',
}

module.exports = nextConfig
```

#### **tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors will be defined in CSS custom properties
      },
      fontFamily: {
        // Google Fonts will be imported in globals.css
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

#### **tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/data/*": ["./data/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### **.eslintrc.json**
```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

#### **.prettierrc**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 4. **Package.json Scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "clean": "rm -rf .next out",
    "export": "next build && next export"
  }
}
```

---

## File Creation Order

### **Phase 1: Foundation (Week 1)**
1. **Configuration files** (next.config.js, tailwind.config.js, tsconfig.json)
2. **Type definitions** (types/index.ts, types/theme.ts, types/content.ts)
3. **Global styles** (app/globals.css)
4. **Root layout** (app/layout.tsx)

### **Phase 2: Core Components (Week 2)**
1. **Theme system** (ThemeProvider, useTheme hook)
2. **Basic UI components** (LoadingSpinner, ErrorBoundary)
3. **Layout components** (Header)

### **Phase 3: Content Components (Week 3)**
1. **Content utilities** (ContentSelector, getContentData)
2. **Content display components** (WelcomeMessage, AffirmationsDisplay)
3. **Video components** (VideoGrid, VideoCard)

### **Phase 4: Integration & Polish (Week 4)**
1. **Main page** (app/page.tsx)
2. **Theme switcher** (ThemeSwitcher)
3. **Data files** (JSON content)
4. **Testing and optimization**

---

## Development Workflow

### **Daily Development Process**
```bash
# Start development server
npm run dev

# In another terminal, run type checking
npm run type-check

# Before commits, run linting and formatting
npm run lint:fix
npm run format
```

### **Code Quality Checks**
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format:check

# Build check
npm run build
```

---

## Environment Setup

### **Required Software**
- **Node.js**: 18.17 or later
- **npm**: 9.0 or later
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### **VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### **Environment Variables**
```bash
# .env.local (create this file)
NEXT_PUBLIC_APP_NAME="Morning Affirmations"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

---

## Data Migration Strategy

### **From CSV to JSON**
1. **Convert existing CSV data** to JSON format
2. **Create thumbnail images** for affirmations and videos
3. **Organize images** in public/images structure
4. **Validate JSON** against defined schemas

### **Content Organization**
```bash
# Example data structure setup
data/
├── affirmations.json     # Convert from output_AFFIRMATION.csv
├── youtube-videos.json   # Create from video content
├── welcome-messages.json # Create theme-specific messages
├── themes.json          # Define color schemes and fonts
└── app-config.json      # Application settings
```

---

## Deployment Preparation

### **Build Optimization**
```bash
# Production build
npm run build

# Analyze bundle size
npm run build -- --analyze

# Static export (if needed)
npm run export
```

### **Performance Monitoring**
- **Lighthouse scores** for performance, accessibility, SEO
- **Core Web Vitals** monitoring
- **Bundle size** analysis
- **Image optimization** verification

---

## Next Steps

After completing the project structure setup:

1. **Start with Phase 1** - Foundation and configuration
2. **Create type definitions** for TypeScript safety
3. **Set up global styles** with theme CSS variables
4. **Build core components** incrementally
5. **Test each phase** before moving to the next

This structure provides a solid foundation for building your Morning Affirmations application with clear organization, proper tooling, and scalable architecture.
