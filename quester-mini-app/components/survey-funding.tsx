import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokenChip } from "@coinbase/onchainkit/token";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import "@coinbase/onchainkit/styles.css";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokenOptions } from "@/app/mock-data/tokens";
export interface SurveyFunding {
  maxResponses: number;
  rewardAmount: number;
  tokenAddress: string;
  endDate: Date;
  tokenSymbol: string;
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

  const handleTokenChange = (value: string) => {
    onUpdate({
      ...funding,
      tokenAddress: value,
      tokenSymbol:
        tokenOptions.find((token) => token.address === value)?.symbol || "",
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    onUpdate({
      ...funding,
      endDate: date || new Date(),
    });
  };

  const isNextDisabled =
    !funding.maxResponses ||
    !funding.rewardAmount ||
    !funding.tokenAddress ||
    !funding.endDate;

  return (
    <div className="space-y-4 text-foreground">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Select amount to distribute
          </label>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              value={funding.rewardAmount || ""}
              onChange={handleRewardAmountChange}
              step={0.01}
              placeholder="Enter reward amount"
              className="text-xs"
            />
            <Select
              value={funding.tokenAddress}
              onValueChange={handleTokenChange}
            >
              <SelectTrigger className="w-[180px]  text-xs">
                <SelectValue
                  placeholder="Select token"
                  className="text-xs text-foreground"
                />
              </SelectTrigger>
              <SelectContent>
                {tokenOptions.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.address}
                    className="text-white text-xs"
                  >
                    <TokenChip
                      token={token}
                      className="text-foreground bg-white shadow-none"
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Maximum Number of Responses
          </label>
          <Input
            type="number"
            value={funding.maxResponses || ""}
            onChange={handleMaxResponsesChange}
            min={1}
            placeholder="Enter maximum number of responses"
            className="text-xs"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Survey End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal text-xs",
                !funding.endDate && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {funding.endDate ? (
                funding.endDate.toLocaleDateString()
              ) : (
                <span>Select end date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={funding.endDate}
              onSelect={handleDateChange}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground">
          The survey will automatically close on this date.
        </p>
      </div>

      <Button className="w-full" onClick={onNext} disabled={isNextDisabled}>
        Continue to Overview
      </Button>
    </div>
  );
}
