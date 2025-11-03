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

// Long-term cache for on-demand transformed images (1 year, immutable)
app.use(
  "/cache/images",
  express.static("build/cache/images", {
    immutable: true,
    maxAge: "1y",
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

// Fingerprinted assets (1 year, immutable)
app.use(
  "/assets",
  express.static("build/client/assets", {
    immutable: true,
    maxAge: "1y",
    fallthrough: false,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

// Other static files (24 hours for most, 5 minutes for HTML)
// Skip dynamic routes that should be handled by React Router
app.use((req, res, next) => {
  // Dynamic routes handled by React Router
  const dynamicRoutes = ['/robots.txt', '/sitemap.xml', '/content-summary.txt', '/.well-known/security.txt'];
  if (dynamicRoutes.includes(req.path)) {
    return next();
  }
  
  // Serve static files
  express.static("build/client", { 
    maxAge: "1d",
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.setHeader("Cache-Control", "public, max-age=300, must-revalidate");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  })(req, res, next);
});

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
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
