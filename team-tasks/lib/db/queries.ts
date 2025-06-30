import { db } from './connection'
import { assignees, columns, tasks } from './schema'
import { desc, asc } from 'drizzle-orm'

// Artificial delay for development/testing purposes (in milliseconds)
const ARTIFICIAL_DELAY_MS = 0;

// Fetch all assignees
export async function getAssignees() {
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
  try {
    return await db.select().from(assignees).orderBy(asc(assignees.name))
  } catch (error) {
    console.error('Failed to fetch assignees:', error)
    return []
  }
}

// Fetch all columns with their tasks
export async function getColumnsWithTasks() {
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS));
  try {
    return await db.query.columns.findMany({
      orderBy: [asc(columns.position)],
      with: {
        tasks: {
          orderBy: [asc(tasks.position)],
          with: {
            assignee: true
          }
        }
      }
    })
  } catch (error) {
    console.error('Failed to fetch columns with tasks:', error)
    return []
  }
}

// Fetch tasks by status for backward compatibility
export async function getTasksByStatus(status: 'todo' | 'in-progress' | 'done') {
  try {
    return await db.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.status, status),
      orderBy: [asc(tasks.position)],
      with: {
        assignee: true
      }
    })
  } catch (error) {
    console.error(`Failed to fetch ${status} tasks:`, error)
    return []
  }
}

// Fetch all tasks with assignee info
export async function getTasks() {
  try {
    return await db.query.tasks.findMany({
      orderBy: [desc(tasks.createdAt)],
      with: {
        assignee: true,
        column: true
      }
    })
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return []
  }
} 

