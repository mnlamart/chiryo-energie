import type { LoaderFunctionArgs } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loader(_args: LoaderFunctionArgs) {
  const baseUrl = process.env.BASE_URL || "https://chiryo-energie.sevend.io";

  const securityTxt = `Contact: mailto:chiryoenergie@gmail.com
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: fr
Canonical: ${baseUrl}/.well-known/security.txt
`;

  return new Response(securityTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}


