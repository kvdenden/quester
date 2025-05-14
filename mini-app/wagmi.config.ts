import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "web3/abi.ts",
  plugins: [
    foundry({
      project: "../contracts",
      include: ["Quester.sol/**"],
    }),
  ],
});
