export const defaultState = {
  heroes: [],
  searchTerm: '',
  searchField: 'name',
  searchOperator: 'include',
  pageSize: 'all',
  currentPage: 1,
  sortColumn: 'name',
  sortDirection: 'asc',
  selectedHeroId: null,
};

let state = { ...defaultState };

const listeners = new Set();

export const getState = () => state;

export const subscribeState = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const updateState = (partial) => {
  state = { ...state, ...partial };
  listeners.forEach((fn) => fn(state));
};
