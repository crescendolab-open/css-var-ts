import type { Meta, StoryObj } from "@storybook/react-vite";
import { cssVarUtils } from "@crescendolab/css-var-ts";

const palette = cssVarUtils.define({
  primary: "#0074D9",
  secondary: "#AAAAAA",
  text: "#111111",
  background: "#FFFFFF",
});

const Demo: React.FC<{
  text: string;
  theme: "light" | "dark";
}> = ({ text, theme }) => {
  return (
    <div
      style={{
        // ...palette.cssProps, // Optional: variables have fallback values via getValue()
        ...(theme !== "dark"
          ? {}
          : {
              [palette.getKey("background")]: palette.raw[0].text,
              [palette.getKey("text")]: palette.raw[0].background,
            }),
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        backgroundColor: palette.getValue("background"),
        color: palette.getValue("text"),
      }}
    >
      <h1 style={{ color: palette.getValue("primary") }}>{text}</h1>
      <p style={{ color: palette.getValue("secondary") }}>
        This is a simple example using css-var-ts.
      </p>
    </div>
  );
};

const meta = {
  component: Demo,
  args: {
    text: "Hello, Simple World!",
    theme: "light",
  },
  argTypes: {
    theme: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
