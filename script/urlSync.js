// urlSync.js - sync mandatory state with URL (load + save)

import { getState, updateState, subscribeState } from "./state.js";

// read state from URL
export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  updateState({
    selectedHeroId: Number(params.get("hero")) || null,
    query: params.get("query") || "",
    currentPage: Number(params.get("page")) || 1,
    pageSize: params.get("pageSize") || "20", // keep "all" as string
    sortColumn: params.get("sort") || "name",
    sortDirection: params.get("direction") || "asc",
  });
};

// convert state to query string
const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.selectedHeroId) params.set("hero", s.selectedHeroId);
  if (s.query) params.set("query", s.query);
  if (s.currentPage !== 1) params.set("page", s.currentPage);
  if (s.pageSize !== "20") params.set("pageSize", s.pageSize);
  if (s.sortColumn !== "name") params.set("sort", s.sortColumn);
  if (s.sortDirection !== "asc") params.set("direction", s.sortDirection);

  return params.toString();
};

// initialize URL sync (push/replace + popstate)
export const initUrlSync = () => {
  let timeoutId = null;
  let lastSelectedHeroId = getState().selectedHeroId;

  // write state → URL
  subscribeState((state) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const query = serializeState();
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

      const shouldPush =
        state.selectedHeroId && state.selectedHeroId !== lastSelectedHeroId;

      const method = shouldPush ? "pushState" : "replaceState";

      window.history[method]({}, "", newUrl);
      lastSelectedHeroId = state.selectedHeroId;
    }, 120);
  });

  // read URL → state
  window.addEventListener("popstate", () => {
    loadStateFromUrl();
  });
};
