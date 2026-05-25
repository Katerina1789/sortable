// main.js - app bootstrap (URL sync + render + data load)

import { fetchHeroes } from './data.js';
import { loadStateFromUrl, initUrlSync } from './urlSync.js';
import { renderApp } from './render.js';
import { updateState } from './state.js';

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
  } catch (error) {
    updateState({ loading: false, error });
  }
};

/*
  Vasiliki: mount search and pagination controls into #controls.
*/

init();
