import { bigint, boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const invites = pgTable("user_invite", {
  accepted: boolean("accepted").notNull().default(false),
  email: varchar("email", { length: 255 }).notNull(),
});
``;
