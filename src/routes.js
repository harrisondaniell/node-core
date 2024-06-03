import { randomUUID } from 'node:crypto'
import { DataBase } from "./database.js"
import { buildRoutPath } from './utils/build-route-path.js'

const database = new DataBase()

export const routes = [
  {
    method: 'GET',
    path: buildRoutPath('/users'),
    handler: (request, response) => {
      const users = database.select('users')
      return response.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutPath('/users'),
    handler: (request, response) => {
      const { name, email } = request.body
      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)

      return response.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutPath('/users:id'),
    handler: (request, response) => {}
  }
]