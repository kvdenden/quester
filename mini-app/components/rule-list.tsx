import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Users, UserMinus } from "lucide-react";
import { AudienceRule } from "./rule-form";
import { TargetingTips } from "./targeting-tips";

interface RuleListProps {
  rules: AudienceRule[];
  onRemoveRule: (ruleId: string) => void;
  estimatedAudience: {
    total: number;
    included: number;
    excluded: number;
  };
}

export function RuleList({
  rules,
  onRemoveRule,
  estimatedAudience,
}: RuleListProps) {
  const getRelationshipDescription = (rule: AudienceRule) => {
    if (rule.relationship === "follows") {
      return `are followed by @${rule.account.username} (accounts they follow)`;
    } else {
      return `follow @${rule.account.username} (their followers)`;
    }
  };

  const getInclusionLabel = (inclusion: string) => {
    return inclusion === "include" ? "Include" : "Exclude";
  };

  const getInclusionIcon = (inclusion: string) => {
    return inclusion === "include" ? (
      <Users className="h-4 w-4" />
    ) : (
      <UserMinus className="h-4 w-4" />
    );
  };

  return (
    <Card className="px-0">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="pb-2 text-sm text-muted-foreground">
            Estimated audience size
            <TargetingTips />
          </div>
          <div className="text-3xl font-bold">
            {estimatedAudience.total.toLocaleString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            No rules created yet. Create your first rule above.
          </div>
        ) : (
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1 rounded-full ${
                      rule.inclusion === "include"
                        ? "bg-blue-100"
                        : "bg-red-100"
                    }`}
                  >
                    {getInclusionIcon(rule.inclusion)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">
                      {getInclusionLabel(rule.inclusion)}
                    </span>{" "}
                    users who{" "}
                    <span className="font-medium">
                      {getRelationshipDescription(rule)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveRule(rule.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
