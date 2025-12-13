import { randomString } from "./randomString";
import { slugify } from "./slugify";

export namespace cssVarUtils {
  // Types
  export type BaseCssVarRecord = Record<string, string>;
  export type BaseVarKeyPrefix = `--${string}`;
  export type BaseVarKey = `${BaseVarKeyPrefix}${string}`;

  export type InferKeys<
    TCssVarRecord extends BaseCssVarRecord,
    TExtensions extends Array<BaseCssVarRecord> = [],
  > =
    | keyof TCssVarRecord
    | (TExtensions extends Array<infer TExtendedCssVarRecord>
        ? TExtendedCssVarRecord extends BaseCssVarRecord
          ? keyof TExtendedCssVarRecord
          : never
        : never);

  export namespace CssVarDefinition {
    export interface Type<
      TVarKey extends BaseVarKey,
      TCssVarRecord extends BaseCssVarRecord,
      TExtensions extends Array<BaseCssVarRecord> = [],
    > {
      raw: [TCssVarRecord, ...TExtensions];
      cssProps: Record<TVarKey, string>;
      getKey: <TKey extends InferKeys<TCssVarRecord, TExtensions>>(
        key: TKey,
      ) => TVarKey;
      getValue: <TKey extends InferKeys<TCssVarRecord, TExtensions>>(
        key: TKey,
      ) => `var(${TVarKey}, ${string})`;
      extend: <
        const TExtendedCssVarRecord extends Record<
          string,
          InferKeys<TCssVarRecord, TExtensions> & string
        >,
      >(
        newRecord: keyof TExtendedCssVarRecord &
          InferKeys<TCssVarRecord, TExtensions> extends never
          ? TExtendedCssVarRecord
          : {
              [TKey in keyof TExtendedCssVarRecord]: TKey extends InferKeys<
                TCssVarRecord,
                TExtensions
              >
                ? never
                : InferKeys<TCssVarRecord, TExtensions>;
            },
      ) => Type<
        TVarKey,
        TCssVarRecord,
        [...TExtensions, TExtendedCssVarRecord]
      >;
    }
  }

  export type Define<TVarKey extends BaseVarKey> = <
    const TCssVarRecord extends BaseCssVarRecord,
  >(
    cssVarRecord: TCssVarRecord,
  ) => CssVarDefinition.Type<TVarKey, TCssVarRecord>;

  export interface Options<TVarKey extends BaseVarKey> {
    recordKeyToCssVarKey: (recordKey: string) => TVarKey;
  }

  export interface Instance<TVarKey extends BaseVarKey> {
    define: Define<TVarKey>;
  }

  export interface Type extends Instance<BaseVarKey> {
    create: <TVarKey extends BaseVarKey = BaseVarKey>(
      options?: Options<TVarKey>,
    ) => Instance<TVarKey>;
    recordKeyToCssVarKey: (recordKey: string) => BaseVarKey;
  }
}

function defaultRecordKeyToCssVarKey(
  recordKey: string,
): cssVarUtils.BaseVarKey {
  return `--${slugify(recordKey)}-${randomString(8)}`;
}

const createDefinitionImpl = <TVarKey extends cssVarUtils.BaseVarKey>(
  baseRecord: cssVarUtils.BaseCssVarRecord,
  keyMap: Map<string, TVarKey>,
  extensions: Array<cssVarUtils.BaseCssVarRecord>,
  recordKeyToCssVarKey: (k: string) => TVarKey,
): cssVarUtils.CssVarDefinition.Type<TVarKey, any, any> => {
  const getKey = (key: string) => {
    const val = keyMap.get(key);
    if (!val) throw new Error(`[cssVarUtils] Key "${key}" not found.`);
    return val;
  };

  // Construct cssProps from baseRecord and extensions
  const currentCssProps: Record<string, string> = {};

  // 1. Base props
  Object.entries(baseRecord).forEach(([key, value]) => {
    const cssVarKey = keyMap.get(key);
    if (cssVarKey) currentCssProps[cssVarKey as string] = value;
  });

  // 2. Extensions props
  extensions.forEach((extension) => {
    Object.entries(extension).forEach(([newKey, oldKey]) => {
      const newVarKey = keyMap.get(newKey);
      const oldVarKey = getKey(oldKey); // Resolves using current keyMap which includes base + previous extensions
      if (newVarKey) {
        currentCssProps[newVarKey] = `var(${oldVarKey})`;
      }
    });
  });

  const getValue = (key: string) => {
    const cssVarKey = getKey(key);
    const value = currentCssProps[cssVarKey];
    return `var(${cssVarKey}, ${value})`;
  };

  const extend = (newExtension: Record<string, string>) => {
    const newMap = new Map(keyMap);

    // Register new keys in map
    Object.entries(newExtension).forEach(([newKey, _oldKey]) => {
      const newVarKey = recordKeyToCssVarKey(newKey);
      newMap.set(newKey, newVarKey);
    });

    return createDefinitionImpl(
      baseRecord,
      newMap,
      [...extensions, newExtension],
      recordKeyToCssVarKey,
    );
  };

  return {
    raw: [baseRecord, ...extensions],
    cssProps: currentCssProps,
    getKey: getKey as any,
    getValue: getValue as any,
    extend: extend as any,
  };
};

const createInstance = <TVarKey extends cssVarUtils.BaseVarKey>(
  options?: cssVarUtils.Options<TVarKey>,
): cssVarUtils.Instance<TVarKey> => {
  const recordKeyToCssVarKey =
    options?.recordKeyToCssVarKey ??
    (defaultRecordKeyToCssVarKey as unknown as (key: string) => TVarKey);

  const define: cssVarUtils.Define<TVarKey> = <
    TCssVarRecord extends cssVarUtils.BaseCssVarRecord,
  >(
    cssVarRecord: TCssVarRecord,
  ) => {
    const map = new Map<string, TVarKey>();

    Object.entries(cssVarRecord).forEach(([key, _value]) => {
      const cssVarKey = recordKeyToCssVarKey(key);
      map.set(key, cssVarKey);
    });

    // Initialize with base record and empty extensions
    return createDefinitionImpl(cssVarRecord, map, [], recordKeyToCssVarKey);
  };

  return { define };
};

const defaultInstance = createInstance();

/**
 * A set of utilities for defining and using CSS variables with type safety.
 */
export const cssVarUtils: cssVarUtils.Type = Object.assign(defaultInstance, {
  create: createInstance,
  recordKeyToCssVarKey: defaultRecordKeyToCssVarKey,
});
