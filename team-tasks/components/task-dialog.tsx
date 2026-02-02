"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assignees } from "@/lib/data/assignees";
import { createTask, updateTask } from "@/lib/actions/task";
import { useState, useTransition, useEffect } from "react";
import { taskFormSchema, type TaskFormValues } from "@/lib/schemas";
import { Loader2, Sparkles } from "lucide-react";

interface TaskDialogProps {
  trigger?: React.ReactNode;
  columnId: number;
  mode?: "create" | "edit";
  defaultValues?: TaskFormValues;
  taskId?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TaskDialog({
  trigger,
  columnId,
  mode = "create",
  defaultValues,
  taskId,
  open: controlledOpen,
  onOpenChange,
}: TaskDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      columnId: columnId,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  async function handleSubmit(data: TaskFormValues) {
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createTask(data);
        } else {
          if (!taskId) {
            throw new Error("No taskId provided for edit mode");
          }
          await updateTask({ ...data, id: taskId });
        }
        form.reset();
        setOpen(false);
      } catch (error) {
        console.error(`Failed to ${mode} task:`, error);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          form.reset();
        }
        setOpen(newOpen);
      }}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[440px] rounded-2xl p-0 gap-0 overflow-hidden border-border/50">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                {mode === "create" ? "New Task" : "Edit Task"}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {mode === "create"
                  ? "Add a new task to your board"
                  : "Update the task details"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-6 py-5 space-y-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What needs to be done?"
                      className="rounded-xl h-11 bg-muted/30 border-border/50 focus:bg-background transition-colors"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add more details..."
                      className="rounded-xl min-h-[100px] resize-none bg-muted/30 border-border/50 focus:bg-background transition-colors"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Priority
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="low" className="rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Low
                          </div>
                        </SelectItem>
                        <SelectItem value="medium" className="rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            Medium
                          </div>
                        </SelectItem>
                        <SelectItem value="high" className="rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            High
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Assignee
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        {assignees.map((assignee) => (
                          <SelectItem
                            key={assignee.id}
                            value={assignee.id}
                            className="rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={assignee.avatar}
                                  alt={assignee.name}
                                />
                                <AvatarFallback className="text-[9px] font-medium">
                                  {assignee.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate">{assignee.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl h-11 border-border/50"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 rounded-xl h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {mode === "create" ? "Creating..." : "Saving..."}
                  </>
                ) : (
                  <>{mode === "create" ? "Create Task" : "Save Changes"}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
