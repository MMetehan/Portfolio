---
title: "TypeScript Best Practices for React"
titleTr: "React için TypeScript En İyi Uygulamaları"
description: "Learn how to write better React applications with TypeScript"
descriptionTr: "TypeScript ile daha iyi React uygulamaları yazmayı öğrenin"
excerpt: "Discover TypeScript patterns, interfaces, and techniques that will make your React code more maintainable and type-safe."
excerptTr: "React kodunuzu daha sürdürülebilir ve tip güvenli hale getirecek TypeScript pattern'leri, interface'leri ve tekniklerini keşfedin."
date: "2024-12-18"
category: "TypeScript"
categoryTr: "TypeScript"
tags: ["TypeScript", "React", "JavaScript", "Type Safety", "Best Practices"]
tagsTr: ["TypeScript", "React", "JavaScript", "Tip Güvenliği", "En İyi Uygulamalar"]
featured: false
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 12
---

# TypeScript Best Practices for React

TypeScript ve React birlikte kullanıldığında güçlü, tip güvenli uygulamalar oluşturabilirsiniz. İşte en iyi uygulamalar.

## Component Props Typing

### Basic Props Interface

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### Extending HTML Elements

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
```

## Hooks Typing

### useState Hook

```tsx
// Tip otomatik çıkarım
const [count, setCount] = useState(0);

// Explicit typing
const [user, setUser] = useState<User | null>(null);

// Union types
const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
```

### useReducer Hook

```tsx
interface State {
  count: number;
  error: string | null;
}

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'error'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1, error: null };
    case 'decrement':
      return { ...state, count: state.count - 1, error: null };
    case 'reset':
      return { count: 0, error: null };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      {state.error && <p>Error: {state.error}</p>}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
};
```

### Custom Hooks

```tsx
interface UseApiOptions<T> {
  url: string;
  initialData?: T;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>({ url, initialData }: UseApiOptions<T>): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

## Context API Typing

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // API call
      const userData = await authAPI.login(email, password);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear tokens, etc.
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Advanced Patterns

### Render Props Pattern

```tsx
interface RenderPropsComponentProps<T> {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
}

function RenderPropsComponent<T>({ data, render }: RenderPropsComponentProps<T>) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {render(item, index)}
        </div>
      ))}
    </div>
  );
}

// Kullanım
<RenderPropsComponent
  data={users}
  render={(user, index) => (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )}
/>
```

### Generic Components

```tsx
interface SelectProps<T> {
  options: T[];
  value?: T;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

function Select<T>({ 
  options, 
  value, 
  onChange, 
  getOptionLabel, 
  getOptionValue 
}: SelectProps<T>) {
  return (
    <select 
      value={value ? getOptionValue(value) : ''} 
      onChange={(e) => {
        const selectedOption = options.find(
          option => getOptionValue(option) === e.target.value
        );
        if (selectedOption) onChange(selectedOption);
      }}
    >
      {options.map(option => (
        <option key={getOptionValue(option)} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

## Type Guards ve Utility Types

```tsx
// Type Guard
const isUser = (obj: any): obj is User => {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
};

// Utility Types
type PartialUser = Partial<User>; // Tüm property'ler optional
type RequiredUser = Required<User>; // Tüm property'ler required
type UserEmail = Pick<User, 'email'>; // Sadece email property'si
type UserWithoutId = Omit<User, 'id'>; // id hariç tüm property'ler

// API Response typing
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
```

## Sonuç

TypeScript ile React geliştirirken bu pattern'leri kullanarak daha güvenli, sürdürülebilir ve hata yapmaya daha az müsait kod yazabilirsiniz. Tip güvenliği sadece geliştirme aşamasında değil, uzun vadede projenizin sağlığı için de kritiktir.
