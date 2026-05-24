// default values for all state fields
export const defaultState = {
  heroes: [],  
  searchTerm: "",
  searchField: "name",
  searchOperator: "include",
  pageSize: 20,
  currentPage: 1,
  sortColumn: "name",
  sortDirection: "asc",
  selectedHeroId: null,
};

// current state in memory
let state = { ...defaultState };

// listeners for reactive updates
const listeners = new Set();

// return current state
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
