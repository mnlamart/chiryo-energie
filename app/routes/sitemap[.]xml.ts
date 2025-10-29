import type { LoaderFunctionArgs } from "react-router";
import { services } from "../../src/data/services";

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = "https://www.chiryo-energie.fr";
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

