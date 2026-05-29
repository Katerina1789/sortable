// selectors.test.js — unit tests for filtering, sorting, pagination

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getFilteredHeroes,
  getSortedHeroes,
  getPaginatedHeroes,
  getTotalPages,
} from "../script/selectors.js";

// sample heroes (minimal fields required for selectors)
const heroes = [
  {
    normalized: {
      name: "batman",
      race: "human",
      alignment: "good",
      weight: 95,
    },
    display: { name: "Batman", icon: "a-icon.png" },
    stats: { speed: 29 },
  },
  {
    normalized: {
      name: "zoom",
      race: "metahuman",
      alignment: "bad",
      weight: 88,
    },
    display: { name: "Zoom", icon: "z-icon.png" },
    stats: { speed: 100 },
  },
  {
    normalized: {
      name: "ant-man",
      race: "human",
      alignment: "good",
      weight: 86,
    },
    display: { name: "Ant-Man", icon: "m-icon.png" },
    stats: { speed: 35 },
  },
];

// filtering tests
describe("getFilteredHeroes", () => {
  it("includes matching text", () => {
    const state = { heroes, query: "man", field: "name", operator: "include" };
    const result = getFilteredHeroes(state);
    assert.strictEqual(result.length, 2);
  });

  it("excludes matching text", () => {
    const state = { heroes, query: "man", field: "name", operator: "exclude" };
    const result = getFilteredHeroes(state);
    assert.strictEqual(result.length, 1);
  });

  it("applies numeric comparisons", () => {
    const state = {
      heroes,
      query: "90",
      field: "weight",
      operator: "greaterThan",
    };
    const result = getFilteredHeroes(state);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].display.name, "Batman");
  });

  it("applies fuzzy matching", () => {
    const state = { heroes, query: "zm", field: "name", operator: "fuzzy" };
    const result = getFilteredHeroes(state);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].display.name, "Zoom");
  });
});

// sorting + pagination tests
describe("pagination and sort helpers", () => {
  it("sorts heroes by name ascending", () => {
    const state = { sortColumn: "name", sortDirection: "asc" };
    const sorted = getSortedHeroes(state, heroes);
    assert.deepEqual(
      sorted.map((hero) => hero.display.name),
      ["Ant-Man", "Batman", "Zoom"],
    );
  });

  it("computes total pages at minimum one", () => {
    const state = {
      heroes,
      query: "",
      sortColumn: "name",
      sortDirection: "asc",
      pageSize: "20",
    };
    assert.strictEqual(getTotalPages(state), 1);
  });

  it("sorts heroes by icon ascending", () => {
    const state = { sortColumn: "icon", sortDirection: "asc" };
    const sorted = getSortedHeroes(state, heroes);
    assert.deepEqual(
      sorted.map((hero) => hero.display.name),
      ["Batman", "Ant-Man", "Zoom"],
    );
  });

  it("paginates visible heroes", () => {
    const state = { pageSize: "2", currentPage: 2 };
    const page = getPaginatedHeroes(state, heroes);
    assert.deepEqual(
      page.map((hero) => hero.display.name),
      ["Ant-Man"],
    );
  });
});
