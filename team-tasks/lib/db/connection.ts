import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://kanban_user:kanban_password@localhost:5432/kanban_db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Create Drizzle instance
export const db = drizzle(pool, { schema })

// Health check function
export async function checkDatabaseHealth() {
  try {
    const client = await pool.connect()
    await client.query('SELECT 1')
    client.release()
    return { status: 'healthy', message: 'Database connection successful' }
  } catch (error) {
    console.error('Database health check failed:', error)
    return { status: 'unhealthy', message: 'Database connection failed', error }
  }
}

// Graceful shutdown
export async function closeDatabaseConnection() {
  try {
    await pool.end()
    console.log('Database pool closed')
  } catch (error) {
    console.error('Error closing database pool:', error)
  }
} 