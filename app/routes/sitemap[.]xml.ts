import type { LoaderFunctionArgs } from "react-router";
import { services } from "../data/services";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loader(_args: LoaderFunctionArgs) {
  const baseUrl = process.env.BASE_URL || "https://chiryo-energie.sevend.io";
  const allowIndexing = process.env.ALLOW_INDEXING === "true";

  // If indexing is disabled, return 404 to prevent URL discovery
  if (!allowIndexing) {
    return new Response("Sitemap not available - indexing is disabled", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const currentDate = new Date().toISOString().split("T")[0];

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      loc: `${baseUrl}/faqs`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.9",
    },
    {
      loc: `${baseUrl}/tarifs`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8",
    },
    ...services.map((service) => ({
      loc: `${baseUrl}/services/${service.id}`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.9",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

