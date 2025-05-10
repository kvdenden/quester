import { NextResponse } from "next/server";
import { db } from "@/db";
import { responses, surveys } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getQuest } from "@/lib/ponder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const survey = await db.query.surveys.findFirst({
      where: eq(surveys.slug, slug),
      extras: {
        responseCount: db
          .$count(responses, sql`responses.survey_id = surveys.id`)
          .as("responseCount"),
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    const quest = await getQuest(survey.questId);

    return NextResponse.json({
      id: survey.slug,
      title: survey.title,
      questions: survey.questions,

      rewardToken: quest.rewardToken,
      rewardAmount: quest.rewardAmount,

      maxResponses: quest.maxResponses,
      currentResponses: survey.responseCount,
    });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey" },
      { status: 500 },
    );
  }
}
