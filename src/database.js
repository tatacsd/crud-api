import { randomUUID } from 'node:crypto';
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
        this.#seed();
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

  #seed() {
    this.#database = {
      tasks: [
        {
          id: randomUUID(),
          title: 'Build a RESTful API with Node.js',
          description:
            'Create a RESTful API using Node.js and a database of your choice',
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: randomUUID(),
          title: 'Implement user authentication with Node.js',
          description:
            'Add user authentication to a Node.js application using Passport.js or a similar library',
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: randomUUID(),
          title: 'Build a real-time chat application with Node.js',
          description:
            'Create a chat application that allows users to communicate in real-time using Node.js and Socket.io',
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: randomUUID(),
          title: 'Create a web scraper with Node.js',
          description:
            'Build a web scraper that can extract data from a website using Node.js and a scraping library like Cheerio',
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: randomUUID(),
          title: 'Build a command-line tool with Node.js',
          description:
            'Create a command-line tool that can perform a useful task using Node.js and a CLI library like Commander.js',
          completed_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
    };

    this.#persist();
  }
}
