// Add function to parse JSON request body and set response headers
export async function json(req, res) {
  const buffers = [];

  // read the entire body and push it to the buffers array
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (err) {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}
