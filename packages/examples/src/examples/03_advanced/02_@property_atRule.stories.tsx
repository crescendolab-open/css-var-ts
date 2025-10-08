import type { Meta, StoryObj } from "@storybook/react-vite";
import { cssVarUtils } from "@crescendolab/css-var-ts";
import * as React from "react";

const defaultPrimaryColor = "#F012BE";
const overriddenPrimaryColor = "#85144B";

const cssVarDefinition = cssVarUtils.define({
  primaryColor: defaultPrimaryColor,
});

cssVarDefinition.getKey("primaryColor");

window.CSS.registerProperty({
  name: cssVarDefinition.getKey("primaryColor"),
  syntax: "<color>",
  inherits: true,
  initialValue: defaultPrimaryColor,
});

const DemoText: React.FC<React.ComponentProps<"div">> = (props) => {
  const mergedStyle = React.useMemo(() => {
    return {
      fontFamily: "system-ui, sans-serif",
      color: cssVarDefinition.getValue("primaryColor"),
      ...props.style,
    };
  }, [props.style]);
  return <div {...props} style={mergedStyle} />;
};

const Demo: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <DemoText>Default</DemoText>
      <span
        style={{
          [cssVarDefinition.getKey("primaryColor")]: overriddenPrimaryColor,
        }}
      >
        <DemoText>Overridden</DemoText>
      </span>
    </div>
  );
};

const meta = {
  component: Demo,
} satisfies Meta<typeof Demo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AtRule: Story = {};
