---
title: "JavaScript Performans İpuçları"
date: "2025-01-10"
category: "Performance"
tags: ["JavaScript", "Performance", "Optimization"]
featured: true
---

# JavaScript Performans İpuçları

Modern web uygulamalarında performans kritik bir faktördür. İşte JavaScript kodunuzu optimize etmek için temel ipuçları.

## 1. DOM Manipülasyonunu Minimize Edin

```javascript
// Yavaş ❌
for (let i = 0; i < items.length; i++) {
  document.getElementById('list').innerHTML += `<li>${items[i]}</li>`;
}

// Hızlı ✅
const listHTML = items.map(item => `<li>${item}</li>`).join('');
document.getElementById('list').innerHTML = listHTML;
```

## 2. Event Delegation Kullanın

```javascript
// Her butona listener eklemek yerine
document.getElementById('container').addEventListener('click', function(e) {
  if (e.target.classList.contains('button')) {
    handleButtonClick(e.target);
  }
});
```

## 3. Debouncing ve Throttling

```javascript
// Debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Kullanım
const debouncedSearch = debounce(searchFunction, 300);
input.addEventListener('input', debouncedSearch);
```

## 4. Lazy Loading

```javascript
// Intersection Observer ile lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});
```

## Sonuç

Bu basit optimizasyonlar, uygulamanızın performansını önemli ölçüde artırabilir. Kod yazarken her zaman performansı göz önünde bulundurun.