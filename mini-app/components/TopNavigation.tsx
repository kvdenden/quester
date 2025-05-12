"use client";

import { useSignIn } from "@/app/hooks/useSignIn";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// import { useViewProfile } from "@coinbase/onchainkit/minikit";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut,
  getCsrfToken,
} from "next-auth/react";
import { useCallback, useState } from "react";
import { StatusAPIResponse } from "@farcaster/auth-kit";
import { SignInButton } from "@farcaster/auth-kit";

export default function TopNavigation() {
  const { signIn, isLoading, isSignedIn, user } = useSignIn({
    autoSignIn: false,
  });

  // const viewProfile = useViewProfile();
  // const handleViewProfile = () => {
  //   viewProfile();
  // };
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

  function Content() {
    const [error, setError] = useState(false);

    const getNonce = useCallback(async () => {
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error("Unable to generate nonce");
      return nonce;
    }, []);

    const handleSuccess = useCallback((res: StatusAPIResponse) => {
      console.log("res", res);
      nextAuthSignIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        redirect: false,
      });
    }, []);

    return (
      <div>
        <div style={{ position: "fixed", top: "12px", right: "12px" }}>
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
          />
          {error && <div>Unable to sign in at this time.</div>}
        </div>

        <Profile />
      </div>
    );
  }

  function Profile() {
    const { data: session } = useSession();
    return session ? (
      <div style={{ fontFamily: "sans-serif" }}>
        <p>Signed in as {session.user?.name}</p>
      </div>
    ) : (
      <p>
        Click the &quot;Sign in with Farcaster&quote; button above, then scan
        the QR code to sign in.
      </p>
    );
  }

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

        <Content />

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
