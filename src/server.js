import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async (request, response) => {
  // method and path
  const { method, url } = request;

  await json(request, response);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    if (routeParams && routeParams.groups) {
      const { query, ...params } = routeParams.groups;

      // Verifica se query está definida
      request.params = params;
      request.query = query ? extractQueryParams(query) : {};

      return route.handler(request, response);
    }
  }

  return response.writeHead(404).end();
});

server.listen(3333, () => {
  console.log('Server is listening on port 3333');
});
