import express from "express";

import "./config/dotenv.js";
import "./db/connection.js";
import routes from "./routes/routes.js";

// Express/Server configurations
const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
