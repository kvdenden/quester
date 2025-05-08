"use client";
import Link from "next/link";
import { Home } from "lucide-react";
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
export default function BottomNavigation() {
  const { address, isConnected } = useAccount();
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
        <Link href="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
        </Link>
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
