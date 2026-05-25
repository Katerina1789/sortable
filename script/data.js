// data.js - fetch and normalize hero data, store once, expose accessors

import { normalizeHeroes } from './normalization.js';
import { updateState } from './state.js';

// remote data source
const DATA_URL = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

// in‑memory cache
let heroes = [];

// fetch heroes once, normalize, update state
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

// return cached heroes
export const getHeroes = () => heroes;
