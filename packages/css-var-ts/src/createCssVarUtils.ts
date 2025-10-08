namespace createCssVarUtils {
  /**
   * The base record type for CSS variables, where each key is a string and each value is a string.
   *
   * e.g.
   *
   * ```ts
   * const cssVarRecord = {
   *   width: "100px",
   *   primary: "blue"
   * } as const satisfies BaseCssVarRecord;
   * ```
   */
  export type BaseCssVarRecord = Record<string, string>;
  export type BaseVarKeyPrefix = `--${string}`;
  export type BaseVarKey = `${BaseVarKeyPrefix}${string}`;

  export namespace CssVarDefinition {
    /**
     * Defines a CSS variable definition with utilities to access keys and values.
     *
     * e.g.
     *
     * ```ts
     * // TODO: add example
     * ```
     */
    export interface Type<
      TVarKey extends BaseVarKey,
      TCssVarRecord extends BaseCssVarRecord,
    > {
      cssVarRecord: TCssVarRecord;
      cssProps: Record<TVarKey, string>;
      getKey: <TKey extends keyof TCssVarRecord>(key: TKey) => TVarKey;
      getValue: <TKey extends keyof TCssVarRecord>(
        key: TKey,
      ) => `var(${TVarKey})`;
    }
  }

  export namespace CssVarUtils {
    export type Define<TVarKey extends BaseVarKey> = <
      const TCssVarRecord extends BaseCssVarRecord,
    >(
      cssVarRecord: TCssVarRecord,
    ) => CssVarDefinition.Type<TVarKey, TCssVarRecord>;

    export interface Type<TVarKey extends BaseVarKey> {
      define: Define<TVarKey>;
    }
  }

  export type CssVarUtils<TVarKey extends BaseVarKey> =
    CssVarUtils.Type<TVarKey>;

  export interface Options<TVarKey extends BaseVarKey> {
    recordKeyToCssVarKey: (recordKey: string) => TVarKey;
  }

  export type Type = <TVarKey extends BaseVarKey>(
    options: Options<TVarKey>,
  ) => CssVarUtils<TVarKey>;
}

/**
 * Creates a set of utilities for defining and using CSS variables with type safety.
 */
const createCssVarUtils: createCssVarUtils.Type = <
  TVarKey extends createCssVarUtils.BaseVarKey,
>({
  recordKeyToCssVarKey,
}: createCssVarUtils.Options<TVarKey>): createCssVarUtils.CssVarUtils<TVarKey> => {
  const define: createCssVarUtils.CssVarUtils<TVarKey>["define"] = <
    TCssVarRecord extends createCssVarUtils.BaseCssVarRecord,
  >(
    cssVarRecord: TCssVarRecord,
  ): createCssVarUtils.CssVarDefinition.Type<TVarKey, TCssVarRecord> => {
    const map = new Map<keyof TCssVarRecord, TVarKey>();
    Object.entries(cssVarRecord).forEach(([key, _value]) => {
      map.set(key, recordKeyToCssVarKey(key));
    });
    const getKey: ReturnType<typeof define>["getKey"] = (key) => {
      const cssVarKey = map.get(key);
      if (!cssVarKey) {
        throw new Error(
          `[defineCssVarUtils] The key "${String(
            key,
          )}" does not exist in the cssVarRecord.`,
        );
      }
      return cssVarKey;
    };

    const getValue: ReturnType<typeof define>["getValue"] = (key) =>
      `var(${getKey(key)})` satisfies `var(${TVarKey})`;
    const cssProps: ReturnType<typeof define>["cssProps"] = Object.fromEntries(
      Object.entries(cssVarRecord).map(([key, value]) => [getKey(key), value]),
    ) as ReturnType<typeof define>["cssProps"];
    return { cssVarRecord, cssProps, getKey, getValue };
  };
  return { define };
};

export { createCssVarUtils };
