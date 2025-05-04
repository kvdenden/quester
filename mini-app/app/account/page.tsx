"use client";

import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SurveyList } from "./SurveyList";
import { ResponseList } from "./ResponseList";

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function Account() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  };

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Check className="text-[#0052FF]" size={16} />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div>{saveFrameButton()}</div>
      <div className="w-full max-w-md mx-auto mb-[64px]  px-4 py-3 mb-[64px]">
        {/* App logo/header */}
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
