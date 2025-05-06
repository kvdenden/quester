import { onchainTable, relations, index } from "ponder";

export const quest = onchainTable(
  "quest",
  (t) => ({
    id: t.text().primaryKey(),
    creator: t.text("creator").notNull(),
    validator: t.text("validator").notNull(),
    rewardToken: t.text("reward_token").notNull(),
    rewardAmount: t.bigint("reward_amount").notNull(),
    submissionLimit: t.bigint("submission_limit").notNull(),
    timestamp: t.bigint("timestamp").notNull(),
  }),
  (table) => ({
    creatorIdx: index().on(table.creator),
  })
);

export const questRelations = relations(quest, ({ many }) => ({
  submissions: many(submission),
}));

export const submission = onchainTable(
  "submission",
  (t) => ({
    id: t.text().primaryKey(),
    questId: t.text("quest_id").notNull(),
    user: t.text("user").notNull(),
    timestamp: t.bigint("timestamp").notNull(),
  }),
  (table) => ({
    questIdIdx: index().on(table.questId),
    userIdx: index().on(table.user),
  })
);

export const submissionRelations = relations(submission, ({ one }) => ({
  quest: one(quest, {
    fields: [submission.questId],
    references: [quest.id],
  }),
}));
