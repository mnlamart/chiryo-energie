import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "routes/_index.tsx"),
  route("contact", "routes/contact.tsx"),
  route("tarifs", "routes/tarifs.tsx"),
  route("faqs", "routes/faqs.tsx"),
  route("services/:id", "routes/services.$id.tsx"),
  route("api/images/:category/:imageName", "routes/api.images.$category.$imageName.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("robots.txt", "routes/robots[.]txt.ts"),
  route("content-summary.txt", "routes/content-summary.txt.ts"),
  route(".well-known/security.txt", "routes/.well-known/security.txt.ts"),
  route("health", "routes/health.ts"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

