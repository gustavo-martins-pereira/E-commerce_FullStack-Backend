import { PostgresDialect } from "@sequelize/postgres";
import { Sequelize } from "@sequelize/core";

// CONNECTION
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.POSTGRESQL_DATABASE,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD,
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
});

try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}