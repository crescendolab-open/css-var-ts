import { describe, expect, it } from "vitest";
import { randomString } from "./randomString";

// Helper: regex for lowercase hex chars
const HEX_RE = /^[0-9a-f]+$/;

describe("randomString", () => {
  it("returns string of exact requested length", () => {
    for (const len of [0, 1, 2, 3, 8, 16, 31, 32, 33, 64]) {
      const s = randomString(len);
      expect(s.length).toBe(len);
    }
  });

  it("contains only lowercase hex characters", () => {
    const s = randomString(64);
    if (s.length > 0) {
      expect(HEX_RE.test(s)).toBe(true);
    }
  });

  it("is reasonably random (no identical output across many calls)", () => {
    const set = new Set<string>();
    const SAMPLES = 200; // enough for collision probability to be negligible for len=12 (16^12 space)
    for (let i = 0; i < SAMPLES; i++) {
      set.add(randomString(12));
    }
    // Expect at least 99% uniqueness (allowing for an extremely unlikely collision without flaking build)
    expect(set.size).toBeGreaterThanOrEqual(SAMPLES * 0.99);
  });

  it("truncates underlying entropy correctly (no longer than requested)", () => {
    for (let len = 1; len <= 64; len++) {
      expect(randomString(len).length).toBe(len);
    }
  });

  it("different lengths produce different length strings", () => {
    const a = randomString(10);
    const b = randomString(11);
    expect(a.length).not.toBe(b.length);
  });
});
