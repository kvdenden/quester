"use client";

import { type ReactNode } from "react";
import { base } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { MiniAppProvider } from "@/app/contexts/mini-app-context";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { JsonRpcProvider } from "ethers";
import { SessionProvider } from "next-auth/react";

const url =
  process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_BRANCH_URL}`;

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_MAINNET_RPC,
  domain: "localhost:3000",
  siweUri: url + "/api/auth/login",
  provider: new JsonRpcProvider(
    process.env.NEXT_PUBLIC_OPTIMISM_MAINNET_RPC,
    10,
  ),
  version: "v1",
  appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Quester",
  appIcon: process.env.NEXT_PUBLIC_ICON_URL,
};

export function Providers(props: { children: ReactNode }) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}
