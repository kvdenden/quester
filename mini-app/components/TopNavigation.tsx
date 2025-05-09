"use client";
// import Link from "next/link";
// import { Home } from "lucide-react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
} from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity } from "@coinbase/onchainkit/identity";
import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
import { color } from "@coinbase/onchainkit/theme";
import { useAccount } from "wagmi";
import { useSignIn } from "@/app/hooks/useSignIn";
import Image from "next/image";
import { useState } from "react";

export default function BottomNavigation() {
  const { address, isConnected } = useAccount();

  const { signIn, isLoading, isSignedIn, user } = useSignIn({
    autoSignIn: true,
  });
  const [testResult, setTestResult] = useState<string>("");

  const testAuth = async () => {
    try {
      const res = await fetch("/api/test", {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setTestResult(`Auth test failed: ${data.error}`);
        return;
      }

      setTestResult(`Auth test succeeded! Server response: ${data.message}`);
    } catch (error) {
      setTestResult(
        "Auth test failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  };
  const onrampBuyUrl = getOnrampBuyUrl({
    projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID as string,
    addresses: { [address as string]: ["base"] },
    assets: ["USDC"],
    presetFiatAmount: 20,
    fiatCurrency: "USD",
  });

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 z-10">
      <div className="flex justify-between items-center h-12">
        {/* <Link href="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
        </Link> */}
        {!isSignedIn ? (
          <button
            onClick={signIn}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        ) : (
          <div className="space-y-4">
            {user && (
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={user.pfp_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                  width={80}
                  height={80}
                />
                <div className="text-center">
                  <p className="font-semibold">{user.display_name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={testAuth}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Test Authentication
        </button>

        {testResult && (
          <div className="mt-4 p-4 rounded-lg bg-gray-100 text-black text-sm">
            {testResult}
          </div>
        )}
        <Wallet>
          <ConnectWallet
            className={
              isConnected
                ? `bg-white active:bg-white hover:bg-white`
                : `h-8 w-4 px-2 bg-primary min-w-24 active:bg-primary hover:bg-primary`
            }
            disconnectedLabel="Log In"
          >
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown className="bg-white w-full active:bg-white hover:bg-white">
            <Identity
              className="px-4 pt-3 pb-2 hover:bg-blue-200"
              hasCopyAddressOnClick
            >
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
            </Identity>
            <WalletDropdownFundLink fundingUrl={onrampBuyUrl} />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </nav>
  );
}
