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
      return res.end(
        JSON.stringify({
          message: 'POST /tasks',
        })
      );
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
