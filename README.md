# 🚀 Metehan Portfolio - Frontend Developer

Modern ve responsive portfolio websitesi. React.js, Framer Motion ve Tailwind CSS kullanılarak geliştirilmiştir.

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

## 🛠️ Teknolojiler

### Frontend
- **React.js 18+** - Modern React Hooks
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasyonlar
- **React Router** - SPA routing
- **React Icons** - Icon kütüphanesi

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
│   └── favicon.ico          # Favicon (eklenecek)
├── src/
│   ├── components/
│   │   ├── LightningEffects.jsx    # Lightning animasyonları
│   │   └── MouseLightning.jsx      # Mouse takip efekti
│   ├── pages/
│   │   ├── Home.jsx                # Ana sayfa
│   │   ├── About.jsx               # Hakkımda
│   │   ├── Skills.jsx              # Yetenekler
│   │   ├── Projects.jsx            # Projeler
│   │   └── Contact.jsx             # İletişim
│   ├── App.jsx               # Ana uygulama
│   ├── ThemeContext.jsx      # Tema yönetimi
│   ├── LoadingScreen.jsx     # Yükleme ekranı
│   └── main.jsx             # Entry point
├── index.html               # SEO optimized HTML
├── vite.config.js          # Vite konfigürasyonu
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
VITE_SITE_URL=https://muhammed-metehan-yildirim.netlify.app
```

### SEO Ayarları
`index.html` dosyasında aşağıdaki alanları güncelleyin:
- Site URL'leri
- Meta açıklamaları
- Sosyal medya linkleri
- Structured data bilgileri

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

## 🚀 Deployment

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
gtag('config', 'GA_MEASUREMENT_ID');
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
- **LinkedIn:** [Muhammed Metehan Yıldırım](https://www.linkedin.com/in/muhammed-metehan-yıldırım-17687b169/)
- **GitHub:** [MMetehan](https://github.com/MMetehan)
- **Instagram:** [@metehan__yildirim](https://www.instagram.com/metehan__yildirim/)

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
