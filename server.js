import { createRequestHandler } from "@react-router/node";
import * as build from "./build/server/index.js";
import { createServer } from "http";

const requestHandler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV || "production",
});

const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
  requestHandler(req, res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

