import { type Step } from "@/app/page";

type ProgressTrackerProps = {
  currentStep: Step;
  steps: { id: Step; label: string }[];
};

export function ProgressTracker({ currentStep, steps }: ProgressTrackerProps) {
  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 h-2 rounded ${
              steps.findIndex((s) => s.id === currentStep) >=
              steps.findIndex((s) => s.id === step.id)
                ? "bg-gray-600"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
