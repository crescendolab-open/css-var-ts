---
"@crescendolab/css-var-ts": major
---

Refactor cssVarUtils to support extensions and improve API consistency.

- **Breaking Change**: `cssVarRecord` property is removed from definitions. Use `raw` instead, which is an array `[baseRecord, ...extensions]`.
- **Feature**: Added `.extend()` method to `CssVarDefinition` to creating aliased/semantic tokens (Reference Strategy).
- **Feature**: `getValue()` now returns `var(--key, fallbackValue)` for better resilience.
- **Feature**: `cssVarUtils.create()` for creating isolated utils instances; instances themselves do not expose `.create()`.
- **Documentation**: Updated README and split examples into `01_simple` and `02_extend`.
