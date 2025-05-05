"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ListTodo, Users, Gift } from "lucide-react";

interface SurveyIntro {
  onNext: () => void;
}

export function SurveyIntro({ onNext }: SurveyIntro) {
  return (
    <div className="flex flex-col w-full ">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-6 md:p-8 max-w-2xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Create your survey in 3 simple steps
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Set up your survey, define your audience, and configure the rewards
            - all in a few simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="w-full space-y-4 mb-8">
          {[
            {
              icon: ListTodo,
              text: "Generate your survey questions with multiple answer types",
            },
            {
              icon: Users,
              text: "Select your target audience using Farcaster integration",
            },
            {
              icon: Gift,
              text: "Configure survey settings and rewards",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-4 p-4 rounded-xl transition-colors hover:bg-primary/5"
            >
              <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 text-center">
                <p className="text-foreground font-medium">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="w-full">
          <Button
            onClick={onNext}
            className="w-full py-6 text-lg relative overflow-hidden group"
            size="lg"
          >
            <span className="relative z-10 flex items-center justify-center">
              Start Your Survey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-3">
            Create your first survey and start gathering valuable insights
          </p>
        </div>
      </div>
    </div>
  );
}
