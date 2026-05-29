// sortControls.test.js — unit tests for getNextDirection

import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getNextDirection } from "../script/sortControls.js";

describe("getNextDirection", () => {
  test("clicking a new column always returns asc", () => {
    assert.strictEqual(getNextDirection("weight", "name", "asc"), "asc");
    assert.strictEqual(getNextDirection("weight", "name", "desc"), "asc");
  });

  test("clicking the same column toggles from asc to desc", () => {
    assert.strictEqual(getNextDirection("name", "name", "asc"), "desc");
  });

  test("clicking the same column toggles from desc to asc", () => {
    assert.strictEqual(getNextDirection("name", "name", "desc"), "asc");
  });
});
