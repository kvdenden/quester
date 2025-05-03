"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grip, Plus, Trash2 } from "lucide-react";
import type { Option } from "./single-choice-editor";

interface MultipleChoiceEditorProps {
  options: Option[];
  onChange: (options: Option[]) => void;
}

export default function MultipleChoiceEditor({
  options,
  onChange,
}: MultipleChoiceEditorProps) {
  const addOption = () => {
    const newOption = {
      id: `option-${Date.now()}`,
      text: `Option ${options.length + 1}`,
    };
    onChange([...options, newOption]);
  };

  const updateOption = (id: string, text: string) => {
    onChange(
      options.map((option) =>
        option.id === id ? { ...option, text } : option,
      ),
    );
  };

  const removeOption = (id: string) => {
    onChange(options.filter((option) => option.id !== id));
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Multiple Choice Options</div>
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <Grip className="h-4 w-4 text-muted-foreground" />
          <Input
            value={option.text}
            onChange={(e) => updateOption(option.id, e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeOption(option.id)}
            disabled={options.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={addOption}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
}
