import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/routes.js";
import "./redis/redisClient.js";

// Express/Server configurations
const app = express();
const port = 3000;

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN : true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
