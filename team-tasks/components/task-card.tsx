"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Edit3, Calendar, Clock, Trash2 } from "lucide-react"
import { assignees, getAssigneeById } from "@/lib/data/assignees"
import { TaskDialog } from "./task-dialog"
import { TaskFormValues } from "@/lib/schemas"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
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
}

export function TaskCard({ 
  id, 
  title, 
  description, 
  assigneeId, 
  priority,
  dueDate,
  createdAt,
  columnId,
  allColumns = []
}: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const priorityConfig = {
    low: { 
      color: "bg-green-500/10 text-green-700 hover:bg-green-500/20 dark:text-green-400", 
      label: "Low Priority" 
    },
    medium: { 
      color: "bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 dark:text-yellow-400", 
      label: "Medium Priority" 
    },
    high: { 
      color: "bg-red-500/10 text-red-700 hover:bg-red-500/20 dark:text-red-400", 
      label: "High Priority" 
    }
  }

  const currentAssignee = getAssigneeById(assigneeId || "unassigned") || 
                          assignees.find(a => a.id === "unassigned")!

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  // Prepare default values for editing
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

  // Function to handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    try {
      console.log(`Deleting task ${taskId} from the database`);
      const response = await deleteTask(parseInt(taskId));
      if (response.success) {
        console.log('Task deleted successfully');
        // Update frontend state to remove the task
        // This would typically involve updating the state in a parent component or context
      } else {
        console.error('Failed to delete task:', response.error);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Function to handle task movement
  const handleMoveTask = async (taskId: string, targetColumnId: number) => {
    try {
      console.log(`Moving task ${taskId} to column ${targetColumnId}`);
      const response = await moveTask(parseInt(taskId), targetColumnId);
      if (response.success) {
        console.log('Task moved successfully');
        // Update frontend state to reflect the task movement
        // This would typically involve updating the state in a parent component or context
      } else {
        console.error('Failed to move task:', response.error);
      }
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  return (
    <>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 border-border/50 hover:border-border mb-3 bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-3 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 p-2" align="end">
                <DropdownMenuItem onClick={() => handleEditClick()}>
                  <Edit3 className="h-3 w-3 mr-2" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteTask(id)}>
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete Task
                </DropdownMenuItem>
                {allColumns.length > 1 && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {allColumns
                        .filter((column) => column.id !== columnId)
                        .map((column) => (
                          <DropdownMenuItem
                            key={column.id}
                            onClick={() => handleMoveTask(id, column.id)}
                          >
                            {column.title}
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {description && (
            <CardDescription className="text-xs leading-relaxed line-clamp-2 text-muted-foreground">
              {description}
            </CardDescription>
          )}

          {priority && priority !== null && (
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={`text-xs font-medium px-2 py-1 ${priorityConfig[priority].color}`}
              >
                {priorityConfig[priority].label}
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <Separator className="opacity-50" />
          
          {/* Time Information */}
          {(dueDate || createdAt) && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Due {formatDate(dueDate)}</span>
                </div>
              )}
              {createdAt && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Created {formatDate(createdAt)}</span>
                </div>
              )}
            </div>
          )}

          {/* Assignee Section */}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={currentAssignee.avatar} alt={currentAssignee.name} />
              <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                {currentAssignee.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground/80">
                {currentAssignee.name}
              </span>
              {currentAssignee.role && currentAssignee.id !== "unassigned" && (
                <span className="text-xs text-muted-foreground">
                  {currentAssignee.role}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
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