import 'dotenv/config';

export const envs = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:root@localhost:5433/talent_tech',
  JWT_SECRET: process.env.JWT_SECRET ?? 'default_secret',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? 'default_refresh',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '15m',
  NODE_ENV:
    (process.env.NODE_ENV as 'development' | 'production' | 'test') ??
    'development',
};
