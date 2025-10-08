import { createCssVarUtils } from "./createCssVarUtils";
import { randomString } from "./randomString";
import { slugify } from "./slugify";

namespace cssVarUtils {
  export type CssVarKey = `--${string}-${string}`;
  export type recordKeyToCssVarKey = (recordKey: string) => CssVarKey;
  export type TypeInternal = createCssVarUtils.CssVarUtils<CssVarKey>;
  export type Type = TypeInternal & {
    recordKeyToCssVarKey: (recordKey: string) => CssVarKey;
  };
}

function recordKeyToCssVarKey(recordKey: string): cssVarUtils.CssVarKey {
  return `--${slugify(recordKey)}-${randomString(8)}`;
}

const cssVarUtilsInternal: cssVarUtils.TypeInternal = createCssVarUtils({
  recordKeyToCssVarKey,
});

/**
 * A set of utilities for defining and using CSS variables with type safety.
 */
const cssVarUtils: cssVarUtils.Type = Object.assign(cssVarUtilsInternal, {
  recordKeyToCssVarKey,
});

export { cssVarUtils };
