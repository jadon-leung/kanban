// "use client"

// import { useState } from "react"
// import { KanbanColumn } from "./kanban-column"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Plus } from "lucide-react"
// import { assignees } from "@/lib/data/assignees"
import { getAssigneeSelectOptions } from '@/lib/data/assignees';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

// interface Task {
//   id: string
//   title: string
//   description?: string | null
//   assigneeId?: string | null
//   priority?: "low" | "medium" | "high" | null
//   status: "todo" | "in-progress" | "done"
//   dueDate?: Date | null
//   createdAt?: Date | null
// }

// export function KanbanBoard() {
//   const [tasks, setTasks] = useState<Task[]>([
//     {
//       id: "1",
//       title: "Design landing page wireframes",
//       description: "Create comprehensive wireframes and mockups for the new landing page with responsive design considerations",
//       assigneeId: "alice-johnson",
//       priority: "high",
//       status: "todo",
//       dueDate: new Date("2024-01-15"),
//       createdAt: new Date("2024-01-01")
//     },
//     {
//       id: "2",
//       title: "Setup CI/CD pipeline",
//       description: "Configure GitHub Actions for automated testing, building, and deployment to staging and production environments",
//       assigneeId: "bob-smith",
//       priority: "medium",
//       status: "todo",
//       dueDate: new Date("2024-01-20"),
//       createdAt: new Date("2024-01-02")
//     },
//     {
//       id: "3",
//       title: "Implement user authentication system",
//       description: "Add secure user login, registration, password reset, and session management functionality using JWT tokens",
//       assigneeId: "charlie-brown",
//       priority: "high",
//       status: "in-progress",
//       dueDate: new Date("2024-01-25"),
//       createdAt: new Date("2024-01-03")
//     },
//     {
//       id: "4",
//       title: "Write comprehensive unit tests",
//       description: "Add test coverage for all core components, utilities, and API endpoints with 90%+ coverage target",
//       assigneeId: "alice-johnson",
//       priority: "low",
//       status: "in-progress",
//       createdAt: new Date("2024-01-04")
//     },
//     {
//       id: "5",
//       title: "Database schema design and setup",
//       description: "Configure PostgreSQL database with optimized schema, indexes, and initial migration scripts",
//       assigneeId: "bob-smith",
//       priority: "medium",
//       status: "done",
//       createdAt: new Date("2023-12-28")
//     },
//     {
//       id: "6",
//       title: "API documentation",
//       description: "Create comprehensive API documentation using OpenAPI/Swagger specifications",
//       assigneeId: "diana-prince",
//       priority: "low",
//       status: "done",
//       createdAt: new Date("2023-12-30")
//     }
//   ])

//   const [isDialogOpen, setIsDialogOpen] = useState(false)
//   const [newTaskStatus, setNewTaskStatus] = useState<"todo" | "in-progress" | "done">("todo")

//   const todoTasks = tasks.filter(task => task.status === "todo")
//   const inProgressTasks = tasks.filter(task => task.status === "in-progress")
//   const doneTasks = tasks.filter(task => task.status === "done")

//   const handleAddTask = (status: "todo" | "in-progress" | "done") => {
//     setNewTaskStatus(status)
//     setIsDialogOpen(true)
//   }

const assigneeOptions = getAssigneeSelectOptions();

// Define types for taskId and newAssigneeId
const handleAssigneeChange = (taskId: string, newAssigneeId: string) => {
  // Logic to update the assignee for the task
  console.log(`Task ${taskId} assigned to ${newAssigneeId}`);
};

// Ensure taskId is available in the component scope
const taskId = 'exampleTaskId'; // Replace with actual taskId logic

//   const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>("unassigned")

//   const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const formData = new FormData(event.currentTarget)
    
//     const newTask: Task = {
//       id: Date.now().toString(),
//       title: formData.get("title") as string,
//       description: formData.get("description") as string,
//       assigneeId: selectedAssigneeId,
//       priority: formData.get("priority") as "low" | "medium" | "high",
//       status: newTaskStatus,
//       dueDate: formData.get("dueDate") as string,
//       createdAt: new Date().toISOString()
//     }

//     setTasks(prev => [...prev, newTask])
//     setIsDialogOpen(false)
//     setSelectedAssigneeId("unassigned")
//     event.currentTarget.reset()
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Project Board</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             Manage your team's tasks and track progress
//           </p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button onClick={() => handleAddTask("todo")}>
//               <Plus className="h-4 w-4 mr-2" />
//               Add Task
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Create New Task</DialogTitle>
//               <DialogDescription>
//                 Add a new task to your kanban board with all the details.
//               </DialogDescription>
//             </DialogHeader>
//             <form onSubmit={handleCreateTask} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Task Title</Label>
//                 <Input id="title" name="title" placeholder="Enter task title" required />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Input id="description" name="description" placeholder="Enter task description" />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="assignee">Assignee</Label>
//                   <Select value={selectedAssigneeId} onValueChange={setSelectedAssigneeId}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select assignee" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {assignees.map((person) => (
//                         <SelectItem key={person.id} value={person.id}>
//                           <div className="flex items-center gap-2">
//                             <Avatar className="h-4 w-4">
//                               <AvatarImage src={person.avatar} alt={person.name} />
//                               <AvatarFallback className="text-xs">
//                                 {person.initials}
//                               </AvatarFallback>
//                             </Avatar>
//                             <div className="flex flex-col items-start">
//                               <span className="text-sm">{person.name}</span>
//                               {person.role && person.id !== "unassigned" && (
//                                 <span className="text-xs text-muted-foreground">
//                                   {person.role}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="dueDate">Due Date</Label>
//                   <Input id="dueDate" name="dueDate" type="date" />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="priority">Priority</Label>
//                 <select 
//                   id="priority" 
//                   name="priority" 
//                   className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
//                   defaultValue="medium"
//                 >
//                   <option value="low">Low Priority</option>
//                   <option value="medium">Medium Priority</option>
//                   <option value="high">High Priority</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-2 pt-4">
//                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button type="submit">Create Task</Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="flex gap-6 overflow-x-auto pb-4">
//         <KanbanColumn
//           title="To Do"
//           tasks={todoTasks}
//           onAddTask={() => handleAddTask("todo")}
//           columnColor="bg-blue-500"
//           onAssigneeChange={handleAssigneeChange}
//         />
//         <KanbanColumn
//           title="In Progress"
//           tasks={inProgressTasks}
//           onAddTask={() => handleAddTask("in-progress")}
//           columnColor="bg-yellow-500"
//           onAssigneeChange={handleAssigneeChange}
//         />
//         <KanbanColumn
//           title="Done"
//           tasks={doneTasks}
//           onAddTask={() => handleAddTask("done")}
//           columnColor="bg-green-500"
//           onAssigneeChange={handleAssigneeChange}
//         />
//       </div>
//     </div>
//   )
// } 

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button>Edit Assignee</button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    {assigneeOptions.map(option => (
      <DropdownMenuItem key={option.value} onClick={() => handleAssigneeChange(taskId, option.value)}>
        {option.label}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu> 