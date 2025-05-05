"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface Survey {
  id: string;
  title: string;
  status: "active" | "expired";
  totalRewards: number;
  maxResponses: number;
  currentResponses: number;
  pendingResponses: number;
  endDate: string;
}

// Sample data - replace with your actual data fetching logic
const surveys: Survey[] = [
  {
    id: "survey-1",
    title: "User Experience Feedback",
    status: "active",
    totalRewards: 100,
    maxResponses: 100,
    currentResponses: 37,
    pendingResponses: 2,
    endDate: "2024-04-30",
  },
  {
    id: "survey-2",
    title: "Product Feature Preferences",
    status: "active",
    totalRewards: 250,
    maxResponses: 200,
    currentResponses: 142,
    pendingResponses: 5,
    endDate: "2024-05-15",
  },
  {
    id: "survey-3",
    title: "Market Research Survey",
    status: "expired",
    totalRewards: 50,
    maxResponses: 50,
    currentResponses: 50,
    pendingResponses: 0,
    endDate: "2024-03-31",
  },
  {
    id: "survey-4",
    title: "Customer Satisfaction Survey",
    status: "active",
    totalRewards: 150,
    maxResponses: 150,
    currentResponses: 24,
    pendingResponses: 3,
    endDate: "2024-05-01",
  },
];

export function SurveyList() {
  const router = useRouter();

  if (surveys.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <h3 className="font-medium text-lg text-foreground mb-2">
          No surveys found
        </h3>
        <p className="text-muted-foreground mb-4">
          You haven&apos;t created any surveys yet.
        </p>
        <Button
          onClick={() => router.push("/create")}
          className="py-3 px-4"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          Create your first survey
        </Button>
      </div>
    );
  }

  return <SurveyCardList surveys={surveys} />;
}

function SurveyCardList({ surveys }: { surveys: Survey[] }) {
  return (
    <div className="space-y-2 flex flex-col">
      {surveys.map((survey) => (
        <Card key={survey.id} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <p className="font-medium text-xs">{survey.title}</p>
              <StatusBadge status={survey.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Total Rewards</p>
                <p className="font-medium">{survey.totalRewards} USDC</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Responses</p>
                <p className="font-medium">{survey.maxResponses}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Responses</p>
                <p className="font-medium">{survey.currentResponses}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Pending Responses</p>
                <p className="font-medium flex items-center">
                  {survey.pendingResponses > 0 ? (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                      <span>{survey.pendingResponses}</span>
                    </>
                  ) : (
                    "0"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <div className="w-full">
              <p className="text-xs text-muted-foreground mb-1">
                Ends on {new Date(survey.endDate).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <Progress
                  value={(survey.currentResponses / survey.maxResponses) * 100}
                  className="h-2"
                />
                <span className="text-xs font-medium">
                  {Math.round(
                    (survey.currentResponses / survey.maxResponses) * 100,
                  )}
                  %
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={status === "active" ? "default" : "secondary"}
      className={
        status === "active"
          ? "bg-green-500/20 text-green-700 hover:bg-green-500/20 hover:text-green-700"
          : "bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700"
      }
    >
      {status === "active" ? "Active" : "Expired"}
    </Badge>
  );
}
