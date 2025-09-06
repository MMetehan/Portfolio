---
title: "React Hooks: Kapsamlı Rehber"
date: "2025-01-15"
category: "React"
tags: ["React", "Hooks", "JavaScript"]
featured: true
---

# React Hooks: Kapsamlı Rehber

React Hooks, React 16.8 ile birlikte gelen ve fonksiyonel komponentlerde state ve lifecycle metodlarını kullanmamızı sağlayan güçlü bir özelliktir.

## useState Hook

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Sayı: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
    </div>
  );
}
```

## useEffect Hook

`useEffect` hook'u, komponentinizde yan etkiler (side effects) gerçekleştirmenizi sağlar.

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return (
    <div>
      {user ? <h1>{user.name}</h1> : <p>Yükleniyor...</p>}
    </div>
  );
}
```

## Custom Hooks

Kendi hook'larınızı oluşturarak logic'i yeniden kullanabilirsiniz:

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

## Sonuç

React Hooks, modern React geliştirmede vazgeçilmez araçlardır. Fonksiyonel komponentleri daha güçlü hale getirirken, kodu daha temiz ve anlaşılır yaparlar.