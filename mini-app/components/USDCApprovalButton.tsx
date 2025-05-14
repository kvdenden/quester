"use client";

import { Button } from "@/components/ui/button";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useConnect,
} from "wagmi";
import { erc20Abi } from "viem";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { base } from "wagmi/chains";

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;

export function USDCApprovalButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { address, chain, connector, addresses, isConnected, status } =
    useAccount();
  const { data: session } = useSession();
  const { connect, connectors } = useConnect();

  console.log("address", address);

  // Debug logging
  useEffect(() => {
    console.log("Account Status:", {
      status,
      isConnected,
      address,
      chain,
      connector,
      addresses,
    });
    console.log("Session:", session);
    console.log("Connectors:", connectors);
  }, [
    status,
    isConnected,
    address,
    chain,
    connector,
    addresses,
    session,
    connectors,
  ]);

  // Connect to wallet when session is available
  useEffect(() => {
    const connectWallet = async () => {
      if (!session?.user?.primaryWallet) {
        console.log("No primary wallet in session");
        return;
      }

      if (!connectors[0]) {
        console.log("No connector available");
        return;
      }

      if (isConnected) {
        console.log("Already connected");
        return;
      }

      console.log("Attempting to connect...");
      try {
        // Force connect with the primary wallet
        const result = await connect({
          connector: connectors[0],
          chainId: base.id,
        });
        console.log("Connection result:", result);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    };

    connectWallet();
  }, [session, isConnected, connect, connectors]);

  // Use the primary wallet from the session if available
  const walletAddress = (session?.user?.primaryWallet ||
    address) as `0x${string}`;

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isTransactionLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const handleApprove = async () => {
    if (!walletAddress) return;

    try {
      setIsLoading(true);
      // 10 USDC with 6 decimals
      const amount = BigInt(10 * 10 ** USDC_DECIMALS);

      await writeContract({
        address: USDC_ADDRESS as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [walletAddress, amount],
      });
    } catch (error) {
      console.error("Error approving USDC:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user?.primaryWallet) {
    return (
      <Button disabled size="sm" variant="outline" className="w-full">
        No wallet connected
      </Button>
    );
  }

  if (status === "connecting") {
    return (
      <Button disabled size="sm" variant="outline" className="w-full">
        Connecting...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleApprove}
      disabled={isLoading || isTransactionLoading || !isConnected}
      size="sm"
      variant="outline"
      className="w-full"
    >
      {isLoading || isTransactionLoading ? "Approving..." : "Approve 10 USDC"}
    </Button>
  );
}
