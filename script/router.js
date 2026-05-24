import { getState, updateState, subscribeState } from './state.js';

const pageSizes = new Set(['10', '20', '50', '100', 'all']);
const directions = new Set(['asc', 'desc']);

const readPositiveNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

const readPageSize = (value) => {
  if (!pageSizes.has(value)) return 'all';
  return value === 'all' ? 'all' : Number(value);
};

const readText = (value, fallback) => value?.trim() || fallback;

export const loadStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  updateState({
    searchTerm: readText(params.get('search'), ''),
    searchField: readText(params.get('field'), 'name'),
    searchOperator: readText(params.get('operator'), 'include'),
    pageSize: readPageSize(params.get('pageSize')),
    currentPage: readPositiveNumber(params.get('page'), 1),
    sortColumn: readText(params.get('sort'), 'name'),
    sortDirection: directions.has(params.get('direction'))
      ? params.get('direction')
      : 'asc',
    selectedHeroId: readPositiveNumber(params.get('hero'), null),
  });
};

const serializeState = () => {
  const s = getState();
  const params = new URLSearchParams();

  if (s.searchTerm) params.set('search', s.searchTerm);
  if (s.searchField !== 'name') params.set('field', s.searchField);
  if (s.searchOperator !== 'include') params.set('operator', s.searchOperator);
  if (s.pageSize !== 'all') params.set('pageSize', String(s.pageSize));
  if (s.currentPage !== 1) params.set('page', String(s.currentPage));
  if (s.sortColumn !== 'name') params.set('sort', s.sortColumn);
  if (s.sortDirection !== 'asc') params.set('direction', s.sortDirection);
  if (s.selectedHeroId) params.set('hero', s.selectedHeroId);

  return params.toString();
};

export const initUrlSync = () => {
  subscribeState(() => {
    const query = serializeState();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  });
};
