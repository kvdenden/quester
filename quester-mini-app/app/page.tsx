"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  AudienceTargeting,
  type AudienceTarget,
} from "@/components/audience-targeting";
import {
  SurveyQuestion,
  type SurveyQuestion as SurveyQuestionType,
} from "@/components/survey-question";
import {
  SurveyFunding,
  type SurveyFunding as SurveyFundingType,
} from "@/components/survey-funding";
import { SurveyOverview } from "@/components/survey-overview";
import { QuestionOverview } from "@/components/question-overview";
import { type AudienceRule } from "@/components/rule-form";
import { Check } from "lucide-react";

type Step = "questions" | "audience" | "fund" | "overview";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  const [currentStep, setCurrentStep] = useState<Step>("questions");
  const [questions, setQuestions] = useState<SurveyQuestionType[]>([]);
  const [audienceTarget, setAudienceTarget] = useState<AudienceTarget>({
    rules: [],
  });
  const [funding, setFunding] = useState<SurveyFundingType>({
    maxResponses: 0,
    rewardAmount: 0,
    currency: "",
    contractApproved: false,
    contractFunded: false,
  });
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  };

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Check className="text-[#0052FF]" size={16} />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  };

  const handleQuestionNext = (question: SurveyQuestionType) => {
    setQuestions([...questions, question]);
  };

  const handleQuestionsComplete = () => {
    setCurrentStep("audience");
  };

  const handleAudienceNext = () => {
    setCurrentStep("fund");
  };

  const handleFundingNext = () => {
    setCurrentStep("overview");
  };

  const handleExecuteSurvey = async () => {
    setIsExecuting(true);
    try {
      // TODO: Implement survey execution logic
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      // Handle successful execution
    } catch (error) {
      console.error("Error executing survey:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleBack = () => {
    if (currentStep === "audience") {
      setCurrentStep("questions");
    } else if (currentStep === "fund") {
      setCurrentStep("audience");
    } else if (currentStep === "overview") {
      setCurrentStep("fund");
    }
  };

  const updateAudienceTarget = (newTarget: AudienceTarget) => {
    setAudienceTarget(newTarget);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-3">
          <div>
            {currentStep !== "questions" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-[var(--app-accent)] p-4"
              >
                Back
              </Button>
            )}
          </div>
          <div>{saveFrameButton()}</div>
        </header>

        <main className="flex-1">
          {currentStep === "questions" && (
            <div className="space-y-6">
              <SurveyQuestion onNext={handleQuestionNext} />
              {questions.length > 0 && (
                <QuestionOverview
                  questions={questions}
                  onDeleteQuestion={handleDeleteQuestion}
                  onComplete={handleQuestionsComplete}
                />
              )}
            </div>
          )}
          {currentStep === "audience" && (
            <AudienceTargeting
              audienceTarget={audienceTarget}
              onUpdate={updateAudienceTarget}
              onNext={handleAudienceNext}
            />
          )}
          {currentStep === "fund" && (
            <SurveyFunding
              funding={funding}
              onUpdate={setFunding}
              onNext={handleFundingNext}
            />
          )}
          {currentStep === "overview" && (
            <SurveyOverview
              questions={questions}
              audienceTarget={audienceTarget}
              funding={funding}
              onExecute={handleExecuteSurvey}
              isExecuting={isExecuting}
            />
          )}
        </main>
      </div>
    </div>
  );
}
