import { getPrimaryWallet as getPrimaryWalletFromManager } from "./wallet-manager";
import { SignInOptions } from "next-auth/react";

// interface Wallet {
//   address: string;
//   isCustody: boolean;
// }

export const getPrimaryWallet = async () => {
  try {
    // Get the current user's FID from the session or context
    const fid = "YOUR_FID"; // You'll need to pass this from where this function is called
    const primaryWallet = await getPrimaryWalletFromManager(fid);

    if (!primaryWallet) {
      throw new Error("No primary wallet found");
    }

    return primaryWallet;
  } catch (error) {
    console.error("Error getting primary wallet:", error);
    throw error;
  }
};

// Note: This function should be used within a React component that has access to the useAuthenticate hook
export const signMessageWithPrimaryWallet = async (
  message: string,
  signIn: (
    options: SignInOptions,
  ) => Promise<{ error?: string; ok?: boolean; status?: number }>,
) => {
  try {
    const result = await signIn({
      message,
      nonce: Math.random().toString(36).substring(2),
      notBefore: new Date().toISOString(),
      expirationTime: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(), // 30 days
    });

    if (!result?.ok) {
      throw new Error("Sign in failed");
    }

    return result;
  } catch (error) {
    console.error("Error signing message with primary wallet:", error);
    throw error;
  }
};
