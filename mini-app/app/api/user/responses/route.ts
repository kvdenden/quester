import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { responses } from "@/db/schema";
import { findUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await findUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db.query.responses.findMany({
      where: eq(responses.userId, user.id),
      with: {
        survey: true,
      },
    });

    return NextResponse.json({
      responses: rows.map((response) => ({
        submissionId: response.submissionId,
        answers: response.answers,
        approved: response.approved,
        survey: {
          questId: response.survey.questId,
          title: response.survey.title,
          questions: response.survey.questions,
        },
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
