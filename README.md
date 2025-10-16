# 🎨 Portfolio - Frontend

Modern ve responsive bir portfolio web uygulamasının frontend kısmı. React, TypeScript, Tailwind CSS ve Framer Motion ile geliştirilmiştir.

## 🔗 Backend Repository

**Backend:** [portfolio-backend](https://github.com/omerhodo/portfolio-backend)

> **Not:** Bu uygulama linkteki backend ile çalışır. Tam bir kurulum için yukarıdaki backend repository'sini de kurmanız gerekmektedir.

---

## 📸 Özellikler

- ✅ **Modern UI/UX**: Framer Motion ile smooth animasyonlar
- ✅ **Responsive Design**: Mobil, tablet ve desktop uyumlu
- ✅ **Lazy Loading**: Görseller için optimize edilmiş yükleme
- ✅ **PWA Ready**: Progressive Web App desteği
- ✅ **Fullscreen Project Slider**: İmmersive proje gösterimi
- ✅ **Admin Panel**: Proje yönetimi için dashboard
- ✅ **Dark Mode**: Klein color theme (#002fa7)
- ✅ **Safe Area Support**: iOS notch ve Android cutout desteği
- ✅ **SEO Optimized**: Meta tags ve favicon yapılandırması

## 🛠️ Teknolojiler

### Core

- **React 19.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router 7** - Routing

### Styling

- **Tailwind CSS 4** - Utility-first CSS
- **SCSS/SASS** - Custom styling
- **Framer Motion** - Animations
- **Styled Components** - Component styling

### Other

- **Axios** - HTTP client
- **GSAP** - Advanced animations
- **Cloudinary** - Image optimization

## 📁 Proje Yapısı

```
client/
├── public/                    # Static files
│   ├── favicon.ico           # Favicon
│   ├── apple-touch-icon.png  # iOS/Android icon
│   └── site.webmanifest      # PWA manifest
├── src/
│   ├── assets/               # Images, fonts
│   ├── components/           # React components
│   │   ├── AboutMe/         # About section
│   │   ├── FullscreenProjectSlider/  # Project slider
│   │   ├── LazyImage/       # Lazy loading image component
│   │   ├── MainHeader/      # Header component
│   │   ├── Modal/           # Modal system
│   │   ├── ProjectCard/     # Project card
│   │   ├── ProjectForm/     # Admin project form
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home/           # Home page
│   │   ├── Admin/          # Admin dashboard
│   │   ├── Projects/       # Projects page
│   │   └── Contact/        # Contact page
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   ├── utils/              # Utilities & SCSS
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── globals.css        # Global styles
├── index.html             # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.cjs   # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+ ⚡
- Yarn veya npm 📦
- Backend servisi çalışıyor olmalı 🔗

### Adımlar

1. **Repoyu klonlayın:**

```bash
git clone https://github.com/omerhodo/portfolio-client.git
cd portfolio-client
```

2. **Bağımlılıkları yükleyin:**

```bash
yarn install
# veya
npm install
```

3. **Environment variables oluşturun:**

```bash
# .env dosyası oluşturun
cp .env.example .env
```

4. **`.env` dosyasını düzenleyin:**

```env
VITE_API_URL=http://localhost:5001/api
VITE_BASE_URL=http://localhost:5001
```

5. **Development server'ı başlatın:**

```bash
yarn dev
# veya
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🔗 Backend

Bu proje bir Node.js backend ile çalışır:

- **Backend Repository**: [portfolio-backend](https://github.com/omerhodo/portfolio-backend)
- Backend'i kurmak için yukarıdaki repo'nun README'sini takip edin

## 📦 Scripts

```bash
# Development server
yarn dev

# Production build
yarn build

# Preview production build
yarn preview

# Lint check
yarn lint

# Lint fix
yarn lint:fix

# Format code
yarn format

# Format check
yarn format:check
```

## 🎯 Environment Variables

| Variable        | Description      | Example                     |
| --------------- | ---------------- | --------------------------- |
| `VITE_API_URL`  | Backend API URL  | `http://localhost:5001/api` |
| `VITE_BASE_URL` | Backend base URL | `http://localhost:5001`     |

## 🚀 Production Deployment

### Build

```bash
yarn build
```

Build dosyaları `dist/` klasöründe oluşturulur.

### Deploy Seçenekleri

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Railway**: Railway dashboard üzerinden
- **Custom Server**: `dist/` klasörünü static hosting'e yükleyin

## 👤 Yazar

**Ömer Hodo**

- Portfolio: [xhodo.com](https://xhodo.com)
- GitHub: [@omerhodo](https://github.com/omerhodo)
