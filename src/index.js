import express from "express";
import pool from "./db/connection.js";

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const result = await pool.query("SELECT * FROM users");

    res.send(result.rows);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
