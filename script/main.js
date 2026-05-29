// main.js - app bootstrap (URL sync + render + data load)

import { fetchHeroes } from "./data.js";
import { loadStateFromUrl, initUrlSync } from "./urlSync.js";
import { renderApp } from "./render.js";
import { updateState, getState } from "./state.js";
import { initSearch } from "./search.js";
import { initPagination } from "./pagination.js";

// initialize app
const init = async () => {
  try {
    // load URL -> state
    loadStateFromUrl();

    // start syncing state -> URL
    initUrlSync();

    // mount UI + show loading
    renderApp();
    updateState({ loading: true, error: null });

    // fetch heroes
    await fetchHeroes();
    updateState({ loading: false, error: null });
    const { heroes } = getState();
    initSearch();
    initPagination();
  } catch (error) {
    updateState({ loading: false, error });
  }
};

init();
