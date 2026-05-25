// normalization.js - normalization helpers for clean, searchable hero data

// values treated as missing
const MISSING_VALUES = new Set(['', '-', 'unknown', 'n/a', 'null', 'undefined']);

// clean text values
export const cleanValue = (value) => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return MISSING_VALUES.has(text.toLowerCase()) ? null : text;
};

// extract numeric part (e.g. "175 cm" -> 175)
export const parseNumericValue = (value) => {
  const text = cleanValue(value);
  if (!text) return null;
  const match = text.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
};

// pick preferred unit from array or single value
const pickUnitValue = (values, unit) => {
  const list = Array.isArray(values) ? values : [values];
  const preferred = list.find((value) => unit.test(String(value)));
  return cleanValue(preferred) || cleanValue(list[0]);
};

// normalize numeric stat
const normalizeStat = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// safe lowercase string for searching/sorting
const normalizeText = (value) => {
  const cleaned = cleanValue(value);
  return cleaned ? cleaned.trim().toLowerCase() : '';
};

// normalize a single hero
export const normalizeHero = (hero = {}) => {
  const heightValue = pickUnitValue(hero.appearance?.height, /cm/i);
  const weightValue = pickUnitValue(hero.appearance?.weight, /kg/i);
  const displayName = cleanValue(hero.name) || 'Unknown hero';

  return {
    ...hero,
    original: hero,

    // UI-friendly fields
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

    // numeric stats
    stats: {
      intelligence: normalizeStat(hero.powerstats?.intelligence),
      strength: normalizeStat(hero.powerstats?.strength),
      speed: normalizeStat(hero.powerstats?.speed),
      durability: normalizeStat(hero.powerstats?.durability),
      power: normalizeStat(hero.powerstats?.power),
      combat: normalizeStat(hero.powerstats?.combat),
    },

    // normalized fields for search/sort/filter
    normalized: {
      height: parseNumericValue(heightValue),
      weight: parseNumericValue(weightValue),
      name: normalizeText(displayName),
      fullName: normalizeText(hero.biography?.fullName),
      race: normalizeText(hero.appearance?.race),
      gender: normalizeText(hero.appearance?.gender),
      placeOfBirth: normalizeText(hero.biography?.placeOfBirth),
      alignment: normalizeText(hero.biography?.alignment),
    },
  };
};

// normalize full list
export const normalizeHeroes = (heroes) => heroes.map(normalizeHero);
