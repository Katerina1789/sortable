import { sortHeroes } from "../script/sort.js";

const heroes = [
  {
    name: "Batman",
    biography: {
      fullName: "Bruce Wayne",
      placeOfBirth: "Gotham City",
      alignment: "good",
    },
    powerstats: {
      intelligence: 81,
      strength: 40,
      speed: 29,
      durability: 55,
      power: 63,
      combat: 90,
    },
    appearance: {
      race: "Human",
      gender: "Male",
      height: ["6'2", "188 cm"],
      weight: ["210 lb", "95 kg"],
    },
  },
  {
    name: "Ant-Man",
    biography: {
      fullName: "Scott Lang",
      placeOfBirth: "Coral Gables, Florida",
      alignment: "good",
    },
    powerstats: {
      intelligence: 63,
      strength: 28,
      speed: 35,
      durability: 28,
      power: 71,
      combat: 55,
    },
    appearance: {
      race: "Human",
      gender: "Male",
      height: ["6'0", "183 cm"],
      weight: ["190 lb", "86 kg"],
    },
  },
  {
    name: "Zoom",
    biography: { fullName: "-", placeOfBirth: "-", alignment: "bad" },
    powerstats: {
      intelligence: 50,
      strength: 10,
      speed: 100,
      durability: 60,
      power: 55,
      combat: 45,
    },
    appearance: {
      race: null,
      gender: "Male",
      height: ["6'1", "185 cm"],
      weight: ["195 lb", "88 kg"],
    },
  },
];

describe("sortHeroes - strings", () => {
  test("sorts by name ascending", () => {
    const result = sortHeroes(heroes, "name", "asc");
    expect(result.map((h) => h.name)).toEqual(["Ant-Man", "Batman", "Zoom"]);
  });

  test("sorts by name descending", () => {
    const result = sortHeroes(heroes, "name", "desc");
    expect(result.map((h) => h.name)).toEqual(["Zoom", "Batman", "Ant-Man"]);
  });

  test("sorts by alignment ascending", () => {
    const result = sortHeroes(heroes, "alignment", "asc");
    expect(result[0].biography.alignment).toBe("bad");
  });
});

describe("sortHeroes - numbers", () => {
  test("sorts by speed ascending (numeric)", () => {
    const result = sortHeroes(heroes, "speed", "asc");
    expect(result.map((h) => h.name)).toEqual(["Batman", "Ant-Man", "Zoom"]);
  });

  test("sorts by weight ascending (numeric, parses kg)", () => {
    const result = sortHeroes(heroes, "weight", "asc");
    expect(result.map((h) => h.name)).toEqual(["Ant-Man", "Zoom", "Batman"]);
  });

  test("sorts by weight descending", () => {
    const result = sortHeroes(heroes, "weight", "desc");
    expect(result.map((h) => h.name)).toEqual(["Batman", "Zoom", "Ant-Man"]);
  });
});

describe("sortHeroes - missing values", () => {
  const withMissing = [
    { ...heroes[0] },
    { ...heroes[1], appearance: { ...heroes[1].appearance, race: null } },
    {
      ...heroes[2],
      appearance: { ...heroes[2].appearance, race: "Metahuman" },
    },
  ];

  test("missing race values appear last when sorting asc", () => {
    const result = sortHeroes(withMissing, "race", "asc");
    expect(result[result.length - 1].name).toBe("Ant-Man");
  });

  test("missing race values appear last when sorting desc", () => {
    const result = sortHeroes(withMissing, "race", "desc");
    expect(result[result.length - 1].name).toBe("Ant-Man");
  });

  test("missing fullName (dash) appears last", () => {
    const result = sortHeroes(heroes, "fullName", "asc");
    expect(result[result.length - 1].name).toBe("Zoom");
  });
});
