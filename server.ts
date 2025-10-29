import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import * as build from "./build/server/index.js";

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
app.use(
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV || "production",
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
