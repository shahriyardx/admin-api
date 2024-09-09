import { sql } from "drizzle-orm"
import {
	bigserial,
	pgEnum,
	pgTableCreator,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { createId } from "@paralleldrive/cuid2"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `admin_${name}`)

export const blogStatus = pgEnum("status", ["published", "draft", "unlisted"])

export const portfolioblogs = createTable("portfolioblogs", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	title: varchar("title", { length: 256 }).notNull(),
	description: varchar("description", { length: 512 }).notNull(),
	slug: varchar("slug", { length: 512 }).unique().notNull(),
	content: text("content").notNull(),
	status: blogStatus("status").notNull().default("published"),
	categories: text("categories").array().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
		() => new Date(),
	),
})

export type PortfolioBlog = typeof portfolioblogs.$inferSelect

export const getFirst = <T extends any[]>(values: T): T[number] => {
	if (values.length !== 1) return null
	return values[0]
}

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date()
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 })
//     .notNull()
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   emailVerified: timestamp("email_verified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("provider_account_id", {
//       length: 255,
//     }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_user_id_idx").on(account.userId),
//   })
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_user_id_idx").on(session.userId),
//   })
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verification_token",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   })
// );
