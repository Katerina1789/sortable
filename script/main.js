// import the fetch function
import { fetchHeroes } from './data.js';

// simple startup function
const init = async () => {
  // load and normalize heroes
  await fetchHeroes();

  // temporary confirmation
  console.log('Heroes loaded and normalized');
};

// run the app
init();
