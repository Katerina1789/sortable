const MISSING_VALUES = new Set(['', '-', 'unknown', 'n/a', 'null', 'undefined']);
const NUMERIC_FIELDS = new Set(['height', 'weight', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat']);

export const cleanValue = (value) => {
  if (value === null || value === undefined) return null;

  const text = String(value).trim();
  return MISSING_VALUES.has(text.toLowerCase()) ? null : text;
};

// parseNumericValue turns "175 cm" or "75 kg" into a number.
export const parseNumericValue = (value) => {
  const text = cleanValue(value);
  if (!text) return null;

  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
};

const pickUnitValue = (values, unit) => {
  const list = Array.isArray(values) ? values : [values];
  const preferred = list.find((value) => unit.test(String(value)));
  return cleanValue(preferred) || cleanValue(list[0]);
};

const normalizeStat = (value) => {
  if (value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// normalizeHero keeps the original data and adds safe, fast fields for the UI.
export const normalizeHero = (hero = {}) => {
  const heightValue = pickUnitValue(hero.appearance?.height, /cm/i);
  const weightValue = pickUnitValue(hero.appearance?.weight, /kg/i);
  const displayName = cleanValue(hero.name) || 'Unknown hero';

  return {
    ...hero,
    original: hero,
    display: {
      icon: cleanValue(hero.images?.xs),
      name: displayName,
      fullName: cleanValue(hero.biography?.fullName),
      race: cleanValue(hero.appearance?.race),
      gender: cleanValue(hero.appearance?.gender),
      height: heightValue,
      weight: weightValue,
      placeOfBirth: cleanValue(hero.biography?.placeOfBirth),
      alignment: cleanValue(hero.biography?.alignment),
    },
    stats: {
      intelligence: normalizeStat(hero.powerstats?.intelligence),
      strength: normalizeStat(hero.powerstats?.strength),
      speed: normalizeStat(hero.powerstats?.speed),
      durability: normalizeStat(hero.powerstats?.durability),
      power: normalizeStat(hero.powerstats?.power),
      combat: normalizeStat(hero.powerstats?.combat),
    },
    normalized: {
      height: parseNumericValue(heightValue),
      weight: parseNumericValue(weightValue),
    },
  };
};

const safeString = (value) => (value === null || value === undefined ? '' : String(value).trim().toLowerCase());

const getHeroFieldValue = (hero, field) => {
  if (!hero || !field) return null;

  if (NUMERIC_FIELDS.has(field)) {
    if (field === 'height' || field === 'weight') {
      return hero.normalized[field];
    }
    return hero.stats[field];
  }

  return hero.display[field] ?? null;
};

const stringMatches = (value, term, operator) => {
  const normalized = safeString(value);
  const keyword = safeString(term);

  if (!keyword) return true;
  if (operator === 'exclude') return !normalized.includes(keyword);
  if (operator === 'fuzzy') return normalized.replace(/\s+/g, '').includes(keyword.replace(/\s+/g, ''));
  if (operator === 'equal') return normalized === keyword;
  if (operator === 'not equal') return normalized !== keyword;
  return normalized.includes(keyword);
};

const numericMatches = (value, term, operator) => {
  if (value === null || value === undefined) return false;
  const termNumber = Number(term);
  if (Number.isNaN(termNumber)) return false;

  if (operator === 'equal') return value === termNumber;
  if (operator === 'not equal') return value !== termNumber;
  if (operator === 'greater than') return value > termNumber;
  if (operator === 'less than') return value < termNumber;
  return false;
};

export const filterHeroes = (heroes, searchTerm, searchField, searchOperator) => {
  if (!searchTerm) return heroes;

  const operator = String(searchOperator || 'include').toLowerCase();
  const field = String(searchField || 'name');
  const term = String(searchTerm).trim();

  return heroes.filter((hero) => {
    const value = getHeroFieldValue(hero, field);
    if (NUMERIC_FIELDS.has(field)) {
      return numericMatches(value, term, operator);
    }
    return stringMatches(value, term, operator);
  });
};

export const sortHeroes = (heroes, sortColumn, sortDirection = 'asc') => {
  const column = String(sortColumn || 'name');
  const direction = sortDirection === 'desc' ? -1 : 1;

  return [...heroes].sort((heroA, heroB) => {
    const valueA = getHeroFieldValue(heroA, column);
    const valueB = getHeroFieldValue(heroB, column);

    const aMissing = valueA === null || valueA === undefined || valueA === '';
    const bMissing = valueB === null || valueB === undefined || valueB === '';
    if (aMissing && bMissing) return 0;
    if (aMissing) return 1;
    if (bMissing) return -1;

    if (NUMERIC_FIELDS.has(column)) {
      return direction * (Number(valueA) - Number(valueB));
    }

    return direction * String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: 'base' });
  });
};

export const paginateHeroes = (heroes, pageSize, currentPage) => {
  if (pageSize === 'all') return heroes;

  const size = Number(pageSize) || 20;
  const pageNum = Number(currentPage) <= 0 ? 1 : Number(currentPage);
  const start = (pageNum - 1) * size;
  return heroes.slice(start, start + size);
};

export const getVisibleHeroes = (heroes, state) => {
  if (!Array.isArray(heroes)) return [];
  const filtered = filterHeroes(heroes, state.searchTerm, state.searchField, state.searchOperator);
  const sorted = sortHeroes(filtered, state.sortColumn, state.sortDirection);
  return paginateHeroes(sorted, state.pageSize, state.currentPage);
};

export const normalizeHeroes = (heroes) => heroes.map(normalizeHero);
