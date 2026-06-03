---
title: "Modern React State Management 2024"
titleTr: "Modern React State Yönetimi 2024"
description: "Complete guide to React state management: useState, useReducer, Context API, Zustand, and Redux Toolkit"
descriptionTr: "React state yönetimi kapsamlı rehberi: useState, useReducer, Context API, Zustand ve Redux Toolkit"
excerpt: "Learn the best practices for managing state in React applications with modern tools and patterns."
excerptTr: "Modern araçlar ve pattern'lerle React uygulamalarında state yönetimi en iyi uygulamalarını öğrenin."
date: "2024-12-21"
category: "React"
categoryTr: "React"
tags: ["React", "State Management", "Zustand", "Redux", "Context API"]
tagsTr: ["React", "State Yönetimi", "Zustand", "Redux", "Context API"]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 18
---

# Modern React State Management 2024

React uygulamalarında state yönetimi için 2024'te hangi araçları kullanmalıyız? Bu rehberde tüm seçenekleri inceleyeceğiz.

## Local State Management

### useState Hook

Basit state yönetimi için hala en iyi seçenek:

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const increment = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCount(prev => prev + 1);
    setIsLoading(false);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Increment'}
      </button>
    </div>
  );
}
```

### useReducer Hook

Karmaşık state logic'i için:

```tsx
import { useReducer } from 'react';

interface State {
  count: number;
  history: number[];
  isLoading: boolean;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set_loading'; payload: boolean };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1],
      };
    case 'reset':
      return {
        ...state,
        count: 0,
        history: [0],
      };
    case 'set_loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

function AdvancedCounter() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0],
    isLoading: false,
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>History: {state.history.join(', ')}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </div>
  );
}
```

## Global State Management

### Context API + useReducer

React'ın built-in çözümü:

```tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: string[];
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_NOTIFICATION'; payload: string }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AppState = {
  user: null,
  theme: 'light',
  notifications: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'TOGGLE_THEME':
      return { 
        ...state, 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n !== action.payload),
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
```

### Zustand - Modern State Management

Basit ve güçlü:

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppStore {
  // State
  user: User | null;
  theme: 'light' | 'dark';
  notifications: string[];
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  logout: () => void;
  toggleTheme: () => void;
  addNotification: (message: string) => void;
  removeNotification: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        theme: 'light',
        notifications: [],
        isLoading: false,
        
        // Actions
        setUser: (user) => set({ user }, false, 'setUser'),
        
        logout: () => set({ user: null }, false, 'logout'),
        
        toggleTheme: () => set(
          (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'toggleTheme'
        ),
        
        addNotification: (message) => set(
          (state) => ({ 
            notifications: [...state.notifications, message] 
          }),
          false,
          'addNotification'
        ),
        
        removeNotification: (message) => set(
          (state) => ({
            notifications: state.notifications.filter(n => n !== message)
          }),
          false,
          'removeNotification'
        ),
        
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({ user: state.user, theme: state.theme }),
      }
    )
  )
);

// Component'te kullanım
function Header() {
  const { user, theme, toggleTheme, logout } = useAppStore();
  
  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      {user && (
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}
```

### Redux Toolkit (RTK)

Karmaşık uygulamalar için:

```tsx
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: string[];
  isLoading: boolean;
}

const initialState: AppState = {
  user: null,
  theme: 'light',
  notifications: [],
  isLoading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        n => n !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { 
  setUser, 
  logout, 
  toggleTheme, 
  addNotification, 
  removeNotification, 
  setLoading 
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);

export const useAppDispatch = () => useDispatch<AppDispatch>();
```

## Server State Management

### React Query / TanStack Query

API state yönetimi için en iyi:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// Custom hooks
function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async (): Promise<Post> => {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      return response.json();
    },
    enabled: !!id,
  });
}

function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newPost: Omit<Post, 'id'>): Promise<Post> => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return response.json();
    },
    onSuccess: () => {
      // Invalidate posts query to refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// Component
function PostList() {
  const { data: posts, isLoading, error } = usePosts();
  const createPost = useCreatePost();

  const handleCreatePost = () => {
    createPost.mutate({
      title: 'New Post',
      content: 'This is a new post',
      authorId: 'user1',
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreatePost} disabled={createPost.isPending}>
        {createPost.isPending ? 'Creating...' : 'Create Post'}
      </button>
      {posts?.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## Form State Management

### React Hook Form

Form'lar için en performanslı:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  terms: z.boolean().refine(val => val, 'You must accept terms'),
});

type FormData = z.infer<typeof schema>;

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      age: 18,
      terms: false,
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <input
          {...register('name')}
          placeholder="Full Name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Age"
              className={errors.age ? 'error' : ''}
            />
          )}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>

      <div>
        <label>
          <input
            {...register('terms')}
            type="checkbox"
          />
          I accept the terms and conditions
        </label>
        {errors.terms && <span>{errors.terms.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
```

## State Management Seçimi

### Basit Uygulamalar
- **useState** + **useReducer** yeterli
- Context API küçük global state için

### Orta Ölçekli Uygulamalar
- **Zustand** en iyi seçim
- Basit API, TypeScript desteği
- Persist middleware ile localStorage

### Büyük Uygulamalar
- **Redux Toolkit** karmaşık state logic için
- DevTools, middleware ecosystem
- Time travel debugging

### API State
- **TanStack Query** her durumda
- Caching, background updates
- Optimistic updates

### Form State
- **React Hook Form** performans için
- Zod ile validation
- Uncontrolled components

## Sonuç

2024'te React state management için:

1. **Local state**: useState/useReducer
2. **Global state**: Zustand (küçük-orta), Redux Toolkit (büyük)
3. **Server state**: TanStack Query
4. **Form state**: React Hook Form

Her projenin ihtiyacına göre doğru aracı seçmek önemli!
