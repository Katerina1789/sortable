// parseNumericValue turns "175 cm" or "75 kg" into a number
export const parseNumericValue = (value) => {
  // if value missing or not a string returns null
  if (!value || typeof value !== 'string') return null;
  
  // removes everything except digits, dots, and minus signs
  const numeric = value.replace(/[^0-9.\-]/g, '').trim();

  // if cleaned string is empty or not a number returns null
  if (!numeric || Number.isNaN(Number(numeric))) return null;

  // returns the numeric value
  return Number(numeric);
};

// normalizeHero normalizes one hero object
export const normalizeHero = (hero) => {
  // finds the metric height (cm)
  const heightValue = Array.isArray(hero.appearance?.height)
    ? hero.appearance.height.find((v) => /cm$/i.test(v))
    : hero.appearance?.height;

  // finds the metric weight (kg)
  const weightValue = Array.isArray(hero.appearance?.weight)
    ? hero.appearance.weight.find((v) => /kg$/i.test(v))
    : hero.appearance?.weight;

  // returns a new clean hero object
  return {
    ...hero,

    // display values for the UI
    display: {
      icon: hero.images?.xs || null,
      name: hero.name || '',
      fullName: hero.biography?.fullName || '',
      race: hero.appearance?.race || null,
      gender: hero.appearance?.gender || null,
      height: heightValue || null,
      weight: weightValue || null,
      placeOfBirth: hero.biography?.placeOfBirth || null,
      alignment: hero.biography?.alignment || null,
    },

    // stats values for table columns
    stats: {
      intelligence: hero.powerstats?.intelligence ?? null,
      strength: hero.powerstats?.strength ?? null,
      speed: hero.powerstats?.speed ?? null,
      durability: hero.powerstats?.durability ?? null,
      power: hero.powerstats?.power ?? null,
      combat: hero.powerstats?.combat ?? null,
    },

    // numeric values for sorting/filtering
    normalized: {
      height: parseNumericValue(heightValue),
      weight: parseNumericValue(weightValue),
    },
  };
};

// normalizeHeroes normalizes all heroes
export const normalizeHeroes = (heroes) => {
  // loops through heroes and normalizes each one
  return heroes.map(normalizeHero);
};
