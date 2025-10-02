# 🚀 Metehan Portfolio - Frontend Developer

Modern ve responsive portfolio websitesi. React.js, Framer Motion ve Tailwind CSS kullanılarak geliştirilmiştir. Otomatik blog sistemi ve gelişmiş SEO optimizasyonu ile birlikte.

## 🌟 Özellikler

- ⚡ **Modern React.js** - En güncel React özellikleri
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌓 **Dark/Light Mode** - Tema değiştirme özelliği
- 🌍 **Çoklu Dil Desteği** - Türkçe/İngilizce
- 📱 **Responsive Design** - Tüm cihazlarda uyumlu
- ⚡ **Lightning Efektleri** - Mouse takip eden şimşek animasyonları
- 🎭 **Framer Motion** - Smooth animasyonlar
- 📊 **GitHub API** - Gerçek zamanlı proje listesi
- 🎯 **SEO Optimized** - Arama motoru dostu
- 🚫 **404 Error Page** - Kullanıcı dostu hata sayfası
- 📝 **Otomatik Blog Sistemi** - Markdown tabanlı blog yönetimi
- 🔍 **Blog Search & Filter** - Kategori ve arama özellikleri
- 🎨 **Syntax Highlighting** - Code block'lar için renklendirme

## 🛠️ Teknolojiler

### Frontend

- **React.js 18+** - Modern React Hooks
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasyonlar
- **React Router** - SPA routing
- **React Icons** - Icon kütüphanesi

### Blog System

- **React Markdown** - Markdown to React component
- **Remark GFM** - GitHub Flavored Markdown
- **Rehype Highlight** - Syntax highlighting
- **Highlight.js** - Code syntax themes
- **Vite Glob Import** - Otomatik dosya import

### SEO & Performance

- **Meta Tags** - Comprehensive SEO
- **Open Graph** - Social media sharing
- **Twitter Cards** - Twitter optimizasyonu
- **Structured Data** - JSON-LD schema
- **Sitemap.xml** - Site haritası
- **Robots.txt** - Crawler yönergeleri
- **Web App Manifest** - PWA özellikleri

### API & External Services

- **GitHub API** - Proje listesi
- **Responsive Images** - Optimized loading

## 📁 Proje Yapısı

```
metehan-portfolio/
├── public/
│   ├── icon.svg              # Site ikonu
│   ├── my.jpeg              # Profil fotoğrafı
│   ├── manifest.json        # PWA manifest
│   ├── sitemap.xml          # Site haritası
│   ├── robots.txt           # Crawler yönergeleri
│   ├── _redirects           # Netlify redirects
│   └── favicon.ico          # Favicon (eklenecek)
├── src/
│   ├── blogs/
│   │   ├── blogConfig.js           # Otomatik blog yapılandırması
│   │   └── posts/                  # Markdown blog yazıları
│   │       ├── react-hooks.md              # React Hooks rehberi
│   │       ├── javascript-performance-tips.md # JS performans ipuçları
│   │       ├── nextjs-14-app-router-guide.md  # Next.js 14 rehberi
│   │       ├── react-state-management-2024.md # React state yönetimi
│   │       ├── typescript-react-best-practices.md # TypeScript best practices
│   │       ├── css-grid-flexbox-mastery.md    # CSS Grid & Flexbox
│   │       └── web-security-tips.md           # Web güvenlik ipuçları
│   ├── components/
│   │   ├── LightningEffects.jsx    # Lightning animasyonları
│   │   └── MouseLightning.jsx      # Mouse takip efekti
│   ├── pages/
│   │   ├── Home.jsx                # Ana sayfa (blog entegrasyonu ile)
│   │   ├── About.jsx               # Hakkımda
│   │   ├── Skills.jsx              # Yetenekler
│   │   ├── Projects.jsx            # Projeler
│   │   ├── Contact.jsx             # İletişim
│   │   ├── BlogList.jsx            # Blog yazıları listesi
│   │   ├── BlogDetail.jsx          # Blog yazısı detayı
│   │   └── NotFound.jsx            # 404 Hata sayfası
│   ├── App.jsx               # Ana uygulama (blog routing ile)
│   ├── ThemeContext.jsx      # Tema yönetimi
│   ├── LoadingScreen.jsx     # Yükleme ekranı
│   └── main.jsx             # Entry point
├── index.html               # SEO optimized HTML
├── vite.config.js          # Vite konfigürasyonu
├── vercel.json             # Vercel deployment config
├── tailwind.config.js      # Tailwind ayarları
└── package.json            # Dependencies
```

## 🚀 Kurulum

1. **Repository'yi klonlayın:**

```bash
git clone https://github.com/MMetehan/metehan-portfolio.git
cd metehan-portfolio
```

2. **Dependencies'leri yükleyin:**

```bash
npm install
```

3. **Development server'ı başlatın:**

```bash
npm run dev
```

4. **Production build:**

```bash
npm run build
```

## 🔧 Konfigürasyon

### Environment Variables

```env
# .env.local dosyası oluşturun (opsiyonel)
VITE_GITHUB_USERNAME=MMetehan
VITE_SITE_URL=https://metehan-yildirim.com
```

### SEO Ayarları

`index.html` dosyasında aşağıdaki alanları güncelleyin:

- Site URL'leri
- Meta açıklamaları
- Sosyal medya linkleri
- Structured data bilgileri

## 📝 Otomatik Blog Sistemi

### 🎯 Özellikler

- ✅ **Markdown Destekli** - `.md` dosyaları otomatik import
- ✅ **Frontmatter Parsing** - YAML metadata desteği
- ✅ **Otomatik Slug Generation** - Dosya adından URL oluşturma
- ✅ **Çift Dil Desteği** - TR/EN metadata
- ✅ **Kategori Sistemi** - Yazıları kategorilere ayırma
- ✅ **Tag Sistemi** - Etiketleme ve filtreleme
- ✅ **Featured Posts** - Öne çıkan yazılar
- ✅ **Search & Filter** - Arama ve kategori filtreleme
- ✅ **Syntax Highlighting** - Code block renklendirme
- ✅ **SEO Optimized** - Her post için ayrı meta tags

### 📄 Markdown Formatı

```markdown
---
title: "Post Title"
titleTr: "Yazı Başlığı"
description: "Post description"
descriptionTr: "Yazı açıklaması"
excerpt: "Short excerpt"
excerptTr: "Kısa özet"
date: "2024-12-22"
category: "React"
categoryTr: "React"
tags: ["React", "JavaScript", "Frontend"]
tagsTr: ["React", "JavaScript", "Frontend"]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 10
---

# Markdown Content

Your blog post content here...
```

### 🔧 Blog Konfigürasyonu

Blog sistemi `src/blogs/blogConfig.js` dosyasında yapılandırılır:

```javascript
// Otomatik import - Vite Glob
const postModules = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

// Kullanılabilir fonksiyonlar
export function getBlogPosts()          // Tüm yazılar
export function getFeaturedPosts()      // Öne çıkan yazılar
export function getBlogPost(slug)       // Slug ile yazı getir
export function searchBlogPosts(query) // Arama
export function getCategories()         // Kategoriler
export function getTags()              // Etiketler
```

### 📱 Blog Sayfaları

#### BlogList.jsx (/blog)

- Tüm blog yazılarını listeler
- Arama ve kategori filtreleme
- Featured post highlighting
- Responsive grid layout
- SEO optimized

#### BlogDetail.jsx (/blog/:slug)

- Markdown to React rendering
- Syntax highlighting
- Related posts
- Share & bookmark
- Dynamic SEO meta tags

#### Home.jsx Entegrasyonu

- Ana sayfada featured posts
- Blog'a yönlendirme linkleri
- Lightning efektli tasarım

### 🎨 Syntax Highlighting

Code block'lar için özel styling:

- **Dark Theme**: Atom One Dark color scheme
- **Light Theme**: GitHub color scheme
- **Responsive**: Mobile uyumlu
- **Copy Button**: Eklenebilir özellik

### 🔍 SEO Optimizasyonu

Her blog post için:

```javascript
// Dynamic meta tags
document.title = `${title} | Metehan Yıldırım Blog`;
metaDescription.setAttribute("content", description);
metaKeywords.setAttribute("content", tags.join(", "));
```

## 📊 SEO Optimizasyonu

### 🎯 Temel SEO

- ✅ **Meta Tags** - Title, description, keywords
- ✅ **Open Graph** - Facebook/LinkedIn paylaşımları
- ✅ **Twitter Cards** - Twitter paylaşımları
- ✅ **Canonical URLs** - Duplicate content prevention
- ✅ **Structured Data** - JSON-LD schema markup
- ✅ **Semantic HTML** - Proper HTML5 elements

### 🗺️ Site Mapping

- ✅ **Sitemap.xml** - 5 sayfa için detaylı sitemap
- ✅ **Robots.txt** - Search engine guidance
- ✅ **Multilingual Support** - TR/EN hreflang tags

### ⚡ Performance

- ✅ **Preconnect** - External resources
- ✅ **DNS Prefetch** - Faster resource loading
- ✅ **Optimized Images** - Proper alt tags
- ✅ **Lazy Loading** - Performance optimization

### 📱 Mobile & PWA

- ✅ **Web App Manifest** - PWA ready
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Theme Colors** - System theme support
- ✅ **Viewport Optimization** - Mobile UX

### 🔍 Rich Snippets

```json
{
  "@type": "Person",
  "jobTitle": "Frontend Developer",
  "knowsAbout": ["React.js", "Ionic", "JavaScript"],
  "sameAs": ["GitHub", "LinkedIn", "Instagram"]
}
```

## 🌍 Çoklu Dil Desteği

- **Türkçe (TR)** - Varsayılan dil
- **İngilizce (EN)** - Alternatif dil
- Context API ile dil yönetimi
- Her sayfa için hreflang tags

## 🎨 Tema Sistemi

### Dark Mode

- Cyan/Purple gradient renk paleti
- Lightning efektleri
- Glow animasyonları

### Light Mode

- Purple/Blue gradient renk paleti
- Soft shadows
- Clean design

## 📱 Responsive Tasarım

- **Mobile First** - 320px+'dan başlayan tasarım
- **Tablet Support** - 768px+ optimizasyonu
- **Desktop** - 1024px+ geniş ekran desteği
- **4K Ready** - Yüksek çözünürlük desteği

## � 404 Error Handling

### Özellikler

- **SEO Optimized** - 404 sayfası noindex, nofollow
- **User Friendly** - Kullanıcı dostu tasarım
- **Navigation Links** - Diğer sayfalara yönlendirme
- **Lightning Effects** - Tutarlı tema efektleri
- **Multilingual** - TR/EN dil desteği

### Teknik Detaylar

```jsx
// SEO meta tags dynamic update
useEffect(() => {
  document.title = "404 - Page Not Found";
  // Robots meta update
  robotsMeta.setAttribute("content", "noindex, nofollow");
}, []);
```

### Deployment Configuration

- **Netlify**: `_redirects` dosyası ile SPA routing
- **Vercel**: `vercel.json` ile rewrite rules
- **Apache**: `.htaccess` gerekli (eklenebilir)

## �🚀 Deployment

### Vercel (Önerilen)

1. Vercel hesabı oluşturun
2. GitHub repository'yi bağlayın
3. Otomatik deploy

### Netlify

1. `npm run build` ile build alın
2. `dist` klasörünü Netlify'a yükleyin

### Manual Hosting

```bash
npm run build
# dist klasörünü sunucuya yükleyin
```

## 📈 Analytics & Monitoring

### Google Analytics (Eklenebilir)

```javascript
// Google Analytics 4 integration
gtag("config", "GA_MEASUREMENT_ID");
```

### Performance Monitoring

- Lighthouse scores
- Core Web Vitals
- Page load times

## 🔒 Güvenlik

- ✅ HTTPS only
- ✅ Content Security Policy (CSP)
- ✅ No sensitive data exposure
- ✅ Secure external links (rel="noopener")

## 📧 İletişim

- **Email:** muhammed.metehan.yildirim@gmail.com
- **LinkedIn:** [Muhammed Metehan Yıldırım](https://www.linkedin.com/in/muhammed-metehan-yıldırım)
- **GitHub:** [MMetehan](https://github.com/MMetehan)
- **Instagram:** [@metehan\_\_yildirim](https://www.instagram.com/metehan__yildirim/)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🙏 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

⚡ **Powered by Lightning & Code** ⚡

---

# 🚀 Metehan Portfolio - Frontend Developer

A modern and responsive portfolio website built with React.js, Framer Motion, and Tailwind CSS. Features an automated blog system and advanced SEO optimization.

## 🌟 Features

- ⚡ **Modern React.js** - Latest React features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌓 **Dark/Light Mode** - Theme switching capability
- 🌍 **Multi-language Support** - Turkish/English
- 📱 **Responsive Design** - Compatible with all devices
- ⚡ **Lightning Effects** - Mouse-following lightning animations
- 🎭 **Framer Motion** - Smooth animations
- 📊 **GitHub API** - Real-time project list
- 🎯 **SEO Optimized** - Search engine friendly
- 🚫 **404 Error Page** - User-friendly error page
- 📝 **Automated Blog System** - Markdown-based blog management
- 🔍 **Blog Search & Filter** - Category and search features
- 🎨 **Syntax Highlighting** - Code block colorization

## 🛠️ Technologies

### Frontend

- **React.js 18+** - Modern React Hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - SPA routing
- **React Icons** - Icon library

### Blog System

- **React Markdown** - Markdown to React component
- **Remark GFM** - GitHub Flavored Markdown
- **Rehype Highlight** - Syntax highlighting
- **Highlight.js** - Code syntax themes
- **Vite Glob Import** - Automatic file import

### SEO & Performance

- **Meta Tags** - Comprehensive SEO
- **Open Graph** - Social media sharing
- **Twitter Cards** - Twitter optimization
- **Structured Data** - JSON-LD schema
- **Sitemap.xml** - Site map
- **Robots.txt** - Crawler guidelines
- **Web App Manifest** - PWA features

### API & External Services

- **GitHub API** - Project list
- **Responsive Images** - Optimized loading

## 📁 Project Structure

```
metehan-portfolio/
├── public/
│   ├── icon.svg              # Site icon
│   ├── my.jpeg              # Profile photo
│   ├── manifest.json        # PWA manifest
│   ├── sitemap.xml          # Site map
│   ├── robots.txt           # Crawler guidelines
│   ├── _redirects           # Netlify redirects
│   └── favicon.ico          # Favicon
├── src/
│   ├── blogs/
│   │   ├── blogConfig.js           # Automated blog configuration
│   │   └── posts/                  # Markdown blog posts
│   │       ├── react-hooks.md              # React Hooks guide
│   │       ├── javascript-performance-tips.md # JS performance tips
│   │       ├── nextjs-14-app-router-guide.md  # Next.js 14 guide
│   │       ├── react-state-management-2024.md # React state management
│   │       ├── typescript-react-best-practices.md # TypeScript best practices
│   │       ├── css-grid-flexbox-mastery.md    # CSS Grid & Flexbox
│   │       └── web-security-tips.md           # Web security tips
│   ├── components/
│   │   ├── LightningEffects.jsx    # Lightning animations
│   │   └── MouseLightning.jsx      # Mouse tracking effect
│   ├── pages/
│   │   ├── Home.jsx                # Homepage (with blog integration)
│   │   ├── About.jsx               # About me
│   │   ├── Skills.jsx              # Skills
│   │   ├── Projects.jsx            # Projects
│   │   ├── Contact.jsx             # Contact
│   │   ├── BlogList.jsx            # Blog post list
│   │   ├── BlogDetail.jsx          # Blog post detail
│   │   └── NotFound.jsx            # 404 Error page
│   ├── App.jsx               # Main application (with blog routing)
│   ├── ThemeContext.jsx      # Theme management
│   ├── LoadingScreen.jsx     # Loading screen
│   └── main.jsx             # Entry point
├── index.html               # SEO optimized HTML
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── tailwind.config.js      # Tailwind settings
└── package.json            # Dependencies
```

## 🚀 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/MMetehan/metehan-portfolio.git
cd metehan-portfolio
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start development server:**

```bash
npm run dev
```

4. **Production build:**

```bash
npm run build
```

## 📝 Automated Blog System

### 🎯 Features

- ✅ **Markdown Support** - `.md` files auto-import
- ✅ **Frontmatter Parsing** - YAML metadata support
- ✅ **Auto Slug Generation** - URL creation from filename
- ✅ **Bilingual Support** - TR/EN metadata
- ✅ **Category System** - Organize posts by categories
- ✅ **Tag System** - Tagging and filtering
- ✅ **Featured Posts** - Highlighted articles
- ✅ **Search & Filter** - Search and category filtering
- ✅ **Syntax Highlighting** - Code block colorization
- ✅ **SEO Optimized** - Individual meta tags per post

### 📄 Markdown Format

```markdown
---
title: "Post Title"
titleTr: "Yazı Başlığı"
description: "Post description"
descriptionTr: "Yazı açıklaması"
excerpt: "Short excerpt"
excerptTr: "Kısa özet"
date: "2024-12-22"
category: "React"
categoryTr: "React"
tags: ["React", "JavaScript", "Frontend"]
tagsTr: ["React", "JavaScript", "Frontend"]
featured: true
author: "Muhammed Metehan Yıldırım"
published: true
readTime: 10
---

# Markdown Content

Your blog post content here...
```

## 📊 SEO Optimization

### 🎯 Basic SEO

- ✅ **Meta Tags** - Title, description, keywords
- ✅ **Open Graph** - Facebook/LinkedIn sharing
- ✅ **Twitter Cards** - Twitter sharing
- ✅ **Canonical URLs** - Duplicate content prevention
- ✅ **Structured Data** - JSON-LD schema markup
- ✅ **Semantic HTML** - Proper HTML5 elements

### 🗺️ Site Mapping

- ✅ **Sitemap.xml** - Detailed sitemap for all pages
- ✅ **Robots.txt** - Search engine guidance
- ✅ **Multilingual Support** - TR/EN hreflang tags
- ✅ **Blog Post URLs** - Individual blog post mapping

### ⚡ Performance

- ✅ **Preconnect** - External resources
- ✅ **DNS Prefetch** - Faster resource loading
- ✅ **Optimized Images** - Proper alt tags
- ✅ **Lazy Loading** - Performance optimization

### 📱 Mobile & PWA

- ✅ **Web App Manifest** - PWA ready with shortcuts
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Theme Colors** - System theme support
- ✅ **Viewport Optimization** - Mobile UX

## 🔍 SEO Checklist

### ✅ Technical SEO

- [x] **Sitemap.xml** - Updated with blog posts
- [x] **Robots.txt** - Blog pages included
- [x] **Meta tags** - Dynamic for each page
- [x] **Open Graph** - Social sharing optimized
- [x] **Structured data** - JSON-LD implemented
- [x] **Canonical URLs** - Proper URL structure
- [x] **Mobile-friendly** - Responsive design
- [x] **Page speed** - Optimized loading

### ✅ Content SEO

- [x] **Title tags** - Unique for each page
- [x] **Meta descriptions** - Compelling descriptions
- [x] **Header structure** - H1-H6 hierarchy
- [x] **Internal linking** - Blog cross-references
- [x] **Image alt text** - Descriptive alt tags
- [x] **URL structure** - Clean, descriptive URLs

### ✅ Blog SEO

- [x] **Individual post URLs** - `/blog/post-slug`
- [x] **Category pages** - Organized content
- [x] **Tag system** - Topical organization
- [x] **Related posts** - Internal linking
- [x] **Reading time** - User experience
- [x] **Publication dates** - Content freshness

## 📧 Contact

- **Email:** muhammed.metehan.yildirim@gmail.com
- **LinkedIn:** [Muhammed Metehan Yıldırım](https://www.linkedin.com/in/muhammed-metehan-yıldırım)
- **GitHub:** [MMetehan](https://github.com/MMetehan)
- **Instagram:** [@metehan\_\_yildirim](https://www.instagram.com/metehan__yildirim/)

## 📝 License

This project is licensed under the MIT License.

## 🙏 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

⚡ **Powered by Lightning & Code** ⚡
