import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    url: '/tasks',
    handler: (req, res) => {
      return res.end(
        JSON.stringify({
          message: 'GET /tasks',
        })
      );
    },
  },
  {
    method: 'POST',
    url: '/tasks',
    handler: (req, res) => {
      // TODO: check if the body is valid
      if (!req.body.title || !req.body.description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Title and description are required',
          })
        );
      }

      // TODO: insert the task into the database
      const task = database.insert('tasks', {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // TODO: return the task
      res.writeHead(201);
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: 'DELETE',
    url: '/tasks/:id',
    handler: (req, res) => {
      return res.end(
        JSON.stringify({
          message: 'DELETE /tasks/:id',
        })
      );
    },
  },
  {
    method: 'PUT',
    url: '/tasks/:id',
    handler: (req, res) => {
      return res.end(
        JSON.stringify({
          message: 'PUT /tasks/:id',
        })
      );
    },
  },
  {
    method: 'PATCH',
    url: '/tasks/:id',
    handler: (req, res) => {
      return res.end(
        JSON.stringify({
          message: 'PATCH /tasks/:id',
        })
      );
    },
  },
];
