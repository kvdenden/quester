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

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fid: text("fid").notNull().unique(),
  address: text("address").notNull().unique(),

  ...timestamps,
});

export const userRelations = relations(users, ({ many }) => ({
  surveys: many(surveys),
  responses: many(responses),
}));

export const surveys = pgTable("surveys", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),

  slug: text("slug").notNull().unique(), // Unique slug for URL

  title: text("title").notNull(),

  questions: jsonb("questions").$type<Question[]>().default([]).notNull(),

  questId: text("quest_id").notNull().unique(),

  ...timestamps,
});

export const surveyRelations = relations(surveys, ({ one, many }) => ({
  creator: one(users, {
    fields: [surveys.userId],
    references: [users.id],
  }),
  responses: many(responses),
}));

export const responses = pgTable("responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  surveyId: uuid("survey_id")
    .references(() => surveys.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
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
  user: one(users, {
    fields: [responses.userId],
    references: [users.id],
  }),
}));
