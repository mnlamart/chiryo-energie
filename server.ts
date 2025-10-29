import { createRequestHandler } from "@react-router/express";
import type { ServerBuild } from "react-router";
import compression from "compression";
import express from "express";
// build/server/index.js is generated and doesn't have types, but we can type it as ServerBuild
// @ts-expect-error - build/server/index.js is generated and doesn't have types
import * as buildModule from "./build/server/index.js";

// Type assertion: the generated build matches ServerBuild interface
const build = buildModule as unknown as ServerBuild;

const app = express();

// compress responses
app.use(compression());

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/assets",
  express.static("build/client/assets", {
    immutable: true,
    maxAge: "1y",
    fallthrough: false,
  })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

// handle React Router requests (catch-all)
const requestHandler = createRequestHandler({
  build,  
  mode: process.env.NODE_ENV || "production",
});
// Express 5: handle async middleware properly
app.use((req, res, next) => {
  void requestHandler(req, res, next);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
