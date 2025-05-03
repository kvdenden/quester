import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export interface SurveyFunding {
  maxResponses: number;
  rewardAmount: number;
  currency: string;
  contractApproved: boolean;
  contractFunded: boolean;
}

interface SurveyFundingProps {
  onNext: () => void;
  onUpdate: (funding: SurveyFunding) => void;
  funding: SurveyFunding;
}

export function SurveyFunding({
  onNext,
  onUpdate,
  funding,
}: SurveyFundingProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isFunding, setIsFunding] = useState(false);

  const handleMaxResponsesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...funding,
      maxResponses: parseInt(e.target.value) || 0,
    });
  };

  const handleRewardAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...funding,
      rewardAmount: parseFloat(e.target.value) || 0,
    });
  };

  const handleCurrencyChange = (value: string) => {
    onUpdate({
      ...funding,
      currency: value,
      contractApproved: false,
      contractFunded: false,
    });
  };

  const handleApproveContract = async () => {
    setIsApproving(true);
    try {
      // TODO: Implement contract approval logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      onUpdate({
        ...funding,
        contractApproved: true,
      });
    } catch (error) {
      console.error("Error approving contract:", error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleFundContract = async () => {
    setIsFunding(true);
    try {
      // TODO: Implement contract funding logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      onUpdate({
        ...funding,
        contractFunded: true,
      });
    } catch (error) {
      console.error("Error funding contract:", error);
    } finally {
      setIsFunding(false);
    }
  };

  const isNextDisabled = !funding.contractFunded || !funding.contractApproved;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Survey Funding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Maximum Number of Responses
            </label>
            <Input
              type="number"
              value={funding.maxResponses}
              onChange={handleMaxResponsesChange}
              min={1}
              placeholder="Enter maximum number of responses"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Reward Amount per Response
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={funding.rewardAmount}
                onChange={handleRewardAmountChange}
                min={0}
                step={0.01}
                placeholder="Enter reward amount"
              />
              <Select
                value={funding.currency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium">Contract Actions</div>
            <div className="space-y-2">
              <Button
                className="w-full"
                onClick={handleApproveContract}
                disabled={funding.contractApproved || !funding.currency}
              >
                {isApproving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Approving...
                  </>
                ) : funding.contractApproved ? (
                  "Contract Approved"
                ) : (
                  "Approve Contract"
                )}
              </Button>

              <Button
                className="w-full"
                onClick={handleFundContract}
                disabled={!funding.contractApproved || funding.contractFunded}
              >
                {isFunding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Funding...
                  </>
                ) : funding.contractFunded ? (
                  "Contract Funded"
                ) : (
                  "Fund Contract"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={onNext} disabled={isNextDisabled}>
        Continue to Overview
      </Button>
    </div>
  );
}
