// import the normalization helpers
import { normalizeHeroes } from './utils.js';
import { updateState } from './state.js';

const DATA_URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

let heroes = [];

export const fetchHeroes = async () => {
  if (heroes.length) return heroes;

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Could not fetch heroes (${response.status})`);
  }

  const json = await response.json();
  if (!Array.isArray(json)) {
    throw new Error('Hero data is not a list');
  }

  heroes = normalizeHeroes(json);
  updateState({ heroes });

  return heroes;
};

export const getHeroes = () => heroes;
