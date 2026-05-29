// data.js — fetch remote heroes JSON, normalize it once, store in state

import { normalizeHeroes } from "./normalization.js";
import { updateState } from "./state.js";

// remote dataset URL
const DATA_URL =
  "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";

// local in‑memory cache to avoid refetching
let heroes = [];

// fetch heroes once → validate → normalize → push to state
export const fetchHeroes = async () => {
  // return cached list if already loaded
  if (heroes.length) return heroes;

  // fetch remote JSON
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Could not fetch heroes (${response.status})`);
  }

  // ensure dataset is a list
  const json = await response.json();
  if (!Array.isArray(json)) {
    throw new Error("Hero data is not a list");
  }

  // normalize and store
  heroes = normalizeHeroes(json);
  updateState({ heroes });

  return heroes;
};
