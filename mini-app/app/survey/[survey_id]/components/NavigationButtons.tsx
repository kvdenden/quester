import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isReviewing: boolean;
  hasValidationWarnings: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function NavigationButtons({
  currentQuestionIndex,
  totalQuestions,
  isReviewing,
  hasValidationWarnings,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  return (
    <div className="flex w-full gap-2 pt-4 mt-auto">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestionIndex === 0 && !isReviewing}
        className="flex items-center w-full text-muted-foreground"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      {isReviewing ? (
        <Button
          onClick={onSubmit}
          disabled={hasValidationWarnings}
          className="flex w-full items-center"
        >
          Submit Survey
        </Button>
      ) : (
        <Button onClick={onNext} className="flex w-full items-center">
          {currentQuestionIndex === totalQuestions - 1 ? "Review" : "Next"}
          {currentQuestionIndex < totalQuestions - 1 && (
            <ChevronRight className="w-4 h-4 ml-1" />
          )}
        </Button>
      )}
    </div>
  );
}
