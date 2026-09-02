// Curated "Work" showcase data.
//
// Each entry renders as a card on /work and, when `featured` is true, as a
// preview on the home page. Detail content is shown in an in-page modal.
//
// SEO / backlink policy:
//   `links[]` entries are rendered as REAL followable anchors
//   (<a target="_blank" rel="noopener">). We deliberately do NOT add
//   `nofollow` or `noreferrer`, so both link equity and the referrer header
//   reach the linked site. If a specific link is a paid / sponsored
//   placement, set its `rel` to "sponsored noopener" on that entry only.
//
// Localisation follows the blog convention: provide `xxxTr` siblings for any
// field that should change with the language toggle. Missing `xxxTr` falls
// back to the base field.
//
// Entry shape:
// {
//   id: "unique-key",
//   slug: "url-safe-slug",
//   title, titleTr,
//   role, roleTr,                 // your role, e.g. "Front-End Developer"
//   client, clientTr,             // company / client, or "Personal project"
//   year: "2024" | "2023–2024",
//   category, categoryTr,         // e.g. "Web App", "Mobile", "Dashboard"
//   summary, summaryTr,           // 1–2 sentences, shown on the card
//   description, descriptionTr,   // long form, shown in the modal (\n\n for paragraphs)
//   tech: ["React", "Node.js"],   // matched to icons, case-insensitive
//   highlights, highlightsTr,     // string[] of outcomes / impact
//   cover: "/work-images/example-cover.webp",
//   coverAlt, coverAltTr,         // descriptive alt text (falls back to title)
//   video: {                      // optional; when set, plays at the top of the modal
//     src: "/work-images/example-demo.mp4",
//     poster: "/work-images/example-cover.webp"  // optional, defaults to `cover`
//   },
//   gallery: [                    // optional extra screenshots for the modal
//     { src: "/work-images/example-2.webp", alt: "...", altTr: "..." }
//   ],
//   links: [
//     { label: "example.com", url: "https://example.com", type: "live" },
//     { label: "Source code", url: "https://github.com/...", type: "github" }
//   ],
//   featured: false
// }

const works = [
  {
    id: "lucy",
    slug: "lucy",
    title: "Lucy",
    titleTr: "Lucy",
    role: "Creator & Developer",
    roleTr: "Fikir Sahibi ve Geliştirici",
    client: "Personal project",
    clientTr: "Kişisel proje",
    year: "2017–2026",
    category: "Voice Assistant",
    categoryTr: "Sesli Asistan",
    summary:
      "One of my oldest projects. Lucy started in 2017 as a C# \"fake AI\" I could talk to, and over the years it turned into a real voice assistant that runs actions, holds a conversation, and answers in a GLaDOS voice I fine-tuned myself.",
    summaryTr:
      "En eski projelerimden biri. Lucy 2017'de konuşabildiğim bir C# \"sahte yapay zeka\" olarak başladı, yıllar içinde aksiyon çalıştıran, karşılıklı konuşan ve kendi fine-tune ettiğim GLaDOS sesiyle cevap veren gerçek bir sesli asistana dönüştü.",
    description:
      "Lucy is probably my favourite thing I have ever built, mostly because I have been poking at it on and off since 2017.\n\nThe first version was pure C#. Speech recognition on the front, then a giant switch-case behind it that matched what I said to canned answers. It did not really understand anything, it just faked it well enough to feel a little bit alive. Then I got greedy and hooked it up to an Arduino with a relay, and suddenly saying \"turn on the light\" actually turned my desk lamp on and off. That was the moment it stopped being a toy for me.\n\nA few years later I threw out the switch-case and moved it to machine learning, so it could actually classify what I wanted instead of me hard-coding every phrase.\n\nThe version I run now is a full rewrite in Python. It listens for \"Lucy\", runs my voice through Whisper, figures out what I am asking, and then does the real thing: opens a search, takes a note and reads it back, launches an app, changes the system volume, does math I say out loud, pulls a Wikipedia summary and asks if I want to hear it. It even holds a short back-and-forth instead of one-shot commands, and there is an LLM plus a logic layer underneath so it reasons a bit rather than just pattern-matching. While it talks there is an ASCII eye animating in the terminal so it feels like something is looking at you.\n\nThe part I am proudest of is the voice. I took GLaDOS from Portal 2 and fine-tuned her voice into a TTS model, so every answer comes back in that flat, slightly menacing GLaDOS tone. The old 2017 C# code is on GitHub, the current version stays on my machine.",
    descriptionTr:
      "Lucy muhtemelen şimdiye kadar yaptığım en sevdiğim şey, çünkü 2017'den beri arada bir kurcalayıp duruyorum.\n\nİlk sürüm tamamen C#'tı. Önde speech recognition, arkada da söylediğimi hazır cevaplara eşleyen kocaman bir switch-case. Aslında hiçbir şeyi anlamıyordu, sadece birazcık canlıymış gibi hissettirecek kadar iyi taklit ediyordu. Sonra hırslanıp bir Arduino ve röleye bağladım, \"ışığı aç\" dediğimde masa lambam gerçekten yanıp sönmeye başladı. Benim için oyuncak olmaktan çıktığı an oydu.\n\nBirkaç yıl sonra switch-case'i çöpe atıp makine öğrenmesine geçtim, böylece her cümleyi elle kodlamak yerine ne istediğimi gerçekten sınıflandırabiliyordu.\n\nŞu an çalıştırdığım sürüm Python'da baştan yazıldı. \"Lucy\" diye bekliyor, sesimi Whisper'dan geçiriyor, ne sorduğumu çözüyor ve gerçek işi yapıyor: arama açıyor, not alıp geri okuyor, uygulama başlatıyor, sistem sesini değiştiriyor, sesli söylediğim matematiği çözüyor, Wikipedia özeti çekip dinlemek ister misin diye soruyor. Tek seferlik komut yerine kısa bir karşılıklı konuşma bile tutuyor, altında da sadece kalıp eşleştirmek yerine biraz akıl yürütsün diye bir LLM ve mantık katmanı var. Konuşurken terminalde bir ASCII göz canlanıyor, sana bakan bir şey varmış gibi hissettiriyor.\n\nEn gurur duyduğum kısım ses. Portal 2'deki GLaDOS'un sesini alıp bir TTS modeline fine-tune ettim, böylece her cevap o düz, hafif tehditkâr GLaDOS tonunda geliyor. Eski 2017 C# kodu GitHub'da, güncel sürüm kendi makinemde kalıyor.",
    tech: [
      "C#",
      ".NET",
      "Arduino",
      "Python",
      "Whisper",
      "Machine Learning",
      "VITS TTS",
      "LLM",
    ],
    highlights: [
      "Started in 2017 as a C# \"fake AI\": speech recognition plus a huge switch-case that pretended to understand me",
      "Wired it to an Arduino and a relay so \"turn on the light\" actually flipped my desk lamp on and off",
      "Rebuilt in Python: \"Lucy\" wake word, Whisper speech-to-text, real actions (search, notes, apps, volume, spoken math, Wikipedia) and short back-and-forth conversations",
      "Fine-tuned GLaDOS's voice from Portal 2 into a TTS model so Lucy answers in that exact cold tone",
      "An animated ASCII eye in the terminal that blinks and follows along while it talks",
    ],
    highlightsTr: [
      "2017'de C# \"sahte yapay zeka\" olarak başladı: speech recognition ve beni anlıyormuş gibi yapan kocaman bir switch-case",
      "Bir Arduino ve röleye bağladım, \"ışığı aç\" dediğimde masa lambam gerçekten yanıp sönüyordu",
      "Python'da baştan yazıldı: \"Lucy\" wake-word'ü, Whisper ile sesten yazıya, gerçek aksiyonlar (arama, not, uygulama, ses, sesli matematik, Wikipedia) ve kısa karşılıklı konuşmalar",
      "Portal 2'deki GLaDOS'un sesini bir TTS modeline fine-tune ettim, Lucy tam o soğuk tonda cevap veriyor",
      "Terminalde konuşurken kırpıp etrafa bakan animasyonlu bir ASCII göz",
    ],
    cover: "/work-images/lucy-cover.jpg",
    coverAlt:
      "Lucy running in the terminal, drawn as a large ASCII eye that blinks and looks around",
    coverAltTr:
      "Terminalde çalışan Lucy, kırpıp etrafa bakan büyük bir ASCII göz olarak çizilmiş",
    video: {
      src: "/work-images/lucy-demo.mp4",
      poster: "/work-images/lucy-cover.jpg",
    },
    links: [
      {
        label: "2017 source on GitHub",
        url: "https://github.com/MMetehan/lucy",
        type: "github",
      },
      {
        label: "First demo (Apr 2017)",
        url: "https://www.instagram.com/reel/BTPAxxSFn5P/",
        type: "other",
      },
      {
        label: "Lamp on/off (May 2017)",
        url: "https://www.instagram.com/reel/BUDMXvhlhC9/",
        type: "other",
      },
      {
        label: "ML version (Apr 2022)",
        url: "https://www.instagram.com/reel/CcztBZ6qiB_/",
        type: "other",
      },
    ],
    featured: true,
  },
  {
    id: "stormic",
    slug: "stormic",
    title: "StorMIC",
    titleTr: "StorMIC",
    role: "Creator & Developer",
    roleTr: "Fikir Sahibi ve Geliştirici",
    client: "Personal project",
    clientTr: "Kişisel proje",
    year: "2026",
    category: "Desktop App",
    categoryTr: "Masaüstü Uygulama",
    summary:
      "A serverless, privacy-first desktop app for peer-to-peer voice, video and text chat. No accounts, no message history, everything flows directly between participants over encrypted WebRTC.",
    summaryTr:
      "Sunucusuz ve gizlilik öncelikli bir masaüstü uygulaması: eşler arası sesli, görüntülü ve yazılı iletişim. Hesap yok, mesaj geçmişi yok; tüm iletişim şifreli WebRTC üzerinden doğrudan katılımcılar arasında akar.",
    description:
      "StorMIC is a minimal Discord alternative I designed and built end to end. There is no central server that relays or stores messages, audio or files. The only backend is a tiny stateless WebSocket relay used purely for peer discovery and the connection handshake; once ICE negotiation completes, every stream is direct peer-to-peer. When the last person leaves a channel, it stops existing.\n\nOn the voice side it has push-to-talk and open-mic modes, real-time speaking indicators via the Web Audio API, per-user volume and mute, selectable input/output devices, noise suppression / echo cancellation / auto gain, and fully rebindable keyboard and side-mouse-button shortcuts. Video adds webcam and screen sharing with configurable resolution and frame rate, plus a spotlight-and-strip layout. Chat runs over WebRTC data channels with an emoji picker, chunked file transfer with a live progress bar, and inline image previews.\n\nThe client is built with Electron and vanilla JavaScript, split into concern-based modules sharing one scope. It uses perfect negotiation for glare resolution and stream-ID based track role resolution so offer/answer order never matters. Users point the app at their own signaling server, which I ship as a separate deployable backend.",
    descriptionTr:
      "StorMIC, baştan sona kendi tasarlayıp geliştirdiğim minimal bir Discord alternatifi. Mesajları, sesi veya dosyaları ileten ya da saklayan merkezi bir sunucu yok. Tek arka uç, yalnızca eşlerin birbirini bulması ve bağlantı el sıkışması için kullanılan küçük ve durumsuz bir WebSocket aktarıcısı; ICE müzakeresi tamamlandıktan sonra tüm akışlar doğrudan eşler arasında gider. Bir kanaldan son kişi ayrıldığında kanal yok olur.\n\nSes tarafında bas-konuş ve açık mikrofon modları, Web Audio API ile gerçek zamanlı konuşma göstergesi, kullanıcı bazlı ses seviyesi ve susturma, giriş/çıkış aygıtı seçimi, gürültü engelleme / yankı azaltma / otomatik kazanç ve tamamen yeniden atanabilir klavye ve yan fare tuşu kısayolları var. Görüntü tarafında yapılandırılabilir çözünürlük ve kare hızıyla kamera ve ekran paylaşımı, ayrıca spotlight + şerit yerleşimi bulunuyor. Sohbet WebRTC veri kanalları üzerinden çalışıyor; emoji seçici, ilerleme çubuklu parçalı dosya transferi ve satır içi görsel önizleme içeriyor.\n\nİstemci Electron ve saf JavaScript ile yazıldı; tek kapsamı paylaşan, sorumluluğa göre bölünmüş modüllerden oluşuyor. Çakışan teklif durumları için perfect negotiation, teklif/yanıt sırasının önemsiz olması için stream-ID tabanlı track rol çözümlemesi kullanıyor. Kullanıcılar uygulamayı kendi sinyal sunucularına yönlendiriyor; bu sunucuyu ayrı, dağıtılabilir bir arka uç olarak yayınlıyorum.",
    tech: [
      "Electron",
      "WebRTC",
      "JavaScript",
      "Web Audio API",
      "HTML5",
      "CSS3",
    ],
    highlights: [
      "Fully serverless architecture: audio, video, chat and files travel directly peer-to-peer over WebRTC",
      "No accounts and zero message history; channels disappear when the last participant leaves",
      "Perfect negotiation for glare resolution and stream-ID based track matching so signal order never matters",
      "Web Audio API voice activity detection, rebindable push-to-talk, per-user volume and device selection",
      "Self-hostable: ships with a separate stateless signaling-server backend",
    ],
    highlightsTr: [
      "Tamamen sunucusuz mimari: ses, görüntü, sohbet ve dosyalar WebRTC üzerinden doğrudan eşler arasında akar",
      "Hesap yok ve sıfır mesaj geçmişi; son katılımcı ayrılınca kanal kaybolur",
      "Çakışma çözümü için perfect negotiation ve stream-ID tabanlı track eşleştirmesi, sinyal sırası önemsiz",
      "Web Audio API ile konuşma algılama, yeniden atanabilir bas-konuş, kullanıcı bazlı ses ve aygıt seçimi",
      "Kendi sunucunda barındırılabilir: ayrı, durumsuz bir sinyal sunucusu arka ucuyla gelir",
    ],
    cover: "/work-images/stormic-cover.png",
    coverAlt:
      "StorMIC app icon: a lightning bolt held like a microphone in front of a glowing storm cloud",
    coverAltTr:
      "StorMIC uygulama ikonu: parlayan bir fırtına bulutunun önünde mikrofon gibi tutulan bir şimşek",
    gallery: [
      {
        src: "/work-images/stormic-voice-channel-chat.jpeg",
        alt: "StorMIC desktop app showing a voice channel with participants and text chat side by side",
        altTr:
          "StorMIC masaüstü uygulaması: yan yana katılımcı listesi olan bir sesli kanal ve metin sohbeti",
      },
      {
        src: "/work-images/stormic-create-join-channel.jpeg",
        alt: "StorMIC start screen for creating or joining a channel with a channel code",
        altTr:
          "Kanal kodu ile kanal oluşturma veya kanala katılma ekranı",
      },
      {
        src: "/work-images/stormic-audio-settings.jpeg",
        alt: "StorMIC settings panel with audio device selection and the signaling server URL field",
        altTr:
          "Ses aygıtı seçimi ve sinyal sunucusu URL alanı bulunan ayarlar paneli",
      },
      {
        src: "/work-images/stormic-chat-mentions.jpeg",
        alt: "Typing @ in StorMIC chat opens the participant list to mention someone directly",
        altTr:
          "Sohbette @ yazınca katılımcı listesi açılır ve doğrudan birini etiketleyebilirsin",
      },
    ],
    links: [
      {
        label: "stormic.metehan-yildirim.com",
        url: "https://stormic.metehan-yildirim.com/",
        type: "live",
      },
      {
        label: "GitHub repo",
        url: "https://github.com/MMetehan/StorMIC",
        type: "github",
      },
      {
        label: "Signaling server",
        url: "https://github.com/MMetehan/StorMIC-Backend",
        type: "github",
      },
      {
        label: "Setup guide",
        url: "https://metehan-yildirim.com/blog/stormic-self-hosted-voice-chat-setup",
        type: "other",
      },
    ],
    featured: true,
  },
  {
    id: "anatolian-spine",
    slug: "anatolian-spine",
    title: "Anatolian Spine",
    titleTr: "Anatolian Spine",
    role: "Full-stack Developer",
    roleTr: "Full-stack Geliştirici",
    client: "Anatolian Spine Study Group (ASSG)",
    clientTr: "Anatolian Spine Study Group (ASSG)",
    year: "2025–2026",
    category: "Web Platform",
    categoryTr: "Web Platformu",
    summary:
      "A platform for ASSG, a multi-center spine health study group in Turkey, to introduce the group, its members and its courses. Patients and doctors use it as the channel to reach the team for second opinions and treatment consultation.",
    summaryTr:
      "Türkiye'nin çok merkezli omurga sağlığı çalışma grubu ASSG'nin kendisini, ekip üyelerini ve düzenlediği kursları tanıttığı bir platform. Hastalar ve doktorlar, ikinci görüş ve tedavi danışmanlığı için ekiple bu kanal üzerinden iletişime geçiyor.",
    description:
      "Anatolian Spine is the public site and content platform for the Anatolian Spine Study Group (ASSG). It presents the group, its member doctors, the treatments they perform, and their training and cadaver-course programs, and it acts as the contact channel patients and physicians use to request a second opinion or treatment consultation, scientific collaboration or membership.\n\nI built it full stack. The front end is React 19 with Tailwind CSS and React Router v6: responsive, WCAG-oriented, SEO-optimised with meta tags and structured data, and driven entirely by CMS content pulled from the API with Axios. A session-authenticated admin panel with a rich-text editor lets ASSG manage every section (team, treatments, courses, research, media, sponsors, FAQ) without touching code.\n\nThe back end is a Node.js and Express API with Prisma ORM over PostgreSQL, documented with Swagger. It serves the CMS content, handles the contact and application flows, and backs the admin authentication.",
    descriptionTr:
      "Anatolian Spine, Anatolian Spine Study Group'un (ASSG) halka açık sitesi ve içerik platformu. Grubu, üye doktorları, uyguladıkları tedavileri ve düzenledikleri eğitim ile kadavra kursu programlarını tanıtıyor; ayrıca hastaların ve hekimlerin ikinci görüş veya tedavi danışmanlığı, bilimsel iş birliği ya da üyelik talebi için kullandığı iletişim kanalı olarak çalışıyor.\n\nProjeyi baştan sona geliştirdim. Ön yüz React 19, Tailwind CSS ve React Router v6 ile yazıldı: responsive, WCAG odaklı, meta etiketleri ve yapılandırılmış veriyle SEO uyumlu ve tamamen API'den Axios ile çekilen CMS içeriğiyle besleniyor. Oturum tabanlı kimlik doğrulamalı, zengin metin editörlü bir yönetim paneli sayesinde ASSG her bölümü (ekip, tedaviler, kurslar, araştırma, medya, sponsorlar, SSS) koda dokunmadan yönetiyor.\n\nArka uç, PostgreSQL üzerinde Prisma ORM kullanan bir Node.js ve Express API; Swagger ile belgelendi. CMS içeriğini sunuyor, iletişim ve başvuru akışlarını yönetiyor ve yönetici kimlik doğrulamasını sağlıyor.",
    tech: [
      "React",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Swagger",
    ],
    highlights: [
      "Full-stack build: React 19 front end plus a Node.js / Express / Prisma / PostgreSQL API documented with Swagger",
      "CMS-driven dynamic content managed through a session-authenticated admin panel with a rich-text editor",
      "SEO-optimised with meta tags and structured data; WCAG-oriented and fully responsive",
      "Public contact channel for patients and doctors to request a second opinion or treatment consultation",
      "Sections for the team, treatments, courses and training, research, media, sponsors and membership",
    ],
    highlightsTr: [
      "Baştan sona geliştirme: React 19 ön yüz ve Swagger ile belgelenmiş Node.js / Express / Prisma / PostgreSQL API",
      "Oturum tabanlı kimlik doğrulamalı, zengin metin editörlü yönetim paneliyle yönetilen CMS içeriği",
      "Meta etiketleri ve yapılandırılmış veriyle SEO uyumlu; WCAG odaklı ve tamamen responsive",
      "Hastaların ve doktorların ikinci görüş veya tedavi danışmanlığı talep ettiği halka açık iletişim kanalı",
      "Ekip, tedaviler, kurslar ve eğitimler, araştırma, medya, sponsorlar ve üyelik bölümleri",
    ],
    cover: "/work-images/anatolianspine-cover.jpg",
    coverAlt:
      "Anatolian Spine site hero: a doctor examining a glowing 3D model of the human spine surrounded by medical icons",
    coverAltTr:
      "Anatolian Spine sitesinin hero görseli: tıbbi ikonlarla çevrili, parlayan bir 3B insan omurgası modelini inceleyen bir doktor",
    gallery: [
      {
        src: "/work-images/anatolianspine-homepage.jpg",
        alt: "Anatolian Spine home page with the ASSG welcome hero and call-to-action buttons",
        altTr:
          "ASSG karşılama hero'su ve yönlendirme butonlarıyla Anatolian Spine ana sayfası",
      },
      {
        src: "/work-images/anatolianspine-team.jpg",
        alt: "The Doktorlarımız page listing ASSG member doctors as cards with photos and specialties",
        altTr:
          "ASSG üye doktorlarını fotoğraf ve uzmanlıklarıyla kart olarak listeleyen Doktorlarımız sayfası",
      },
      {
        src: "/work-images/anatolianspine-courses.jpg",
        alt: "The training and course programs page showing spine surgery cadaver course cards",
        altTr:
          "Omurga cerrahisi kadavra kursu kartlarını gösteren eğitim ve kurs programları sayfası",
      },
    ],
    links: [
      {
        label: "anatolianspine.com",
        url: "https://anatolianspine.com/",
        type: "live",
      },
    ],
    featured: true,
  },
  {
    id: "spine-orthopedics",
    slug: "spine-orthopedics",
    title: "Spine Orthopedics",
    titleTr: "Spine Orthopedics",
    role: "Full-stack Developer",
    roleTr: "Full-stack Geliştirici",
    client: "Anatolian Spine Study Group (ASSG)",
    clientTr: "Anatolian Spine Study Group (ASSG)",
    year: "2026",
    category: "E-commerce",
    categoryTr: "E-ticaret",
    summary:
      "The sales counterpart to Anatolian Spine: a storefront where doctors browse and buy the spine and orthopedic training and cadaver courses that ASSG runs.",
    summaryTr:
      "Anatolian Spine'ın satış ayağı: doktorların ASSG'nin düzenlediği omurga ve ortopedi eğitim ile kadavra kurslarını inceleyip satın aldığı bir mağaza.",
    description:
      "Spine Orthopedics is the commerce site for the courses promoted on Anatolian Spine. Physicians browse the course catalog with search and filters, pick individual modules with prices that update live as they choose, get package discounts, and complete a cart and checkout flow; enrollment is confirmed with a QR code.\n\nThe front end is React 19 with Tailwind CSS and React Router, talking over Axios to the same Node.js / Express / Prisma / PostgreSQL backend that powers Anatolian Spine.",
    descriptionTr:
      "Spine Orthopedics, Anatolian Spine'da tanıtılan kursların satış sitesi. Hekimler kurs kataloğunu arama ve filtrelerle geziyor, seçtikçe fiyatı canlı güncellenen modülleri tek tek seçiyor, paket indirimi alıyor ve sepet ile ödeme akışını tamamlıyor; kayıt bir QR kodla doğrulanıyor.\n\nÖn yüz React 19, Tailwind CSS ve React Router ile yazıldı; Axios üzerinden Anatolian Spine'ı da besleyen aynı Node.js / Express / Prisma / PostgreSQL arka ucuyla konuşuyor.",
    tech: [
      "React",
      "Tailwind CSS",
      "React Router",
      "Axios",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
    ],
    highlights: [
      "Course storefront where doctors buy the training and cadaver courses promoted on Anatolian Spine",
      "Per-module selection with live price updates, package discounts, cart and checkout, QR-code enrollment",
      "React 19 / Tailwind front end on the same Node.js / Express / Prisma / PostgreSQL backend as Anatolian Spine",
    ],
    highlightsTr: [
      "Anatolian Spine'da tanıtılan eğitim ve kadavra kurslarının doktorlar tarafından satın alındığı mağaza",
      "Canlı fiyat güncellemeli modül seçimi, paket indirimi, sepet ve ödeme, QR kodlu kayıt",
      "Anatolian Spine ile aynı Node.js / Express / Prisma / PostgreSQL arka ucu üzerinde React 19 / Tailwind ön yüz",
    ],
    cover: "/work-images/spineortho-cover.jpg",
    coverAlt:
      "Spine Ortho logo with the tagline Healthcare, Training, Innovation",
    coverAltTr:
      "Healthcare, Training, Innovation sloganıyla Spine Ortho logosu",
    gallery: [
      {
        src: "/work-images/spineortho-homepage.jpg",
        alt: "Spine Orthopedics home page with an Advanced Spine Surgery Training hero and Explore Courses button",
        altTr:
          "Advanced Spine Surgery Training hero'su ve Explore Courses butonuyla Spine Orthopedics ana sayfası",
      },
      {
        src: "/work-images/spineortho-courses.jpg",
        alt: "The Training Programs page with course search, category filters and course cards",
        altTr:
          "Kurs araması, kategori filtreleri ve kurs kartlarıyla Training Programs sayfası",
      },
      {
        src: "/work-images/spineortho-checkout.jpg",
        alt: "A course detail page with selectable modules, live pricing and a booking summary panel",
        altTr:
          "Seçilebilir modüller, canlı fiyatlandırma ve rezervasyon özeti paneli olan bir kurs detay sayfası",
      },
    ],
    links: [
      {
        label: "spine-orthopedics.com",
        url: "https://spine-orthopedics.com/",
        type: "live",
      },
    ],
    featured: true,
  },
];

const withTr = (obj, key, lang) =>
  lang === "tr" && obj[`${key}Tr`] != null ? obj[`${key}Tr`] : obj[key];

const localizeGallery = (gallery, lang) =>
  (gallery || []).map((item) => {
    if (typeof item === "string") return { src: item, alt: "" };
    return { src: item.src, alt: withTr(item, "alt", lang) || "" };
  });

export const localizeWork = (work, lang = "en") => ({
  ...work,
  title: withTr(work, "title", lang),
  role: withTr(work, "role", lang),
  client: withTr(work, "client", lang),
  category: withTr(work, "category", lang),
  summary: withTr(work, "summary", lang),
  description: withTr(work, "description", lang),
  highlights: withTr(work, "highlights", lang) || [],
  coverAlt: withTr(work, "coverAlt", lang) || withTr(work, "title", lang) || "",
  gallery: localizeGallery(work.gallery, lang),
  links: work.links || [],
  tech: work.tech || [],
});

export const getWorks = (lang = "en") => works.map((w) => localizeWork(w, lang));

export const getFeaturedWorks = (lang = "en") =>
  works.filter((w) => w.featured).map((w) => localizeWork(w, lang));

export const getWork = (slug, lang = "en") => {
  const found = works.find((w) => w.slug === slug);
  return found ? localizeWork(found, lang) : null;
};

export default works;
