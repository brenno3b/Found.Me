require('dotenv').config();

const db_username = process.env.TYPEORM_USERNAME;
const db_password = process.env.TYPEORM_PASSWORD;
const db_database = process.env.TYPEORM_DATABASE;

module.exports = {
  "type": "mssql",
  "host": "localhost",
  "port": 1433,
  "username": db_username,
  "password": db_password,
  "database": db_database,
  "logging": false,
  "entities": [
    "src/entities/*.ts"
  ],
  "migrations": [
    "src/database/migrations/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entities",
    "migrationsDir": "src/database/migrations"
  },
  "extra": {
    "trustServerCertificate": true
  }
}