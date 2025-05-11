"use client";
// import Link from "next/link";
// import { Home } from "lucide-react";
// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletDropdownDisconnect,
//   WalletDropdownFundLink,
// } from "@coinbase/onchainkit/wallet";
// import { Address, Avatar, Name, Identity } from "@coinbase/onchainkit/identity";
// import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";
// import { color } from "@coinbase/onchainkit/theme";
// import { useAccount } from "wagmi";
import { useSignIn } from "@/app/hooks/useSignIn";
import Image from "next/image";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
// import { JsonRpcProvider } from "ethers";
// import {
//   useProfile,
//   useSignIn as useFarcasterSignIn,
// } from "@farcaster/auth-kit";
import FarcasterLogin from "./farcaster-login";
import { useViewProfile } from "@coinbase/onchainkit/minikit";

export default function TopNavigation() {
  // const { address } = useAccount();

  const { signIn, isLoading, isSignedIn, user } = useSignIn({
    autoSignIn: false,
  });

  // const { profile } = useProfile();
  const viewProfile = useViewProfile();
  const handleViewProfile = () => {
    viewProfile();
  };

  // const memoizedProfile = useMemo(
  //   () => ({
  //     username: profile.username,
  //     fid: profile.fid,
  //     bio: profile.bio,
  //     displayName: profile.displayName,
  //     pfpUrl: profile.pfpUrl,
  //   }),
  //   [profile],
  // );

  // const [setTestResult] = useState<string>("");

  // const testAuth = useCallback(async () => {
  //   try {
  //     const res = await fetch("/api/test", {
  //       credentials: "include",
  //     });
  //     const data = await res.json();

  //     if (!res.ok) {
  //       setTestResult(`Auth test failed: ${data.error}`);
  //       return;
  //     }

  //     setTestResult(`Auth test succeeded! Server response: ${data.message}`);
  //   } catch (error) {
  //     setTestResult(
  //       "Auth test failed: " +
  //         (error instanceof Error ? error.message : "Unknown error"),
  //     );
  //   }
  // }, []);

  // const onrampBuyUrl = useMemo(() => {
  //   if (!address) return "";
  //   return getOnrampBuyUrl({
  //     projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID as string,
  //     addresses: { [address]: ["base"] },
  //     assets: ["USDC"],
  //     presetFiatAmount: 20,
  //     fiatCurrency: "USD",
  //   });
  // }, [address]);

  const handleSignIn = useCallback(() => {
    signIn();
  }, [signIn]);

  return (
    <nav className="fixed top-0 left-0 max-w-md mx-auto right-0 bg-white border-b border-gray-200 px-4 z-10">
      <div className="flex justify-between items-center h-12">
        {!isSignedIn ? (
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="bg-primary text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 "
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        ) : (
          <div className="space-y-4">
            {user && (
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src={user.pfp_url}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                  width={24}
                  height={24}
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
          type="button"
          onClick={handleViewProfile}
          className="cursor-pointer bg-transparent font-semibold text-sm pl-2"
        >
          PROFILE
        </button>
        <FarcasterLogin />

        {/* <Wallet>
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
        </Wallet> */}
      </div>
    </nav>
  );
}
