import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTodoSchema, type InsertTodo, type Todo } from "@shared/schema";
import { useCreateTodo, useUpdateTodo } from "@/hooks/use-todos";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

interface TodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todoToEdit?: Todo;
}

export function TodoDialog({ open, onOpenChange, todoToEdit }: TodoDialogProps) {
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const isEditing = !!todoToEdit;
  
  const form = useForm<InsertTodo>({
    resolver: zodResolver(insertTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  // Reset form when dialog opens/closes or when editing a different todo
  useEffect(() => {
    if (open) {
      if (todoToEdit) {
        form.reset({
          title: todoToEdit.title,
          description: todoToEdit.description || "",
          completed: todoToEdit.completed,
        });
      } else {
        form.reset({ title: "", description: "", completed: false });
      }
    }
  }, [open, todoToEdit, form]);

  const onSubmit = (data: InsertTodo) => {
    if (isEditing) {
      updateTodo.mutate(
        { id: todoToEdit._id, ...data },
        { onSuccess: () => onOpenChange(false) }
      );
    } else {
      createTodo.mutate(data, { onSuccess: () => onOpenChange(false) });
    }
  };

  const isPending = createTodo.isPending || updateTodo.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-none shadow-2xl rounded-[1.5rem]">
        <div className="px-6 py-6 border-b bg-muted/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {isEditing ? "Edit Task" : "Create New Task"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              {isEditing ? "Make changes to your task details below." : "What do you need to get done?"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-6 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium">Task Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Buy groceries" 
                      className="h-12 px-4 rounded-xl bg-background border-muted-foreground/20 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
                      {...field} 
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
                  <FormLabel className="text-foreground/80 font-medium">Description <span className="text-muted-foreground font-normal">(Optional)</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add more details about this task..." 
                      className="resize-none min-h-[120px] p-4 rounded-xl bg-background border-muted-foreground/20 focus-visible:ring-primary/20 focus-visible:border-primary transition-all shadow-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4 border-t border-border/50">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="rounded-xl px-6"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="rounded-xl px-8 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
