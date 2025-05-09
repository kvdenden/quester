import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { SurveyQuestion as SurveyQuestionType } from "@/components/survey-question";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { SurveyQuestion } from "@/components/survey-question";

export interface QuestionOverviewProps {
  questions: SurveyQuestionType[];
  onDeleteQuestion: (index: number) => void;
  onComplete: () => void;
  onUpdateQuestion: (index: number, question: SurveyQuestionType) => void;
}

export function QuestionOverview({
  questions,
  onDeleteQuestion,
  onUpdateQuestion,
}: QuestionOverviewProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleUpdateQuestion = (question: SurveyQuestionType) => {
    if (editingIndex !== null) {
      onUpdateQuestion(editingIndex, question);
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="p-4 border bg-card rounded-lg">
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
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(index)}
              >
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteQuestion(index)}
              >
                <Trash2 className="text-muted-foreground" />
              </Button>
            </div>
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
              <div className="w-full">
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

      <Dialog
        open={editingIndex !== null}
        onOpenChange={() => setEditingIndex(null)}
      >
        <DialogContent className="max-w-sm bg-background">
          {editingIndex !== null && (
            <SurveyQuestion
              initialQuestion={questions[editingIndex]}
              onNext={handleUpdateQuestion}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
