import { fetchUser } from "./neynar";

export interface Wallet {
  address: string;
  isCustody: boolean;
}

export const getPrimaryWallet = async (fid: string): Promise<Wallet | null> => {
  try {
    const user = await fetchUser(fid);

    // Get the primary wallet directly from verified_addresses
    const primaryWallet = {
      address: user.verified_addresses.primary.eth_address,
      isCustody: false,
    };

    return primaryWallet;
  } catch (error) {
    console.error("Error getting primary wallet:", error);
    return null;
  }
};

export const getAllWallets = async (fid: string): Promise<Wallet[]> => {
  try {
    const user = await fetchUser(fid);

    // Get all verifications (non-custody wallets)
    const verifications = user.verifications.map((address) => ({
      address,
      isCustody: false,
    }));

    // Add custody wallet
    const custodyWallet = {
      address: user.custody_address,
      isCustody: true,
    };

    // Return all wallets
    return [...verifications, custodyWallet];
  } catch (error) {
    console.error("Error getting all wallets:", error);
    return [];
  }
};
