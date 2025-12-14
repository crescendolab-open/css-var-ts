import type { Meta, StoryObj } from "@storybook/react-vite";
import { cssVarUtils } from "@crescendolab/css-var-ts";

// 1. Base Definition
const basePalette = cssVarUtils.define({
  blue: "#0074D9",
  red: "#FF4136",
  gray: "#AAAAAA",
  white: "#FFFFFF",
  black: "#111111",
});

// 2. Extended Definition (Semantic Aliases)
// Using .extend() creates new variables that reference the old ones
const semanticTokens = basePalette.extend({
  primary: "blue",
  error: "red",
  text: "black",
  background: "white",
  muted: "gray",
});

const Demo: React.FC = () => {
  return (
    <div
      style={{
        // Optional: Spread cssProps to ensure variables are registered.
        // If omitted, variables will simply fall back to their defined values.
        ...semanticTokens.cssProps,
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        backgroundColor: semanticTokens.getValue("background"),
        color: semanticTokens.getValue("text"),
      }}
    >
      <h1 style={{ color: semanticTokens.getValue("primary") }}>
        Extended CSS Variables
      </h1>
      <p style={{ color: semanticTokens.getValue("muted") }}>
        This text uses the 'muted' token, which aliases 'gray'.
      </p>
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          border: `1px solid ${semanticTokens.getValue("error")}`,
          color: semanticTokens.getValue("error"),
        }}
      >
        Alert: This uses the 'error' token (aliasing 'red').
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Raw Configuration (Base + Extension)</h3>
        <pre
          style={{
            background: "#eee",
            padding: "1rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
          }}
        >
          {JSON.stringify(semanticTokens.raw, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const meta = {
  component: Demo,
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
