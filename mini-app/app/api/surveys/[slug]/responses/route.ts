import { NextResponse } from "next/server";
import { db } from "@/db";
import { responses, surveys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "@/lib/auth";
// Schema for survey creation
const responseSchema = z.object({
  answers: z.array(z.string()),
  submissionId: z.string().min(1, "Submission ID is required"),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const survey = await db.query.surveys.findFirst({
      where: eq(surveys.slug, slug),
      with: {
        responses: {
          with: {
            user: true,
          },
        },
      },
    });

    if (!survey) {
      return NextResponse.json({ error: "Survey not found" }, { status: 404 });
    }

    return NextResponse.json({
      responses: survey.responses.map((response) => ({
        submissionId: response.submissionId,
        answers: response.answers,
        approved: response.approved,
        user: {
          fid: response.user.fid,
          address: response.user.address,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching survey:", error);
    return NextResponse.json(
      { error: "Failed to fetch survey" },
      { status: 500 },
    );
  }
}

export async function POST(
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

    const surveyId = survey.id;

    const body = await request.json();
    const { answers, submissionId } = responseSchema.parse(body);
    const { id: userId } = await getUser();

    const existingResponse = await db.query.responses.findFirst({
      where: and(
        eq(responses.surveyId, surveyId),
        eq(responses.submissionId, submissionId),
      ),
    });

    if (existingResponse) {
      return NextResponse.json(
        { error: "Response already exists" },
        { status: 400 },
      );
    }

    await db.insert(responses).values({
      surveyId,
      userId,
      answers,

      submissionId,
    });

    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("Error submitting response:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format", details: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to submit response" },
      { status: 500 },
    );
  }
}
