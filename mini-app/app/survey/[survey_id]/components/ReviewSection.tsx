import React from "react";

interface Question {
  question: string;
  answerType: "text" | "multiple-choice" | "single-choice";
}

interface ReviewSectionProps {
  questions: Question[];
  answers: Record<number, unknown>;
  validationWarnings: Record<number, string>;
}

export function ReviewSection({
  questions,
  answers,
  validationWarnings,
}: ReviewSectionProps) {
  return (
    <div className="space-y-6 flex-grow">
      <h2 className="text-lg font-semibold text-foreground">
        Review Your Answers
      </h2>
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2 text-foreground">
            <h3 className="text-sm font-medium">{question.question}</h3>
            <div className="text-sm font-thin text-foreground">
              {question.answerType === "text" ? (
                <p className="whitespace-pre-wrap break-words">
                  {answers[index] as string}
                </p>
              ) : question.answerType === "multiple-choice" ? (
                <ul className="list-disc list-inside">
                  {(answers[index] as string[]).map((option: string) => (
                    <li key={option} className="break-words">
                      {option}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="break-words">{answers[index] as string}</p>
              )}
            </div>
            {validationWarnings[index] && (
              <p className="text-xs text-amber-500 mt-1">
                {validationWarnings[index]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
