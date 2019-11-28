require('dotenv').config()
const env = process.env
const path = require('path')
const BASE_PATH = path.join(__dirname, 'src', 'database')

module.exports = {
  development: {
    client: env.DB_DIALECT,
    connection: {
      host : env.DB_HOST,
      port: env.DB_PORT,
      user : env.DB_USER,
      password : env.DB_PASSWORD,
      database : env.DB_DATABASE
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  },
  test: {
    client: env.DB_DIALECT_TEST,
    connection: {
      host : env.DB_HOST_TEST,
      port: env.DB_PORT_TEST,
      user : env.DB_USER_TEST,
      password : env.DB_PASSWORD_TEST,
      database : env.DB_DATABASE_TEST
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
}