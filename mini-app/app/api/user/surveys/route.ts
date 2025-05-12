import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { surveys } from "@/db/schema";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const { id: userId } = await getUser();
    const rows = await db.query.surveys.findMany({
      where: eq(surveys.userId, userId),
    });

    return NextResponse.json({
      surveys: rows.map((survey) => ({
        id: survey.slug,
        questId: survey.questId,
        title: survey.title,
        questions: survey.questions,
      })),
    });
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Failed to fetch surveys" },
      { status: 500 },
    );
  }
}
