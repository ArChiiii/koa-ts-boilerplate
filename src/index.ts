import Koa from "koa";

import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import dotenv from "dotenv";

import exampleActivityRoutes from "./routes/exampleActivity";

dotenv.config();

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      success: false,
      message: err.message,
    };
  }
});

// Routes
app.use(exampleActivityRoutes.routes());

const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => {
  console.log("Koa started at PORT " + PORT);
});

module.exports = server;
