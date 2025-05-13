"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut,
  getCsrfToken,
} from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { StatusAPIResponse } from "@farcaster/auth-kit";
import { SignInButton } from "@farcaster/auth-kit";

export default function TopNavigation() {
  const { data: session } = useSession();
  const [userInformation, setUserInformation] = useState<unknown>(null);
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

  const fetchUserInformation = async (fid: string) => {
    try {
      const response = await fetch(`/api/user-data?fid=${fid}`);
      const data = await response.json();

      if (data.users?.[0]) {
        setUserInformation(data.users[0]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserInformation(session.user.id);
    }
  }, [session]);

  console.log("userInformation fetched", userInformation);

  if (error) return <div>Error</div>;

  return (
    <nav className="fixed top-0 left-0 max-w-md mx-auto right-0 bg-white border-b border-gray-200 px-4 z-10">
      <div className="flex justify-between items-center h-12">
        {!session ? (
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
          />
        ) : (
          <div className="flex justify-end items-center space-x-2 w-full">
            <Image
              src={session?.user?.image || ""}
              alt="Profile"
              className="w-[36px] h-[36px] rounded-full"
              width={24}
              height={24}
            />
            <div className="text-center">
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="text-sm text-muted-foreground">
                @{session?.user?.name}
              </p>
              <Button size="sm" variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* <Content /> */}
      </div>
    </nav>
  );
}
