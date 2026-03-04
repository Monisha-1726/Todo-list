import { type Todo } from "@shared/schema";
import { Check, Trash2, Pencil, Clock } from "lucide-react";
import { format } from "date-fns";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/use-todos";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TodoDialog } from "./todo-dialog";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleToggle = () => {
    updateTodo.mutate({ id: todo._id, completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTodo.mutate(todo._id);
    }
  };

  // Safe parsing of date
  const createdAt = typeof todo.createdAt === 'string' ? new Date(todo.createdAt) : todo.createdAt;

  return (
    <>
      <div
        className={`
          group relative p-5 rounded-2xl border transition-all duration-300
          ${todo.completed 
            ? "bg-muted/30 border-transparent shadow-none" 
            : "bg-card border-border/50 clean-shadow hover:border-primary/20 hover:shadow-lg"
          }
        `}
      >
        <div className="flex items-start gap-4">
          <button
            onClick={handleToggle}
            disabled={updateTodo.isPending}
            className={`
              flex-shrink-0 mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/10
              ${todo.completed 
                ? "bg-primary border-primary text-primary-foreground" 
                : "border-muted-foreground/30 hover:border-primary text-transparent"
              }
              ${updateTodo.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`
              text-lg font-semibold truncate transition-colors duration-200 font-display
              ${todo.completed ? "text-muted-foreground line-through" : "text-foreground"}
            `}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className={`
                mt-1.5 text-sm line-clamp-2 leading-relaxed transition-colors duration-200
                ${todo.completed ? "text-muted-foreground/60" : "text-muted-foreground"}
              `}>
                {todo.description}
              </p>
            )}
            
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
              <Clock className="w-3.5 h-3.5" />
              <span>{format(createdAt, 'MMM d, yyyy')}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:flex-col md:flex-row">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsEditDialogOpen(true)}
              className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full"
              title="Edit Task"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
              disabled={deleteTodo.isPending}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-full"
              title="Delete Task"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <TodoDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        todoToEdit={todo} 
      />
    </>
  );
}
