// normalization.js — helpers for clean, consistent, searchable hero data

// values considered "missing" across the dataset
const MISSING_VALUES = new Set([
  "",
  "-",
  "unknown",
  "n/a",
  "null",
  "undefined",
]);

// clean text → trim, lowercase-check, convert missing → null
export const cleanValue = (value) => {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return MISSING_VALUES.has(text.toLowerCase()) ? null : text;
};

// extract numeric value with unit conversions (meters→cm, tons→kg)
export const parseNumericValue = (value) => {
  const text = cleanValue(value);
  if (!text) return null;

  const normalized = text.replace(/,/g, "");

  // meters → cm
  if (/meters?/i.test(normalized)) {
    const num = parseFloat(normalized);
    return Number.isFinite(num) ? Math.round(num * 100) : null;
  }

  // tons → kg
  if (/tons?/i.test(normalized)) {
    const num = parseFloat(normalized);
    return Number.isFinite(num) ? num * 1000 : null;
  }

  // fallback: extract numeric part (cm, kg, etc.)
  const match = normalized.match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
};

// normalize numeric stat → number or null
const normalizeStat = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

// normalize text for search/sort (lowercase, safe)
const normalizeText = (value) => {
  const cleaned = cleanValue(value);
  return cleaned ? cleaned.trim().toLowerCase() : "";
};

// normalize a single hero object
export const normalizeHero = (hero = {}) => {
  // metric values (always second entry in API arrays)
  const heightMetric = Array.isArray(hero.appearance?.height)
    ? hero.appearance.height[1]
    : null;

  const weightMetric = Array.isArray(hero.appearance?.weight)
    ? hero.appearance.weight[1]
    : null;

  const heightValue = cleanValue(heightMetric);
  const weightValue = cleanValue(weightMetric);

  const displayName = cleanValue(hero.name) || "Unknown hero";

  return {
    ...hero,
    original: hero, // keep raw JSON for detail view

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

    // numeric stats (null-safe)
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
