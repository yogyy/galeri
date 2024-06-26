import { config } from "dotenv"
import type { Config } from "drizzle-kit"

config({ path: ".env" })

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set")

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: { connectionString: process.env.DATABASE_URL },
} satisfies Config
