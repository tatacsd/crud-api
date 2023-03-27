import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRouteUrl } from './utils/build-route-paths.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    url: buildRouteUrl('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.query;
      // If the title query parameter is present, only tasks with a matching title are returned.
      // If the description query parameter is present, only tasks with a description are returned.
      // If neither query parameter is present, all tasks are returned.
      const filter = {};
      if (title) {
        filter.title = title;
      }
      if (description) {
        filter.description = description;
      }
      const tasks = database.select('tasks', filter ?? null);

      res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    url: buildRouteUrl('/tasks'),
    handler: (req, res) => {
      // check if the body is valid
      if (!req.body.title || !req.body.description) {
        return res.writeHead(400).end(
          JSON.stringify({
            message: 'Title and description are required',
          })
        );
      }

      // insert the task into the database
      const task = database.insert('tasks', {
        id: randomUUID(),
        title: req.body.title,
        description: req.body.description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // return the task
      res.writeHead(201);
      return res.end(JSON.stringify(task));
    },
  },
  {
    method: 'DELETE',
    url: buildRouteUrl('/tasks/:id'),
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
    url: buildRouteUrl('/tasks/:id'),
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
    url: buildRouteUrl('/tasks/:id'),
    handler: (req, res) => {
      return res.end(
        JSON.stringify({
          message: 'PATCH /tasks/:id',
        })
      );
    },
  },
];
