import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exampleSurveys } from "@/app/mock-data/example-surveys";
import {
  type SurveyQuestion,
  type AnswerType,
} from "@/components/survey-question";

interface SurveyTemplateSelectorProps {
  onSelect: (questions: SurveyQuestion[]) => void;
}

export function SurveyTemplateSelector({
  onSelect,
}: SurveyTemplateSelectorProps) {
  const handleTemplateSelect = (templateName: string) => {
    const questions =
      exampleSurveys[templateName as keyof typeof exampleSurveys];
    if (questions) {
      const convertedQuestions: SurveyQuestion[] = questions.map((q) => ({
        ...q,
        answerType: q.answerType as AnswerType,
      }));
      onSelect(convertedQuestions);
    }
  };

  return (
    <div className="space-y-2">
      <Select onValueChange={handleTemplateSelect}>
        <SelectTrigger className="text-foreground bg-background h-10">
          <SelectValue placeholder="Choose a template" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(exampleSurveys).map((templateName) => (
            <SelectItem key={templateName} value={templateName}>
              {templateName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
