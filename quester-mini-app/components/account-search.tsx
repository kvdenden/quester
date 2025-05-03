import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface FarcasterAccount {
  id: string;
  username: string;
  displayName: string;
  followers: number;
  following_count: number;
  follower_count: number;
  avatar: string;
}

interface NeynarUser {
  fid: number;
  username: string;
  display_name: string;
  follower_count: number;
  following_count: number;
  pfp_url: string;
}

interface NeynarResponse {
  result: {
    users: NeynarUser[];
  };
}

interface AccountSearchProps {
  onSelectAccount: (account: FarcasterAccount) => void;
  selectedAccount: FarcasterAccount | null;
  onClearSelection: () => void;
}

export function AccountSearch({
  onSelectAccount,
  selectedAccount,
  onClearSelection,
}: AccountSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FarcasterAccount[]>([]);
  const [selectedAccountData, setSelectedAccountData] =
    useState<NeynarUser | null>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://api.neynar.com/v2/farcaster/user/search?q=${searchQuery}&limit=10`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "",
            },
          },
        );

        const data = (await response.json()) as NeynarResponse;
        if (data.result?.users) {
          const users = data.result.users.map((user: NeynarUser) => ({
            id: user.fid.toString(),
            username: user.username,
            displayName: user.display_name,
            followers: user.follower_count,
            following_count: user.following_count,
            follower_count: user.follower_count,
            avatar: user.pfp_url,
          }));

          console.log("data", data);
          setSearchResults(users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setSearchResults([]);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSelectAccount = async (account: FarcasterAccount) => {
    onSelectAccount(account);
    setSearchQuery("");
    setSearchResults([]);

    try {
      const response = await fetch(`/api/user-data?fid=${account.id}`);
      const data = await response.json();

      if (data.users?.[0]) {
        setSelectedAccountData(data.users[0]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">
        1. Search for a Farcaster account
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by username or display name..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <Card className="overflow-hidden mt-1">
          <div className="max-h-[200px] overflow-y-auto">
            {searchResults.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer"
                onClick={() => handleSelectAccount(account)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={account.avatar || "/placeholder.svg"}
                      alt={account.displayName}
                    />
                    <AvatarFallback>
                      {account.username.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{account.displayName}</div>
                    <div className="text-sm text-muted-foreground">
                      @{account.username}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedAccount && (
        <div className="flex items-center gap-2 p-2 border rounded-md">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={selectedAccount.avatar || "/placeholder.svg"}
              alt={selectedAccount.displayName}
            />
            <AvatarFallback>
              {selectedAccount.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{selectedAccount.displayName}</div>
            <div className="text-sm text-muted-foreground">
              @{selectedAccount.username}
            </div>
            {selectedAccountData && (
              <div className="text-xs text-muted-foreground">
                {selectedAccountData.follower_count.toLocaleString()} followers
                • {selectedAccountData.following_count.toLocaleString()}{" "}
                following
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={onClearSelection}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
