import { env } from "@/env"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
})
export const db = drizzle(pool)
