import { getColumnsWithTasks, getAssignees } from '@/lib/db/queries'
import { KanbanColumn } from './kanban-column'

export default async function KanbanBoardServer() {
  const [columnsWithTasks, assignees] = await Promise.all([
    getColumnsWithTasks(),
    getAssignees()
  ])

  const totalTasks = columnsWithTasks.reduce((acc, col) => acc + col.tasks.length, 0)
  const completedTasks = columnsWithTasks.find(col => col.title.toLowerCase() === 'done')?.tasks.length || 0
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="p-6">
      {/* Hero section */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Project Board
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Organize, prioritize, and track your team&apos;s work in one place.
            </p>
          </div>

          {/* Stats cards */}
          <div className="flex gap-4 flex-wrap">
            <div className="glass-card bg-card/60 border border-border/50 rounded-2xl px-5 py-4 min-w-[140px]">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Team</p>
              <p className="text-2xl font-semibold tabular-nums">{assignees.length}</p>
              <p className="text-xs text-muted-foreground">members</p>
            </div>
            <div className="glass-card bg-card/60 border border-border/50 rounded-2xl px-5 py-4 min-w-[140px]">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Tasks</p>
              <p className="text-2xl font-semibold tabular-nums">{totalTasks}</p>
              <p className="text-xs text-muted-foreground">total items</p>
            </div>
            <div className="glass-card bg-card/60 border border-border/50 rounded-2xl px-5 py-4 min-w-[140px]">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Progress</p>
              <p className="text-2xl font-semibold tabular-nums">{progressPercent}%</p>
              <div className="mt-1.5 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columnsWithTasks.map((column, index) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={column.tasks}
            columnColor={column.color}
            allColumns={columnsWithTasks}
            columnIndex={index}
          />
        ))}
      </div>
    </div>
  )
}
