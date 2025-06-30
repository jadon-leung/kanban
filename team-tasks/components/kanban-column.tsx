import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import { Task } from "@/lib/db/schema"
import { TaskDialog } from "./task-dialog"
import { Column } from "@/lib/db/schema"

// Extend the database Task type with the assignee relation
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
}

export function KanbanColumn({ 
  id,
  title, 
  tasks, 
  columnColor = "bg-muted",
  allColumns
}: KanbanColumnProps) {
  return (
    <div className="flex-1 min-w-80">
      <Card className="h-full bg-muted/30">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${columnColor}`}></div>
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full border">
                {tasks.length}
              </span>
            </div>
            <TaskDialog
              columnId={id}
              trigger={
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {tasks.map((task) => (
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
              />
            ))}
            {tasks.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <Plus className="h-8 w-8 text-muted-foreground/50" />
                  <p>No tasks yet</p>
                  <TaskDialog
                    columnId={id}
                    trigger={
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-1" />
                        Add your first task
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 