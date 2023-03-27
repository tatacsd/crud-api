import http from 'node:http';
import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log('method', method);
  console.log('url', url);

  await json(req, res);
  res.end(
    JSON.stringify({
      message: 'Hello World',
    })
  );
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
