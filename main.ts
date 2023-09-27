import { z } from "zod";
import * as schema from "./schema";

import postgres from "postgres";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";

export const client = postgres({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const db: PostgresJsDatabase<typeof schema> = drizzle(client, {
  schema: schema,
});

// there should be a red quiggly line under `inviteUsers`
export async function inviteUsers(data: z.infer<typeof sendInvitesValidator>) {
  const res = await db
    .insert(schema.invites)
    .values(
      data.map((invite) => ({
        email: invite.email,
        accepted: false,
      }))
    )
    .returning({ id: schema.invites.email });

  return res;
}

export const sendInvitesValidator = z.array(
  z.object({
    email: z.string().email(),
  })
);
