import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import * as build from "./build/server/index.js";

const app = express();

// compress responses
app.use(compression());

// serve static assets
app.use(express.static("build/client", { immutable: true, maxAge: "1y" }));

// handle React Router requests
app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV || "production",
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
