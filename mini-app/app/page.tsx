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

export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function App() {
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
    <div className="flex flex-col min-h-dvh font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div>{saveFrameButton()}</div>
      <div className="w-full max-w-md mx-auto mb-[64px]">
        {/* App logo/header */}
        <div className="bg-primary py-12 px-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">
            Quester
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Insights from the community
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-8 text-center">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Discover valuable insights
            </h2>
            <p className="text-muted-foreground">
              Create engaging surveys and get thoughtful responses from an
              active community of builders and enthusiasts.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-foreground">
                Gather strategic market intelligence
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <Target className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-foreground">
                Validate product ideas with feedback
              </p>
            </div>

            <div className="flex items-center gap-3 justify-center">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-foreground">Discover trends early</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              onClick={() => router.push("/create")}
              className="w-full py-6 text-lg"
              size="lg"
            >
              Create Survey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center pt-2">
            Join thousands of users already creating impactful surveys
          </p>
        </div>
      </div>
    </div>
  );
}
