import { config } from "dotenv"
import { migrate } from "drizzle-orm/neon-http/migrator"

import { db } from "."

config({ path: ".env" })

const main = async () => {
  try {
    console.log("⏳ Running migrations...")

    const start = Date.now()

    await migrate(db, { migrationsFolder: "drizzle" })

    const end = Date.now()

    console.log(`✅ Migrations completed in ${end - start}ms`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Migration failed")
    console.error(error)
    process.exit(1)
  }
}

main()
