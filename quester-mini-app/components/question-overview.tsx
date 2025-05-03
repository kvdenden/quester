import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SurveyQuestion as SurveyQuestionType } from "@/components/survey-question";

interface QuestionOverviewProps {
  questions: SurveyQuestionType[];
  onDeleteQuestion: (index: number) => void;
  onComplete: () => void;
}

export function QuestionOverview({
  questions,
  onDeleteQuestion,
  onComplete,
}: QuestionOverviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-muted-foreground">
        Survey Questions
      </h2>
      {questions.map((question, index) => (
        <div key={index} className="p-4 border rounded-lg relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDeleteQuestion(index)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          <div className="font-medium text-muted-foreground">
            Question {index + 1}
          </div>
          <div className="mt-1 text-muted-foreground">{question.question}</div>
          {question.description && (
            <div className="text-sm text-muted-foreground mt-1">
              {question.description}
            </div>
          )}
          <div className="text-sm text-muted-foreground mt-1">
            Type: {question.answerType}
          </div>
          {question.answerType === "text" && (
            <div className="text-sm text-muted-foreground">
              Character limits: {question.minChars} - {question.maxChars}
            </div>
          )}
          {question.options && question.options.length > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              Options: {question.options.join(", ")}
            </div>
          )}
        </div>
      ))}
      <Button
        className="w-full"
        onClick={onComplete}
        disabled={questions.length === 0}
      >
        Continue to Audience Targeting
      </Button>
    </div>
  );
}
