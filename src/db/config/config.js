const env = require("dotenv");
env.config();

module.exports = {
    "development": {
        "database": process.env.POSTGRESQL_DATABASE,
        "username": process.env.POSTGRESQL_USER,
        "password": process.env.POSTGRESQL_PASSWORD,
        "host": process.env.POSTGRESQL_HOST,
        "port": process.env.POSTGRESQL_PORT,
        "dialect": "postgres",
    },
    "production": {
        "database": process.env.POSTGRESQL_DATABASE,
        "username": process.env.POSTGRESQL_USER,
        "password": process.env.POSTGRESQL_PASSWORD,
        "host": process.env.POSTGRESQL_HOST,
        "port": process.env.POSTGRESQL_PORT,
        "dialect": "postgres",
    }
};
