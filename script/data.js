// import the normalization helpers
import { normalizeHeroes } from './utils.js';

// the API URL
const URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

// store heroes in memory so we never fetch twice
let heroes = [];

// fetchHeroes fetches the heroes once and normalizes them
export const fetchHeroes = async () => {
  // if already fetched returns them
  if (heroes.length) return heroes;

  // fetches the JSON file
  const response = await fetch(URL);

  // parses JSON
  const json = await response.json();

  // normalizes all heroes
  heroes = normalizeHeroes(json);

  // returns the normalized list
  return heroes;
};

// simple getter for other modules
export const getHeroes = () => heroes;
