import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import { Task } from "@/lib/db/schema"
import { TaskDialog } from "./task-dialog"
import { Column } from "@/lib/db/schema"

type TaskWithAssignee = Task & {
  assignee?: {
    id: string
    name: string
    avatar: string
    initials: string
    role: string
  } | null
}

interface KanbanColumnProps {
  id: number
  title: string
  tasks: TaskWithAssignee[]
  columnColor?: string
  allColumns: Column[]
  columnIndex?: number
}

const columnIcons: Record<string, React.ReactNode> = {
  'todo': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  'to do': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  'in progress': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'done': (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export function KanbanColumn({
  id,
  title,
  tasks,
  columnColor = "bg-muted",
  allColumns,
  columnIndex = 0
}: KanbanColumnProps) {
  const icon = columnIcons[title.toLowerCase()] || columnIcons['todo']

  return (
    <div
      className="flex-1 min-w-80"
      style={{ animationDelay: `${columnIndex * 100}ms` }}
    >
      <div className="bg-card/40 glass-card border border-border/40 rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Column Header */}
        <div className="px-5 py-4 border-b border-border/30 column-header-enter">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${columnColor} text-white shadow-sm`}>
                {icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
                <p className="text-xs text-muted-foreground">
                  {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>
            </div>
            <TaskDialog
              columnId={id}
              trigger={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent/20 hover:text-accent-foreground rounded-xl transition-all"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>

        {/* Tasks List */}
        <div className="flex-1 p-3 overflow-y-auto max-h-[600px]">
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                id={task.id.toString()}
                title={task.title}
                description={task.description}
                assigneeId={task.assigneeId}
                priority={task.priority}
                dueDate={task.dueDate?.toISOString()}
                createdAt={task.createdAt?.toISOString()}
                columnId={id}
                allColumns={allColumns}
                cardIndex={index}
              />
            ))}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-1">No tasks yet</p>
                <p className="text-xs text-muted-foreground/70 mb-4 text-center">
                  Get started by adding your first task
                </p>
                <TaskDialog
                  columnId={id}
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-dashed hover:border-solid hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/50 transition-all"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add task
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
