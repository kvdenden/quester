import { createConfig } from "ponder";
import { http } from "viem";
import { questerAbi } from "./abis/quester";

function getNetwork() {
  switch (process.env.PONDER_NETWORK) {
    case "mainnet":
      return "base";
    case "testnet":
      return "baseSepolia";
    default:
      return "anvil";
  }
}

const network = getNetwork();
const startBlock = process.env.PONDER_START_BLOCK;
const questerAddress = process.env.QUESTER_CONTRACT_ADDRESS;

export default createConfig({
  networks: {
    anvil: {
      chainId: 31337,
      transport: http("http://127.0.0.1:8545"),
      disableCache: true,
    },
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.PONDER_RPC_URL_84532),
    },
    base: {
      chainId: 8453,
      transport: http(process.env.PONDER_RPC_URL_8453),
    },
  },
  contracts: {
    Quester: {
      abi: questerAbi,
      network,
      address: questerAddress,
      startBlock,
    },
  },
});
