import type { Express } from "express";
import { type Server } from "http";
import { connectDB } from "./db";
import { 
  getTodos, 
  getTodo, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from "./controllers/todoController";
import { api } from "@shared/routes";
import Todo from "./models/Todo";

async function seedDatabase() {
  const count = await Todo.countDocuments();
  if (count === 0) {
    await Todo.create([
      {
        title: "Buy groceries",
        description: "Milk, Bread, Cheese, Eggs",
        completed: false
      },
      {
        title: "Finish React project",
        description: "Complete the MERN stack todo app",
        completed: true
      },
      {
        title: "Schedule dentist appointment",
        completed: false
      }
    ]);
    console.log("Database seeded with sample todos");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Connect to MongoDB
  await connectDB();
  
  // Seed DB with sample data
  await seedDatabase();

  // API Routes mapped to controllers
  app.get(api.todos.list.path, getTodos);
  app.get(api.todos.get.path, getTodo);
  app.post(api.todos.create.path, createTodo);
  app.put(api.todos.update.path, updateTodo);
  app.delete(api.todos.delete.path, deleteTodo);

  return httpServer;
}
