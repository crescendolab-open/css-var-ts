import type { BoxProps, SxProps } from "@mui/system";
import type { StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/system";
import * as React from "react";
import {
  gruvboxCssVarBaseDefinition,
  gruvboxCssVarSemanticDefinition,
  gruvboxDarkCssProps,
} from "../../styles";

const sxPropsRecord = {
  demoAll: {
    label: "demoAll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1em",
  },
  demoSingle: {
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
  },
  button: {
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
  },
} satisfies Record<string, SxProps>;

const Button: React.FC<BoxProps<"button">> = (props) => {
  return (
    <Box
      component="button"
      sx={sxPropsRecord.button}
      {...props}
      type={props.type}
    />
  );
};

const DemoSingle: React.FC<Omit<BoxProps, "children">> = (props) => {
  return (
    <Box sx={sxPropsRecord.demoSingle} {...props}>
      <Button>Click Me</Button>
      <Button className="warning">Warning</Button>
      <Button className="error">Error</Button>
    </Box>
  );
};

const DemoAll: React.FC<Omit<BoxProps, "children">> = (props) => {
  return (
    <Box sx={sxPropsRecord.demoAll} {...props}>
      <DemoSingle {...props} />
      <DemoSingle {...props} className="dark" />
    </Box>
  );
};

const meta = {
  component: DemoAll,
};
export default meta;

export type Story = StoryObj<typeof meta>;

export const story: Story = {};
