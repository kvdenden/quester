import React from "react";

interface QuestionDisplayProps {
  question: string;
  description?: string;
}

export function QuestionDisplay({
  question,
  description,
}: QuestionDisplayProps) {
  return (
    <div className="space-y-3 text-foreground">
      <h2 className="text-sm font-semibold">{question}</h2>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
