import { getState, updateState, subscribeState } from './state.js';

// read URL parameters and update state
export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  updateState({
    searchTerm: params.get('search') || '',
    searchField: params.get('field') || 'name',
    searchOperator: params.get('operator') || 'include',
    pageSize: Number(params.get('pageSize')) || 20,
    currentPage: Number(params.get('page')) || 1,
    sortColumn: params.get('sort') || 'name',
    sortDirection: params.get('direction') || 'asc',
    selectedHeroId: params.get('hero') || null,
  });
};

// serialize state into URL parameters
const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.searchTerm) params.set('search', s.searchTerm);
  if (s.searchField !== 'name') params.set('field', s.searchField);
  if (s.searchOperator !== 'include') params.set('operator', s.searchOperator);
  if (s.pageSize !== 20) params.set('pageSize', String(s.pageSize));
  if (s.currentPage !== 1) params.set('page', String(s.currentPage));
  if (s.sortColumn !== 'name') params.set('sort', s.sortColumn);
  if (s.sortDirection !== 'asc') params.set('direction', s.sortDirection);
  if (s.selectedHeroId) params.set('hero', s.selectedHeroId);

  return params.toString();
};

// subscribe to state changes and update the URL
export const initUrlSync = () => {
  subscribeState(() => {
    const query = serializeState();
    const newUrl = `${window.location.pathname}?${query}`;
    window.history.replaceState({}, '', newUrl);
  });
};
