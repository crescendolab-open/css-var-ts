import { describe, expect, it } from "vitest";
import { cssVarUtils } from "./cssVarUtils";

describe("cssVarUtils", () => {
  const customInstance = cssVarUtils.create({
    recordKeyToCssVarKey: (key) => `--prefix-${key}`,
  });
  const { define } = customInstance;

  it("should define css variables correctly", () => {
    const def = define({
      color: "red",
      size: "10px",
    });

    expect(def.raw).toHaveLength(1);
    expect(def.raw[0]).toEqual({
      color: "red",
      size: "10px",
    });

    expect(def.getKey("color")).toBe("--prefix-color");
    expect(def.getValue("color")).toBe("var(--prefix-color, red)");
    expect(def.cssProps).toEqual({
      "--prefix-color": "red",
      "--prefix-size": "10px",
    });
  });

  it("should extend css variables correctly (Reference Strategy)", () => {
    const def = define({
      color: "red",
    });

    const extended = def.extend({
      primary: "color",
    });

    expect(extended.getKey("color")).toBe("--prefix-color");
    const primaryKey = extended.getKey("primary");
    expect(primaryKey).toBe("--prefix-primary"); // New variable
    expect(extended.getValue("primary")).toBe(
      "var(--prefix-primary, var(--prefix-color))",
    );

    // The cssProps of the extension should contain the new alias pointing to the old one.
    // AND the original definitions?
    // In my implementation:
    // `newCssProps = { ...currentCssProps }`
    // So it accumulates.
    expect(extended.cssProps).toEqual({
      "--prefix-color": "red",
      "--prefix-primary": "var(--prefix-color)",
    });
  });

  it("should chain extends correctly", () => {
    const def = define({
      color: "red",
    });

    const extended = def.extend({
      primary: "color",
    });

    const extended2 = extended.extend({
      main: "primary",
    });

    expect(extended2.getKey("main")).toBe("--prefix-main");
    expect(extended2.getValue("main")).toBe(
      "var(--prefix-main, var(--prefix-primary))",
    );

    expect(extended2.cssProps).toEqual({
      "--prefix-color": "red",
      "--prefix-primary": "var(--prefix-color)",
      "--prefix-main": "var(--prefix-primary)",
    });
  });

  it("should throw error if key does not exist in runtime", () => {
    const def = define({
      color: "red",
    });

    // @ts-expect-error - Testing runtime behavior for invalid input
    expect(() => def.getKey("missing")).toThrow();
  });
  it("should not expose .create on created instances", () => {
    // @ts-expect-error - Testing runtime safety
    expect(customInstance.create).toBeUndefined();
    expect(customInstance).toHaveProperty("define");
  });
});
