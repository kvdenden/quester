"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { MiniAppProvider } from "@/app/contexts/mini-app-context";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { JsonRpcProvider } from "ethers";

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_MAINNET_RPC,
  domain: "https://quester-gamma.vercel.app",
  siweUri: "https://quester-gamma.vercel.app" + "/api/auth/sign-in",
  provider: new JsonRpcProvider(undefined, 10),
  version: "v1",
  appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Quester",
  appIcon: process.env.NEXT_PUBLIC_ICON_URL,
};

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      <MiniAppProvider>
        <AuthKitProvider config={config}>{props.children}</AuthKitProvider>
      </MiniAppProvider>
    </MiniKitProvider>
  );
}
