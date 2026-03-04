import { type Todo } from "@shared/schema";
import { CheckCircle2, CircleDashed, ListTodo } from "lucide-react";
import { motion } from "framer-motion";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <StatCard 
        title="Total Tasks" 
        value={total} 
        icon={<ListTodo className="w-5 h-5 text-primary" />} 
        delay={0.1} 
      />
      <StatCard 
        title="Completed" 
        value={completed} 
        icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} 
        delay={0.2} 
      />
      <StatCard 
        title="Pending" 
        value={pending} 
        icon={<CircleDashed className="w-5 h-5 text-amber-500" />} 
        delay={0.3} 
      />
      
      {/* Progress Bar Row */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 sm:col-span-3 mt-2 bg-card p-6 rounded-2xl clean-shadow border border-border/40 flex flex-col justify-center"
      >
        <div className="flex justify-between items-end mb-3">
          <div>
            <h4 className="text-sm font-semibold text-foreground tracking-wide uppercase">Progress</h4>
            <p className="text-xs text-muted-foreground mt-1">{progress}% of tasks completed</p>
          </div>
          <span className="text-3xl font-display font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]" 
                 style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', transform: 'skewX(-20deg)' }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon, delay }: { title: string, value: number, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-card p-5 rounded-2xl clean-shadow border border-border/40 flex items-center justify-between"
    >
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h3 className="text-3xl font-display font-bold text-foreground">{value}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
        {icon}
      </div>
    </motion.div>
  );
}
