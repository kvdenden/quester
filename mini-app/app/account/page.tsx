import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "./SurveyList";
import { ResponseList } from "./ResponseList";

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function Account() {
  return (
    <div className="flex flex-col min-h-dvh font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div className="w-full max-w-md mx-auto mb-[64px] mt-[48px] px-4 py-3">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="account">
              My surveys
            </TabsTrigger>
            <TabsTrigger className="w-full" value="password">
              Submitted answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <SurveyList />
          </TabsContent>
          <TabsContent value="password">
            <ResponseList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
