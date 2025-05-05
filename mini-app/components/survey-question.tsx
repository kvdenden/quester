import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, Trash2, Plus } from "lucide-react";

export type AnswerType = "text" | "single-choice" | "multiple-choice";

export interface SurveyQuestion {
  question: string;
  description?: string;
  answerType: AnswerType;
  minChars?: number;
  maxChars?: number;
  options?: string[];
}

interface SurveyQuestionProps {
  onNext: (question: SurveyQuestion) => void;
}

export function SurveyQuestion({ onNext }: SurveyQuestionProps) {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answerType, setAnswerType] = useState<AnswerType>("text");
  const [minChars, setMinChars] = useState<number>(0);
  const [maxChars, setMaxChars] = useState<number>(1000);
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");

  const resetForm = () => {
    setQuestion("");
    setDescription("");
    setAnswerType("text");
    setMinChars(256);
    setMaxChars(1024);
    setOptions([]);
    setNewOption("");
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const surveyQuestion: SurveyQuestion = {
      question,
      description,
      answerType,
      minChars: answerType === "text" ? minChars : undefined,
      maxChars: answerType === "text" ? maxChars : undefined,
      options: answerType !== "text" ? options : undefined,
    };
    onNext(surveyQuestion);
    resetForm();
  };

  const isNextDisabled =
    !question ||
    (answerType === "text" && (minChars < 0 || maxChars < minChars)) ||
    (answerType !== "text" && options.length === 0);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground flex justify-between items-center gap-2">
          Question *
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select
                        value={answerType}
                        onValueChange={(value: AnswerType) =>
                          setAnswerType(value)
                        }
                      >
                        <SelectTrigger className="bg-background text-xs text-foreground ">
                          <SelectValue
                            placeholder="Select answer type"
                            className="text-xs"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-xs" value="text">
                            Text
                          </SelectItem>
                          <SelectItem className="text-xs" value="single-choice">
                            Single Choice
                          </SelectItem>
                          <SelectItem
                            className="text-xs"
                            value="multiple-choice"
                          >
                            Multiple Choice
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {answerType === "text" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Minimum Characters
                          </label>
                          <Input
                            type="number"
                            value={minChars}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setMinChars(Number(e.target.value))}
                            min={0}
                            className="bg-background text-foreground text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Maximum Characters
                          </label>
                          <Input
                            type="number"
                            value={maxChars}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setMaxChars(Number(e.target.value))}
                            min={minChars}
                            className="bg-background text-foreground text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {/* <div className="text-sm text-muted-foreground">
          {answerType === "text" && "Text answer"}
          {answerType === "single-choice" && "Single choice answer"}
          {answerType === "multiple-choice" && "Multiple choice answer"}
        </div> */}
          </div>
        </label>
        <Input
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuestion(e.target.value)
          }
          placeholder="Enter your question"
          className="bg-background text-foreground text-xs "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Add a description (optional)"
          className="bg-background text-foreground text-xs "
        />
      </div>

      {(answerType === "single-choice" || answerType === "multiple-choice") && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Answer Options *
            </label>
            <div className="flex gap-2">
              <Input
                value={newOption}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewOption(e.target.value)
                }
                placeholder="Enter an option"
                className="bg-background text-foreground text-xs "
              />
              <Button onClick={handleAddOption}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={option}
                  readOnly
                  className="bg-background text-foreground text-xs "
                />
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveOption(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        className="w-full text-foreground"
        variant="outline"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        Add Question
      </Button>
    </div>
  );
}
