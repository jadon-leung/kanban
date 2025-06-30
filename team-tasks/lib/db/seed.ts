import { db } from './connection'
import { assignees, columns } from './schema'
import { assignees as assigneesData } from '../data/assignees'

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await db.delete(assignees)
    await db.delete(columns)

    // Seed assignees
    console.log('👥 Seeding assignees...')
    const insertedAssignees = await db.insert(assignees).values(
      assigneesData.map(assignee => ({
        id: assignee.id,
        name: assignee.name,
        email: assignee.email,
        avatar: assignee.avatar,
        initials: assignee.initials,
        role: assignee.role,
        status: assignee.status,
      }))
    ).returning()

    console.log(`✅ Inserted ${insertedAssignees.length} assignees`)

    // Seed default columns
    console.log('📋 Seeding default columns...')
    const defaultColumns = [
      {
        title: 'To Do',
        description: 'Tasks that need to be started',
        position: 0,
        color: 'bg-blue-500',
      },
      {
        title: 'In Progress',
        description: 'Tasks currently being worked on',
        position: 1,
        color: 'bg-yellow-500',
      },
      {
        title: 'Done',
        description: 'Completed tasks',
        position: 2,
        color: 'bg-green-500',
      },
    ]

    const insertedColumns = await db.insert(columns).values(defaultColumns).returning()
    console.log(`✅ Inserted ${insertedColumns.length} columns`)

    console.log('🎉 Database seeding completed successfully!')
    return { success: true, assignees: insertedAssignees, columns: insertedColumns }
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
} 