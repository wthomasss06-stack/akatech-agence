<div align="center">

<!-- LOGO ASCII / Titre -->
```
 █████╗ ██╗  ██╗ █████╗ ████████╗███████╗ ██████╗██╗  ██╗
██╔══██╗██║ ██╔╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝██║  ██║
███████║█████╔╝ ███████║   ██║   █████╗  ██║     ███████║
██╔══██║██╔═██╗ ██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║
██║  ██║██║  ██╗██║  ██║   ██║   ███████╗╚██████╗██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
```

# AKATech — Agence Web · Abidjan 🇨🇮

**Solutions web modernes, rapides et rentables pour les entrepreneurs, PME et créateurs en Afrique.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)](https://akatech.vercel.app)
[![Status](https://img.shields.io/badge/Status-Live_🟢-22c864?style=flat-square)]()

---

### 🚀 [akatech.vercel.app](https://akatech.vercel.app/) — Site en production

🌐 **[Portfolio](https://akafolio160502.vercel.app/)** · 💬 **[WhatsApp](https://wa.me/2250142507750)** · 📧 **[wthomasss06@gmail.com](mailto:wthomasss06@gmail.com)**

</div>

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Stack technique](#-stack-technique)
- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Installation](#-installation)
- [Déploiement](#-déploiement)
- [Réalisations présentées](#-réalisations-présentées)
- [Contact & liens](#-contact--liens)

---

## 🖥️ Aperçu

Site vitrine de l'agence **AKATech**, développé de A à Z en React + Vite. Design skeuomorphisme vert/noir, entièrement animé avec Framer Motion, 100% responsive mobile.

🔗 **Site en ligne : [https://akatech.vercel.app](https://akatech.vercel.app/)**

> AKATech accompagne les entrepreneurs, PME et créateurs en Afrique dans la création de solutions web modernes — des solutions conçues pour **attirer des clients**, **automatiser votre activité** et **générer des revenus**.

### Sections du site

| Section | Description |
|---|---|
| **Hero** | Carousel d'images de fond, titre animé, trust bar statistiques |
| **À propos** | Grille photos parallax, compteurs animés, stack technique |
| **Services** | 6 services avec prix, délais, banner carousel |
| **Processus** | 4 étapes avec icônes SVG animées sur mesure |
| **Réalisations** | Carousel auto-play + drag/swipe des projets livrés |
| **Tarifs** | Tableaux comparatifs par catégorie (Vitrine / E-commerce / SaaS / Portfolio) |
| **Témoignages** | Carousel auto-play avec fallback avatar |
| **FAQ** | Accordéon animé |
| **Contact** | Formulaire → WhatsApp + liens sociaux |

---

## 🛠️ Stack technique

```
Frontend
├── React 18          — UI composants
├── Vite 5            — Bundler ultra-rapide
├── Tailwind CSS 3    — Utilitaires CSS
├── Framer Motion 11  — Animations & transitions
└── Lucide React      — Icônes SVG

Fonts (Google Fonts)
├── Syne              — Titres & corps
├── Orbitron          — Chiffres & accents
└── JetBrains Mono    — Labels & code

Design System
├── Thème : Skeuomorphisme vert (#22c864) sur noir (#030806)
├── Palette : 5 niveaux de vert + 4 niveaux de dark
└── Composants : .sku-card, .btn-raised, .btn-ghost, .s-eye
```

---

## ✨ Fonctionnalités

- 🎠 **Carousels** — Hero (5s auto), Services (3s auto), Projets (3.2s + drag/swipe), Témoignages (4.5s)
- 🖱️ **Curseur personnalisé** — Dot vert qui suit la souris, s'agrandit sur les liens, ripple au clic
- 🎯 **Micro-interactions** — Hover sur chaque élément : nav underline, skill tags bounce, tech badges shimmer, FAQ slide, form field-bar, icons spin, footer links slide
- 📜 **Scroll animations** — `useInView` Framer Motion, parallax sur les photos About, compteurs qui montent
- ⚙️ **Icônes SVG animées** — 4 icônes Process dessinées à la main : consultation, stratégie, développement, livraison
- 📱 **Responsive** — Mobile first, breakpoints 480 / 768 / 1024px
- ⬆️ **Back to Top** — Bouton flottant avec animation spring
- 💬 **WhatsApp flottant** — Pill expansible au hover
- 🔄 **Loader** — Progress bar avec messages d'état
- 🌐 **Favicon SVG** — Logo engrenage AKATech

---

## 📁 Structure du projet

```
akatech-agence/
├── public/
│   ├── favicon.svg              ← Favicon SVG logo AKATech
│   └── images/
│       ├── hero-bg.jpg          ← Photo hero principale
│       ├── about-1.jpg          ← Grille About (1/4)
│       ├── about-2.jpg          ← Grille About (2/4)
│       ├── about-3.jpg          ← Grille About (3/4)
│       ├── about-4.jpg          ← Grille About (4/4)
│       ├── services/
│       │   ├── vitrine.jpg
│       │   ├── ecommerce.jpg
│       │   ├── saas.jpg
│       │   ├── portfolio.jpg
│       │   ├── api.jpg
│       │   └── maintenance.jpg
│       ├── projects/
│       │   ├── shopci.jpg
│       │   ├── techflow.jpg
│       │   ├── terrasafe.jpg
│       │   ├── tati.jpg
│       │   ├── mk.jpg
│       │   ├── chapchap.jpg
│       │   └── elvismarket.jpg
│       └── clients/
│           ├── client-1.jpg
│           ├── client-2.jpg
│           └── client-3.jpg
├── src/
│   ├── App.jsx                  ← Composant principal (tout-en-un)
│   ├── main.jsx                 ← Point d'entrée React
│   └── index.css                ← Tailwind + styles globaux
├── index.html                   ← Meta, favicon, fonts
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Installation

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Cloner & lancer

```bash
# Cloner le repo
git clone https://github.com/wthomasss06-stack/akatech-agence.git
cd akatech-agence

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera disponible sur **http://localhost:5173**

### Scripts disponibles

```bash
npm run dev      # Serveur de développement (hot reload)
npm run build    # Build de production → dist/
npm run preview  # Prévisualiser le build
```

---

## 🌍 Déploiement

Le site est déployé sur **Vercel** et accessible à l'adresse :

> **[https://akatech.vercel.app](https://akatech.vercel.app/)**

Pour redéployer après modifications :

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer en production
vercel --prod
```

Ou via **GitHub** → chaque push sur `main` déclenche un déploiement automatique sur Vercel.

---

## 🗂️ Réalisations présentées

| Projet | Type | Stack | Lien |
|---|---|---|---|
| **ShopCI** | Marketplace E-commerce | React · Django · Bootstrap 5 | [shop-ci.vercel.app](https://shop-ci.vercel.app/) |
| **TechFlow** | Site Vitrine Pro | HTML · Tailwind · JS | [techflow-ten.vercel.app](https://techflow-ten.vercel.app/) |
| **TerraSafe** | Marketplace Foncière | Python/Flask · MySQL · Bootstrap 5 | [wthomassss06.pythonanywhere.com](https://wthomassss06.pythonanywhere.com) |
| **Tati** | Portfolio & Vitrine | React · Tailwind · Framer Motion | [tatii.vercel.app](https://tatii.vercel.app/) |
| **MK** | Portfolio Graphiste | React · Tailwind · Framer Motion | [mory01ff.vercel.app](https://mory01ff.vercel.app/) |
| **Chap-chapMAP** | Navigation GPS | Leaflet.js · OSRM · Geolocation | Démo locale |
| **ElvisMarket** | Interface E-commerce | HTML · JS vanilla · Tailwind | Démo locale |

---

## 📬 Contact & liens

<div align="center">

| | Lien |
|---|---|
| 🌐 Portfolio complet | [akafolio160502.vercel.app](https://akafolio160502.vercel.app/) |
| 💬 WhatsApp | [+225 01 42 50 77 50](https://wa.me/2250142507750) |
| 📧 Email pro | [wthomasss06@gmail.com](mailto:wthomasss06@gmail.com) |
| 🎓 Email académique | [aka.mbollo@uvci.edu.ci](mailto:aka.mbollo@uvci.edu.ci) |
| 💼 LinkedIn | [M'Bollo Aka Elvis](https://www.linkedin.com/in/m-bollo-aka-60a1b1340/) |
| 🐙 GitHub | [wthomasss06-stack](https://github.com/wthomasss06-stack) |
| 📘 Facebook | [AKATech](https://web.facebook.com/profile.php?id=61577494705852) |
| 📍 Localisation | Abidjan, Côte d'Ivoire 🇨🇮 |

</div>

---

<div align="center">

**© 2025 AKATech · M'Bollo Aka Elvis · Développeur Full-Stack · Abidjan**

*Ensuring Wellness with Excellence, Passion & Innovation*

</div>
