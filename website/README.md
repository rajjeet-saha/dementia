# DEMENTIA — AI-Powered Cognitive Assistance for Elderly Care

**Official Web Presentation & Caregiver Clinical Portal** for the **DEMENTIA** application.

---

## 🌟 Overview

The **DEMENTIA** platform addresses critical elderly healthcare and cognitive care challenges in the **North Eastern Region (NER)** and remote rural communities. It unites accessible, Godot 4.x-powered cognitive games on Android with an **Explainable Rule-Based Adaptive AI Engine**, holistic daily routine reminders, and a secure **Supabase-backed Caregiver Monitoring Portal**.

---

## 🎯 Key Capabilities & Architecture

```
                    DEMENTIA
                       │
        ┌──────────────┴──────────────┐
        │                             │
    GODOT APP                    WEB PLATFORM
  (Android Client)             (Presentation & Portal)
        │                             │
   Elderly User                  Caregiver
        │                             │
        └──────────────┬──────────────┘
                       ↓
                  SUPABASE
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
       profiles    game_results   reminders
          │            │            │
          └────────────┼────────────┘
                       ↓
              Caregiver Dashboard
```

1. **🧠 Cognitive Games**
   - **Memory Game 01**: Memory recall & familiar domestic objects (Adaptive Level 1–3)
   - **Memory Game 02**: Pattern & sequence recognition (Adaptive Level 1–3)
   - **Cognitive Game 03**: Attention & focus target identification (Calibrated pace)

2. **🤖 Adaptive AI Engine**
   - Deterministic, explainable 3-tier rule engine (NOT an opaque black-box ML model).
   - Computes composite scores from: **Accuracy (50%)**, **Reaction Time Latency (25%)**, **Best Streak (15%)**, and **Session Score (10%)**.
   - Decision Rules:
     - Performance $\ge 80 \implies$ **Increase Difficulty (+1)**
     - Performance $55 - 79 \implies$ **Maintain Difficulty**
     - Performance $< 55 \implies$ **Decrease Difficulty (-1)**

3. **📡 100% Offline Resilience**
   - `ONLINE ↕ SYNC ↕ OFFLINE` architecture: all games, voice audio lines, and reminders execute locally with zero cellular data dependency in remote areas.

4. **👵 Universal Elderly Accessibility**
   - Atkinson Hyperlegible typography (Braille Institute).
   - Dynamic text size adjuster (`A`, `A+`, `A++`).
   - High-contrast mode exceeding WCAG AAA standards.
   - Text-to-speech voice assistant support.
   - Generous 56px+ tap targets.

5. **🛡️ Caregiver & Clinical Portal (`/caregiver/dashboard`, `/caregiver/patient/:id`)**
   - Authenticated access for family caregivers and community health workers (`profiles.role`).
   - Interactive SVG telemetry charts: Accuracy trend, Score progression, Response latency (ms), and Adaptive Tier history.
   - Session activity feed (`ORDER BY played_at DESC`).
   - Categorized reminder subsystem (💊 Medicine, 💧 Hydration, 🗓 Routine, 🏥 Clinic Appointments).
   - Row Level Security (RLS) compliant patient isolation.

---

## 🚀 Getting Started

### 1. Installation
```bash
cd dementia-web
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

### Supabase Connection (.env)
Create a `.env` file from `.env.example`:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
*Note: If environment variables are omitted, the application runs in a sandbox mode with preloaded NER clinical profiles for testing.*

### GitHub Release APK Download URL
Update `src/config/appConfig.ts`:
```typescript
export const DOWNLOAD_URL = "https://github.com/your-org/dementia/releases/download/v1.0.0/dementia.apk";
```

---

## 🗺️ Routes & Sitemap

| Route | Scope | Description |
| :--- | :--- | :--- |
| `/` | **Public** | Complete presentation showcase (Hero, Problem, Solution, Features, Games, Adaptive AI, Offline, Reminders, Impact, Download, Footer) |
| `/problem` | **Public** | NER regional healthcare challenge section |
| `/solution` | **Public** | Unified platform architecture |
| `/features` | **Public** | Full 11-feature platform matrix |
| `/games` | **Public** | Interactive cognitive games breakdown & canvas demo |
| `/adaptive-ai` | **Public** | Adaptive AI engine workflow & live interactive simulator |
| `/download` | **Public** | Android APK download hub & GitHub Releases link |
| `/caregiver/login` | **Private** | Secure Supabase authentication portal |
| `/caregiver/dashboard` | **Private** | Caregiver telemetry overview & authorized patient registry |
| `/caregiver/patient/:id` | **Private** | Patient details, cognitive charts, session logs, & active reminders |
