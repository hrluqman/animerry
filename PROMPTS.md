# Prompt One

**Act as a senior frontend architect** and scaffold a Vite + React + TypeScript app named **Animerry** using **npm only**. Configure the dev server to run on **port 4000** with `strictPort: true`. Install and wire **react-router-dom**, **@reduxjs/toolkit**, **react-redux**, **tailwindcss + postcss + autoprefixer**, and **shadcn/ui** (Vite-compatible). Produce a clean folder structure:

```
src/{app,api,features,components,hooks,pages}
```

Add base routes (`/`, `/search`, `/anime/:id`). No environment variables. Provide code for `vite.config.ts`, Tailwind setup, `main.tsx`, and minimal page stubs.

## Objective

Get a production-quality, npm-only SPA skeleton running on port 4000 with routing, Tailwind, and shadcn/ui ready.

---

# Prompt Two

**Act as an experienced React software engineer using Redux** and implement the **search** state layer with a slice and memoized selectors.

**Requirements**

* Include a `loading: boolean` flag and a reducer to set it.
* Store search results as a serializable object (e.g., `Record<string, any> | null`) and a reducer to set it.
* Store the active query (string or structured filters object) and a reducer to set it.
* Keep the slice minimal, framework-agnostic (no API calls inside reducers), and type-safe.
* Expose `createSelector`-based selectors for: `selectSearchLoading`, `selectSearchResults`, `selectSearchQuery`, and `selectHasResults`.
* Provide an optional `resetSearch` reducer to clear state between searches.

**Deliverables**

* `src/state/slice/searchSlice.ts` with initial state, typed reducers: `setSearchLoading`, `setSearchResults`, `setSearchQuery`, `resetSearch`.
* `src/state/selector/searchSelector.ts` with the selectors listed above.
* Brief usage snippet showing dispatch + selector consumption in a component.

## Objective

Deliver a clean, typed Redux slice and selectors for search that other parts of the app can consume without coupling to the fetching layer.
Centralize data fetching with types, pagination, and request cancellation handled by RTK Query.

---

# Prompt Three

**Act as a software engineer who is expert in API utilities** and create a reusable `fetchJikanApi` under `src/api/`:

* Constants: `BASE_URL = "https://api.jikan.moe/v4"`, `SEARCH_URL = "anime"`, `DETAIL_URL = "anime/:id"`, `GENRE_URL = "genres/anime"`
* Implement path param substitution (`:id`), query builder, and safe URL join (don’t drop `/v4`)
* Options: `{ signal, retries, timeoutMs, init }`
* Usage examples:

  * `fetchJikanApi(SEARCH_URL, { q: "one piece", page: 1, limit: 24 })`
  * `fetchJikanApi(DETAIL_URL, { id: 12 })`
  * `fetchJikanApi(GENRE_URL)`

## Objective

Provide a small, typed fetch layer usable from any component or thunk with retries and AbortController support.

---

# Prompt Four

**Act as a senior TypeScript engineer**. Generate precise, minimal TypeScript types from the provided Jikan anime JSON object. Create a full detail type and a card/list subset type for UI mapping, ensuring fields match the sample exactly (nullable where needed) and remain serializable.

## Requirements

### Derive strongly-typed interfaces for nested structures (images, trailer, titles, aired, companies, genres/demographics).

### Produce:
* AnimeDetail — full schema matching the sample.
* AnimeCardItem — a subset for cards/hover previews using only: mal_id, images, title, type, synopsis, status, genres.
* Use discriminated unions/Enums only where shown by sample (avoid invented values).
* Mark optional/nullable fields correctly (e.g., string | null).
* Keep naming consistent with Jikan (e.g., images.jpg.large_image_url).
* No implementation code, no fetch logic—types only.

## Deliverables

TypeScript block with: supporting types (JikanImageVariant, JikanImages, JikanTrailerImages, JikanTrailer, JikanTitle, JikanAiredProp, JikanAired, JikanCompany, JikanGenre), then AnimeDetail, then AnimeCardItem as Pick<AnimeDetail, `mal_id` | `images` | `title` | `type` | `synopsis` | `status` | `genres`>.

## Objective

Provide clean, copy‑pasteable TypeScript typings that let the UI replace any in .map((item, i) => ...) for hover cards and lists, while preserving a full detail type for the details page.