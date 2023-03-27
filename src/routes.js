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
      const tasks = database.select('tasks', filter || null);

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
    method: 'PUT',
    url: buildRouteUrl('/tasks/:id'),
    handler: (req, res) => {
      // TODO: check if the task exists - id is valid

      const { id } = req.params;
      const filter = {};
      if (id) {
        filter.id = id;
      }
      const task = database.select('tasks', filter || null);
      console.log('task: ', task);
      if (!task || task.length !== 1) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: 'Task not found',
          })
        );
      }
      // check if the body is valid - title and/or description are present
      if (!req.body.title && !req.body.description) {
        res.writeHead(400).end(
          JSON.stringify({
            message: 'Title and/or description are required',
          })
        );
      }

      // update the task in the database - and update the updated_at field
      const updatedTask = database.update(
        'tasks',
        { id },
        {
          title: req.body.title ? req.body.title : task[0].title,
          description: req.body.description
            ? req.body.description
            : task[0].description,
          updated_at: new Date(),
        }
      );
      console.log('updatedTask: ', updatedTask);
      //   console.log('task: ', task);

      // return the task
      return res.writeHead(200).end(JSON.stringify(updatedTask));
    },
  },

  {
    method: 'DELETE',
    url: buildRouteUrl('/tasks/:id'),
    handler: (req, res) => {
      // TODO: Check if the task exists - id is valid
      const { id } = req.params;
      const filter = {};
      if (id) {
        filter.id = id;
      }
      const task = database.select('tasks', filter || null);

      if (!task || task.length !== 1) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: 'Task not found',
          })
        );
      }

      // delete the task from the database
      database.delete('tasks', id);

      return res.writeHead(204).end();
    },
  },

  {
    method: 'PATCH',
    url: buildRouteUrl('/tasks/:id'),
    handler: (req, res) => {
      // TODO: Check if the task exists - id is valid
      const { id } = req.params;
      const filter = {};
      if (id) {
        filter.id = id;
      }
      const task = database.select('tasks', filter || null);

      if (!task || task.length !== 1) {
        return res.writeHead(404).end(
          JSON.stringify({
            message: 'Task not found',
          })
        );
      }

      // check if the task is already completed
      const isCompleted = task[0].completed_at;
      const completed_at = isCompleted ? null : new Date();

      // update the task in the database - and update the updated_at field
      const updatedTask = database.update(
        'tasks',
        { id },
        {
          completed_at: completed_at,
          updated_at: new Date(),
        }
      );

      // return the task
      return res.writeHead(200).end(JSON.stringify(updatedTask));
    },
  },
];
