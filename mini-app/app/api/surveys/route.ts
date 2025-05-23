import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { surveys } from "@/db/schema";
import { findOrCreateUser } from "@/lib/auth";

// Schema for survey creation
const surveySchema = z.object({
  title: z.string().min(1, "Title is required"),
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question text is required"),
      description: z.string().optional(),
      answerType: z.enum(["text", "single-choice", "multiple-choice"]),
      options: z.array(z.string()).optional(),
    }),
  ),
  questId: z.string().min(1, "Quest ID is required"),
});

export async function GET() {
  try {
    const allSurveys = await db.select().from(surveys);

    return NextResponse.json({
      surveys: allSurveys.map((survey) => ({
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

export async function POST(request: Request) {
  try {
    const user = await findOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;

    const body = await request.json();
    const { title, questions, questId } = surveySchema.parse(body);

    // Generate a unique slug
    const slug = nanoid(10);

    // Check if questId is already in use
    const existingSurvey = await db.query.surveys.findFirst({
      where: eq(surveys.questId, questId),
    });

    if (existingSurvey) {
      return NextResponse.json(
        { error: "Quest ID is already in use" },
        { status: 400 },
      );
    }

    // Create the survey
    await db.insert(surveys).values({
      userId,
      slug,
      title,
      questions,

      questId,
    });

    return NextResponse.json({ id: slug }, { status: 201 });
  } catch (error) {
    console.error("Error creating survey:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create survey" },
      { status: 500 },
    );
  }
}
