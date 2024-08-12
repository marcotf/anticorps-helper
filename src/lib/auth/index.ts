import { env } from "@/env.js";
import { db } from "@/server/db";
import { sessions, users, type User as DbUser } from "@/server/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";

// Uncomment the following lines if you are using nodejs 18 or lower. Not required in Node.js 20, CloudFlare Workers, Deno, Bun, and Vercel Edge Functions.
// import { webcrypto } from "node:crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (attributes: DatabaseSessionAttributes) => {
    return {
      ...attributes,
    };
  },
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    return {
      ...attributes,
    };
  },
  sessionExpiresIn: new TimeSpan(2, "h"),
  sessionCookie: {
    name: "session",

    expires: true,
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseSessionAttributes {}
type DatabaseUserAttributes = Omit<DbUser, "hashedPassword">;
