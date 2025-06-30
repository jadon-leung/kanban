import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://kanban_user:kanban_password@localhost:5432/kanban_db',
  },
  verbose: true,
  strict: true,
}) 