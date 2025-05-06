import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "abis/quester.ts",
  plugins: [
    foundry({
      project: "../contracts",
      include: ["Quester.sol/**"],
    }),
  ],
});
