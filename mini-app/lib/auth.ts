import { db } from "@/db";
import { users } from "@/db/schema";
import { getServerSession } from "next-auth";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { eq } from "drizzle-orm";
// Define custom session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in with Farcaster",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "0x0",
        },
        pfp: {
          label: "Pfp",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        const csrfToken = req.body?.csrfToken;
        const appClient = createAppClient({
          ethereum: viemConnector(),
        });

        const verifyResponse = await appClient.verifySignInMessage({
          message: credentials?.message as string,
          signature: credentials?.signature as `0x${string}`,
          domain: "localhost:3000",
          nonce: csrfToken,
        });
        const { success, fid } = verifyResponse;

        if (!success) {
          return null;
        }

        return {
          id: fid.toString(),
          name: credentials?.name,
          image: credentials?.pfp,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
};

export async function getFidFromSession() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return session.user.id;
}

export async function findUser(fid?: string) {
  if (!fid) {
    fid = await getFidFromSession();
    if (!fid) return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.fid, fid),
  });

  return user;
}

export async function findOrCreateUser(fid?: string) {
  if (!fid) {
    fid = await getFidFromSession();
    if (!fid) return null;
  }

  const user = await findUser(fid);

  if (user) return user;

  const options = {
    method: "GET",
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_NEYNAR_API_KEY || "",
    },
  };

  const response = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    options,
  );
  const {
    users: [userData],
  } = await response.json();

  const address = userData.verified_addresses.primary.eth_address;

  const [newUser] = await db.insert(users).values({
    fid,
    address,
  });

  return newUser;
}
