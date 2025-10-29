import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "routes/_index.tsx"),
  route("contact", "routes/contact.tsx"),
  route("services/:id", "routes/services.$id.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.ts"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;

