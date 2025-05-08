import React from "react";

interface QuestionNavigationProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  isReviewing: boolean;
}

export function QuestionNavigation({
  currentQuestionIndex,
  totalQuestions,
  isReviewing,
}: QuestionNavigationProps) {
  return (
    <div className="flex justify-between items-center mb-2 text-muted-foreground">
      <span className="text-sm font-medium">
        {isReviewing
          ? "Review"
          : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
      </span>
      <div className="flex space-x-1">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-4 rounded ${
              isReviewing
                ? "bg-gray-300"
                : index === currentQuestionIndex
                  ? "bg-gray-300"
                  : index < currentQuestionIndex
                    ? "bg-gray-800"
                    : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
