# Snake Game Online – Production-Ready SPA & Modern Monorepo

A modern, accessible, high-performance **Snake Game single-page application (SPA)** built with React 19, TypeScript, Tailwind CSS v4, HTML5 Canvas, and native Web Audio API synthesis. Deployed as a static SPA on Netlify with zero external backend or database dependencies—100% playable offline.

---

## 🎮 Key Features

- **Intuitive & Responsive Gameplay**:
  - Crisp HTML5 Canvas rendering scaled with `window.devicePixelRatio` for razor-sharp visuals on Retina and high-DPI displays.
  - Fully responsive layout adapting from 320px mobile devices to 4K desktop screens without horizontal scroll.
- **Universal Controls**:
  - **Keyboard**: Arrow keys, `W` `A` `S` `D`, `Spacebar` (Pause/Resume), `Enter` (Start/Restart), and `Esc` (Pause). Prevents page scrolling.
  - **Mobile Touch**: Ergonomic on-screen tactile D-Pad for one-handed play.
  - **Swipe Gestures**: Natural touch swipe directly on the game canvas with `touch-action: none`.
- **4 Unique Game Modes**:
  1. **Classic Mode**: The definitive experience. Arena walls and body collisions cause game over.
  2. **Endless Mode**: Wrap-around edges. Moving off any border seamlessly reappears on the opposite side.
  3. **Time Challenge**: 60-second countdown sprint! Eating apples rewards +3s bonus time and score multipliers.
  4. **Obstacles Mode**: Fair, symmetrical static maze barrier blocks strategically placed across the arena.
- **4 Difficulty Speed Levels**:
  - **Easy**: 6 moves/sec (1.0× score multiplier)
  - **Normal**: 9 moves/sec (1.25× score multiplier)
  - **Hard**: 13 moves/sec (1.5× score multiplier)
  - **Expert**: 17 moves/sec (2.0× score multiplier)
- **Multi-Tiered Food & Progression**:
  - **Normal Apple**: +10 base points (constant spawn)
  - **Bonus Golden Fruit**: +25 base points (temporary 7s appearance with glow)
  - **Special Cosmic Gem**: +50 base points (rare 5s appearance)
  - **Level System**: Advances every 100 points with gradual speed tuning.
- **Client-Side Web Audio API Synthesizer**:
  - Zero external MP3/WAV file dependencies.
  - Custom synthesized sound effects for start, food collected, bonus gems, level up, game over, clicks, and pause.
  - Audio starts only on user interaction respecting browser autoplay policies; toggleable anytime.
- **Theme Support**:
  - Modern dark arcade theme by default.
  - Clean light mode theme with instant toggle.
- **LocalStorage Persistence**:
  - Versioned storage (`snake-game-settings-v1`, `snake-game-statistics-v1`).
  - Tracks high scores, best per mode, best per difficulty, total runs, food collected, and longest snake length.
  - Settings panel with confirmed factory reset option.
- **Score Sharing**:
  - Web Share API integration with automatic fallback to clipboard copy.
- **SEO & Accessibility**:
  - Semantic HTML headings (`h1`, `h2`, `h3`), FAQ accordion, How to Play guide.
  - Open Graph, Twitter cards, and Schema.org `VideoGame` & `WebSite` JSON-LD graph.
  - Accessible ARIA labels, focus states, and `prefers-reduced-motion` support.

---

## 🏗️ Monorepo Architecture (npm workspaces)

```text
my-monorepo/
├── packages/
│   ├── core/                  # Pure logic & algorithms engine (Zero UI dependencies)
│   │   ├── src/
│   │   │   ├── game/          # Game engine, collision, food, scoring, modes
│   │   │   └── index.ts       # Unified exports with modern package.json source exports
│   │   └── tests/             # Vitest unit test suite (20 tests)
│   │
│   ├── web/                   # Snake Game SPA (React 19 + Tailwind v4 + Canvas)
│   │   ├── public/            # robots.txt, sitemap.xml, site.webmanifest, 404.html, _redirects
│   │   ├── src/
│   │   │   ├── components/    # Header, GameBoard, ScoreBoard, GameOverlay, Controls, Settings, FAQ
│   │   │   ├── hooks/         # useGameLoop, useKeyboardControls, useSwipeControls, useSnakeGame
│   │   │   └── utils/         # audio (Web Audio API), storage, share
│   │   └── vite.config.ts     # @tailwindcss/vite + direct @project/core resolution
│   │
│   └── extension/             # Chrome Extension (Manifest V3 Companion)
│       └── vite.config.ts     # Dual-target Rollup bundling (background.js + popup.html)
│
├── netlify.toml               # Netlify SPA redirect & security headers configuration
└── package.json               # Workspace root scripts
```

---

## 🚀 Quick Start & Scripts

### Prerequisites
- Node.js >= 18.0.0 (tested on v22.16.0)
- npm >= 9.0.0 (tested on v11.6.2)

### Installation
```bash
npm install
```

### Development
```bash
# Run web application dev server (port 3000)
npm run dev

# Run Chrome extension dev watch mode
npm run dev:ext
```

### Run Unit Tests
```bash
# Runs Vitest unit tests in packages/core
npm run test
```

### Production Build
```bash
# Build web SPA into packages/web/dist
npm run build:web

# Build Chrome Extension into packages/extension/dist
npm run build:ext

# Build all packages across the entire monorepo
npm run build
```

---

## 🌐 Netlify Deployment

The repository is configured for static SPA deployment out of the box via `netlify.toml`:

```toml
[build]
  command = "npm run build:web"
  publish = "packages/web/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## ✅ Quality Assurance & Testing Checklist

- [x] **Movement & Controls**: Direction buffering prevents self-reversals (e.g. UP -> DOWN).
- [x] **Collision Detection**: Wall collision (Classic/Time/Obstacles) and border wrap (Endless).
- [x] **Food Placement**: Verified that food never spawns on top of the snake body or obstacle blocks.
- [x] **Game Loop**: Delta-time accumulator using `requestAnimationFrame` ensures consistent movement speeds independent of monitor refresh rate (60Hz / 120Hz / 144Hz).
- [x] **Touch & Gesture Handling**: `touch-action: none` prevents accidental page scrolling during swipe or D-pad gameplay.
- [x] **Audio Synthesis**: Web Audio API frequencies synthesized cleanly without external audio network requests.
- [x] **Persistence**: Settings and high-score records survive page refreshes with safe JSON parsing and default fallback.
- [x] **Accessibility**: ARIA labels, keyboard focus outlines, and high contrast ratios across both dark and light modes.
- [x] **Unit Testing**: 20/20 Vitest unit tests passing in `@project/core`.
- [x] **Production Bundle**: Zero TypeScript or Vite bundling errors.

