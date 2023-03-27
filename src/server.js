import http from 'node:http';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log('method', method);
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
