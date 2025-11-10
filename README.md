# Animerry – Anime Search App

Animerry is a React + TypeScript single-page application that showcases seasonal anime highlights and lets fans search the Jikan API for shows or manga, then drill into detail pages powered by Redux state.

## Features
- **Anime search with filters** – combine keyword, status, type, genre, and rating facets, then fetch paginated results from the server.
- **Server-side pagination** – request the next/previous page from Jikan while keeping query params in sync with the URL.
- **Debounced quick search** – the navbar includes a 250 ms debounced autosuggest dropdown for rapid lookups without leaving the current page.
- **Anime detail view** – rich layouts for synopsis, studios, genres, airing info, and streaming links.
- **Top anime showcase** – homepage and empty-search state highlight curated carousels fetched from the API.
- **Responsive UI & loading skeletons** – tailwind-styled components, animated placeholders, and hover cards for consistent UX.

## Tech Stack
- React 19 with Vite
- TypeScript
- Redux Toolkit & React Redux
- react-router-dom v7
- Radix UI primitives & custom Tailwind CSS styling

## Project Structure
```
src/
├── api/               # fetch utilities and endpoint constants
├── components/
│   ├── composite/     # feature-level UI (navbar, grids, hover cards, detail layout)
│   └── ui/            # reusable primitives (button, card, carousel, dropdown, input, skeleton)
├── hooks/             # custom hooks (useDebounce)
├── pages/             # route-level components (home, search, detail, manga)
├── state/             # Redux store, slices, selectors, hooks
├── App.tsx            # route shell
└── main.tsx           # SPA entrypoint & router setup
```

## Getting Started
1. **Prerequisites** – Node.js 18+ and npm 9+.
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server (port 4000, strict)**
   ```bash
   npm run dev
   ```
4. Visit [http://localhost:4000](http://localhost:4000) in your browser.

### Additional Scripts
- `npm run build` – type-check and create a production build.
- `npm run lint` – run ESLint against the project.
- `npm run preview` – preview the production build locally.

## API Usage
All data comes from the public [Jikan REST API](https://docs.api.jikan.moe/). Fetch helpers in `src/api/http.ts` add retry logic, timeouts, and template-driven URLs, while constants in `src/api/constants.ts` centralize endpoint strings.

## State Management
The Redux store (see `src/state/store.ts`) combines feature slices for search, quick search, manga, and anime detail flows. Selectors expose memoized state, and typed hooks (`useAppDispatch`, `useAppSelector`) simplify usage in components.

## Known Limitations
- The primary search form still requires clicking the **Search** button; instant debounced fetching and aborting in-flight requests are only implemented for the navbar quick search.
- Previous API requests are not cancelled when starting a new query from the main form.

## Submission Checklist
- [x] Project uses npm only (lockfile included)
- [x] `npm install` and `npm run dev` start the app successfully
- [x] Dev server is pinned to port 4000 (`vite.config.ts`)
- [x] No environment variables required for local development
- [x] Project deployment URL – (https://animerry.vercel.app/)
- [x] Core functionality implemented with React + TypeScript + Redux state

## Bonus Implementation
- Debounced navbar quick-search
- Animated loading skeletons for cards and grids
- Scroll-aware navbar that hides on downward scroll and reappears on upward scroll
- Carousel anime list on home page
- Additional filter based on Genres, Type, Status and Rating for Anime.
- Manga library with instant search debounce feature. 