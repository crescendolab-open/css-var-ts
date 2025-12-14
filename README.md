# 🌟 @crescendolab/css-var-ts

Type-safe, ergonomic utilities for authoring, registering, and consuming CSS Custom Properties (CSS Variables) in TypeScript.

[![npm (scoped)](https://img.shields.io/npm/v/@crescendolab/css-var-ts)](https://www.npmjs.com/package/@crescendolab/css-var-ts)

---

## 🚀 Features

- ✅ Strongly typed CSS variable keys & values
- ✅ Auto–generated collision‑resistant variable names (slug + short random id)
- ✅ Convenient `.cssProps` map you can spread into inline styles / style objects
- ✅ Easy integration with: `@emotion/css`, `@emotion/react` (css prop), `@mui/system` (`sx` prop)
- ✅ Compose semantic variables from a base palette safely (`getValue` → `var(--token)`)
- ✅ Advanced: custom variable key generator via `cssVarUtils.create`
- ✅ Advanced: works with `@property` at‑rule registration

---

## 📦 Installation

```bash
pnpm add @crescendolab/css-var-ts
# or
npm i @crescendolab/css-var-ts
# or
yarn add @crescendolab/css-var-ts
```

---

## ⚡ Quick Start

```ts
import { cssVarUtils } from "@crescendolab/css-var-ts";

// 1. Define a base palette
const palette = cssVarUtils.define({
  primaryBlue: "#0074D9",
  accentPink: "#F012BE",
  neutralBg: "#FFFFFF",
  neutralFg: "#111111",
});

// 2. Define semantic tokens referencing the palette (type‑safe)
const semantic = cssVarUtils.define({
  brand: palette.getValue("primaryBlue"),
  text: palette.getValue("neutralFg"),
  background: palette.getValue("neutralBg"),
});

// 3. Use in styles
const style: React.CSSProperties = {
  // ...palette.cssProps, // Optional: variables have fallback values via `getValue`
  // ...semantic.cssProps,
  color: semantic.getValue("text"),
  backgroundColor: semantic.getValue("background"),
};
```

Resulting (example) generated variable keys (random 8‑char suffix) look like:

```text
--primaryblue-a1b2c3d4
--accentpink-9fe012ab
```

## 🧩 Basic Usage (from Storybook “01_basic”)

```ts
import { cssVarUtils } from "@crescendolab/css-var-ts";

// Base palette
const paletteDefinition = cssVarUtils.define({
  navy: "#001F3F",
  blue: "#0074D9",
  aqua: "#7FDBFF",
  black: "#111111",
});

// Semantic tokens referencing base palette
const semanticDefinition = cssVarUtils.define({
  primary: paletteDefinition.getValue("navy"),
  foreground: paletteDefinition.getValue("black"),
});

// Override one semantic var dynamically
const dynamicStyle = {
  ...paletteDefinition.cssProps,
  ...semanticDefinition.cssProps,
  [semanticDefinition.getKey("primary")]: paletteDefinition.getValue("blue"),
  color: semanticDefinition.getValue("foreground"),
};
```

---

## 🎨 Integrations

### Emotion (`@emotion/css`)

```ts
import { css } from "@emotion/css";
import {
  gruvboxCssVarBaseDefinition,
  gruvboxCssVarLightDefinition,
} from "./styles";

const container = css({
  ...gruvboxCssVarBaseDefinition.cssProps,
  ...gruvboxCssVarLightDefinition.cssProps,
  color: gruvboxCssVarLightDefinition.getValue("fg"),
});
```

### Emotion (`css` prop)

```tsx
import { css } from "@emotion/react";
const button = css({
  color: gruvboxCssVarLightDefinition.getValue("fg"),
  backgroundColor: gruvboxCssVarLightDefinition.getValue("bg"),
});
```

### MUI (`sx` prop)

```tsx
<Box
  sx={{
    ...gruvboxCssVarBaseDefinition.cssProps,
    ...gruvboxCssVarLightDefinition.cssProps,
    color: gruvboxCssVarLightDefinition.getValue("fg"),
  }}
/>
```

> See live Storybook demos below for full examples including light/dark variants and status colors.

---

## 🛠️ Advanced

### Custom Variable Key Strategy

Use `createCssVarUtils` to fully control how variable names are produced (e.g. ephemeral / randomized keys).

```ts
import { cssVarUtils, randomString, slugify } from "@crescendolab/css-var-ts";

const myCssVarUtils = cssVarUtils.create({
  recordKeyToCssVarKey: (key) =>
    `--my-${slugify(key)}-${randomString(8)}` as const,
});

const myDefinition = myCssVarUtils.define({
  primary: "#0074D9",
});

myDefinition.getKey("primary"); // different each load
```

#### Static (Deterministic) Keys

If you prefer fully readable, deterministic variable names (no random suffix) you can supply a static strategy. Be sure to manually ensure uniqueness across packages / bundles when using this approach.

```ts
import { cssVarUtils, slugify } from "@crescendolab/css-var-ts";

const staticCssVarUtils = cssVarUtils.create({
  recordKeyToCssVarKey: (key) => `--static-${slugify(key)}` as const,
});

const staticDefinition = staticCssVarUtils.define({
  primary: "#0074D9",
  accent: "#F012BE",
});

staticDefinition.getKey("primary"); // "--static-primary"
staticDefinition.getValue("primary"); // "var(--static-primary, #0074D9)"
```

### `@property` Registration

You can register variables with the CSS Typed OM for transitions, inheritance, etc.

```ts
const definition = cssVarUtils.define({ primaryColor: "#F012BE" });

CSS.registerProperty({
  name: definition.getKey("primaryColor"),
  syntax: "<color>",
  inherits: true,
  initialValue: "#F012BE",
});
```

---

### Recommendations for Large CSS-in-JS Apps

For large-scale web applications (mono-repos, micro frontends, dynamic plugin architectures) you should take extra precautions to avoid accidental variable name collisions and to harden your design system surface.

1. Strengthen uniqueness: Provide a custom `recordKeyToCssVarKey` that injects a namespace (package name) plus a short random suffix. (You can optionally add build / commit info if desired.)

   ```ts
   import {
     cssVarUtils,
     randomString,
     slugify,
   } from "@crescendolab/css-var-ts";

   const namespace = process.env.APP_NAMESPACE ?? "app"; // e.g. marketing, analytics

   const scopedCssVarUtils = cssVarUtils.create({
     recordKeyToCssVarKey: (key) =>
       `--${namespace}-${slugify(key)}-${randomString(8)}` as const,
   });
   ```

   For deterministic builds replace `randomString(8)` with a stable hash (e.g. of `namespace + key`).

2. Strongly recommended: Register core design tokens via `@property` to enforce syntax (e.g. `<color>`, `<length>`) and enable smoother transitions & validation.
3. Expose only semantic tokens to feature teams; keep raw palette tokens private to your design system package.
4. Document namespace conventions so new packages follow the same pattern.
5. Periodically audit generated variable names (e.g. collect with a build script) to detect drift or duplication.

These measures reduce the chance of silent styling regressions when independently deployed bundles are combined at runtime.

---

## 🔍 API Reference

### `cssVarUtils`

The default exported utility bundle.

```ts
const definition = cssVarUtils.define({ accent: "#F012BE" });
definition.raw; // [{ accent: "#F012BE" }]
// example suffix will differ each run (8 random hex chars):
definition.cssProps; // { "--accent-a1b2c3d4": "#F012BE" }
definition.getKey("accent"); // "--accent-a1b2c3d4"
definition.getValue("accent"); // "var(--accent-a1b2c3d4, #F012BE)"
```

Each call to `define()` returns an object:

| Key              | Type                      | Description                                                   |
| ---------------- | ------------------------- | ------------------------------------------------------------- |
| `raw`            | `[base, ...exts]`         | Array of raw token records (base + extensions)                |
| `cssProps`       | Record<cssVarKey, string> | Object you can spread into style systems to declare variables |
| `getKey(name)`   | string                    | Generated CSS variable name (e.g. `--accent-…`)               |
| `getValue(name)` | `var(--token, val)`       | Proper `var()` usage string                                   |

### `cssVarUtils.create(options)`

Low‑level factory to customize naming.

```ts
const custom = cssVarUtils.create({
  recordKeyToCssVarKey: (k) => `--my-${k}` as const,
});
```

### Helper Exports

| Export         | Purpose                                                        |
| -------------- | -------------------------------------------------------------- |
| `slugify`      | Deterministic slug for record keys                             |
| `randomString` | Cryptographically strong random id (hex) for custom strategies |

---

## 📚 Storybook Examples

| Category           | Story              | Code                                                                                                                                                                                              | Live Demo                                                                                                                    |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Basic              | Palette + semantic | [`01_basic`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/01_basic/index.stories.tsx)                                                                 | [Playground](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-01-basic--playground)                      |
| Emotion (class)    | `@emotion/css`     | [`02_integration/01_emotion/01_emotion_css`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/02_integration/01_emotion/01_emotion_css/index.stories.tsx) | [Demo](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-02-integration-01-emotion-01-emotion-css--story) |
| Emotion (css prop) | `@emotion/react`   | [`02_integration/01_emotion/02_css_prop`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/02_integration/01_emotion/02_css_prop/index.stories.tsx)       | [Demo](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-02-integration-01-emotion-02-css-prop--story)    |
| MUI                | `sx` prop          | [`02_integration/02_mui_sx_prop`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/02_integration/02_mui_sx_prop/index.stories.tsx)                       | [Demo](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-02-integration-02-mui-sx-prop--story)            |
| Advanced           | Static custom keys | [`03_advanced/01_staticCssVarKey`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/03_advanced/01_staticCssVarKey.stories.tsx)                           | [Demo](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-03-advanced-01-staticcssvarkey--playground)      |
| Advanced           | `@property`        | [`03_advanced/02_@property_atRule`](https://github.com/crescendolab-open/css-var-ts/tree/main/packages/examples/src/examples/03_advanced/02_@property_atRule.stories.tsx)                         | [Demo](https://crescendolab-open.github.io/css-var-ts/?path=/story/examples-03-advanced-02-property-atrule--at-rule)         |

---

## 🤔 Why add a random suffix?

Adding a short random suffix mitigates accidental collisions when multiple packages / microfrontends define the same token names. It keeps names mostly human readable while providing lightweight namespacing. For fully deterministic readable names use a static strategy; for strict isolation include a package or build id.

### Strategy Summary

List of approaches:

- Default (`cssVarUtils`): Slug + random 8‑char id = collision‑resistant and readable.
- Static custom (see story): `--static-${slug}` for fully readable tokens; ensure uniqueness manually.
- Random / ephemeral: `cssVarUtils.create` + `randomString` / build hash for experiments, multi‑tenant isolation, A/B variants.

---

## 🧪 Testing Strategy

Library surface is pure & easily unit testable (see `randomString.test.ts` for an example). Add tests as you add helpers: focus on stability of generated keys and referential integrity between `getKey` and `getValue`.

---

## 🛠 Release Automation

This repo uses **changesets** + GitHub Actions. On merge to `main`, a version PR is created / updated. Approve & merge to publish.

Ensure org settings allow the workflow to create & approve PRs:
Settings → Code and automation → Actions → General → Workflow permissions:

- Read & write permissions
- Allow GitHub Actions to create and approve pull requests

---

## 🤝 Contributing

PRs welcome! See the [contributing guide](https://github.com/VdustR/template-aio/blob/main/CONTRIBUTING.md).

Suggested areas:

- New integrations (e.g. Tailwind plugin example)
- Additional DX helpers
- Documentation improvements

---

## 📜 License

[Apache-2.0](https://github.com/crescendolab-open/reamgif/blob/main/LICENSE)

Copyright (c) 2025 [Crescendo Lab](https://github.com/crescendolab-open/)

---

Made with ❤️ to make CSS variables first-class citizens in TypeScript.
