---
title: "Web Güvenliği Temelleri"
date: "2025-01-05"
category: "Security"
tags: ["Security", "Web", "HTTPS", "Best Practices"]
featured: false
---

# Web Güvenliği Temelleri

Web güvenliği, modern web geliştirmede göz ardı edilemez bir konudur. İşte her geliştiricinin bilmesi gereken temel güvenlik uygulamaları.

## HTTPS Kullanımı

```javascript
// Always redirect to HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
```

## XSS (Cross-Site Scripting) Koruması

```javascript
// Input sanitization
function sanitizeInput(input) {
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML;
}

// Güvenli HTML render
function safeRender(content) {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

## CSRF Koruması

```javascript
// CSRF token kullanımı
function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// API isteklerinde token gönderme
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCSRFToken()
  },
  body: JSON.stringify(data)
});
```

## Content Security Policy (CSP)

```html
<!-- HTML head'de CSP header -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## Güvenli Cookie Ayarları

```javascript
// Güvenli cookie ayarlama
document.cookie = "sessionId=abc123; Secure; HttpOnly; SameSite=Strict";
```

## Sonuç

Web güvenliği sürekli gelişen bir alandır. Bu temel uygulamaları takip ederek uygulamanızı birçok yaygın saldırıdan koruyabilirsiniz.