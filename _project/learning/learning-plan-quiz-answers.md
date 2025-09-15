# 📝 Quiz Answers - React & Next.js Learning Plan

> **Note**: Only check these answers after completing each quiz! The answers are organized by quiz number to match the learning plan.

---

## **Quiz 1: TypeScript Fundamentals**

1. **What's the difference between `interface` and `type` in TypeScript?**
   - Interfaces are extendable and can be merged, types are more flexible for unions and computed properties

2. **How would you define a union type for theme options: 'peaceful', 'energetic', 'restorative'?**
   - `type Theme = 'peaceful' | 'energetic' | 'restorative'`

3. **What does the `?` operator mean in `author?: string`?**
   - It makes the property optional (can be undefined)

4. **How would you create a generic type for a response that could contain either data or an error?**
   - `type Response<T> = { data: T } | { error: string }`

5. **What is the purpose of `as const` in TypeScript?**
   - It creates a literal type instead of a general type (e.g., 'hello' instead of string)

---

## **Quiz 2: React Fundamentals**

1. **What is JSX and how does it differ from HTML?**
   - JSX is JavaScript XML syntax that gets compiled to React elements; it's more powerful than HTML with JavaScript expressions

2. **How do you pass data from a parent component to a child component?**
   - Through props - pass data as attributes: `<ChildComponent title="Hello" />`

3. **What's the difference between `{condition && <Component />}` and `{condition ? <Component /> : null}`?**
   - Both work the same way, but the ternary is more explicit about the else case

4. **How would you define props for a component that accepts a title (string) and an optional subtitle (string)?**
   - `interface Props { title: string; subtitle?: string; }`

5. **What is component composition and why is it useful?**
   - Building complex UIs by combining smaller, reusable components; promotes reusability and maintainability

---

## **Quiz 3: React Hooks**

1. **What's the difference between `useState` and `useEffect`?**
   - `useState` manages component state, `useEffect` handles side effects

2. **When does `useEffect` run by default, and how can you control when it runs?**
   - Runs after every render; control with dependency array `[dependency]`

3. **What happens if you don't include dependencies in the `useEffect` dependency array?**
   - It runs after every render, potentially causing infinite loops

4. **How would you create a custom hook that manages a counter with increment/decrement functions?**
   ```typescript
   const useCounter = (initial = 0) => { 
     const [count, setCount] = useState(initial); 
     const increment = () => setCount(c => c + 1); 
     const decrement = () => setCount(c => c - 1); 
     return { count, increment, decrement }; 
   }
   ```

5. **What's the purpose of the cleanup function in `useEffect`?**
   - Cleanup functions prevent memory leaks by cleaning up subscriptions, timers, etc.

---

## **Quiz 4: State Management & Context**

1. **When should you use `useReducer` instead of `useState`?**
   - When you have complex state logic with multiple sub-values or when the next state depends on the previous one

2. **What are the three parts of React Context: creation, provider, and consumer?**
   - `createContext()`, `<Context.Provider>`, and `useContext()` or custom hook

3. **How do you prevent unnecessary re-renders when using Context?**
   - Split contexts by concern, memoize context values, or use multiple smaller contexts

4. **What's the difference between `useState` and `useReducer` for complex state?**
   - `useState` is for simple state, `useReducer` is for complex state with multiple actions and state transitions

5. **How would you create a context for user authentication with login/logout functions?**
   ```typescript
   const AuthContext = createContext(); 
   const AuthProvider = ({ children }) => { 
     const [user, setUser] = useState(null); 
     const login = (userData) => setUser(userData); 
     const logout = () => setUser(null); 
     return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>; 
   }
   ```

---

## **Quiz 5: Next.js App Router**

1. **What's the difference between Server Components and Client Components in Next.js?**
   - Server Components run on the server, can't use hooks or browser APIs; Client Components run in the browser, can use hooks and interactivity

2. **How do you create a new route in the App Router?**
   - Create a folder with `page.tsx` inside it (e.g., `about/page.tsx` for `/about` route)

3. **What is the purpose of `layout.tsx` files?**
   - They define shared UI for a segment and its children, allowing nested layouts

4. **How do you add metadata to a page in Next.js 15?**
   - Export a `metadata` object or `generateMetadata` function from the page component

5. **What's the difference between `'use client'` and not having it in a component?**
   - `'use client'` makes it a Client Component; without it, it's a Server Component by default

---

## **Quiz 6: Data Fetching & Server Components**

1. **Where can you fetch data in Next.js App Router?**
   - Server Components, API routes, or Client Components with useEffect

2. **What's the difference between `fetch()` in Server Components vs Client Components?**
   - Server Components can use native fetch without CORS issues; Client Components need to handle CORS and use relative URLs

3. **How do you handle errors when fetching data in Server Components?**
   - Use try-catch blocks and return error states or redirect to error pages

4. **What is the purpose of `Promise.all()` in data fetching?**
   - It allows parallel data fetching instead of sequential, improving performance

5. **How would you create an API route that returns JSON data?**
   - Create `app/api/endpoint/route.ts` and export GET/POST functions that return Response objects

---

## **Quiz 7: Performance Optimization**

1. **What is code splitting and how does it improve performance?**
   - Code splitting breaks your bundle into smaller chunks loaded on demand, reducing initial bundle size

2. **How do you implement lazy loading for a React component?**
   ```typescript
   const LazyComponent = React.lazy(() => import('./Component')); 
   <Suspense fallback={<Loading />}>
     <LazyComponent />
   </Suspense>
   ```

3. **What's the purpose of `React.memo()` and when should you use it?**
   - `React.memo()` prevents re-renders when props haven't changed; use for expensive components with stable props

4. **How does Suspense help with loading states?**
   - Suspense provides a fallback UI while components are loading, improving user experience

5. **What are some ways to optimize images in Next.js?**
   - Use `next/image` component, optimize formats (WebP, AVIF), lazy loading, and responsive images

---

## **Quiz 8: Advanced Architecture**

1. **What is the Singleton pattern and when is it useful?**
   - Singleton ensures only one instance of a class exists; useful for shared services, caches, or configuration

2. **How do Error Boundaries work in React and what can they catch?**
   - Error Boundaries catch JavaScript errors in component tree, display fallback UI, and prevent entire app crashes

3. **What's the difference between a class component and a functional component for business logic?**
   - Classes are better for complex stateful logic with methods; functions are better for simple logic and hooks

4. **How would you implement a service that fetches data with retry logic?**
   - Use try-catch with retry counters, exponential backoff, and maximum retry limits

5. **What are some strategies for handling loading and error states in a complex application?**
   - Use loading states, error boundaries, fallback components, retry mechanisms, and graceful degradation

---

## **Quiz 9: Testing Strategies**

1. **What are the three main types of testing in React applications?**
   - Unit tests (individual components), integration tests (component interactions), and end-to-end tests (full user flows)

2. **How do you test a component that uses hooks like `useState` or `useEffect`?**
   - Use React Testing Library with `render()` and `screen` queries, or test the component's behavior rather than implementation

3. **What's the difference between unit tests and integration tests?**
   - Unit tests test individual pieces in isolation; integration tests test how multiple pieces work together

4. **How would you test a component that makes API calls?**
   - Mock the API calls using `jest.mock()` or MSW (Mock Service Worker), then test the component's behavior with different API responses

5. **What is mocking and why is it important in testing?**
   - Mocking replaces real dependencies with fake ones; important for isolating code under test and controlling test conditions

---

## **Quiz 10: Production & Deployment**

1. **What are the main differences between development and production builds in Next.js?**
   - Production builds are optimized, minified, and tree-shaken; development builds include debugging tools and hot reloading

2. **How do you configure environment variables for different deployment environments?**
   - Use `.env.local` for local, `.env.production` for production, and platform-specific environment variable settings

3. **What is the purpose of `next.config.js` and what can you configure in it?**
   - `next.config.js` configures Next.js behavior: redirects, rewrites, headers, image domains, experimental features, etc.

4. **How do you monitor performance and errors in a production Next.js application?**
   - Use tools like Vercel Analytics, Google Analytics, Sentry for error tracking, and Lighthouse for performance monitoring

5. **What are some best practices for deploying React/Next.js applications?**
   - Use CDN, optimize images, enable compression, set up proper caching headers, monitor Core Web Vitals, and implement error boundaries

---

## 📊 **Quiz Progress Tracker**

Use this section to track your quiz performance:

### **Week 1 - TypeScript Fundamentals**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 2 - React Fundamentals**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 3 - React Hooks**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 4 - State Management & Context**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 5 - Next.js App Router**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 6 - Data Fetching & Server Components**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 7 - Performance Optimization**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 8 - Advanced Architecture**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 9 - Testing Strategies**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

### **Week 10 - Production & Deployment**
- [ ] Quiz completed
- [ ] Score: ___/5
- [ ] Date: ___________

---

## 🎯 **Overall Progress**

- **Total Quizzes**: 10
- **Completed**: ___/10
- **Average Score**: ___/5
- **Started Learning**: ___________
- **Target Completion**: ___________

---

*Remember: The goal is learning, not perfection. If you score below 4/5 on any quiz, review the related concepts and retake it!*
