// state.js - global app state + subscription system

// initial state
export const defaultState = {
  heroes: [],
  loading: false,
  error: null,
  selectedHeroId: null,
  query:"",
  currentPage:1,
  pageSize:20,
  field:"name"
};

// current state
let state = { ...defaultState };

// subscribers
const listeners = new Set();

// read state
export const getState = () => state;

// subscribe to state changes
export const subscribeState = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

// update state and notify listeners
export const updateState = (partial) => {
  state = { ...state, ...partial };
  listeners.forEach((fn) => fn(state));
};
