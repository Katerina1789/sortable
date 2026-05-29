// state.js — global app state + subscription system

// initial state (URL sync may override on load)
export const defaultState = {
  heroes: [],
  loading: false,
  error: null,
  selectedHeroId: null,
  query: "",
  currentPage: 1,
  pageSize: "20",
  field: "name",
  operator: "include",
  sortColumn: "name",
  sortDirection: "asc",
};

// current state (immutable updates only)
let state = { ...defaultState };

// subscribers (renderers, URL sync, etc.)
const listeners = new Set();

// read current state
export const getState = () => state;

// subscribe to state changes → returns unsubscribe fn
export const subscribeState = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// merge partial update → notify all subscribers
export const updateState = (partial) => {
  state = { ...state, ...partial };
  listeners.forEach((fn) => fn(state));
};
