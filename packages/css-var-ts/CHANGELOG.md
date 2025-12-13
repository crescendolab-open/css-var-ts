# @crescendolab/css-var-ts

## 1.0.0

### Major Changes

- 6b333da: Refactor cssVarUtils to support extensions and improve API consistency.
  - **Breaking Change**: `cssVarRecord` property is removed from definitions. Use `raw` instead, which is an array `[baseRecord, ...extensions]`.
  - **Feature**: Added `.extend()` method to `CssVarDefinition` to creating aliased/semantic tokens (Reference Strategy).
  - **Feature**: `getValue()` now returns `var(--key, fallbackValue)` for better resilience.
  - **Feature**: `cssVarUtils.create()` for creating isolated utils instances; instances themselves do not expose `.create()`.
  - **Documentation**: Updated README and split examples into `01_simple` and `02_extend`.

## 0.1.3

### Patch Changes

- 291eae8: docs: custom variable key strategy

## 0.1.2

### Patch Changes

- e1f77ee: build(css-var-ts): fix external

## 0.1.1

### Patch Changes

- e0b8fe5: docs: badges update

## 0.1.0

### Minor Changes

- init
