// selectors.js — pure derived-data pipeline
// heroes → filter → sort → paginate → render

// normalize search query
const normalizeQuery = (query) => query?.trim().toLowerCase() || "";

// extract field value from normalized/stats/display layers
const getFieldValue = (hero, field) => {
  if (hero.normalized && field in hero.normalized) {
    return hero.normalized[field];
  }

  if (hero.stats && field in hero.stats) {
    return hero.stats[field];
  }

  if (hero.display && field in hero.display) {
    return hero.display[field] ?? "";
  }

  return "";
};

// apply search operator to a hero
const matchesSearch = (hero, query, field, operator) => {
  const value = getFieldValue(hero, field);
  const normalizedQuery = normalizeQuery(query);

  // empty query → match all
  if (!normalizedQuery) return true;

  // include substring
  if (operator === "include") {
    return String(value).toLowerCase().includes(normalizedQuery);
  }

  // exclude substring
  if (operator === "exclude") {
    return !String(value).toLowerCase().includes(normalizedQuery);
  }

  // strict equality
  if (operator === "equal") {
    if (typeof value === "number") {
      const number = Number(normalizedQuery);
      return Number.isFinite(number) && value === number;
    }
    return String(value).toLowerCase() === normalizedQuery;
  }

  // strict inequality
  if (operator === "notEqual") {
    if (typeof value === "number") {
      const number = Number(normalizedQuery);
      return Number.isFinite(number) && value !== number;
    }
    return String(value).toLowerCase() !== normalizedQuery;
  }

  // numeric comparisons
  if (operator === "greaterThan") {
    const number = Number(normalizedQuery);
    return (
      typeof value === "number" && Number.isFinite(number) && value > number
    );
  }

  if (operator === "lessThan") {
    const number = Number(normalizedQuery);
    return (
      typeof value === "number" && Number.isFinite(number) && value < number
    );
  }

  // fuzzy: all chars must appear in order
  if (operator === "fuzzy") {
    if (typeof value !== "string") return false;
    return normalizedQuery.split("").every((char) => value.includes(char));
  }

  // fallback: substring match
  return String(value).toLowerCase().includes(normalizedQuery);
};

// 1) filter heroes by query/field/operator
export const getFilteredHeroes = (state) => {
  const query = state.query?.trim();
  const field = state.field || "name";
  const operator = state.operator || "include";

  if (!query) return state.heroes;

  return state.heroes.filter((hero) =>
    matchesSearch(hero, query, field, operator),
  );
};

// 2) sort heroes by selected column
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

// extract sort value from hero
const getSortValue = (hero, column) => {
  if (hero.stats && column in hero.stats) return hero.stats[column];
  if (hero.normalized && column in hero.normalized)
    return hero.normalized[column];
  if (hero.display && column in hero.display) return hero.display[column];
  return null;
};

// 3) paginate sorted heroes
export const getPaginatedHeroes = (state, sorted) => {
  const { pageSize, currentPage } = state;
  const page = Number(currentPage) || 1;

  if (pageSize === "all") return sorted;

  const size = Number(pageSize) || 20;
  const start = (page - 1) * size;
  return sorted.slice(Math.max(0, start), start + size);
};

// 4) final visible list
export const getVisibleHeroes = (state) => {
  const filtered = getFilteredHeroes(state);
  const sorted = getSortedHeroes(state, filtered);
  return getPaginatedHeroes(state, sorted);
};

// 5) total pages for pagination controls
export const getTotalPages = (state) => {
  const filtered = getFilteredHeroes(state);
  const sorted = getSortedHeroes(state, filtered);

  if (state.pageSize === "all") return 1;

  const size = Number(state.pageSize) || 20;
  return Math.max(1, Math.ceil(sorted.length / size));
};
