import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { SurveyQuestion as SurveyQuestionType } from "@/components/survey-question";
import { Badge } from "@/components/ui/badge";

export interface QuestionOverviewProps {
  questions: SurveyQuestionType[];
  onDeleteQuestion: (index: number) => void;
  onComplete: () => void;
}

export function QuestionOverview({
  questions,
  onDeleteQuestion,
  onComplete,
}: QuestionOverviewProps) {
  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return "Multi";
      case "single-choice":
        return "Single";
      case "text":
        return "Text";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-bold text-foreground break-words">
                {question.question}
              </div>
              {question.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {question.description}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteQuestion(index)}
            >
              <Trash2 className="text-muted-foreground" />
            </Button>
          </div>
          <div className="flex gap-2 items-start mt-4">
            {question.answerType === "text" && (
              <div className="w-full">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  # characters
                </div>
                <Badge className="text-xs" variant="secondary">
                  min {question.minChars} - max {question.maxChars}
                </Badge>
              </div>
            )}
            {question.options && question.options.length > 0 && (
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Answer options
                </div>
                <div className="flex flex-wrap gap-1">
                  {question.options.map((option, optionIndex) => (
                    <Badge variant="secondary" key={optionIndex}>
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                Type
              </div>
              <Badge variant="outline" className="text-xs">
                {getQuestionTypeLabel(question.answerType)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
