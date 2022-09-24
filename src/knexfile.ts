import { resolve } from "path";

import * as dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// Update with your config settings.
const BASE_PATH = resolve(__dirname, "db");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_TEST_HOST,
      user: process.env.DB_TEST_USER,
      password: process.env.DB_TEST_PASS,
      database: process.env.DB_TEST_NAME,
    },
    migrations: {
      directory: resolve(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: resolve(BASE_PATH, "seeds"),
    },
  },
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_DEV_HOST,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
      database: process.env.DB_DEV_NAME,
    },
    migrations: {
      directory: resolve(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: resolve(BASE_PATH, "seeds"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
