import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Coins,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarIcon,
} from "lucide-react";

// Sample data - replace with your actual data fetching logic
const surveyResponses = [
  {
    id: "response-1",
    surveyTitle: "User Experience Feedback",
    status: "accepted",
    rewardAmount: 10,
    completedDate: "2023-11-15",
  },
  {
    id: "response-2",
    surveyTitle: "Product Feature Preferences",
    status: "pending",
    rewardAmount: 15,
    completedDate: "2023-11-20",
  },
  {
    id: "response-3",
    surveyTitle: "Market Research Survey",
    status: "rejected",
    rewardAmount: 0, // No reward for rejected responses
    completedDate: "2023-11-10",
  },
  {
    id: "response-4",
    surveyTitle: "Customer Satisfaction Survey",
    status: "accepted",
    rewardAmount: 8,
    completedDate: "2023-11-05",
  },
  {
    id: "response-5",
    surveyTitle: "Brand Perception Study",
    status: "accepted",
    rewardAmount: 20,
    completedDate: "2023-11-18",
  },
];

export function ResponseList() {
  // Calculate summary statistics
  const totalSurveysAnswered = surveyResponses.length;
  const totalEarnedRewards = surveyResponses
    .filter((response) => response.status === "accepted")
    .reduce((sum, response) => sum + response.rewardAmount, 0);

  if (surveyResponses.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <h3 className="font-medium text-foreground text-lg mb-2">
          No survey responses yet
        </h3>
        <p className="text-muted-foreground">
          You haven&apos;t answered any surveys.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-3">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium flex items-center">
              <ClipboardList className="h-3 w-3 mr-1.5 text-muted-foreground" />
              Surveys Answered
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-lg font-bold">{totalSurveysAnswered}</div>
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="p-0 pb-1">
            <CardTitle className="text-xs font-medium flex items-center">
              <Coins className="h-3 w-3 mr-1.5 text-muted-foreground" />
              Earned Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-lg font-bold">{totalEarnedRewards} USDC</div>
          </CardContent>
        </Card>
      </div>
      <div>
        <p className="text-xs mb-2 text-muted-foreground font-medium">
          Your submitted surveys
        </p>
        <div className="space-y-2">
          {surveyResponses.map((response) => (
            <Card key={response.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{response.surveyTitle}</h3>
                  <StatusBadge status={response.status} />
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Reward</p>
                    <p className="font-medium">
                      {response.status === "accepted"
                        ? `${response.rewardAmount} USDC`
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed</p>
                    <p className="font-medium flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                      {response.completedDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className:
        "bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/20 hover:text-yellow-700",
      icon: Clock,
    },
    accepted: {
      label: "Accepted",
      className:
        "bg-green-500/20 text-green-700 hover:bg-green-500/20 hover:text-green-700",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
      className:
        "bg-red-500/20 text-red-700 hover:bg-red-500/20 hover:text-red-700",
      icon: XCircle,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge variant="secondary" className={config.className}>
      <config.icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}
