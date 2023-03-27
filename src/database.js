import fs from 'node:fs/promises';
const databasePath = new URL('../db.json', import.meta.url);
export class Database {
  #database = {};

  // Load the database when the class is instantiated
  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch((err) => {
        console.log(err);
        // if the file doesn't exist, create it
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile('db.json', JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search) // convert the object to an array of key/value pairs
          .some(([key, value]) => {
            // check if any of the key/value pairs match
            return row[key].toLowerCase().includes(value.toLowerCase()); // case insensitive
          });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  delete(table, id) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    // if the id exists, delete the item
    if (index !== -1) {
      this.#database[table].splice(index, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    // if the id exists, update the item
    if (index !== -1) {
      this.#database[table][index] = {
        ...this.#database[table][index], // keep the id
        ...data, // update the data
      };
      this.#persist();
    }
  }
}
