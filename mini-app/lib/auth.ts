import { db } from "@/db";
import { users } from "@/db/schema";

export async function getUser() {
  const user = await db.query.users.findFirst();

  if (user) return user;

  const [dummyUser] = await db
    .insert(users)
    .values({
      fid: "0",
      address: "0x1234567890123456789012345678901234567890",
    })
    .returning();

  return dummyUser;
}
