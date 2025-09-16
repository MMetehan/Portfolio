---
title: "A Deep Dive into Shadcn UI: Detailed Examples, Code Snippets, and Playgrounds"
date: "2025-09-16"
category: "React"
tags:
  [
    "React",
    "UI",
    "Shadcn",
    "JavaScript",
    "Frontend",
    "Shadcn UI",
    "React UI library",
    "UI components",
    "React components",
    "Tailwind CSS",
    "Vite",
    "Next.js",
    "UI toolkit",
    "React design system",
    "modern UI",
    "Shadcn UI tutorial",
    "Shadcn UI guide",
    "Shadcn UI examples",
    "Shadcn UI installation",
    "React frontend",
    "React best practices",
    "component library",
    "UI development",
    "developer tools",
    "open source UI",
  ]
featured: true
---

# A Deep Dive into Shadcn UI: Detailed Examples, Code Snippets, and Playgrounds

> This is a long-form, hands-on guide covering installation, patterns, components, themes, real-world examples, and best practices with Shadcn UI. It includes code snippets and step-by-step instructions you can copy into your projects. For the official installation steps, especially the latest updates, please visit the official docs: https://ui.shadcn.com/docs/installation

---

## Table of Contents

1. What is Shadcn UI?
2. Why pick Shadcn UI?
3. Key features recap
4. Installation (Vite-focused + Next.js, Remix, Laravel notes)
5. Project scaffolding (Vite + TypeScript example)
6. Tailwind & theme configuration
7. Component patterns (Button, Input, Modal, Tabs, Dropdown, Tooltip, Card)
8. Forms and validation (React Hook Form + Zod)
9. Data tables (TanStack Table integration)
10. State management examples (Zustand, Redux)
11. Advanced layouts & dashboard patterns
12. Accessibility best practices (a11y)
13. Performance optimization (code-splitting, lazy loading, image handling)
14. Real-world examples
    - Admin Dashboard (skeleton + components)
    - Blog UI (article list, markdown preview)
    - E-commerce product grid (search, filters, cart UI)
15. Testing & CI suggestions
16. Common pitfalls and how to avoid them
17. Playground and next steps
18. References & resources

---

## 1. What is Shadcn UI?

Shadcn UI is a component library built on **React + Tailwind CSS**. The big idea behind it is giving developers fully editable source components (not opaque compiled packages) so you have complete ownership. It's highly composable and intentionally minimal in terms of opinionated styles — Tailwind is the styling layer and the UI package gives you accessible primitives and well-structured components.

---

## 2. Why pick Shadcn UI?

- **Ownership**: Components are source files in your repo — change anything.
- **Tiny surface area**: No giant runtime — you add only what you need.
- **Tailwind-friendly**: Use utility classes and design tokens as you like.
- **Accessible**: Components aim to follow accessibility patterns.
- **Playful learning curve**: Good docs and examples (including official playground).

---

## 3. Key features recap

- Source-first components you can edit
- Pre-built primitives (Button, Dialog, Tabs, Menu, etc.)
- Integration-friendly with React libraries (React Hook Form, TanStack Table)
- Theme-ready (Tailwind variables + CSS variables pattern)
- Official examples & playgrounds:
  - https://ui.shadcn.com/examples/dashboard
  - https://ui.shadcn.com/examples/playground

---

## 4. Installation

> **Note:** For the most current install steps, visit the official docs: https://ui.shadcn.com/docs/installation

Below we focus on **Vite (React + TypeScript)**, followed by brief notes for **Next.js**, **Remix**, and **Laravel** setups.

### 4.1 Vite + React + TypeScript (recommended quick start)

```bash
# create a Vite + React + TS project
npm create vite@latest my-shadcn-app -- --template react-ts
cd my-shadcn-app
npm install
```

Install Tailwind and Shadcn dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn CLI (scaffolding tool)
npx shadcn@latest init
```

Tailwind config (`tailwind.config.cjs` or `.js`):

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Add base Tailwind imports (e.g. `src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Run the dev server:

```bash
npm run dev
```

Now run the shadcn CLI to add components. For example:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```

The CLI will scaffold component source files (usually under `src/components/ui` or a path you configured).

### 4.2 Next.js (short notes)

If you're using Next.js, create an app with the App Router (recommended) or Pages Router. Install Tailwind and initialize shadcn similarly. Important points:

- Add `./app/**/*.{js,ts,jsx,tsx,mdx}` and `./components/**/*.{js,ts,jsx,tsx,mdx}` to Tailwind content.
- Use server components for layout and client components for interactive parts (`"use client"` at the top).

### 4.3 Remix & Laravel (brief)

- **Remix**: Add Tailwind, make sure the `tailwind.config` includes `app/**/*` and `routes/**/*`. Use the shadcn CLI to scaffold components and import them into Remix routes.
- **Laravel (Blade / Inertia / Vite)**: If using Inertia + React, install Tailwind through Vite pipeline and scaffold shadcn components in `resources/js` (or your JS entry). Treat components as standard React components.

---

## 5. Project scaffolding: Vite + TypeScript example

A minimal `vite.config.ts` with path alias and React plugin:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`tsconfig.json` snippet for paths:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Project structure suggestion:

```
/src
  /components
    /ui        <-- shadcn components live here (editable)
  /lib
  /hooks
  /pages (or /routes)
  /styles
  main.tsx
  index.css
```

---

## 6. Tailwind & theme configuration

Shadcn UI leverages Tailwind. For theming, use CSS variables in `:root` and toggle class-based theme switching for dark mode.

`tailwind.config.js` (example with custom colors):

```js
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-bg)",
      },
    },
  },
};
```

`src/styles/theme.css` (example variables):

```css
:root {
  --color-primary: 0 120 220; /* use as rgb values for opacity control */
  --color-bg: 255 255 255;
  --radius: 8px;
}

.dark {
  --color-primary: 100 210 255;
  --color-bg: 17 24 39;
}
```

Using in Tailwind (example in component):

```jsx
<div className="bg-[rgb(var(--color-bg)/1)] p-4 rounded-md">
  <button className="bg-[rgb(var(--color-primary)/1)] text-white px-4 py-2 rounded">
    Primary
  </button>
</div>
```

Add a small hook for toggling theme (`useTheme.ts`):

```ts
import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return { isDark, setIsDark };
}
```

---

## 7. Component patterns and examples

Below are many example snippets that you can copy into `src/components/ui` (or where your shadcn CLI put components). These are illustrative; the shadcn CLI generates similar files with better defaults and accessibility baked in.

### 7.1 Button

```tsx
// src/components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants: Record<string, string> = {
    default: "bg-primary text-white hover:opacity-90",
    destructive: "bg-red-600 text-white",
    outline: "border border-gray-200",
    ghost: "bg-transparent",
    link: "underline text-blue-600",
  };
  const sizes: Record<string, string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 7.2 Input & Label

```tsx
// src/components/ui/input.tsx
import React from "react";

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <label
    className={`block text-sm font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-1 focus:ring-primary ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";
```

### 7.3 Dialog (Modal) pattern

```tsx
// src/components/ui/dialog.tsx (simplified)
import React from "react";

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: any;
}> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};
```

### 7.4 Tabs

```tsx
// src/components/ui/tabs.tsx (very small)
import React, { useState } from "react";

export function Tabs({
  tabs,
}: {
  tabs: { value: string; label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0]?.value);
  return (
    <div>
      <div className="flex space-x-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActive(t.value)}
            className={`px-3 py-1 rounded ${
              active === t.value ? "bg-primary text-white" : "bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map(
          (t) => active === t.value && <div key={t.value}>{t.content}</div>
        )}
      </div>
    </div>
  );
}
```

### 7.5 Dropdown

```tsx
// src/components/ui/dropdown.tsx
import React, { useState, useRef, useEffect } from "react";

export function Dropdown({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className="absolute mt-2 right-0 bg-white shadow rounded-md p-2">
          {children}
        </div>
      )}
    </div>
  );
}
```

### 7.6 Tooltip (lightweight)

```tsx
// src/components/ui/tooltip.tsx
import React, { useState } from "react";

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1">
          {label}
        </div>
      )}
    </div>
  );
}
```

### 7.7 Card

```tsx
// src/components/ui/card.tsx
export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    {children}
  </div>
);
```

---

## 8. Forms and Validation (React Hook Form + Zod)

A common stack is React Hook Form + Zod for schema validation. Below is a compact example.

```tsx
// src/components/forms/AuthForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, Button } from "@/components/ui"; // adjust import path

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
```

Tips:

- Use `aria-*` attributes for better accessibility.
- Hook form's `register` works well with custom input components (forward refs required).

---

## 9. Data Tables (TanStack Table integration)

TanStack Table is a go-to for flexible tables. Shadcn examples often show this integration.

```tsx
// src/components/table/ExampleTable.tsx (simplified)
import React from "react";
import { useTable, Column } from "@tanstack/react-table";

type Person = { id: number; name: string; age: number };

const data: Person[] = [
  { id: 1, name: "Alice", age: 28 },
  { id: 2, name: "Bob", age: 34 },
];

const columns: Column<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

export default function ExampleTable() {
  // Note: @tanstack/react-table v8 uses createColumnHelper etc. This is a simplified example.
  // In practice follow TanStack docs for advanced features.
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.name}</td>
            <td>{r.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

Add filtering, sorting and pagination from TanStack docs. Combine with Shadcn UI controls for inputs, selects and pagination controls.

---

## 10. State Management Integration

### 10.1 Zustand (lightweight)

```ts
// src/store/useStore.ts
import create from "zustand";

type CartItem = { id: number; title: string; qty: number };
type State = { cart: CartItem[]; add: (item: CartItem) => void };

export const useStore = create<State>((set) => ({
  cart: [],
  add: (item) => set((state) => ({ cart: [...state.cart, item] })),
}));
```

Use in components:

```tsx
const add = useStore((s) => s.add);
add({ id: 1, title: "Widget", qty: 1 });
```

### 10.2 Redux Toolkit (for large apps)

```ts
// store/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as any[],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
```

Connect to UI through `useDispatch` and `useSelector` as usual.

---

## 11. Advanced layouts & dashboard patterns

A typical dashboard layout includes:

- A left navigation (sidebar)
- Top bar / header
- Main content area with cards and data visualizations
- Responsive collapse behavior for small screens

Example skeleton:

```tsx
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-white dark:bg-gray-900 border-r p-4">
        {/* Sidebar contents: logo, nav items */}
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b p-4 flex items-center justify-between">
          {/* topbar */}
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

Combine with charts (Recharts, Chart.js, or Recharts) inside cards for analytics panels.

---

## 12. Accessibility (a11y) best practices

Shadcn components aim to follow accessible patterns, but you are still responsible for:

- Keyboard navigation (tab order, focus management)
- Proper ARIA roles and labels
- Semantic HTML for forms and buttons
- Color contrast (WCAG AA/AAA guidelines)
- Screen reader testing (NVDA, VoiceOver)

Checklist:

- Use `aria-label` or `<label>` for inputs.
- Ensure modal traps focus and restores focus on close.
- Provide skip-links for keyboard users.
- Test color contrasts and don't rely on color alone for state.

---

## 13. Performance optimization

- **Tree-shaking**: Import components directly from your local `components/ui` to avoid shipping unused code.
- **Lazy load**: Use `React.lazy` and `Suspense` for heavy components (e.g., a large data table or charts).
- **Images**: Use optimized images (next/image in Next.js or native `loading="lazy"` in img tags).
- **CSS**: Keep Tailwind classes small per component and use Purge (content) to remove unused styles.
- **Avoid rerenders**: Memoize heavy lists or tables with `React.memo` and `useMemo` for computed columns/rows.

Example lazy loading a chart:

```tsx
const Chart = React.lazy(() => import("./charts/RevenueChart"));

function AnalyticsPanel() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <Chart />
    </Suspense>
  );
}
```

---

## 14. Real-world examples

Below are condensed but practical examples. Each example gives you a skeleton and key components to expand.

### 14.1 Admin Dashboard (skeleton)

Key features:

- Sidebar with navigation
- Overview cards (metrics)
- Activity feed
- Data table for users

Skeleton components:

```tsx
// src/pages/admin/index.tsx
export default function AdminPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>Users: 1,234</Card>
        <Card>Active: 512</Card>
        <Card>Errors: 3</Card>
      </div>
      <div className="mt-6">
        <ExampleTable />
      </div>
    </DashboardLayout>
  );
}
```

### 14.2 Blog UI (skeleton)

Features:

- Article list
- Markdown rendering preview
- Search and tags filter

Example:

```tsx
// src/pages/blog/index.tsx
export default function BlogList({ posts }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <input
          placeholder="Search posts..."
          className="w-full rounded-md border p-2"
        />
      </div>
      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.slug} className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.excerpt}</p>
            <div className="mt-2">
              <a href={`/blog/${p.slug}`} className="text-primary">
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

### 14.3 E-commerce product grid (skeleton)

Features:

- Product grid with responsive columns
- Filters (category, price)
- Add-to-cart UI (Zustand store)

Example grid:

```tsx
// src/components/ProductCard.tsx
export function ProductCard({ product }) {
  return (
    <Card>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.price}</p>
      <div className="mt-2">
        <Button onClick={() => addToCart(product)}>Add to cart</Button>
      </div>
    </Card>
  );
}
```

---

## 15. Testing & CI suggestions

- **Unit & integration**: Use Jest + React Testing Library for component tests.
- **E2E**: Cypress or Playwright for flows (login, add to cart).
- **Visual regression**: Chromatic or Percy if visual changes matter.
- **CI**: Run lint, tests and build on push/PR; use Vercel/Netlify for preview deployments.

---

## 16. Common pitfalls & how to avoid them

- **Over-adding utilities**: Tailwind classes can get verbose — create small component wrappers when repeated.
- **Global state misuse**: Don't store UI-only ephemeral state in global stores.
- **Accessibility oversights**: Test keyboard interactions, labels, modal focus-trapping.
- **Not optimizing images**: Large images kill LCP; optimize and lazy load.
- **Forgetting to purge CSS**: Ensure Tailwind purge/content settings are correct to keep CSS size low.

---

## 17. Playground, Examples and Next Steps

Try official playground and examples to explore components interactively:

- Playground: https://ui.shadcn.com/examples/playground
- Dashboard example: https://ui.shadcn.com/examples/dashboard
- Official docs (installation): https://ui.shadcn.com/docs/installation

Next steps suggestions:

1. Scaffold a small app (Vite or Next.js).
2. Add a few Shadcn components via the CLI (`npx shadcn add`).
3. Build one of the real-world skeletons (admin / blog / ecommerce).
4. Iterate on theming and accessibility.

---

## 18. References & resources

- Shadcn UI official: https://ui.shadcn.com
- Shadcn UI playground & examples: https://ui.shadcn.com/examples
- TanStack Table: https://tanstack.com/table
- React Hook Form: https://react-hook-form.com
- Zod: https://github.com/colinhacks/zod
- Zustand: https://github.com/pmndrs/zustand
- Redux Toolkit: https://redux-toolkit.js.org

---

_Happy building — now go try adding a component to a small project and see how quickly you can iterate!_
