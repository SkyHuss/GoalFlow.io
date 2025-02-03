import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const pgConnectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const auth = betterAuth({
  database: new Pool({
    connectionString: pgConnectionString,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:5173'],
});
