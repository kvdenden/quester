import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TextAnswerProps {
  value: string;
  onChange: (value: string) => void;
  minChars?: number;
  maxChars?: number;
}

function TextAnswer({ value, onChange, minChars, maxChars }: TextAnswerProps) {
  return (
    <div className="space-y-4">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[150px] bg-white text-foreground text-sm"
      />
      {minChars && (
        <p className="text-xs text-muted-foreground">
          {value.length} / {minChars} min characters
          {maxChars && ` (max ${maxChars})`}
        </p>
      )}
    </div>
  );
}

interface MultipleChoiceAnswerProps {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

function MultipleChoiceAnswer({
  options,
  selectedOptions,
  onToggle,
}: MultipleChoiceAnswerProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Checkbox
            id={`option-${index}`}
            checked={selectedOptions.includes(option)}
            onCheckedChange={() => onToggle(option)}
          />
          <Label
            htmlFor={`option-${index}`}
            className="text-sm text-muted-foreground"
          >
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
}

interface SingleChoiceAnswerProps {
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
}

function SingleChoiceAnswer({
  options,
  selectedOption,
  onChange,
}: SingleChoiceAnswerProps) {
  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={onChange}
      className="space-y-3"
    >
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <RadioGroupItem value={option} id={`radio-${index}`} />
          <Label
            htmlFor={`radio-${index}`}
            className="text-sm text-muted-foreground"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

interface AnswerInputProps {
  type: "text" | "multiple-choice" | "single-choice";
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options?: string[];
  minChars?: number;
  maxChars?: number;
}

export function AnswerInput({
  type,
  value,
  onChange,
  options,
  minChars,
  maxChars,
}: AnswerInputProps) {
  const handleTextChange = (newValue: string) => {
    onChange(newValue);
  };

  const handleMultipleChoice = (newValue: string) => {
    if (Array.isArray(value)) {
      const newOptions = value.includes(newValue)
        ? value.filter((item) => item !== newValue)
        : [...value, newValue];
      onChange(newOptions);
    }
  };

  const handleSingleChoice = (newValue: string) => {
    onChange(newValue);
  };

  switch (type) {
    case "text":
      return (
        <TextAnswer
          value={value as string}
          onChange={handleTextChange}
          minChars={minChars}
          maxChars={maxChars}
        />
      );
    case "multiple-choice":
      return (
        <MultipleChoiceAnswer
          options={options || []}
          selectedOptions={value as string[]}
          onToggle={handleMultipleChoice}
        />
      );
    case "single-choice":
      return (
        <SingleChoiceAnswer
          options={options || []}
          selectedOption={value as string}
          onChange={handleSingleChoice}
        />
      );
    default:
      return null;
  }
}
