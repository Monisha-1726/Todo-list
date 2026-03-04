import { z } from 'zod';
import { insertTodoSchema, todoSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  todos: {
    list: {
      method: 'GET' as const,
      path: '/api/todos' as const,
      responses: {
        200: z.array(todoSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/todos/:id' as const,
      responses: {
        200: todoSchema,
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/todos' as const,
      input: insertTodoSchema,
      responses: {
        201: todoSchema,
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/todos/:id' as const,
      input: insertTodoSchema.partial(),
      responses: {
        200: todoSchema,
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/todos/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
