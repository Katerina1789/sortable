// router.js - sync selected hero with URL (load + save)

import { getState, updateState, subscribeState } from './state.js';

// read state from URL
export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  updateState({
    selectedHeroId: Number(params.get('hero')) || null,
  });
};

// convert state to query string
const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.selectedHeroId) params.set('hero', s.selectedHeroId);
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
