import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@emotion/css";
import { Fragment } from "react/jsx-runtime";

const meta = {
  component: Fragment,
} satisfies Meta<typeof Fragment>;

export default meta;

type Story = StoryObj<typeof meta>;

const classNameRecord = {
  article: css({
    fontFamily: "system-ui, sans-serif",
    color: "#333",
    "& a": {
      color: "#3498db",
    },
  }),
} satisfies Record<string, string>;

export const README: Story = {
  render: () => (
    <article className={classNameRecord.article}>
      <h1>@crescendolab/css-var-ts</h1>
      <p>
        Please refer to the{" "}
        <a
          href="https://github.com/crescendolab-open/css-var-ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          repository
        </a>{" "}
        for more information.
      </p>
    </article>
  ),
};
