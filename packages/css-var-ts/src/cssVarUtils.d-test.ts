import { cssVarUtils } from "./cssVarUtils";

// Type assertion helper (self-executing, purely for type checking)
(() => {
  // --- TYPE DEFINITIONS FOR TESTING ---

  // 1. Check define return type
  const def = cssVarUtils.define({
    color: "red",
    margin: "10px",
  });

  type DefType = typeof def;

  // Verify raw type
  type DefRaw = DefType["raw"];
  const _testDefRaw: [{ color: string; margin: string }] = {} as DefRaw;
  void _testDefRaw;

  // Verify getKey type
  type GetKeyParams = Parameters<DefType["getKey"]>[0];
  type ExpectedKeys = "color" | "margin";

  // Test: Keys match
  const _testKeysMatch: ExpectedKeys = {} as GetKeyParams;
  const _testKeysMatchReverse: GetKeyParams = {} as ExpectedKeys;
  void _testKeysMatch;
  void _testKeysMatchReverse;

  // Verify getValue return type
  type GetValueReturn = ReturnType<DefType["getValue"]>;
  const _testGetValueReturnIsString: string = {} as GetValueReturn;
  void _testGetValueReturnIsString;

  // 2. Check create() instance type
  const customInstance = cssVarUtils.create();

  // Verify instance does NOT have create
  // Verify instance does NOT have create
  // type CustomInstanceType = typeof customInstance;

  // @ts-expect-error - .create should not exist on instance
  const _testCreateOnInstance = customInstance.create;
  void _testCreateOnInstance;

  // Verify define exists
  const _testDefineOnInstance = customInstance.define;
  void _testDefineOnInstance;

  // 3. Check extend() types
  const extended = def.extend({
    primary: "color",
  });

  type ExtendedKeys = Parameters<typeof extended.getKey>[0];
  type ExpectedExtendedKeys = "color" | "margin" | "primary";

  const _testExtendedKeys: ExpectedExtendedKeys = {} as ExtendedKeys;
  const _testExtendedKeysReverse: ExtendedKeys = {} as ExpectedExtendedKeys;
  void _testExtendedKeys;
  void _testExtendedKeysReverse;

  // 4. Negative Tests (DX)

  // Extend with non-existent key in value
  // The error happens on the property "missing_key" assignment
  def.extend({
    // @ts-expect-error - "missing_key" is not assignable to existing keys
    bad: "missing_key",
  });
  def.extend({
    // @ts-expect-error - duplicate key is not allowed
    color: "color",
  });

  // Invalid value type in define
  cssVarUtils.define({
    // @ts-expect-error - number is not string
    bad: 123,
  });

  // getKey with invalid key
  // @ts-expect-error - "invalid" is not a key
  def.getKey("invalid");
})();
