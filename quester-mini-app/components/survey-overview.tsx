import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SurveyQuestion } from "@/components/survey-question";
import { AudienceTarget } from "@/components/audience-targeting";
import { SurveyFunding } from "@/components/survey-funding";
import { Loader2 } from "lucide-react";

interface SurveyOverviewProps {
  questions: SurveyQuestion[];
  audienceTarget: AudienceTarget;
  funding: SurveyFunding;
  onExecute: () => void;
  isExecuting: boolean;
}

export function SurveyOverview({
  questions,
  audienceTarget,
  funding,
  onExecute,
  isExecuting,
}: SurveyOverviewProps) {
  const totalFunding = funding.maxResponses * funding.rewardAmount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Survey Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Questions</h3>
            {questions.map((question, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="font-medium">Question {index + 1}</div>
                <div className="mt-1">{question.question}</div>
                {question.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {question.description}
                  </div>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  Type: {question.answerType}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Target Audience</h3>
            <div className="p-4 border rounded-lg">
              <div className="font-medium">Targeting Rules</div>
              {audienceTarget.rules.map((rule, index) => (
                <div key={index} className="mt-2 text-sm">
                  {rule.inclusion === "include" ? "Include" : "Exclude"} users
                  who{" "}
                  {rule.relationship === "follows"
                    ? "are followed by"
                    : "follow"}{" "}
                  @{rule.account.username}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Funding Details</h3>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Maximum Responses:</span>
                <span className="font-medium">{funding.maxResponses}</span>
              </div>
              <div className="flex justify-between">
                <span>Reward per Response:</span>
                <span className="font-medium">
                  {funding.rewardAmount} {funding.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Funding Required:</span>
                <span className="font-medium">
                  {totalFunding} {funding.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Contract Status:</span>
                <span className="font-medium">
                  {funding.contractFunded ? "Funded" : "Not Funded"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={onExecute} disabled={isExecuting}>
        {isExecuting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Executing Survey...
          </>
        ) : (
          "Execute Survey"
        )}
      </Button>
    </div>
  );
}
