# Architecture

Below is a compact explanation of how Sortable works using the original document structure.

## System Overview

```text
┌────────────┐    ┌──────────────┐    ┌──────────────┐
│ index.html │ -> │script/main.js│ -> │script/data.js│
└────────────┘    └──────┬───────┘    └──────┬───────┘
                         │                   │
                     ┌───▼────┐          ┌───▼────────────┐
                     │state.js│          │normalization.js│
                     └───┬────┘          └────────────────┘
                         │
          ┌──────────────▼──────────────┐
          │         selectors.js        │
          │  (filter → sort → paginate) │
          └──────────────┬──────────────┘
                         │
                  ┌──────▼─────┐
                  │ render.js  │
                  └────────────┘
```

## Main Flow

```text
Load URL state
    ↓
Fetch heroes
    ↓
Normalize data
    ↓
updateState()
    ↓
Selectors compute visible list
    ↓
Render table + detail view
    ↓
User actions update state
    ↓
URL sync keeps state in query params
```

## Module Responsibilities

### `script/main.js`

Bootstraps the app: loads URL state, mounts the UI, fetches data and initializes controls.

### `script/data.js`

Fetches the remote JSON dataset once and pushes the normalized list into `state`.

### `script/normalization.js`

Central place for parsing and cleaning data: converts heights/weights to numeric metrics, normalizes text, and builds `display`, `stats`, and `normalized` objects on each hero.

### `script/state.js`

Tiny immutable store with `getState`, `updateState`, and `subscribeState`. All UI updates are driven by state changes.

### `script/selectors.js`

Pure, synchronous functions that compose the visible list: `getFilteredHeroes` → `getSortedHeroes` → `getPaginatedHeroes` and supporting helpers. Deterministic and easy to unit test.

### `script/render.js`, `script/table.js`, `script/detailView.js`

DOM-only renderers. `renderApp()` subscribes to state and re-renders the table body and detail panel.

### `script/search.js`, `script/pagination.js`, `script/sortControls.js`

Small event handlers that map user actions (input, selects, clicks) into `updateState` calls.

### `script/urlSync.js`

Serializes a minimal state slice to the query string and restores it on load/popstate. Debounced to avoid noisy history.

## Data Flow (one-line)

Fetch → Normalize → Store → Selectors → Render → URL Sync
