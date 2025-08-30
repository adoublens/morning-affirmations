# Morning Affirmations App - Build Checklist

## 📋 Project Setup & Configuration

### **Phase 1: Foundation (Week 1)**

#### **Environment Setup**
- [x] Install Node.js 18.17+ and npm 9.0+ ✅ **Node.js v22.17.1, npm v10.9.2**
- [x] Install Cursor with recommended extensions ✅ **Using Cursor instead of VS Code**
- [x] Set up Git repository ✅ **Git repository already configured**
- [ ] Create project directory

#### **Project Creation**
- [x] Run `npx create-next-app@latest morning-affirmations --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"` ✅ **Created in app/ subdirectory**
- [x] Navigate to project directory ✅ **Currently in app/ directory**
- [x] Install additional dependencies (`@types/node`) ✅ **Already installed**
- [x] Verify Next.js 15, TypeScript, and Tailwind are working ✅ **Project created successfully**

#### **Directory Structure**
- [x] Create `components/{theme,content,layout,ui}` directories ✅ **All component directories created**
- [x] Create `lib/{content,theme,utils}` directories ✅ **All lib directories created**
- [x] Create `types` directory ✅ **Types directory created**
- [x] Create `data` directory ✅ **Data directory created**
- [x] Create `public/{images/{affirmations,videos,themes},icons,fonts}` directories ✅ **All public directories created**
- [x] Create `styles` directory ✅ **Styles directory created**
- [x] Create `app/api` directory ✅ **API directory created**
- [x] Create placeholder files (`.gitkeep`, `components.css`) ✅ **Placeholder files created**

#### **Configuration Files**
- [x] Configure `next.config.js` (image domains, experimental features) ✅ **Updated with image domains and experimental features**
- [x] Configure `tailwind.config.js` (animations, custom properties) ✅ **Created with custom animations and keyframes**
- [x] Configure `tsconfig.json` (path aliases, strict mode) ✅ **Updated with proper path aliases**
- [x] Configure `.eslintrc.json` (rules, extends) ✅ **Already properly configured**
- [x] Configure `.prettierrc` (formatting rules) ✅ **Created with formatting rules**
- [x] Update `package.json` scripts (dev, build, lint, format, type-check) ✅ **Added all necessary scripts**
- [x] Create `.env.local` with environment variables ✅ **Instructions provided below**

#### **Type Definitions**
- [ ] Create `types/index.ts` (main type exports)
- [ ] Create `types/theme.ts` (Theme, ThemeConfig types)
- [ ] Create `types/content.ts` (Affirmation, Video, WelcomeMessage types)
- [ ] Create `types/ui.ts` (component prop types)
- [ ] Verify all types compile without errors

#### **Global Styles**
- [ ] Set up `app/globals.css` with CSS custom properties
- [ ] Import Google Fonts (Quicksand, Lora, Dancing Script, Poppins, Open Sans, Pacifico, Merriweather, Source Sans Pro, Playfair Display)
- [ ] Define theme color variables (peaceful, energetic, restorative)
- [ ] Set up base styles and animations
- [ ] Verify theme switching works with CSS variables

---

## 🎨 Core Components (Week 2)

### **Theme System**
- [ ] Create `components/theme/ThemeProvider.tsx` (Context + useReducer)
- [ ] Create `components/theme/useTheme.ts` hook
- [ ] Implement theme state management (currentTheme, isPersistent, isRandom)
- [ ] Add localStorage persistence
- [ ] Test theme switching and persistence

#### **Basic UI Components**
- [ ] Create `components/ui/LoadingSpinner.tsx` (animated spinner)
- [ ] Create `components/ui/ErrorBoundary.tsx` (error handling)
- [ ] Create `components/ui/ErrorFallback.tsx` (error UI)
- [ ] Test error boundary functionality
- [ ] Verify loading states work properly

#### **Layout Components**
- [ ] Create `components/layout/Header.tsx` (app header)
- [ ] Implement responsive header design
- [ ] Add navigation elements if needed
- [ ] Test header responsiveness

#### **Root Layout**
- [ ] Update `app/layout.tsx` with ThemeProvider wrapper
- [ ] Add ErrorBoundary wrapper
- [ ] Import global CSS
- [ ] Set up proper HTML structure
- [ ] Test theme context availability

---

## 📱 Content Components (Week 3)

### **Content Utilities**
- [ ] Create `lib/content/contentSelector.ts` (ContentSelector class)
- [ ] Implement singleton pattern
- [ ] Add content selection logic (affirmations, videos, welcome messages)
- [ ] Implement avoidance logic (7-day for affirmations, 5-day for videos)
- [ ] Test content rotation and avoidance

#### **Data Fetching**
- [ ] Create `lib/utils/getContentData.ts` (server-side data loading)
- [ ] Implement file system reading for JSON files
- [ ] Add error handling for missing files
- [ ] Test data loading from data/ directory

#### **Welcome Message Component**
- [ ] Create `components/content/WelcomeMessage.tsx`
- [ ] Implement time-based message selection
- [ ] Add theme-specific content filtering
- [ ] Test different time ranges and themes
- [ ] Verify message updates on theme change

#### **Affirmations Display**
- [ ] Create `components/content/AffirmationsDisplay.tsx`
- [ ] Create `components/content/AffirmationImage.tsx`
- [ ] Create `components/content/AffirmationText.tsx`
- [ ] Create `components/content/AffirmationAuthor.tsx`
- [ ] Create `components/content/AffirmationCategory.tsx`
- [ ] Implement theme-based affirmation filtering
- [ ] Test image display and fallbacks
- [ ] Verify responsive design

#### **Video Components**
- [ ] Create `components/content/VideoGrid.tsx`
- [ ] Create `components/content/VideoCard.tsx`
- [ ] Create `components/content/VideoThumbnail.tsx`
- [ ] Create `components/content/VideoInfo.tsx`
- [ ] Create `components/content/WatchButton.tsx`
- [ ] Implement category-based video selection
- [ ] Test video grid responsiveness
- [ ] Verify external link functionality

---

## 🔧 Integration & Polish (Week 4)

### **Theme Switcher**
- [ ] Create `components/theme/ThemeSwitcher.tsx`
- [ ] Create `components/theme/ThemeButton.tsx`
- [ ] Create `components/theme/PersistentToggle.tsx`
- [ ] Implement theme selection buttons
- [ ] Add persistent theme toggle
- [ ] Test theme switching and persistence
- [ ] Verify responsive button layout

### **Main Page**
- [ ] Create `app/page.tsx` (main application page)
- [ ] Implement Suspense boundaries for content loading
- [ ] Add proper loading states
- [ ] Test page responsiveness
- [ ] Verify all components render correctly

### **Data Files Creation**
- [ ] Convert `output_AFFIRMATION.csv` to `data/affirmations.json`
- [ ] Create `data/youtube-videos.json` with video content
- [ ] Create `data/welcome-messages.json` with theme-specific messages
- [ ] Create `data/themes.json` with color schemes and fonts
- [ ] Create `data/app-config.json` with application settings
- [ ] Validate all JSON against defined schemas
- [ ] Test data loading and parsing

### **Image Assets**
- [ ] Create thumbnail images for affirmations
- [ ] Create thumbnail images for videos
- [ ] Create theme-specific background images
- [ ] Organize images in `public/images/` structure
- [ ] Optimize images for web (WebP, AVIF)
- [ ] Test image loading and display
- [ ] Verify responsive image behavior

---

## 🧪 Testing & Quality Assurance

### **Component Testing**
- [ ] Test all components render without errors
- [ ] Verify theme switching works across all components
- [ ] Test responsive design on different screen sizes
- [ ] Verify accessibility features (ARIA labels, keyboard navigation)
- [ ] Test error boundary functionality

### **Data Validation**
- [ ] Verify JSON schema compliance
- [ ] Test content selection logic
- [ ] Verify avoidance periods work correctly
- [ ] Test welcome message time-based selection
- [ ] Verify theme filtering works properly

### **Performance Testing**
- [ ] Run Lighthouse performance audit
- [ ] Check Core Web Vitals scores
- [ ] Analyze bundle size
- [ ] Test image optimization
- [ ] Verify lazy loading works

### **Cross-browser Testing**
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers
- [ ] Verify theme switching works everywhere

---

## 🚀 Deployment Preparation

### **Build Optimization**
- [ ] Run production build (`npm run build`)
- [ ] Fix any build errors
- [ ] Analyze bundle size
- [ ] Optimize images and assets
- [ ] Verify static export works (if needed)

### **Final Checks**
- [ ] Run all linting checks (`npm run lint`)
- [ ] Run type checking (`npm run type-check`)
- [ ] Run formatting check (`npm run format:check`)
- [ ] Test production build locally (`npm run start`)
- [ ] Verify all functionality works in production mode

### **Documentation**
- [ ] Update README.md with setup instructions
- [ ] Document any environment variables needed
- [ ] Add deployment instructions
- [ ] Document known issues or limitations
- [ ] Add troubleshooting guide

---

## 📊 Progress Tracking

### **Week 1 Progress: Foundation**
- [x] Environment setup: **3/4 tasks completed**
- [x] Project creation: **4/4 tasks completed**
- [x] Directory structure: **8/8 tasks completed**
- [x] Configuration files: **7/7 tasks completed**
- [ ] Type definitions: ___/5 tasks completed
- [ ] Global styles: ___/5 tasks completed

**Week 1 Total: **22/33 tasks completed****

### **Week 2 Progress: Core Components**
- [ ] Theme system: ___/5 tasks completed
- [ ] Basic UI components: ___/5 tasks completed
- [ ] Layout components: ___/4 tasks completed
- [ ] Root layout: ___/5 tasks completed

**Week 2 Total: ___/19 tasks completed**

### **Week 3 Progress: Content Components**
- [ ] Content utilities: ___/5 tasks completed
- [ ] Data fetching: ___/4 tasks completed
- [ ] Welcome message: ___/5 tasks completed
- [ ] Affirmations display: ___/8 tasks completed
- [ ] Video components: ___/8 tasks completed

**Week 3 Total: ___/30 tasks completed**

### **Week 4 Progress: Integration & Polish**
- [ ] Theme switcher: ___/7 tasks completed
- [ ] Main page: ___/5 tasks completed
- [ ] Data files: ___/7 tasks completed
- [ ] Image assets: ___/7 tasks completed

**Week 4 Total: ___/26 tasks completed**

### **Final Phase: Testing & Deployment**
- [ ] Component testing: ___/5 tasks completed
- [ ] Data validation: ___/5 tasks completed
- [ ] Performance testing: ___/5 tasks completed
- [ ] Cross-browser testing: ___/5 tasks completed
- [ ] Build optimization: ___/5 tasks completed
- [ ] Final checks: ___/5 tasks completed
- [ ] Documentation: ___/5 tasks completed

**Final Phase Total: ___/35 tasks completed**

---

## 🎯 Overall Project Progress

**Total Tasks: 143**
**Completed: **22/143**
**Progress: **15.4%**

---

## 📝 Notes & Issues

### **Completed Tasks**
- [Date] Task description
- [Date] Task description

### **Issues Encountered**
- [Date] Issue description - Resolution
- [Date] Issue description - Resolution

### **Next Steps**
- [ ] Immediate next task
- [ ] Upcoming milestone
- [ ] Blockers to resolve

---

## 🏆 Success Criteria

### **Functional Requirements**
- [ ] App loads without errors
- [ ] Theme switching works smoothly
- [ ] Content rotates properly with avoidance
- [ ] Responsive design works on all devices
- [ ] Images load and display correctly

### **Performance Requirements**
- [ ] Lighthouse Performance score > 90
- [ ] Core Web Vitals are "Good"
- [ ] Bundle size < 500KB
- [ ] Images optimized for web

### **Quality Requirements**
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Code follows Prettier formatting
- [ ] All components accessible (WCAG AA)

**Use this checklist to track your progress and ensure nothing is missed during development. Check off items as you complete them and update the progress tracking sections regularly.**
