"use client";

import { useState } from "react";
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
import { ProgressTracker } from "@/components/progress-tracker";
import { SurveyIntro } from "@/components/survey-intro";
import { SurveyTemplateSelector } from "@/components/survey-template-selector";
import { Separator } from "@/components/ui/separator";

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

const steps: { id: Step; label: string }[] = [
  { id: "intro", label: "Welcome" },
  { id: "questions", label: "Survey" },
  { id: "audience", label: "Audience" },
  { id: "fund", label: "Settings" },
  { id: "overview", label: "Overview" },
];

export default function Create() {
  const [currentStep, setCurrentStep] = useState<Step>("intro");
  const [questions, setQuestions] = useState<SurveyQuestionType[]>([]);
  const [audienceTarget, setAudienceTarget] = useState<AudienceTarget>({
    rules: [],
  });
  const [funding, setFunding] = useState<SurveyFundingType>({
    maxResponses: 0,
    rewardAmount: 0,
    tokenAddress: "",
    tokenSymbol: "",
    endDate: new Date(),
  });
  const [isExecuting, setIsExecuting] = useState(false);
  const [showSurveyQuestion, setShowSurveyQuestion] = useState(true);
  const handleIntroNext = () => {
    setCurrentStep("questions");
  };

  const handleQuestionNext = (question: SurveyQuestionType) => {
    setQuestions([...questions, question]);
    setShowSurveyQuestion(false);
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

  const handleBack = () => {
    if (currentStep === "audience") {
      setCurrentStep("questions");
    } else if (currentStep === "fund") {
      setCurrentStep("audience");
    } else if (currentStep === "overview") {
      setCurrentStep("fund");
    } else if (currentStep === "questions") {
      setCurrentStep("intro");
    }
  };

  const updateAudienceTarget = (newTarget: AudienceTarget) => {
    setAudienceTarget(newTarget);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    if (questions.filter((_, i) => i !== index).length === 0) {
      setShowSurveyQuestion(true);
    }
  };

  const handleUpdateQuestion = (
    index: number,
    updatedQuestion: SurveyQuestionType,
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
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

  const handleReset = () => {
    setQuestions([]);
    setShowSurveyQuestion(true);
  };

  return (
    <div className="flex flex-col min-h-dvh font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div className="w-full max-w-md mx-auto px-4 py-3 mt-[48px] mb-[64px]">
        <header className="flex justify-between items-center mb-3">
          <div>
            {currentStep !== "intro" && (
              <Button size="sm" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div>
            {currentStep === "questions" && questions.length > 0 && (
              <Button
                className="text-muted-foreground px-2 text-xs"
                size="sm"
                variant="ghost"
                onClick={handleReset}
              >
                Reset form
              </Button>
            )}
          </div>
        </header>

        {currentStep !== "intro" && (
          <ProgressTracker currentStep={currentStep} steps={steps} />
        )}

        <main className="flex-1">
          {currentStep === "intro" && <SurveyIntro onNext={handleIntroNext} />}
          {currentStep === "questions" && (
            <div className="space-y-4">
              {questions.length > 0 && (
                <QuestionOverview
                  questions={questions}
                  onDeleteQuestion={handleDeleteQuestion}
                  onUpdateQuestion={handleUpdateQuestion}
                  onComplete={handleQuestionsComplete}
                />
              )}
              {showSurveyQuestion ? (
                <SurveyQuestion onNext={handleQuestionNext} />
              ) : (
                <Button
                  className="w-full text-foreground"
                  onClick={() => setShowSurveyQuestion(true)}
                  variant="outline"
                >
                  Add question
                </Button>
              )}
              {questions.length > 0 && (
                <Button
                  className="w-full "
                  onClick={handleQuestionsComplete}
                  disabled={questions.length === 0}
                >
                  Continue to Targeting
                </Button>
              )}
              {questions.length === 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="text-sm text-center text-muted-foreground font-medium">
                    Or start with a template
                  </div>
                  <SurveyTemplateSelector
                    onSelect={(templateQuestions) => {
                      setQuestions(templateQuestions);
                      setShowSurveyQuestion(false);
                    }}
                  />
                </>
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
