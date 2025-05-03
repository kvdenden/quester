"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

interface SurveyIntro {
  onNext: () => void;
}

export function SurveyIntro({ onNext }: SurveyIntro) {
  return (
    <div className="flex flex-col min-h-screen w-full">
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
      <div className="flex-1 p-6 space-y-8 bg-background text-center">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Discover valuable insights
          </h2>
          <p className="text-muted-foreground">
            Create engaging surveys and get thoughtful responses from an active
            community of builders and enthusiasts.
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
          <Button onClick={onNext} className="w-full py-6 text-lg" size="lg">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center pt-2">
          Join thousands of users already creating impactful surveys
        </p>
      </div>
    </div>
  );
}
