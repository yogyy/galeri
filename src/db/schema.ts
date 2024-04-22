import {
  pgTableCreator,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

const pgTable = pgTableCreator((name) => `gallery_${name}`)

export const photo = pgTable("photo", {
  id: serial("id").primaryKey(),
  storageKey: varchar("storage_key", { length: 100 }).unique().notNull(),
  width: smallint("width").notNull(),
  height: smallint("height").notNull(),
  tweetUrl: varchar("tweet_url", { length: 256 }).notNull(),
  authorName: varchar("author_name", { length: 256 }).notNull(),
  authorHandle: varchar("author_handle", { length: 256 }).notNull(),
  date: timestamp("date", { withTimezone: true }).defaultNow(),
})

export type Photo = typeof photo.$inferSelect
export type NewPhoto = typeof photo.$inferInsert
