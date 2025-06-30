"use server"

import { db } from "@/lib/db/connection"
import { tasks } from "@/lib/db/schema"
import { taskFormSchema, TaskFormValues } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

export async function createTask(data: TaskFormValues) {
  try {
    console.log("Creating task with data:", data)
    
    // Server-side validation using the same schema
    const validatedData = taskFormSchema.parse(data)
    
    // Get the highest position in the column to add the new task at the end
    const existingTasks = await db
      .select({ position: tasks.position })
      .from(tasks)
      .where(eq(tasks.columnId, validatedData.columnId))
      .orderBy(tasks.position)
    
    const nextPosition = existingTasks.length > 0 
      ? Math.max(...existingTasks.map(t => t.position)) + 1 
      : 0

    const result = await db.insert(tasks).values({
      title: validatedData.title,
      description: validatedData.description || null,
      columnId: validatedData.columnId,
      assigneeId: validatedData.assigneeId || null,
      priority: validatedData.priority || "medium",
      position: nextPosition,
      dueDate: validatedData.dueDate || null,
    }).returning()

    console.log("Task created successfully:", result[0])
    
    // Revalidate the page to show the new task
    revalidatePath("/")
    
    return { success: true, task: result[0] }
  } catch (error) {
    console.error("Error creating task:", error)
    
    // Handle validation errors specifically
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(`Validation failed: ${error.message}`)
    }
    
    throw new Error("Failed to create task")
  }
}

export async function updateTask(data: TaskFormValues & { id: number }) {
  try {
    console.log("Updating task with data:", data)
    
    // Extract the id and validate the rest of the data
    const { id, ...taskData } = data
    const validatedData = taskFormSchema.parse(taskData)
    
    const result = await db.update(tasks)
      .set({
        title: validatedData.title,
        description: validatedData.description || null,
        assigneeId: validatedData.assigneeId || null,
        priority: validatedData.priority || "medium",
        dueDate: validatedData.dueDate || null,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning()

    console.log("Task updated successfully:", result[0])
    
    // Revalidate the page to show the updated task
    revalidatePath("/")
    
    return { success: true, task: result[0] }
  } catch (error) {
    console.error("Error updating task:", error)
    
    // Handle validation errors specifically
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error(`Validation failed: ${error.message}`)
    }
    
    throw new Error("Failed to update task")
  }
}

export async function deleteTask(taskId: number) {
  try {
    console.log(`Deleting task with ID: ${taskId}`);
    
    // Delete the task from the database
    const result = await db.delete(tasks)
      .where(eq(tasks.id, taskId))
      .returning();

    console.log("Task deleted successfully:", result[0]);
    
    // Revalidate the page to reflect the deletion
    revalidatePath("/");
    
    return { success: true, task: result[0] };
  } catch (error) {
    console.error("Error deleting task:", error);
    
    // Handle errors
    return { success: false, error: "Failed to delete task" };
  }
}

export async function moveTask(taskId: number, targetColumnId: number) {
  try {
    // Get the highest position in the target column
    const existingTasks = await db
      .select({ position: tasks.position })
      .from(tasks)
      .where(eq(tasks.columnId, targetColumnId))
      .orderBy(tasks.position);

    const nextPosition = existingTasks.length > 0 
      ? Math.max(...existingTasks.map(t => t.position)) + 1 
      : 0;

    // Update the task's column and position
    const result = await db.update(tasks)
      .set({
        columnId: targetColumnId,
        position: nextPosition,
      })
      .where(eq(tasks.id, taskId))
      .returning();

    console.log("Task moved successfully:", result[0]);
    
    // Revalidate the page to reflect the task movement
    revalidatePath("/");
    
    return { success: true, task: result[0] };
  } catch (error) {
    console.error("Error moving task:", error);
    return { success: false, error: "Failed to move task" };
  }
} 