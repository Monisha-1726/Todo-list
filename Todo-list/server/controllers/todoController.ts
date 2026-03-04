import { Request, Response } from 'express';
import Todo from '../models/Todo';
import { api } from '@shared/routes';
import { z } from 'zod';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    const formattedTodos = todos.map(todo => ({
      _id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString()
    }));
    
    res.status(200).json(formattedTodos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.status(200).json({
      _id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      createdAt: todo.createdAt.toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const input = api.todos.create.input.parse(req.body);
    
    const todo = new Todo({
      title: input.title,
      description: input.description,
      completed: input.completed || false
    });
    
    const savedTodo = await todo.save();
    
    res.status(201).json({
      _id: savedTodo._id.toString(),
      title: savedTodo.title,
      description: savedTodo.description,
      completed: savedTodo.completed,
      createdAt: savedTodo.createdAt.toISOString()
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
        field: error.errors[0].path.join('.')
      });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const input = api.todos.update.input.parse(req.body);
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    if (input.title !== undefined) todo.title = input.title;
    if (input.description !== undefined) todo.description = input.description;
    if (input.completed !== undefined) todo.completed = input.completed;
    
    const updatedTodo = await todo.save();
    
    res.status(200).json({
      _id: updatedTodo._id.toString(),
      title: updatedTodo.title,
      description: updatedTodo.description,
      completed: updatedTodo.completed,
      createdAt: updatedTodo.createdAt.toISOString()
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors[0].message,
        field: error.errors[0].path.join('.')
      });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await todo.deleteOne();
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
