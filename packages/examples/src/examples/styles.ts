import {
  createCssVarUtils,
  randomString,
  slugify,
} from "@crescendolab/css-var-ts";

const gruvboxCssVarUtils = createCssVarUtils({
  recordKeyToCssVarKey: (recordKey) =>
    `--gruvbox-${slugify(recordKey)}-${randomString(8)}` as const,
});

const gruvboxCssVarBaseDefinition = gruvboxCssVarUtils.define({
  gruvboxDarkFg: "#ebdbb2",
  gruvboxDarkBg: "#282828",

  gruvboxDarkRed: "#cc241d",
  gruvboxDarkGreen: "#98971a",
  gruvboxDarkYellow: "#d79921",
  gruvboxDarkBlue: "#458588",
  gruvboxDarkPurple: "#b16286",
  gruvboxDarkAqua: "#689d6a",
  gruvboxDarkOrange: "#d65d0e",
  gruvboxDarkGray: "#928374",

  gruvboxDarkRedBright: "#fb4934",
  gruvboxDarkGreenBright: "#b8bb26",
  gruvboxDarkYellowBright: "#fabd2f",
  gruvboxDarkBlueBright: "#83a598",
  gruvboxDarkPurpleBright: "#d3869b",
  gruvboxDarkAquaBright: "#8ec07c",
  gruvboxDarkOrangeBright: "#fe8019",

  gruvboxDarkBg0H: "#1d2021",
  gruvboxDarkBg0S: "#32302f",
  gruvboxDarkBg1: "#3c3836",
  gruvboxDarkBg2: "#504945",
  gruvboxDarkBg3: "#665c54",
  gruvboxDarkBg4: "#7c6f64",

  gruvboxDarkFg0: "#fbf1c7",
  gruvboxDarkFg1: "#ebdbb2",
  gruvboxDarkFg2: "#d5c4a1",
  gruvboxDarkFg3: "#bdae93",
  gruvboxDarkFg4: "#a89984",

  gruvboxLightFg: "#3c3836",
  gruvboxLightBg: "#fbf1c7",

  gruvboxLightRed: "#cc241d",
  gruvboxLightGreen: "#98971a",
  gruvboxLightYellow: "#d79921",
  gruvboxLightBlue: "#458588",
  gruvboxLightPurple: "#b16286",
  gruvboxLightAqua: "#689d6a",
  gruvboxLightOrange: "#d65d0e",
  gruvboxLightGray: "#7c6f64",

  gruvboxLightRedDark: "#9d0006",
  gruvboxLightGreenDark: "#79740e",
  gruvboxLightYellowDark: "#b57614",
  gruvboxLightBlueDark: "#076678",
  gruvboxLightPurpleDark: "#8f3f71",
  gruvboxLightAquaDark: "#427b58",
  gruvboxLightOrangeDark: "#af3a03",
  gruvboxLightGrayMuted: "#928374",

  gruvboxLightBg0H: "#f9f5d7",
  gruvboxLightBg0: "#fbf1c7",
  gruvboxLightBg0S: "#f2e5bc",
  gruvboxLightBg1: "#ebdbb2",
  gruvboxLightBg2: "#d5c4a1",
  gruvboxLightBg3: "#bdae93",
  gruvboxLightBg4: "#a89984",

  gruvboxLightFg0: "#282828",
  gruvboxLightFg1: "#3c3836",
  gruvboxLightFg2: "#504945",
  gruvboxLightFg3: "#665c54",
  gruvboxLightFg4: "#7c6f64",
});

const gruvboxCssVarDarkDefinition = gruvboxCssVarUtils.define({
  fg: gruvboxCssVarBaseDefinition.getValue("gruvboxDarkFg"),
  bg: gruvboxCssVarBaseDefinition.getValue("gruvboxDarkBg"),
  error: gruvboxCssVarBaseDefinition.getValue("gruvboxDarkRed"),
  warning: gruvboxCssVarBaseDefinition.getValue("gruvboxDarkYellow"),
  primary: gruvboxCssVarBaseDefinition.getValue("gruvboxDarkBlue"),
});

const gruvboxCssVarLightDefinition = gruvboxCssVarUtils.define({
  fg: gruvboxCssVarBaseDefinition.getValue("gruvboxLightFg"),
  bg: gruvboxCssVarBaseDefinition.getValue("gruvboxLightBg"),
  error: gruvboxCssVarBaseDefinition.getValue("gruvboxLightRed"),
  warning: gruvboxCssVarBaseDefinition.getValue("gruvboxLightYellow"),
  primary: gruvboxCssVarBaseDefinition.getValue("gruvboxLightBlue"),
} satisfies Record<
  keyof typeof gruvboxCssVarDarkDefinition.cssVarRecord,
  string
>);

export {
  gruvboxCssVarBaseDefinition,
  gruvboxCssVarDarkDefinition,
  gruvboxCssVarLightDefinition,
  gruvboxCssVarUtils,
};
