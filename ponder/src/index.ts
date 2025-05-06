import { ponder } from "ponder:registry";
import { quest, submission } from "../ponder.schema";
import { questerAbi } from "../abis/quester";

ponder.on("Quester:QuestCreated", async ({ event, context }) => {
  const { creator, questId } = event.args;
  const { db, client } = context;

  // Get quest details from the contract
  const questData = await client.readContract({
    abi: questerAbi,
    address: event.log.address,
    functionName: "getQuest",
    args: [questId],
  });

  await db.insert(quest).values({
    id: questId,
    creator: creator,
    validator: questData.validator,
    rewardToken: questData.rewardToken,
    rewardAmount: questData.rewardAmount,
    submissionLimit: questData.submissionLimit,
    timestamp: event.block.timestamp,
  });
});

ponder.on("Quester:RewardClaimed", async ({ event, context }) => {
  const { user, questId, submissionId } = event.args;
  const { db } = context;

  // Create the submission record
  await db.insert(submission).values({
    id: submissionId,
    questId: questId,
    user: user,
    timestamp: event.block.timestamp,
  });
});
