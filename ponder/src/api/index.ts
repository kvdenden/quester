import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { client, graphql, replaceBigInts } from "ponder";

import { and, eq } from "drizzle-orm";
import { numberToHex } from "viem";

const app = new Hono();

app.use("/sql/*", client({ db, schema }));

app.use("/", graphql({ db, schema }));
app.use("/graphql", graphql({ db, schema }));

app.get("/quests/:questId", async (c) => {
  const questId = c.req.param("questId");

  const quest = await db.query.quest.findFirst({
    where: eq(schema.quest.id, questId),
  });

  return c.json(replaceBigInts(quest, (v) => numberToHex(v)));
});

app.get("/quests/:questId/submissions", async (c) => {
  const questId = c.req.param("questId");

  const submissions = await db.query.submission.findMany({
    where: eq(schema.submission.questId, questId),
  });

  return c.json(replaceBigInts(submissions, (v) => numberToHex(v)));
});

app.get("/quests/:questId/submissions/:submissionId", async (c) => {
  const questId = c.req.param("questId");
  const submissionId = c.req.param("submissionId");

  const submission = await db.query.submission.findFirst({
    where: and(
      eq(schema.submission.questId, questId),
      eq(schema.submission.id, submissionId)
    ),
  });

  return c.json(replaceBigInts(submission, (v) => numberToHex(v)));
});

export default app;
