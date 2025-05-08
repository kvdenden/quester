import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load .env.local only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
