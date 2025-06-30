import { getColumnsWithTasks, getAssignees } from '@/lib/db/queries'
import { KanbanColumn } from './kanban-column'
// import { Button } from '@/components/ui/button'
// import { Plus } from 'lucide-react'
// import { TaskDialog } from './task-dialog'

export default async function KanbanBoardServer() {
  // Fetch data on the server
  const [columnsWithTasks, assignees] = await Promise.all([
    getColumnsWithTasks(),
    getAssignees()
  ])

  // Server components can't pass functions as props
  // Interactive features will be handled by client components

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Project Board</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your team&apos;s tasks and track progress
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {assignees.length} team members • {columnsWithTasks.reduce((acc, col) => acc + col.tasks.length, 0)} total tasks
          </p>
        </div>
        {/* <TaskDialog
          columnId={columnsWithTasks[0]?.id || 1} // Default to first column (To Do)
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          }
        /> */}
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columnsWithTasks.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            columnColor={column.color}
            allColumns={columnsWithTasks}
          />
        ))}
      </div>
    </div>
  )
} 