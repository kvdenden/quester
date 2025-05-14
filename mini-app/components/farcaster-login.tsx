import { SignInButton, type StatusAPIResponse } from "@farcaster/auth-kit";
import { useCallback } from "react";

export default function FarcasterLogin() {
  const handleSuccess = useCallback((res: StatusAPIResponse) => {
    if (res.fid && res.username) {
      console.log(`Hello, ${res.username}! Your fid is ${res.fid}.`);
    }
  }, []);

  return <SignInButton onSuccess={handleSuccess} />;
}
