import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log('method', method);
  console.log('url', url);

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.url === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  res.end(
    JSON.stringify({
      message: 'Hello World',
    })
  );
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
