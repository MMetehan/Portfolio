---
title: "Next.js 14 App Router Complete Guide"
titleTr: "Next.js 14 App Router Kapsamlı Rehberi"
description: "Master the new App Router in Next.js 14 with practical examples"
descriptionTr: "Pratik örneklerle Next.js 14'teki yeni App Router'ı ustalaşın"
excerpt: "Learn everything about Next.js 14 App Router: routing, layouts, loading states, error handling, and server components."
excerptTr: "Next.js 14 App Router hakkında her şeyi öğrenin: routing, layout'lar, loading state'leri, hata yönetimi ve server component'leri."
date: "2024-12-22"
category: "Next.js"
categoryTr: "Next.js"
tags: ["Next.js", "React", "App Router", "Server Components", "Full Stack"]
tagsTr: ["Next.js", "React", "App Router", "Server Komponentleri", "Full Stack"]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 20
---

# Next.js 14 App Router Complete Guide

Next.js 14 ile birlikte App Router artık stable durumda. Bu yeni routing sistemi ile neler yapabileceğimizi inceleyelim.

## Proje Yapısı

```
src/
  app/
    layout.tsx          # Root layout
    page.tsx           # Ana sayfa
    loading.tsx        # Loading UI
    error.tsx          # Error UI
    not-found.tsx      # 404 page
    globals.css        # Global styles
    
    blog/
      page.tsx         # /blog
      loading.tsx      # Blog loading
      [slug]/
        page.tsx       # /blog/[slug]
        loading.tsx    # Post loading
        
    dashboard/
      layout.tsx       # Dashboard layout
      page.tsx         # /dashboard
      settings/
        page.tsx       # /dashboard/settings
        
    api/
      posts/
        route.ts       # API endpoints
```

## Layouts

### Root Layout

```tsx
// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js 14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <nav>
          <h1>My Blog</h1>
        </nav>
        <main>{children}</main>
        <footer>© 2024 My Blog</footer>
      </body>
    </html>
  )
}
```

### Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/dashboard/settings">Settings</a>
          <a href="/dashboard/profile">Profile</a>
        </nav>
      </aside>
      <div className="content">
        {children}
      </div>
    </div>
  )
}
```

## Server Components

```tsx
// app/blog/page.tsx
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

async function getPosts(): Promise<Post[]> {
  // Bu server'da çalışır, client'a API call gerekmez
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 } // 60 saniye cache
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 150)}...</p>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
    </div>
  );
}
```

## Dynamic Routes

```tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 } // 1 saat cache
  });
  
  if (!res.ok) {
    throw new Error('Post not found');
  }
  
  return res.json();
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
```

## Loading States

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="loading-container">
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Error Handling

```tsx
// app/blog/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## API Routes

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getPosts(); // Your data fetching logic
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createPost(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request' },
      { status: 400 }
    );
  }
}
```

```tsx
// app/api/posts/[id]/route.ts
interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const post = await getPost(params.id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## Client Components

```tsx
// app/components/LikeButton.tsx
'use client';

import { useState } from 'react';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`like-button ${isLiked ? 'liked' : ''}`}
    >
      ❤️ {likes}
    </button>
  );
}
```

## Middleware

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get('auth-token')?.value;
  
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1';
  // Implement rate limiting logic here
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

## Data Fetching Patterns

### Parallel Data Fetching

```tsx
async function getPostWithComments(slug: string) {
  // Paralel olarak çalışır
  const [post, comments] = await Promise.all([
    getPost(slug),
    getComments(slug)
  ]);
  
  return { post, comments };
}
```

### Sequential Data Fetching

```tsx
async function getUserPosts(userId: string) {
  const user = await getUser(userId);
  // User bilgisi gerektiği için sıralı
  const posts = await getPosts(user.id);
  
  return { user, posts };
}
```

## Deployment

### Vercel Deploy

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## Sonuç

Next.js 14 App Router ile modern, performanslı ve SEO dostu web uygulamaları geliştirebilirsiniz. Server Components sayesinde daha az JavaScript bundle'ı, daha hızlı sayfa yüklemeleri ve daha iyi kullanıcı deneyimi elde edebilirsiniz.
