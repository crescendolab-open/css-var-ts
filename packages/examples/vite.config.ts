import react from "@vitejs/plugin-react";
import { packageDirectory } from "package-directory";
import path from "pathe";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  const pkgDir = await packageDirectory();
  if (!pkgDir) throw new Error("Cannot find package directory");

  const cssPropExamplePath = path.resolve(
    pkgDir,
    "src/examples/02_integration/01_emotion/02_css_prop",
  );
  return {
    plugins: [
      react({
        babel: {
          presets: ["@emotion/babel-preset-css-prop"],
        },
        include: [`${cssPropExamplePath}/**`],
      }),
      react({
        exclude: [`${cssPropExamplePath}/**`],
      }),
    ],
    optimizeDeps: {
      exclude: ["@crescendolab/css-var-ts"],
    },
    resolve: {
      alias: {
        "@crescendolab/css-var-ts": path.resolve(
          pkgDir,
          "../css-var-ts/src/index.ts",
        ),
      },
    },
  };
});
