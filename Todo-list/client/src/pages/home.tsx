import { useTodos } from "@/hooks/use-todos";
import { TodoItem } from "@/components/todo-item";
import { TodoDialog } from "@/components/todo-dialog";
import { TodoStats } from "@/components/todo-stats";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, ListX } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: todos, isLoading, error } = useTodos();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20 relative selection:bg-primary selection:text-primary-foreground">
      {/* Decorative background blur */}
      <div className="absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 relative z-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight"
            >
              Overview
            </h1>
            <p 
              className="text-muted-foreground mt-2 text-lg"
            >
              Organize your day, efficiently and beautifully.
            </p>
          </div>
          
          <div>
            <Button 
              onClick={() => setIsCreateOpen(true)}
              size="lg"
              className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Task
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary/40" />
            <p className="font-medium animate-pulse">Loading your tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-destructive mb-2">Failed to load tasks</h3>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        ) : (
          <>
            <TodoStats todos={todos || []} />

            <div className="mt-12 mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-display font-semibold">Your Tasks</h2>
            </div>

            {todos && todos.length === 0 ? (
              <div 
                className="text-center py-24 px-6 bg-card/50 border border-dashed rounded-3xl"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ListX className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">No tasks yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8 text-lg">
                  You've got a clean slate. Create your first task and start getting things done.
                </p>
                <Button 
                  onClick={() => setIsCreateOpen(true)}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary/20 hover:bg-primary/5 px-8"
                >
                  Create a task
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                  {/* Sort: Pending first, then completed */}
                  {todos?.sort((a, b) => {
                    if (a.completed === b.completed) {
                      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    }
                    return a.completed ? 1 : -1;
                  }).map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      <TodoDialog 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen} 
      />
    </div>
  );
}
