"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AccountSearch, FarcasterAccount } from "./account-search";
import { RuleForm, AudienceRule } from "./rule-form";
import { RuleList } from "./rule-list";

export interface AudienceTarget {
  rules: AudienceRule[];
}

interface AudienceTargetingProps {
  audienceTarget: AudienceTarget;
  onUpdate: (target: AudienceTarget) => void;
  onNext: () => void;
}

export function AudienceTargeting({
  audienceTarget,
  onUpdate,
  onNext,
}: AudienceTargetingProps) {
  const [selectedAccount, setSelectedAccount] =
    useState<FarcasterAccount | null>(null);
  const [estimatedAudience, setEstimatedAudience] = useState({
    total: 0,
    included: 0,
    excluded: 0,
  });

  // Calculate estimated audience size
  useEffect(() => {
    const includeRules = audienceTarget.rules.filter(
      (rule) => rule.inclusion === "include",
    );
    const excludeRules = audienceTarget.rules.filter(
      (rule) => rule.inclusion === "exclude",
    );

    // Calculate audience based on relationship type and actual counts
    const includedFollowers = includeRules.reduce((sum, rule) => {
      const count =
        rule.relationship === "follows"
          ? rule.account.following_count || 0
          : rule.account.follower_count || 0;
      return sum + count;
    }, 0);

    const excludedFollowers = excludeRules.reduce((sum, rule) => {
      const count =
        rule.relationship === "follows"
          ? rule.account.following_count || 0
          : rule.account.follower_count || 0;
      return sum + count;
    }, 0);

    // Calculate overlap between included rules
    const includedOverlap =
      includeRules.length > 1
        ? includedFollowers * 0.2 // Assume 20% overlap between included audiences
        : 0;

    // Calculate overlap between excluded rules
    const excludedOverlap =
      excludeRules.length > 1
        ? excludedFollowers * 0.2 // Assume 20% overlap between excluded audiences
        : 0;

    // Calculate overlap between included and excluded
    const includeExcludeOverlap =
      includeRules.length && excludeRules.length
        ? Math.min(includedFollowers, excludedFollowers) * 0.1 // Assume 10% overlap between included and excluded
        : 0;

    // Final calculation
    const totalIncluded = includedFollowers - includedOverlap;
    const totalExcluded = excludedFollowers - excludedOverlap;
    const finalTotal = Math.max(
      0,
      totalIncluded - totalExcluded - includeExcludeOverlap,
    );

    setEstimatedAudience({
      included: Math.round(totalIncluded),
      excluded: Math.round(totalExcluded),
      total: Math.round(finalTotal),
    });
  }, [audienceTarget]);

  const handleAddRule = (rule: Omit<AudienceRule, "id">) => {
    const newRule: AudienceRule = {
      id: `rule-${Date.now()}`,
      ...rule,
    };

    onUpdate({
      ...audienceTarget,
      rules: [...audienceTarget.rules, newRule],
    });
  };

  const handleRemoveRule = (ruleId: string) => {
    onUpdate({
      ...audienceTarget,
      rules: audienceTarget.rules.filter((rule) => rule.id !== ruleId),
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-foreground ">
        <AccountSearch
          onSelectAccount={setSelectedAccount}
          selectedAccount={selectedAccount}
          onClearSelection={() => setSelectedAccount(null)}
        />
      </div>
      <div className="text-foreground ">
        <RuleForm selectedAccount={selectedAccount} onAddRule={handleAddRule} />
      </div>

      <RuleList
        rules={audienceTarget.rules}
        onRemoveRule={handleRemoveRule}
        estimatedAudience={estimatedAudience}
      />

      <Button className="w-full" onClick={onNext}>
        Next
      </Button>
    </div>
  );
}
