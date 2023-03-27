import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.url.test(url);
  });

  if (route) {
    const routeParams = url.match(route.url);
    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};
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
