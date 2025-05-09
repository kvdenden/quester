import { relations, sql } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

type Question = {
  question: string;
  description?: string;
  answerType: "text" | "single-choice" | "multiple-choice";
  options?: string[];
};

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: false, mode: "string" })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: false, mode: "string" })
    .default(sql`now()`)
    .notNull()
    .$onUpdate(() => sql`now()`),
};

export const surveys = pgTable("surveys", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(), // Unique slug for URL

  title: text("title").notNull(),

  questions: jsonb("questions").$type<Question[]>().default([]).notNull(),

  questId: text("quest_id").notNull().unique(),

  ...timestamps,
});

export const surveyRelations = relations(surveys, ({ many }) => ({
  responses: many(responses),
}));

export const responses = pgTable("responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  surveyId: uuid("survey_id")
    .references(() => surveys.id)
    .notNull(),

  answers: jsonb("answers").$type<string[]>().default([]).notNull(),

  submissionId: text("submission_id").notNull().unique(),

  approved: boolean("approved").default(false).notNull(),

  ...timestamps,
});

export const responseRelations = relations(responses, ({ one }) => ({
  survey: one(surveys, {
    fields: [responses.surveyId],
    references: [surveys.id],
  }),
}));
