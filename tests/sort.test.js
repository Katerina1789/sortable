// sort.test.js — unit tests for getSortedHeroes

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSortedHeroes } from "../script/selectors.js";

// minimal hero fixtures for sorting tests
const heroes = [
  {
    normalized: { name: "batman", alignment: "good", weight: 95 },
    display: { name: "Batman" },
    stats: { speed: 29 },
  },
  {
    normalized: { name: "ant-man", alignment: "good", weight: 86 },
    display: { name: "Ant-Man" },
    stats: { speed: 35 },
  },
  {
    normalized: { name: "zoom", alignment: "bad", weight: 88 },
    display: { name: "Zoom" },
    stats: { speed: 100 },
  },
];

describe("getSortedHeroes", () => {
  it("sorts strings ascending", () => {
    const result = getSortedHeroes(
      { sortColumn: "name", sortDirection: "asc" },
      heroes,
    );
    assert.deepEqual(
      result.map((hero) => hero.display.name),
      ["Ant-Man", "Batman", "Zoom"],
    );
  });

  it("sorts strings descending", () => {
    const result = getSortedHeroes(
      { sortColumn: "name", sortDirection: "desc" },
      heroes,
    );
    assert.deepEqual(
      result.map((hero) => hero.display.name),
      ["Zoom", "Batman", "Ant-Man"],
    );
  });

  it("sorts numeric values", () => {
    const result = getSortedHeroes(
      { sortColumn: "speed", sortDirection: "asc" },
      heroes,
    );
    assert.deepEqual(
      result.map((hero) => hero.display.name),
      ["Batman", "Ant-Man", "Zoom"],
    );
  });

  it("places missing values last", () => {
    const withMissing = [
      {
        normalized: { name: "alpha" },
        display: { name: "Alpha" },
        stats: { speed: 5 },
      },
      {
        normalized: { name: "" },
        display: { name: "Unknown" },
        stats: { speed: 0 },
      },
    ];
    const result = getSortedHeroes(
      { sortColumn: "name", sortDirection: "asc" },
      withMissing,
    );
    assert.strictEqual(result[result.length - 1].display.name, "Unknown");
  });
});
