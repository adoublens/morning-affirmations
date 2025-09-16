# 🎯 React & Next.js Learning Plan Using Your Morning Affirmations App

> **📝 Quizzes**: All quiz questions are in `learning-plan-quiz.md`  
> **📋 Answers**: All quiz answers are in `learning-plan-quiz-answers.md`  
> This keeps the learning plan focused while preventing accidental spoilers!

## Prompt

You are an experienced React and Next.js developer with 15 years of hands-on experience building complex applications and teaching these technologies. I've just finished building a morning affirmations web app using Next.js and React through "vibe coding" (building intuitively without deep theoretical knowledge), and now I want to use this existing codebase as my learning foundation to truly master React and Next.js concepts.

Your Role:

- Act as my personal mentor and guide through a structured learning journey
- Use my existing morning affirmations app as the primary teaching tool and reference point
- Ensure I genuinely understand each concept before progressing
- Provide interactive, hands-on learning experiences
- Grade and provide detailed feedback on my quiz responses

Learning Structure:

- Follow the learning path outlined in my learning-plan.md file
- For each topic, guide me to:
   - Examine relevant parts of my existing code
   - Identify patterns and implementations in my app
   - Explain concepts I discover through guided questioning
   - Complete hands-on exercises using my codebase
- Ask probing questions to test my understanding
- Only move to the next topic when you're confident I've mastered the current one
- Administer weekly quizzes and provide detailed feedback with grades

Teaching Approach:

- Start each session by asking what specific part of my code we should examine
- Use Socratic method - guide me to discover answers rather than just telling me
- Relate every concept back to practical examples in my morning affirmations app
- Challenge me with "What would happen if..." scenarios
- Encourage me to experiment with my code and predict outcomes

Ground Rules:

- I must demonstrate understanding through code analysis and explanation, not just theoretical knowledge
- You should push back if my explanations are surface-level or incorrect
- Celebrate breakthroughs and provide encouragement when I grasp difficult concepts
- Always connect learning to real-world application and best practices

Ready to begin? Please review this @learning-plan.md file and give me an overview of my morning affirmations app's current structure and features.

## 📚 **Phase 1: Foundation (Weeks 1-2) - TypeScript & React Basics**

### **Week 1: TypeScript Fundamentals**
**Goal**: Understand TypeScript syntax and type system

**Learning Path**:
1. **Start with `types/` directory** - Study type definitions
   - `types/theme.ts` - Learn interfaces, unions, and type composition
   - `types/content.ts` - Understand data modeling with types
   - `types/ui.ts` - Learn component prop typing

**Key Concepts to Master**:
- Interfaces vs Types
- Union types (`'peaceful' | 'energetic' | 'restorative'`)
- Optional properties (`author?: string`)
- Generic types
- Type assertions (`as const`)

**Practice Exercise**: Create a new type for a "User" with preferences

**📝 Quiz**: Complete Quiz 1 in `learning-plan-quiz.md`

### **Week 2: React Fundamentals**
**Goal**: Understand React components, props, and state

**Learning Path**:
1. **Study simple components first**:
   - `components/ui/LoadingSpinner.tsx` - Props and conditional rendering
   - `components/content/AffirmationText.tsx` - Component composition
   - `components/content/AffirmationAuthor.tsx` - Conditional rendering

**Key Concepts to Master**:
- Functional components
- Props and prop types
- JSX syntax
- Conditional rendering (`{author && <span>...}`)
- Component composition

**Practice Exercise**: Create a simple `Button` component with different variants

**📝 Quiz**: Complete Quiz 2 in `learning-plan-quiz.md`

---

## 📱 **Phase 2: Intermediate React (Weeks 3-4) - Hooks & State Management**

### **Week 3: React Hooks**
**Goal**: Master useState, useEffect, and custom hooks

**Learning Path**:
1. **Study `components/content/WelcomeMessage.tsx`**:
   - `useState` for local state
   - `useEffect` for side effects
   - Dependency arrays
   - Cleanup functions

2. **Study `components/theme/useTheme.ts`**:
   - Custom hooks
   - Context consumption
   - Error handling in hooks

**Key Concepts to Master**:
- `useState` for component state
- `useEffect` for side effects
- Custom hooks (`useTheme`)
- Hook dependencies and cleanup
- Context consumption

**Practice Exercise**: Create a `useLocalStorage` hook

**📝 Quiz**: Complete Quiz 3 in `learning-plan-quiz.md`

### **Week 4: State Management & Context**
**Goal**: Understand React Context and state management patterns

**Learning Path**:
1. **Study `components/theme/ThemeProvider.tsx`**:
   - Context creation and provider
   - `useReducer` for complex state
   - State persistence with localStorage
   - Context value optimization

**Key Concepts to Master**:
- React Context API
- `useReducer` vs `useState`
- Context providers and consumers
- State persistence
- Performance optimization

**Practice Exercise**: Create a `UserPreferences` context

**📝 Quiz**: Complete Quiz 4 in `learning-plan-quiz.md`

---

## 🚀 **Phase 3: Next.js Fundamentals (Weeks 5-6) - App Router & SSR**

### **Week 5: Next.js App Router**
**Goal**: Understand Next.js 15 App Router and file-based routing

**Learning Path**:
1. **Study `app/layout.tsx`**:
   - Root layout structure
   - Metadata API
   - Font optimization
   - Global providers

2. **Study `app/page.tsx`**:
   - Server components
   - Data fetching
   - Suspense boundaries
   - Component composition

**Key Concepts to Master**:
- App Router file structure
- Server vs Client components
- Layout nesting
- Metadata API
- Font optimization

**Practice Exercise**: Create a new page with its own layout

**📝 Quiz**: Complete Quiz 5 in `learning-plan-quiz.md`

### **Week 6: Data Fetching & Server Components**
**Goal**: Master server-side data fetching and rendering

**Learning Path**:
1. **Study `lib/utils/getContentData.ts`**:
   - Server-side data loading
   - File system operations
   - Error handling
   - Data validation

2. **Study how data flows in `app/page.tsx`**:
   - Server component data fetching
   - Data transformation
   - Props passing to client components

**Key Concepts to Master**:
- Server-side data fetching
- File system operations
- Data validation
- Error boundaries
- Data transformation

**Practice Exercise**: Create an API route for dynamic data

**📝 Quiz**: Complete Quiz 6 in `learning-plan-quiz.md`

---

## 🎨 **Phase 4: Advanced Patterns (Weeks 7-8) - Performance & Architecture**

### **Week 7: Performance Optimization**
**Goal**: Learn React and Next.js performance patterns

**Learning Path**:
1. **Study Suspense usage in `app/page.tsx`**:
   - Code splitting
   - Loading states
   - Progressive loading

2. **Study component optimization patterns**:
   - Memoization
   - Lazy loading
   - Image optimization

**Key Concepts to Master**:
- Suspense and lazy loading
- Code splitting
- Performance monitoring
- Bundle optimization
- Image optimization

**Practice Exercise**: Implement lazy loading for a heavy component

**📝 Quiz**: Complete Quiz 7 in `learning-plan-quiz.md`

### **Week 8: Advanced Architecture**
**Goal**: Understand advanced React patterns and architecture

**Learning Path**:
1. **Study `lib/content/contentSelector.ts`**:
   - Singleton pattern
   - Class-based architecture
   - Complex business logic

2. **Study error handling patterns**:
   - `components/ui/ErrorBoundary.tsx`
   - Error fallback components
   - Graceful degradation

**Key Concepts to Master**:
- Design patterns (Singleton, Factory)
- Error boundaries
- Graceful degradation
- Business logic separation
- Testing strategies

**Practice Exercise**: Create a data service with error handling

**📝 Quiz**: Complete Quiz 8 in `learning-plan-quiz.md`

---

## 🧪 **Phase 5: Testing & Deployment (Weeks 9-10) - Quality & Production**

### **Week 9: Testing Strategies**
**Goal**: Learn testing React and Next.js applications

**Learning Path**:
1. **Study test components in the codebase**:
   - `*Test.tsx` files
   - Component testing patterns
   - Integration testing

**Key Concepts to Master**:
- Component testing
- Integration testing
- Mocking
- Test utilities
- E2E testing

**Practice Exercise**: Write tests for your custom components

**📝 Quiz**: Complete Quiz 9 in `learning-plan-quiz.md`

### **Week 10: Production & Deployment**
**Goal**: Understand production optimization and deployment

**Learning Path**:
1. **Study build configuration**:
   - `next.config.ts`
   - `package.json` scripts
   - Environment variables

2. **Study production patterns**:
   - Error monitoring
   - Analytics integration
   - Performance monitoring

**Key Concepts to Master**:
- Build optimization
- Environment configuration
- Deployment strategies
- Monitoring and analytics
- Performance auditing

**Practice Exercise**: Deploy your app to Vercel

**📝 Quiz**: Complete Quiz 10 in `learning-plan-quiz.md`

---

## 🎯 **Daily Learning Routine (30-45 minutes)**

### **Morning (15-20 minutes)**
1. **Code Reading**: Pick one file from the current week's focus
2. **Concept Study**: Research the patterns you see in the code
3. **Note Taking**: Document key insights and questions

### **Evening (15-25 minutes)**
1. **Practice Exercise**: Work on the week's practice project
2. **Code Modification**: Try modifying existing components
3. **Reflection**: Review what you learned and plan next steps

---

## 📖 **Recommended Learning Resources**

### **TypeScript**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- Focus on: Interfaces, Union Types, Generics

### **React**
- [React Beta Docs](https://react.dev/)
- Focus on: Hooks, Context, Suspense

### **Next.js**
- [Next.js 15 Docs](https://nextjs.org/docs)
- Focus on: App Router, Server Components, Data Fetching

### **Practice Projects**
1. **Week 2**: Build a simple todo app
2. **Week 4**: Add user preferences to your app
3. **Week 6**: Create a blog with dynamic routes
4. **Week 8**: Build a dashboard with real-time data
5. **Week 10**: Deploy a full-stack application

---

## 🔍 **Code Exploration Strategy**

### **Start with these files in order**:
1. `types/index.ts` - Understand the type system
2. `components/ui/LoadingSpinner.tsx` - Simple component patterns
3. `components/theme/useTheme.ts` - Custom hooks
4. `components/theme/ThemeProvider.tsx` - Context and state management
5. `app/layout.tsx` - Next.js app structure
6. `app/page.tsx` - Server components and data flow
7. `lib/utils/getContentData.ts` - Server-side data fetching
8. `components/content/WelcomeMessage.tsx` - Client component patterns

### **Questions to ask while reading code**:
- What problem does this code solve?
- How does it fit into the larger application?
- What patterns are being used?
- How could this be improved?
- What would happen if I changed X?

---

## 🎉 **Success Metrics**

### **By Week 4**: You should be able to:
- Read and understand TypeScript interfaces
- Create functional React components
- Use basic hooks (useState, useEffect)
- Understand component composition

### **By Week 6**: You should be able to:
- Build custom hooks
- Use React Context effectively
- Understand Next.js App Router
- Fetch data on the server

### **By Week 8**: You should be able to:
- Optimize React performance
- Implement complex state management
- Handle errors gracefully
- Design component architecture

### **By Week 10**: You should be able to:
- Build production-ready applications
- Write comprehensive tests
- Deploy to production
- Debug and optimize performance

---

## 📝 **Learning Notes Template**

### **Week [X] - [Topic]**
**Date**: ___________
**Files Studied**: 
- [ ] File 1
- [ ] File 2

**Key Concepts Learned**:
- Concept 1
- Concept 2

**Questions/Confusion**:
- Question 1
- Question 2

**Practice Exercise Progress**:
- [ ] Started
- [ ] In Progress
- [ ] Completed

**Quiz Results**:
- [ ] Quiz completed (see `learning-plan-quiz.md`)
- [ ] Score: ___/5
- [ ] Questions to review: ___

**Next Week Focus**:
- Goal 1
- Goal 2

---

## 🚀 **Getting Started**

1. **Set up your learning environment**:
   - Open Cursor with your morning affirmations project
   - Create a new branch: `git checkout -b learning-journey`
   - Set up a learning journal (use the notes template above)

2. **Start with Week 1**:
   - Begin by reading `types/index.ts`
   - Follow the learning path for that week
   - Complete the practice exercise
   - Document your progress

3. **Track your progress**:
   - Check off completed items
   - Note any challenges or breakthroughs
   - Adjust the pace as needed

**Remember**: This is your learning journey. Take it at your own pace, ask questions, and don't hesitate to experiment with the code!

---

*This learning plan is tailored specifically to your morning affirmations application and will take you from complete beginner to advanced React and Next.js developer using real-world code examples.*
