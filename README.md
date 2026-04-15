# json-visualizer

> Paste JSON. See everything. Instantly.

![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Vite 6.2](https://img.shields.io/badge/Vite-6.2-646cff?style=flat-square&logo=vite)
![License MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)

![Demo](.github/demo.gif)

An interactive, zero-dependency JSON tree visualizer built with React 19, TypeScript 5.7, and Tailwind CSS v4. Designed for developers who need to explore complex JSON payloads quickly — from API responses to config files.

---

## Features

| Feature | Detail |
|---|---|
| **Collapsible tree** | Expand / collapse any object or array node independently |
| **Color coding** | Strings (green), numbers (blue), booleans (orange), null (red), keys (violet) |
| **Path display** | Hover any key to see its full dot-notation path (`user.address.city`) |
| **Copy path** | One click to copy the dot-notation path to clipboard |
| **Copy value** | Hover any primitive value to reveal a copy button |
| **Search** | Highlights matching keys and values across the entire tree |
| **Expand all / Collapse all** | Bulk tree controls with a reset-to-default option |
| **Stats bar** | Lines · keys · max depth · byte size at a glance |
| **Error display** | Friendly error with line/column info for invalid JSON |
| **Example JSON** | One-click rich sample payload to explore immediately |
| **View modes** | Tree view (interactive) and Raw view (syntax-highlighted) |
| **Responsive layout** | Two-panel on desktop, stacked on mobile |

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/mariotavarez/json-visualizer.git
cd json-visualizer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Type-check + production build
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── JsonInput.tsx        # Textarea + paste/clear/example buttons + error display
│   ├── JsonTree.tsx         # Root tree renderer with expand-all/collapse-all controls
│   ├── JsonNode.tsx         # Recursive node: handles object, array, primitive
│   ├── JsonValue.tsx        # Colored value display (string/number/bool/null)
│   ├── JsonKey.tsx          # Key label with path tooltip + copy button
│   ├── SearchBar.tsx        # Search input with match count badge
│   ├── StatsBar.tsx         # Lines · keys · depth · size stats
│   ├── ViewToggle.tsx       # Tree / Raw toggle buttons
│   └── RawView.tsx          # Syntax-highlighted formatted JSON
├── hooks/
│   ├── useJsonParser.ts     # Parse JSON string, return tree or structured error
│   ├── useSearch.ts         # Walk the tree, return matched dot-notation paths
│   └── useClipboard.ts      # Copy to clipboard with "Copied!" feedback
├── utils/
│   ├── jsonStats.ts         # Count keys, max depth, total nodes, byte size
│   └── pathUtils.ts         # Build dot-notation paths from segment arrays
├── data/
│   └── sampleJson.ts        # Rich sample JSON (user profile + orders + metadata)
├── App.tsx
└── main.tsx
```

---

## Color Scheme (VS Code-inspired dark theme)

| Token | Class | Hex |
|---|---|---|
| String value | `text-green-400` | `#4ade80` |
| Number value | `text-blue-400` | `#60a5fa` |
| Boolean value | `text-orange-400` | `#fb923c` |
| Null value | `text-red-400` | `#f87171` |
| Object key | `text-violet-300` | `#c4b5fd` |
| Bracket/Brace | `text-gray-400` | `#9ca3af` |
| Page background | `bg-gray-950` | `#030712` |
| Panel background | `bg-gray-900` | `#111827` |

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Click node header | Toggle expand / collapse |
| Hover key | Show full dot-notation path tooltip |
| Click copy icon on key | Copy path to clipboard |
| Hover primitive value | Show copy value button |

---

## Tech Stack

- **React 19** — new JSX transform, strict mode
- **TypeScript 5.7** — strict mode, `moduleResolution: bundler`
- **Vite 6.2** — instant HMR, optimized builds
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin (no config file needed)
- **lucide-react** — consistent icon set
- **clsx** — conditional class name utility

---

## License

MIT © [Mario Tavarez](https://github.com/mariotavarez)
