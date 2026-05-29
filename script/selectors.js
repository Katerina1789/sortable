// selectors.js — mandatory-only derived data pipeline
// heroes → filter → sort → paginate → render

// 1) Filter by name (mandatory-only search)
export const getFilteredHeroes = (state) => {
  const query = state.query?.trim().toLowerCase();
  if (!query) return state.heroes;

  return state.heroes.filter((hero) =>
    hero.normalized.name.includes(query)
  );
};

// 2) Sort by any column (mandatory-only sorting)
export const getSortedHeroes = (state, filtered) => {
  const { sortColumn, sortDirection } = state;
  if (!sortColumn) return filtered;

  const direction = sortDirection === "desc" ? -1 : 1;

  return [...filtered].sort((a, b) => {
    const va = getSortValue(a, sortColumn);
    const vb = getSortValue(b, sortColumn);

    // missing values always last
    const aMissing = va === null || va === undefined || va === "";
    const bMissing = vb === null || vb === undefined || vb === "";

    if (aMissing && bMissing) return 0;
    if (aMissing) return 1;
    if (bMissing) return -1;

    if (va < vb) return -1 * direction;
    if (va > vb) return 1 * direction;
    return 0;
  });
};

// helper: extract correct sort value
const getSortValue = (hero, column) => {
  // numeric stats
  if (hero.stats && column in hero.stats) {
    return hero.stats[column];
  }

  // normalized text fields
  if (hero.normalized && column in hero.normalized) {
    return hero.normalized[column];
  }

  // fallback to display fields
  if (hero.display && column in hero.display) {
    return hero.display[column];
  }

  return null;
};

// 3) Pagination (mandatory-only)
export const getPaginatedHeroes = (state, sorted) => {
  const { pageSize, currentPage } = state;

  if (pageSize === "all") return sorted;

  const size = Number(pageSize) || 20;
  const start = (currentPage - 1) * size;
  return sorted.slice(start, start + size);
};

// 4) Final visible list
export const getVisibleHeroes = (state) => {
  const filtered = getFilteredHeroes(state);
  const sorted = getSortedHeroes(state, filtered);
  return getPaginatedHeroes(state, sorted);
};

// 5) Total pages
export const getTotalPages = (state) => {
  const filtered = getFilteredHeroes(state);
  const sorted = getSortedHeroes(state, filtered);

  if (state.pageSize === "all") return 1;

  const size = Number(state.pageSize) || 20;
  return Math.ceil(sorted.length / size);
};
