"use client";

import { useMiniKit, useAddFrame } from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import SurveyFeed from "./SurveyFeed";

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function Surveys() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();
  const router = useRouter();

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
      <div className="w-full max-w-md mx-auto mb-[64px]">
        <SurveyFeed />
      </div>
    </div>
  );
}
