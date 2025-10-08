import type { SerializedStyles } from "@emotion/react";
import type { StoryObj } from "@storybook/react-vite";
import { css } from "@emotion/react";
import * as React from "react";
import {
  gruvboxCssVarBaseDefinition,
  gruvboxCssVarSemanticDefinition,
  gruvboxDarkCssProps,
} from "../../../styles";

const serializedStylesRecord = {
  demoAll: css({
    label: "demoAll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1em",
  }),
  demoSingle: css({
    label: "demoSingle",
    ...gruvboxCssVarBaseDefinition.cssProps,
    ...gruvboxCssVarSemanticDefinition.cssProps,
    "&.dark": {
      ...gruvboxDarkCssProps,
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "1em",
    flexWrap: "wrap",
  }),
  button: css({
    label: "button",
    color: gruvboxCssVarSemanticDefinition.getValue("fg"),
    backgroundColor: gruvboxCssVarSemanticDefinition.getValue("bg"),
    border: `1px solid currentColor`,
    borderRadius: "4px",
    padding: "8px 16px",
    fontSize: "16px",
    "&:not(:disabled)": {
      cursor: "pointer",
      "&.warning": {
        color: gruvboxCssVarSemanticDefinition.getValue("warning"),
      },
      "&.error": {
        color: gruvboxCssVarSemanticDefinition.getValue("error"),
      },
      transition: "all 0.1s ease-in-out",
      "&:hover": {
        translate: "2px -2px",
        scale: "1.05",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      "&:active": {
        translate: "0 0",
        scale: "0.95",
        boxShadow: "none",
      },
    },
  }),
} satisfies Record<string, SerializedStyles>;

const Button: React.FC<React.ComponentProps<"button">> = (props) => {
  return (
    <button css={serializedStylesRecord.button} {...props} type={props.type} />
  );
};

const DemoSingle: React.FC<Omit<React.ComponentProps<"div">, "children">> = (
  props,
) => {
  return (
    <div css={serializedStylesRecord.demoSingle} {...props}>
      <Button>Click Me</Button>
      <Button className="warning">Warning</Button>
      <Button className="error">Error</Button>
    </div>
  );
};

const DemoAll: React.FC<Omit<React.ComponentProps<"div">, "children">> = (
  props,
) => {
  return (
    <div css={serializedStylesRecord.demoAll} {...props}>
      <DemoSingle {...props} />
      <DemoSingle {...props} className="dark" />
    </div>
  );
};

const meta = {
  component: DemoAll,
};
export default meta;

export type Story = StoryObj<typeof meta>;

export const story: Story = {};
