
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import 'dotenv/config'
import { DB } from "./types";

export const kyselyDialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect: kyselyDialect,
});
