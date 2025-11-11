import type { LoaderFunctionArgs } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loader(_args: LoaderFunctionArgs) {
  const baseUrl = process.env.BASE_URL || "https://chiryo-energie.sevend.io";
  const allowIndexing = process.env.ALLOW_INDEXING === "true";

  // If indexing is not allowed, disallow all crawling
  if (!allowIndexing) {
    const robots = `User-agent: *
Disallow: /

# Indexing is disabled for this environment
# Set ALLOW_INDEXING=true to enable search engine indexing
`;

    return new Response(robots, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Indexing is allowed - provide permissive robots.txt
  const robots = `User-agent: *
Allow: /
Crawl-delay: 1

# AI Crawlers - Allow AI training crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

# Disallow admin or private areas (if any in future)
# Disallow: /admin/
# Disallow: /private/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


