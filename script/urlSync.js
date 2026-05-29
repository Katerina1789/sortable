// urlSync.js — sync mandatory state with URL (load → state, state → URL)

import { getState, updateState, subscribeState } from "./state.js";

// allowed values for validation
const allowedPageSizes = new Set(["10", "20", "50", "100", "all"]);
const allowedFields = new Set([
  "name",
  "race",
  "gender",
  "alignment",
  "height",
  "weight",
]);
const allowedOperators = new Set([
  "include",
  "exclude",
  "equal",
  "notEqual",
  "greaterThan",
  "lessThan",
  "fuzzy",
]);
const allowedSortColumns = new Set([
  "name",
  "fullName",
  "race",
  "gender",
  "placeOfBirth",
  "alignment",
  "height",
  "weight",
  "intelligence",
  "strength",
  "speed",
  "durability",
  "power",
  "combat",
]);

// normalize page number
const normalizePage = (value) => {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? page : 1;
};

// read state from URL → update global state
export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const heroId = Number(params.get("hero"));

  updateState({
    selectedHeroId: Number.isFinite(heroId) && heroId > 0 ? heroId : null,
    query: params.get("query") || "",
    currentPage: normalizePage(params.get("page")),
    pageSize: allowedPageSizes.has(params.get("pageSize"))
      ? params.get("pageSize")
      : "20",
    field: allowedFields.has(params.get("field"))
      ? params.get("field")
      : "name",
    operator: allowedOperators.has(params.get("operator"))
      ? params.get("operator")
      : "include",
    sortColumn: allowedSortColumns.has(params.get("sort"))
      ? params.get("sort")
      : "name",
    sortDirection: params.get("direction") === "desc" ? "desc" : "asc",
  });
};

// convert state → query string (only non-defaults)
const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.selectedHeroId) params.set("hero", s.selectedHeroId);
  if (s.query) params.set("query", s.query);
  if (s.currentPage !== 1) params.set("page", s.currentPage);
  if (s.pageSize !== "20") params.set("pageSize", s.pageSize);
  if (s.field !== "name") params.set("field", s.field);
  if (s.operator !== "include") params.set("operator", s.operator);
  if (s.sortColumn !== "name") params.set("sort", s.sortColumn);
  if (s.sortDirection !== "asc") params.set("direction", s.sortDirection);

  return params.toString();
};

// sync state → URL (push/replace) + handle back/forward
export const initUrlSync = () => {
  let timeoutId = null;
  let lastSelectedHeroId = getState().selectedHeroId;

  // state → URL
  subscribeState((state) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const query = serializeState();
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

      // push only when selecting a new hero
      const shouldPush =
        state.selectedHeroId && state.selectedHeroId !== lastSelectedHeroId;

      const method = shouldPush ? "pushState" : "replaceState";

      window.history[method]({}, "", newUrl);
      lastSelectedHeroId = state.selectedHeroId;
    }, 120);
  });

  // browser back/forward → reload state from URL
  window.addEventListener("popstate", () => {
    loadStateFromUrl();
  });
};
