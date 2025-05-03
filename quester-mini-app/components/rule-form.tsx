import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { FarcasterAccount } from "./account-search";

export interface AudienceRule {
  id: string;
  account: FarcasterAccount;
  relationship: "follows" | "followed_by";
  inclusion: "include" | "exclude";
}

interface RuleFormProps {
  selectedAccount: FarcasterAccount | null;
  onAddRule: (rule: Omit<AudienceRule, "id">) => void;
}

export function RuleForm({ selectedAccount, onAddRule }: RuleFormProps) {
  const [relationship, setRelationship] = useState<"follows" | "followed_by">(
    "followed_by",
  );
  const [inclusion, setInclusion] = useState<"include" | "exclude">("include");

  const handleAddRule = () => {
    if (!selectedAccount) return;

    onAddRule({
      account: selectedAccount,
      relationship,
      inclusion,
    });

    // Reset form
    setRelationship("followed_by");
    setInclusion("include");
  };

  if (!selectedAccount) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">2. Select relationship type</div>
        <Select
          value={relationship}
          onValueChange={(value) =>
            setRelationship(value as "follows" | "followed_by")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="followed_by">
              Their followers (people who follow them)
            </SelectItem>
            <SelectItem value="follows">Accounts they follow</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">3. Include or exclude?</div>
        <Select
          value={inclusion}
          onValueChange={(value) =>
            setInclusion(value as "include" | "exclude")
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="include">Include these users</SelectItem>
            <SelectItem value="exclude">Exclude these users</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleAddRule} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Rule
      </Button>
    </div>
  );
}
