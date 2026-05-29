// normalization.test.js — unit tests for cleanValue, parseNumericValue, normalizeHero

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  cleanValue,
  parseNumericValue,
  normalizeHero,
} from "../script/normalization.js";

// cleanValue tests
describe("cleanValue", () => {
  it("returns null for missing markers", () => {
    assert.strictEqual(cleanValue("unknown"), null);
    assert.strictEqual(cleanValue("-"), null);
  });

  it("returns trimmed text for valid input", () => {
    assert.strictEqual(cleanValue("  Gotham "), "Gotham");
  });
});

// parseNumericValue tests
describe("parseNumericValue", () => {
  it("parses cm values", () => {
    assert.strictEqual(parseNumericValue("203 cm"), 203);
  });

  it("parses meters values", () => {
    assert.strictEqual(parseNumericValue("61.0 meters"), 6100);
  });

  it("handles comma-formatted values", () => {
    assert.strictEqual(parseNumericValue("90,000 kg"), 90000);
  });

  it("returns null for invalid text", () => {
    assert.strictEqual(parseNumericValue("abc"), null);
  });
});

// normalizeHero tests
describe("normalizeHero", () => {
  it("builds normalized search and display fields", () => {
    const hero = normalizeHero({
      name: "Wonder Woman",
      biography: {
        fullName: "Diana Prince",
        placeOfBirth: "Themyscira",
        alignment: "good",
      },
      appearance: {
        race: "Amazon",
        gender: "Female",
        height: ["6'0", "183 cm"],
        weight: ["165 lb", "75 kg"],
      },
      powerstats: {
        intelligence: 88,
        strength: 100,
        speed: 79,
        durability: 100,
        power: 100,
        combat: 100,
      },
      images: { xs: "avatar.png" },
    });

    assert.strictEqual(hero.display.name, "Wonder Woman");
    assert.strictEqual(hero.normalized.name, "wonder woman");
    assert.strictEqual(hero.normalized.height, 183);
    assert.strictEqual(hero.normalized.weight, 75);
    assert.strictEqual(hero.stats.intelligence, 88);
  });
});
