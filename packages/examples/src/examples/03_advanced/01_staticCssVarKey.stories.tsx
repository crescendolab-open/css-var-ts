import type { Meta, StoryObj } from "@storybook/react-vite";

import { createCssVarUtils, slugify } from "@crescendolab/css-var-ts";

const cssVarUtils = createCssVarUtils({
  recordKeyToCssVarKey: (recordKey) =>
    `--static-${slugify(recordKey)}` as const,
});

const paletteDefnition = cssVarUtils.define({
  navy: "#001F3F",
  blue: "#0074D9",
  aqua: "#7FDBFF",
  teal: "#39CCCC",
  olive: "#3D9970",
  green: "#2ECC40",
  lime: "#01FF70",
  yellow: "#FFDC00",
  orange: "#FF851B",
  red: "#FF4136",
  fuchsia: "#F012BE",
  purple: "#B10DC9",
  maroon: "#85144B",
  white: "#FFFFFF",
  silver: "#DDDDDD",
  gray: "#AAAAAA",
  black: "#111111",
});

const sematicCssVarDefinition = cssVarUtils.define({
  primary: paletteDefnition.getValue("navy"),
  secondary: paletteDefnition.getValue("gray"),
  success: paletteDefnition.getValue("green"),
  warning: paletteDefnition.getValue("orange"),
  error: paletteDefnition.getValue("red"),
  background: paletteDefnition.getValue("white"),
  foreground: paletteDefnition.getValue("black"),
});

const colorOptions = [
  "blue",
  "aqua",
  "teal",
  "olive",
  "lime",
  "orange",
  "fuchsia",
  "purple",
  "maroon",
] as const satisfies Array<keyof typeof paletteDefnition.cssVarRecord>;

const variantOptions = [
  "foreground",
  "primary",
  "secondary",
  "success",
  "warning",
  "error",
] as const satisfies Array<keyof typeof sematicCssVarDefinition.cssVarRecord>;

const Demo: React.FC<{
  text: string;
  color: keyof typeof paletteDefnition.cssVarRecord;
  variant: keyof typeof sematicCssVarDefinition.cssVarRecord;
}> = ({ text, color, variant }) => {
  return (
    <div
      style={{
        ...paletteDefnition.cssProps,
        ...sematicCssVarDefinition.cssProps,
        fontFamily: "system-ui, sans-serif",
        [sematicCssVarDefinition.getKey("primary")]:
          paletteDefnition.getValue(color),
        color: sematicCssVarDefinition.getValue(variant),
        backgroundColor: sematicCssVarDefinition.getValue("background"),
      }}
    >
      {text}
    </div>
  );
};

const meta = {
  component: Demo,
  args: {
    text: "Hello, CSS Variable!",
    color: "navy",
    variant: "foreground",
  },
  argTypes: {
    text: { control: "text", description: "Text to display" },
    color: {
      control: { type: "inline-radio" },
      options: colorOptions,
      description: "Color of the text",
    },
    variant: {
      control: { type: "inline-radio" },
      options: variantOptions,
      description: "Status of the text",
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const playground: Story = {};

export const fuchsiaPrimary: Story = {
  args: {
    color: "fuchsia",
    variant: "primary",
  },
};

export const bluePrimary: Story = {
  args: {
    color: "blue",
    variant: "primary",
  },
};

export const secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const success: Story = {
  args: {
    variant: "success",
  },
};

export const warning: Story = {
  args: {
    variant: "warning",
  },
};

export const error: Story = {
  args: {
    variant: "error",
  },
};
