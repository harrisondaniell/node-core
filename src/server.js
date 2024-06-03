import http from 'node:http'

const users = [];

const server = http.createServer((request, response) => {
  // method and path
  const { method, url } = request;
  console.log(request.headers)

  if (method === 'GET' && url === '/users') {
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Microsof',
      email: 'microsoft@outlook.com'
    })

    return response.writeHead(201).end();
  }
   
  return response.writeHead(404).end()
})

server.listen(3333)