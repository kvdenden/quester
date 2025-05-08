import SurveyFeed from "./SurveyFeed";

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function Surveys() {
  return (
    <div className="flex flex-col min-h-dvh font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div className="w-full max-w-md mx-auto mt-[48px] mb-[64px]">
        <SurveyFeed />
      </div>
    </div>
  );
}
