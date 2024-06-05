import fs from 'node:fs/promises'

// name and path
const databasePath = new URL('../db.json', import.meta.url)

export class DataBase {
  #database = {}

  constructor () {
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data);
    })
    .catch( () => {
      this.#persit()
    }) 
  }

  #persit() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? [] 
    // let it change

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some()
      })
    }
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persit();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persit()
    }
  }
  

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persit()
    }
  }
}