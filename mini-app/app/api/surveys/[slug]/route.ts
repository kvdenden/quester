import { NextResponse } from "next/server";
import { db } from "@/db";
import { surveys } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getQuest } from "@/lib/ponder";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const survey = await db.query.surveys.findFirst({
      where: eq(surveys.slug, slug),
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    const quest = await getQuest(survey.questId);

    return NextResponse.json({ survey, quest });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey" },
      { status: 500 },
    );
  }
}
