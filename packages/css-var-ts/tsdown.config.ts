import type { UserConfig } from "tsdown";
import { packageDirectory } from "package-directory";
import path from "pathe";
import { defineConfig } from "tsdown";

const basicConfig = {
  entry: ["src/index.ts"],
  tsconfig: "tsconfig.lib.json",
  dts: true,
} as const satisfies Exclude<UserConfig, Array<any>>;

const filesCopyFromRootToPkg = ["README.md", "LICENSE"];

export default defineConfig(async () => {
  const pkgDir = await packageDirectory();
  if (!pkgDir) throw new Error("Cannot find package directory");
  const rootPkgDir = await packageDirectory({
    cwd: path.resolve(pkgDir, ".."),
  });

  if (!rootPkgDir) throw new Error("Cannot find root package directory");

  return [
    {
      ...basicConfig,
      copy: filesCopyFromRootToPkg.map((file) => ({
        from: path.resolve(rootPkgDir, file),
        to: path.resolve(pkgDir, file),
      })),
      unbundle: true,
    },
  ];
});
