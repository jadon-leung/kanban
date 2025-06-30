import { pgTable, text, timestamp, integer, boolean, pgEnum, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in-progress', 'done'])
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])
export const assigneeStatusEnum = pgEnum('assignee_status', ['active', 'away', 'busy'])

// Assignees table
export const assignees = pgTable('assignees', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar').notNull(),
  initials: text('initials').notNull(),
  role: text('role').notNull(),
  status: assigneeStatusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Columns table (for kanban columns)
export const columns = pgTable('columns', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  position: integer('position').notNull(),
  color: text('color').notNull().default('bg-blue-500'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Tasks table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').notNull().default('todo'),
  priority: priorityEnum('priority').notNull().default('medium'),
  assigneeId: text('assignee_id').references(() => assignees.id),
  columnId: integer('column_id').references(() => columns.id),
  position: integer('position').notNull().default(0),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Relations
export const assigneesRelations = relations(assignees, ({ many }) => ({
  tasks: many(tasks),
}))

export const columnsRelations = relations(columns, ({ many }) => ({
  tasks: many(tasks),
}))

export const tasksRelations = relations(tasks, ({ one }) => ({
  assignee: one(assignees, {
    fields: [tasks.assigneeId],
    references: [assignees.id],
  }),
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
}))

// Types for use in components
export type Assignee = typeof assignees.$inferSelect
export type NewAssignee = typeof assignees.$inferInsert
export type Column = typeof columns.$inferSelect
export type NewColumn = typeof columns.$inferInsert
export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert 