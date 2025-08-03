import { config } from 'dotenv';

// Load environment from .env.development.local or .env.production.local
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN
} = process.env;
