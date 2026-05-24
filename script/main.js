import { fetchHeroes } from './data.js';
import { loadStateFromUrl, initUrlSync } from './router.js';
import { renderApp } from './render.js';

const showError = (error) => {
  const container = document.getElementById('table-container');
  container.textContent = error.message || 'Something went wrong loading heroes.';
};

const init = async () => {
  try {
    // 1. Load URL → state
    loadStateFromUrl();

    // 2. Start syncing state → URL
    initUrlSync();

    // 3. Fetch heroes
    await fetchHeroes();

    // 4. Render the app (creates table once, subscribes to state)
    renderApp();

  } catch (error) {
    showError(error);
  }
};

init();
