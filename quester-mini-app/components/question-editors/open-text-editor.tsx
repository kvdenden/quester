"use client";

interface OpenTextEditorProps {
  validation: ValidationRule[];
  onChange: (validation: ValidationRule[]) => void;
}
export interface ValidationRule {
  type: "required" | "minLength" | "maxLength" | "pattern";
  value?: any;
  message: string;
}

export default function OpenTextEditor({
  validation,
  onChange,
}: OpenTextEditorProps) {
  const addValidation = () => {
    const newValidation: ValidationRule = {
      type: "minLength",
      value: 1,
      message: "Please enter at least 1 character",
    };
    onChange([...validation, newValidation]);
  };

  const updateValidation = (
    index: number,
    updates: Partial<ValidationRule>,
  ) => {
    onChange(
      validation.map((rule, i) =>
        i === index ? { ...rule, ...updates } : rule,
      ),
    );
  };

  const removeValidation = (index: number) => {
    onChange(validation.filter((_, i) => i !== index));
  };

  const isRequired = validation.some((rule) => rule.type === "required");

  const handleRequiredChange = (checked: boolean) => {
    if (checked) {
      if (!isRequired) {
        onChange([
          ...validation,
          { type: "required", message: "This field is required" },
        ]);
      }
    } else {
      onChange(validation.filter((rule) => rule.type !== "required"));
    }
  };

  // Filter out the required rule for the validation list
  const validationRules = validation.filter((rule) => rule.type !== "required");

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Text Input Validation</div>
    </div>
  );
}
