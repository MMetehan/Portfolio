---
title: "CSS Grid ve Flexbox Mastery"
titleTr: "CSS Grid ve Flexbox Uzmanlığı"
description: "Master modern CSS layout techniques with Grid and Flexbox"
descriptionTr: "Grid ve Flexbox ile modern CSS layout tekniklerinde uzmanlaşın"
excerpt: "Learn how to create complex, responsive layouts using CSS Grid and Flexbox with practical examples."
excerptTr: "Pratik örneklerle CSS Grid ve Flexbox kullanarak karmaşık, responsive layout'lar oluşturmayı öğrenin."
date: "2024-12-20"
category: "CSS"
categoryTr: "CSS"
tags: ["CSS", "Grid", "Flexbox", "Layout", "Responsive Design"]
tagsTr: ["CSS", "Grid", "Flexbox", "Layout", "Responsive Tasarım"]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 15
---

# CSS Grid ve Flexbox Mastery

Modern web geliştirmede layout oluşturmanın en güçlü araçları CSS Grid ve Flexbox'tır. Bu rehberde her ikisini de derinlemesine inceleyeceğiz.

## CSS Grid

CSS Grid, iki boyutlu layout'lar için mükemmel bir çözümdür.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.grid-item {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}
```

### Grid Template Areas

```css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Flexbox

Flexbox, tek boyutlu layout'lar için idealdir.

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.flex-item {
  flex: 1 1 200px; /* grow shrink basis */
  min-width: 0; /* overflow prevention */
}
```

### Responsive Navigation

```css
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
  }
}
```

## Grid vs Flexbox Hangi Durumda?

### CSS Grid Kullanın:
- 2D layout'lar (satır ve sütun)
- Sayfa düzeni (page layout)
- Kart grid'leri
- Karmaşık align'lar

### Flexbox Kullanın:
- 1D layout'lar (tek yön)
- Component layout'ları
- Navigation bar'lar
- Form element'leri

## Pratik Örnekler

### Responsive Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-footer {
  margin-top: auto;
  padding-top: 1rem;
}
```

### Center Everything

```css
/* Grid ile */
.grid-center {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

/* Flexbox ile */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## Sonuç

CSS Grid ve Flexbox birlikte kullanıldığında, herhangi bir layout'u kolayca oluşturabilirsiniz. Grid büyük resim için, Flexbox detaylar için kullanın!
