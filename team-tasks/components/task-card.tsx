"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Edit3, Calendar, Trash2, ArrowRight } from "lucide-react"
import { assignees, getAssigneeById } from "@/lib/data/assignees"
import { TaskDialog } from "./task-dialog"
import { TaskFormValues } from "@/lib/schemas"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { deleteTask, moveTask } from '@/lib/actions/task';
import { Column } from '@/lib/db/schema';

interface TaskCardProps {
  id: string
  title: string
  description?: string | null
  assigneeId?: string | null
  priority?: "low" | "medium" | "high" | null
  dueDate?: string | null
  createdAt?: string
  columnId: number
  allColumns: Column[]
  cardIndex?: number
}

export function TaskCard({
  id,
  title,
  description,
  assigneeId,
  priority,
  dueDate,
  columnId,
  allColumns = [],
  cardIndex = 0
}: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const priorityConfig = {
    low: {
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-500",
      label: "Low"
    },
    medium: {
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      dot: "bg-amber-500",
      label: "Medium"
    },
    high: {
      color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
      dot: "bg-rose-500 priority-high",
      label: "High"
    }
  }

  const currentAssignee = getAssigneeById(assigneeId) ||
    assignees.find(a => a.id === "unassigned")!

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return { text: 'Overdue', isOverdue: true }
    if (diffDays === 0) return { text: 'Today', isOverdue: false }
    if (diffDays === 1) return { text: 'Tomorrow', isOverdue: false }
    if (diffDays < 7) return { text: `${diffDays} days`, isOverdue: false }

    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue: false
    }
  }

  const editDefaultValues: TaskFormValues = {
    title,
    description: description || "",
    columnId: columnId,
    assigneeId: assigneeId || undefined,
    priority: priority || undefined,
    dueDate: dueDate ? new Date(dueDate) : undefined,
  }

  const handleEditClick = () => {
    setIsEditDialogOpen(true)
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await deleteTask(parseInt(taskId));
      if (!response.success) {
        console.error('Failed to delete task:', response.error);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleMoveTask = async (taskId: string, targetColumnId: number) => {
    try {
      const response = await moveTask(parseInt(taskId), targetColumnId);
      if (!response.success) {
        console.error('Failed to move task:', response.error);
      }
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  const dueDateInfo = formatDate(dueDate)

  return (
    <>
      <Card
        className="task-card-enter group cursor-pointer bg-card border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-border hover:-translate-y-0.5"
        style={{
          boxShadow: 'var(--task-shadow)',
          animationDelay: `${cardIndex * 50}ms`
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--task-shadow-hover)'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'var(--task-shadow)'
        }}
      >
        <CardHeader className="pb-2 pt-4 px-4 space-y-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0 rounded-lg hover:bg-muted"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 rounded-xl p-1.5" align="end">
                <DropdownMenuItem onClick={handleEditClick} className="rounded-lg">
                  <Edit3 className="h-4 w-4 mr-2 opacity-60" />
                  Edit task
                </DropdownMenuItem>
                {allColumns.length > 1 && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="rounded-lg">
                      <ArrowRight className="h-4 w-4 mr-2 opacity-60" />
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="rounded-xl p-1.5">
                      {allColumns
                        .filter((column) => column.id !== columnId)
                        .map((column) => (
                          <DropdownMenuItem
                            key={column.id}
                            onClick={() => handleMoveTask(id, column.id)}
                            className="rounded-lg"
                          >
                            <div className={`w-2 h-2 rounded-full mr-2 ${column.color}`} />
                            {column.title}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
                <DropdownMenuSeparator className="my-1.5" />
                <DropdownMenuItem
                  onClick={() => handleDeleteTask(id)}
                  className="rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2 opacity-60" />
                  Delete task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {description && (
            <CardDescription className="text-xs leading-relaxed line-clamp-2 text-muted-foreground mt-1.5">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="px-4 pb-4 pt-2 space-y-3">
          {/* Priority & Due Date Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {priority && (
              <Badge
                variant="outline"
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${priorityConfig[priority].color}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${priorityConfig[priority].dot}`} />
                {priorityConfig[priority].label}
              </Badge>
            )}
            {dueDateInfo && (
              <Badge
                variant="outline"
                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${dueDateInfo.isOverdue
                    ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                    : 'bg-muted text-muted-foreground border-transparent'
                  }`}
              >
                <Calendar className="w-3 h-3 mr-1 opacity-60" />
                {dueDateInfo.text}
              </Badge>
            )}
          </div>

          {/* Assignee */}
          {currentAssignee.id !== "unassigned" && (
            <div className="flex items-center gap-2 pt-1">
              <Avatar className="h-6 w-6 ring-2 ring-background">
                <AvatarImage src={currentAssignee.avatar} alt={currentAssignee.name} />
                <AvatarFallback className="text-[10px] font-semibold bg-accent/20 text-accent-foreground">
                  {currentAssignee.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-foreground/90 truncate">
                  {currentAssignee.name}
                </span>
                {currentAssignee.role && (
                  <span className="text-[10px] text-muted-foreground truncate">
                    {currentAssignee.role}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <TaskDialog
        columnId={columnId}
        mode="edit"
        defaultValues={editDefaultValues}
        taskId={parseInt(id)}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </>
  )
}
