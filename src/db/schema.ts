import {
  pgEnum,
  pgTableCreator,
  serial,
  smallint,
  text,
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

export const userRole = pgEnum("role", ["user", "admin"])

export const user = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  role: userRole("role").notNull(),
})

export type User = typeof user.$inferInsert

export const session = pgTable("session", {
  id: text("id").primaryKey().notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
})

export type Session = typeof user.$inferInsert
