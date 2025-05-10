export const getQuest = async (questId: string) => {
  const response = await fetch(
    `${process.env.PONDER_API_URL}/quests/${questId}`,
  );

  const data = await response.json();

  return data;
};
