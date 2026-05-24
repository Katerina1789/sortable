import { fetchHeroes } from './data.js';
import { loadStateFromUrl, initUrlSync } from './router.js';
import { renderApp } from './render.js';
import { initDetailView } from './detailView.js';

const init = async () => {
  // read URL parameters → update state
  loadStateFromUrl();

  // start syncing state → URL
  initUrlSync();

  // fetch and normalize heroes
  await fetchHeroes();

  // render the full UI
  renderApp();

  // initialize detail view (reacts to state + URL)
  initDetailView();
};

init();
