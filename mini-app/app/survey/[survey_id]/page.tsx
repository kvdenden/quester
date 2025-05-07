"use client";

import {
  useMiniKit,
  useAddFrame,
  useAuthenticate,
} from "@coinbase/onchainkit/minikit";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Survey from "./Survey";
export type Step = "intro" | "questions" | "audience" | "fund" | "overview";

export default function SurveyPage() {
  const [frameAdded, setFrameAdded] = useState(false);
  const addFrame = useAddFrame();

  return (
    <div className="flex flex-col min-h-dvh font-sans text-[var(--app-foreground)] mini-app-theme ">
      <div className="w-full max-w-md mx-auto mb-[64px]">
        <Survey />
      </div>
    </div>
  );
}
