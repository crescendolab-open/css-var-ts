import type { Meta, StoryObj } from "@storybook/react-vite";
import { cssVarUtils } from "@crescendolab/css-var-ts";

// Define a semantic system with Light (default) and Dark values
const semantic = cssVarUtils.define({
  background: "#FFFFFF",
  text: "#111111",
  primary: "#0074D9",
});

// Define Dark Mode overrides
const darkTheme: typeof semantic.cssProps = {
  [semantic.getKey("background")]: "#111111",
  [semantic.getKey("text")]: "#FFFFFF",
  [semantic.getKey("primary")]: "#7FDBFF",
};

const Demo: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        border: "1px solid #ccc",
        // 1. Root Level (Default Light)
        // No need to spread cssProps here if we rely on fallback values,
        // but spreading ensures explicit definition.
        ...semantic.cssProps,
        backgroundColor: semantic.getValue("background"),
        color: semantic.getValue("text"),
      }}
    >
      <h3>Level 1: Default (Light)</h3>
      <p style={{ color: semantic.getValue("primary") }}>Primary Color</p>

      {/* 2. Nested Dark Theme */}
      <div
        style={{
          marginTop: "1rem",
          padding: "2rem",
          border: "1px solid #555",
          // Override variables for this subtree
          ...darkTheme,
          backgroundColor: semantic.getValue("background"),
          color: semantic.getValue("text"),
        }}
      >
        <h3>Level 2: Nested Dark Mode</h3>
        <p style={{ color: semantic.getValue("primary") }}>Primary Color</p>

        {/* 3. Nested Reset (Back to Light) */}
        <div
          style={{
            marginTop: "1rem",
            padding: "2rem",
            border: "1px solid #ccc",
            // SPREAD cssProps HERE TO RESET!
            // This restores the original values defined in `semantic`
            ...semantic.cssProps,
            backgroundColor: semantic.getValue("background"),
            color: semantic.getValue("text"),
          }}
        >
          <h3>Level 3: Nested Reset (Light)</h3>
          <p>
            By spreading <code>...semantic.cssProps</code> here, we force the
            variables back to their original values, overriding the parent's
            Dark Mode.
          </p>
          <p style={{ color: semantic.getValue("primary") }}>Primary Color</p>
        </div>
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
