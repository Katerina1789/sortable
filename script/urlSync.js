// router.js - sync selected hero with URL (load + save)

import { getState, updateState, subscribeState } from './state.js';

// read state from URL
export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  updateState({
    selectedHeroId: Number(params.get('hero')) || null,
    query: params.get('query') || '',
    field: params.get('field') || 'name',
    currentPage: Number(params.get('currentPage')) || 1,
    pageSize: Number(params.get('pageSize')) || 20,
    sortColumn: params.get('sortColumn') || 'name',
    sortDirection: params.get('sortDirection') || 'asc',
  });
};

// convert state to query string
const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.selectedHeroId) params.set('hero', s.selectedHeroId)
  if (s.query) params.set('query', s.query)
  if (s.field) params.set('field', s.field)
  if (s.currentPage) params.set('currentPage', s.currentPage)
  if (s.pageSize) params.set('pageSize', s.pageSize)
  if (s.sortColumn) params.set('sortColumn', s.sortColumn)
  if (s.sortDirection) params.set('sortDirection', s.sortDirection)
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
        state.selectedHeroId &&
        state.selectedHeroId !== lastSelectedHeroId;

      const method = shouldPush ? 'pushState' : 'replaceState';

      window.history[method]({}, '', newUrl);
      lastSelectedHeroId = state.selectedHeroId;
    }, 120);
  });

  // read URL -> state
  window.addEventListener('popstate', () => {
    loadStateFromUrl();
  });
};
