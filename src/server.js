import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import http from "http";

import routes from "./routes/routes.js";
import "./redis/redisClient.js";

// Express/Server configurations
const app = express();
const port = 3000;

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://e-commerce-full-stack-frontend.vercel.app" : true,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Service for avoid inactivity in Backend Deploy
cron.schedule("* * * * *", () => {
    const options = {
        hostname: "https://e-commerce-fullstack-backend.onrender.com",
        port: 3000,
        path: "/check",
        method: "GET",
    };

    const req = http.request(options, (res) => {
        res.on("end", () => {
            console.log("Success on check");
        });
    });

    req.on("error", (error) => {
        console.error("Error on check:", error);
    });

    req.end();
});
