# Product Requirements Document (PRD) - Sortable

## 1. Project Overview

The goal of this project is to build a sortable, searchable, paginated table that displays superhero data fetched from a remote JSON file.

The application must:

- fetch data using fetch()
- display selected fields in a <table>
- allow sorting by any column
- allow live search by name
- support pagination with selectable page sizes
- run entirely in the browser with vanilla JavaScript
- remain fast, clean, and beginner‑friendly
- support advanced search operators and field‑specific search (bonus treated as mandatory)
- support detail view with large image
- sync search/sort/page state to the URL

No frameworks or libraries are allowed.

## 2. Functional Requirements

**Data Fetching**

- Use fetch() to retrieve JSON from: `https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json`
- Parse the response using .json().
- Store the data in memory (no repeated fetches).
- Normalize numeric fields (height/weight) for correct sorting and operator‑based search.

**Display**
Render a <table> showing only the required fields:

- Icon (images.xs)
- Name (name)
- Full Name (biography.fullName)
- Powerstats (each entry of powerstats)
- Race (appearance.race)
- Gender (appearance.gender)
- Height (appearance.height)
- Weight (appearance.weight)
- Place of Birth (biography.placeOfBirth)
- Alignment (biography.alignment)

**Pagination**

- Default page size: 20
- Selectable sizes: 10, 20, 50, 100, all
- Changing page size resets to page 1
- Pagination must be client‑side only
- Pagination state must be reflected in the URL

**Search**

- Live search by name (case‑insensitive)
- Updates results on every keystroke
- No search button
- Field selector (e.g., search by name, race, alignment, etc.)
- Search operators:
  - include / exclude (strings)
  - equal / not equal / greater than / less than (numbers)
  - fuzzy (strings)
- Search state must update the URL
- Reloading the page with a URL containing search params must restore the same results

**Sorting**

- All columns must be sortable
- First click -> ascending
- Second click -> descending
- Toggle on each click
- Numeric values (height, weight) must sort numerically
- Missing values always appear last
- Initial sort: by name, ascending
- Sort state must be reflected in the URL
- Reloading the page must restore the same sort order

**Detail View**

- Clicking a hero opens a detail view
- Shows:
  - large image
  - all hero fields (full JSON)
- Detail view state must be encoded in the URL
- Opening the URL in a new tab must show the same hero

**Performance**

- All operations must be fast
- No unnecessary DOM rebuilds
- No repeated fetch calls
- Favor pure functions for filtering/sorting/pagination
- Avoid expensive operations inside loops

## 3. Technical Requirements

- **Language:** JavaScript (vanilla)
- **Environment:** Browser (no Node.js runtime)
- **Files:**
  - `index.html`
  - `style.css`
  - `script/*.js` modules
- **Code Style:**
  - clean, readable, beginner‑friendly
  - small focused functions
  - minimal, navigation comments
  - no external libraries
- **Testing:**
  - manual testing following audit steps
  - no automated tests required
- **URL State Handling:**
  - use URLSearchParams to read/write:
    - search term
    - search field
    - operator
    - page size
    - current page
    - sort column
    - sort direction
    - selected hero (detail view)

## 4. Team Workflow and Tasks

Below is the task split into three parts, matching the project’s architecture and responsibilities.

### Vasiliki -> UI Layer

**Responsible for implementing the user interface elements for search, pagination and user-facing controls.**

(files: `filters.js`, `pagination.js`, `search.js`)

**Tasks:**

- Search:
  - live search input
  - _BONUS_ field selector (name, race, alignment, etc.)
  - _BONUS_ operator selector (include, exclude, >, <, =)
  - _BONUS_ fuzzy search

- Pagination:
  - page-size select
  - next/prev buttons
  - disable buttons when needed
  - reset to page 1 on search/page-size change

- _BONUS_ URL Sync:
  - write search + pagination state to URL
  - restore state from URL

- _BONUS_ A slick design (CSS improvements for UI/UX)

- Trigger Rendering:
  - call render functions after every interaction

---

### Krystallenia -> Sorting Layer

**Responsible for implementing the sorting engine and column header controls.**

(files: `sort.js`, `sortControls.js`, `utils.js`)

**Tasks:**

- Sorting Engine:
  - pure functions for sorting
  - numeric sorting (height/weight)
  - string sorting
  - missing values last

- Column Controls:
  - clickable headers
  - toggle asc/desc
  - highlight active sort column

- _BONUS_ URL Sync:
  - write sort column + direction to URL
  - restore sort state from URL

- _BONUS_ A slick design (CSS improvements for sorting UI)

---

### Katerina -> Data Layer

**Responsible for fetching, normalizing, storing, and providing data to the rest of the app.**

(files: `data.js`, `state.js`, `table.js`, `main.js`)

**Tasks:**

- Fetch & Normalize:
  - fetch all.json
  - parse JSON
  - extract numeric height/weight
  - clean missing fields
  - prepare data for fast sorting/filtering

- State Management:
  - store heroes
  - store search/sort/page state
  - _BONUS_ read/write URL parameters

- _BONUS_ A slick design (CSS improvements for table and layout)

- Table Rendering:
  - render `table` structure
  - render rows, cells, icons
  - render powerstats (intelligence, strength, speed, durability, power, combat)

- _BONUS_ Detail View:
  - render hero detail panel
  - update URL when a hero is selected
  - restore detail view from URL

- App Orchestration:
  - call render functions
  - connect search/sort/pagination modules
  - _BONUS_ initial load (URL -> state -> render)
