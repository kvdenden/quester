"use client";

import { Button } from "@/components/ui/button";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut,
  getCsrfToken,
} from "next-auth/react";
import { useCallback, useState } from "react";
import { StatusAPIResponse } from "@farcaster/auth-kit";
import { SignInButton } from "@farcaster/auth-kit";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSheet() {
  const { data: session } = useSession();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const testMeEndpoint = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/me");
      const data = await response.json();
      alert(JSON.stringify(data, null, 2));
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>Error</div>;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ""} alt="Profile" />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {!session ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Sign in to access your profile
              </p>
              <SignInButton
                nonce={getNonce}
                onSuccess={handleSuccess}
                onError={() => setError(true)}
                onSignOut={() => signOut()}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session.user.image || ""} alt="Profile" />
                <AvatarFallback>
                  {session.user.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  @{session.user.name}
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signOut()}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          )}
          <Button
            onClick={testMeEndpoint}
            size="sm"
            variant="outline"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Loading..." : "Test /api/me"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
