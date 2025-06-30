import * as z from "zod"

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  columnId: z.number(),
  assigneeId: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.date().optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema> 