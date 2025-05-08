"use client";

import { useState, useEffect } from "react";
import {
  CheckSquare,
  Coins,
  List,
  User,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_SURVEYS, Survey as SurveyType } from "../mock-data/surveys";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
// Types
export type SurveyQuestionType = {
  question: string;
  description: string;
  answerType: "text" | "multiple-choice" | "single-choice";
  minChars?: number;
  maxChars?: number;
  options?: string[];
};

export default function SurveyFeed() {
  const [showOnlyEligible, setShowOnlyEligible] = useState(true);
  const [filteredSurveys, setFilteredSurveys] =
    useState<SurveyType[]>(MOCK_SURVEYS);
  const { address } = useAccount();

  useEffect(() => {
    setFilteredSurveys(
      MOCK_SURVEYS.filter((survey) => !showOnlyEligible || survey.eligible),
    );
  }, [showOnlyEligible]);

  // Height calculations accounting for header (80px) and footer (64px)
  const containerHeight = "calc(100dvh - 144px)"; // 80px header + 64px footer

  return (
    <div className="flex flex-col w-full max-w-md mx-auto relative">
      <div className="sticky top-[48px] z-10 bg-background p-4 border-b h-[32px] flex items-center bg-transparent mt-1">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="show-eligible"
            checked={showOnlyEligible}
            onCheckedChange={(checked: boolean) => setShowOnlyEligible(checked)}
          />
          <Label
            htmlFor="show-eligible"
            className="text-sm text-muted-foreground"
          >
            Only show eligible
          </Label>
        </div>
      </div>
      <div
        className={`snap-y snap-mandatory h-[${containerHeight}] overflow-y-auto`}
        style={{ height: containerHeight }}
      >
        {filteredSurveys.map((survey) => (
          <div
            key={survey.id}
            className={`snap-start h-[${containerHeight}] py-4 px-4`}
            style={{ height: containerHeight }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 border-b">
                  <h3 className="font-bold text-lg mb-1">{survey.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {survey.id}
                  </p>

                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">
                        {survey.rewards} USDC
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {survey.currentResponses} / {survey.maxResponses}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">
                        {survey.questions.length} questions
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{survey.creator}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-hidden p-4 relative">
                  <h4 className="font-medium text-sm mb-3">
                    Questions Preview:
                  </h4>
                  <div className={`space-y-4 overflow-y-hidden relative`}>
                    {survey.questions.map((question, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-start gap-2 mb-2">
                          {question.answerType === "text" ? (
                            <MessageSquare className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                          ) : question.answerType === "multiple-choice" ? (
                            <CheckSquare className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                          )}
                          <p className="text-sm font-medium">
                            {question.question}
                          </p>
                        </div>

                        <div className="ml-6">
                          <Badge variant="outline" className="mb-2">
                            {question.answerType === "text"
                              ? "Text Response"
                              : question.answerType === "multiple-choice"
                                ? "Multiple Choice"
                                : "Single Choice"}
                          </Badge>

                          {question.answerType === "text" && (
                            <p className="text-xs text-muted-foreground">
                              {question.minChars}-{question.maxChars} characters
                            </p>
                          )}

                          {(question.answerType === "multiple-choice" ||
                            question.answerType === "single-choice") && (
                            <div className="mt-2 space-y-1">
                              {question.options
                                ?.slice(0, 3)
                                .map((option, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-3 h-3 rounded-full bg-gray-200 flex-shrink-0"></div>
                                    <p className="text-xs truncate">{option}</p>
                                  </div>
                                ))}
                              {(question.options?.length || 0) > 3 && (
                                <p className="text-xs text-muted-foreground">
                                  +{(question.options?.length || 0) - 3} more
                                  options
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 opacity-100 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                </div>

                {/* CTA Button for eligible surveys */}
                <div className="p-4 border-t">
                  {!address ? (
                    <ConnectWallet
                      className="w-full bg-primary text-white active:bg-primary hover:bg-primary"
                      disconnectedLabel="Log in"
                    />
                  ) : survey.eligible ? (
                    <Link href={`/survey/${survey.id}`}>
                      <Button className="w-full" size="lg">
                        Start Survey
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      Not Eligible
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {filteredSurveys.length === 0 && (
          <div
            className={`text-center py-12 h-[${containerHeight}] flex items-center justify-center`}
            style={{ height: containerHeight }}
          >
            <p className="text-muted-foreground">No surveys available</p>
          </div>
        )}
      </div>
    </div>
  );
}
