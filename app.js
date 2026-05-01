import "dotenv/config";
import express from "express";
import morgan from "morgan";
import http from "http";

import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(errorHandler.notFound);
app.use(errorHandler.errors);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});