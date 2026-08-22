# 🎓 Capital Youth Expo (CYE) 2026 — Official Pre-Event Web Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.1-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Venue: BUIC](https://img.shields.io/badge/Venue-BUIC_Islamabad-003B96?style=for-the-badge&logo=google-maps&logoColor=white)](https://bahria.edu.pk/)

> Official modern web application for the **Capital Youth Expo (CYE) 2026 Pre-Event**, hosted at **Bahria University Islamabad Campus (BUIC)**. Presented by **Al Nakhla Student Support Centre** in collaboration with **Youth Insight Pakistan**.

---

## 🌟 Executive Summary

**Capital Youth Expo (CYE) 2026** is premier multi-disciplinary youth festival designed to foster innovation, intellectual discourse, artistic expression, and competitive gaming among university students. 

This repository houses the **Next.js 16 frontend platform**, featuring an ultra-modern glassmorphic design system, dynamic competition registration workflows, campus ambassador onboarding, interactive venue navigation, animated route transitions, and an intelligent AI assistant.

---

## ✨ Key Features

### 🏆 Comprehensive Competitions Portal
- **4 Main Tracks & 9 Competitions**:
  - **💻 Technology**: Speed Programming & Mini Hackathon
  - **📚 Literary**: Speech Competition, Seerah Quiz, Essay Writing & Short Story Writing
  - **🎨 Visual Arts**: Live Painting & Creative Arts Exhibition
  - **🎮 Gaming & Esports**: Counter-Strike 2 (5v5 Tactical Showdown)
  - **🎙️ Conferences**: CYE Nexus Leadership & Career Pro Talks
- **Interactive Rulebooks & Scoring Rubrics**: Detailed team size specs, allowed toolsets, evaluation criteria, and award breakdowns.
- **Dynamic Registration Modal**: Form with validation, student ID card upload via `FormData`, and automated payload routing.

### 🤝 Campus Ambassador Hub
- Structured onboarding portal for student ambassadors across regional universities.
- Clear breakdown of responsibilities, reward tiers (Official Leadership Certificates, Shields, VIP Access, Swag Kits).
- Multi-step application submission workflow.

### 📍 Interactive Venue & Logistics Guide
- Detailed map integration and arrival guides for **BUIC Sector E-8 Campus**.
- Gate instructions (Gate 1 & Gate 2), parking guidance, security protocols, and timeline schedules.

### 🤖 Intelligent AI Event Assistant (`N8nChatWidget`)
- Powered by interactive Lottie animations (`Little power robot`).
- Real-time intent-matching FAQ engine for quick answers on rules, timings, venues, leadership, and registration.
- Deep-linked quick response pills directing users across the platform.

### 🎨 State-of-the-Art Visual Aesthetics & UX
- **Curated Typography System**:
  - Headings: `Bricolage Grotesque`
  - Body: `Manrope`
  - Technical / Stats: `JetBrains Mono`
  - Editorial Accents: `Instrument Serif`
- **Dynamic Micro-Interactions**: Blind-curtain page transitions, coverflow recaps, floating badges, marquee sponsor banners, and glassmorphism styling.
- **Fully Responsive & Accessible**: Mobile-first responsive layouts with smooth scrolling and keyboard-accessible UI controls.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology / Library | Purpose |
|---|---|---|
| **Framework** | **Next.js 16 (App Router)** | Server Components, SEO optimization, and optimized page routing |
| **UI Library** | **React 19** | Dynamic client components and hooks |
| **Language** | **TypeScript 5** | End-to-end type safety across components and API schemas |
| **Styling** | **Tailwind CSS v4 + Vanilla CSS** | Utility-first styling with custom CSS variables & glassmorphic tokens |
| **Motion & Animation** | **Framer Motion 13 + Lottie React** | Smooth enter/exit transitions, coverflow carousels & interactive robot animations |
| **Iconography** | **Lucide React** | Streamlined and consistent UI iconography |
| **Typography** | `next/font/google` | Zero-layout-shift font optimization |
| **State & Data Fetching**| Native Fetch + Next.js Cache | Incremental Static Regeneration (ISR) and asynchronous REST communication |

---

## 📂 Project Structure

```bash
frontend/
├── public/
│   ├── images/              # Lottie animations, sponsor badges, and media assets
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router directory
│   │   ├── layout.tsx       # Root layout with font definitions & global widgets
│   │   ├── page.tsx         # Interactive Landing Page
│   │   ├── globals.css      # Design tokens, keyframes & Tailwind imports
│   │   ├── competitions/    # Competitions catalogue & filter system
│   │   ├── ambassadors/     # Campus Ambassador application portal
│   │   ├── venue/           # Campus map, directions & logistics
│   │   ├── team-about/      # Organizing committee & vision
│   │   └── contact/         # Help desk & message dispatch
│   ├── components/
│   │   ├── cards/           # GlassCompetitionCard and reusable cards
│   │   ├── chat/            # N8nChatWidget (AI Robot Assistant)
│   │   ├── hero/            # HeroSection, DateVenueBadge, PresentedByBanner
│   │   ├── home/            # CategoriesScrollSection, RecapCoverflow, SponsorsMarquee
│   │   ├── layout/          # Header, Footer, BlindCurtainsTransition, ScrollToTop
│   │   ├── registration/    # RegisterModal and form controllers
│   │   └── ui/              # Buttons, inputs, and badge components
│   ├── lib/
│   │   └── api.ts           # Centralized API service for backend communication
│   └── types/
│       └── index.ts         # TypeScript interfaces (Competition, Ambassador, Team, etc.)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node.js 20+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cye-2026-buic.git
cd cye-2026-buic/frontend
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `frontend` root directory:

```env
# Backend REST API endpoint (optional, defaults to http://localhost:5000)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to preview the live application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔌 API Integration & Endpoints

The frontend connects to a REST backend via `src/lib/api.ts`:

- `GET /team-about` — Retrieves list of organizing team leads and members.
- `GET /sponsors` — Retrieves official event partners and sponsors.
- `POST /competitions/register` — Accepts `multipart/form-data` with participant details and verification ID card.
- `POST /ambassadors/apply` — Accepts JSON payload for prospective campus ambassadors.
- `POST /contact/send` — Submits user contact queries and support messages.

---

## 👥 Organizing Committee & Leadership

- **Presented By**: Al Nakhla Student Support Centre & Youth Insight Pakistan
- **Host Institution**: Bahria University Islamabad Campus (BUIC)
- **Event Head**: Mamoon Ahmed Ali
- **Deputy Event Heads**: Hamid Sultan & Hiba Ali

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
