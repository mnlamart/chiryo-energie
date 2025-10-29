import type { LoaderFunctionArgs } from "react-router";
import { services } from "~/data/services";
import { contactInfo } from "~/data/content";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const summary = `Chiryo Energie - Services de bien-être holistique

Localisation: Joué-Les-Tours, Tours, Indre-et-Loire, Centre-Val de Loire, France

Coordonnées:
- Téléphone: ${contactInfo.phone}
- Email: ${contactInfo.email}
- Site web: https://www.chiryo-energie.fr

Services proposés:

${services
  .map(
    (service) => `- ${service.title}
  Description: ${service.description}
  Tarif: ${service.price}${service.duration ? ` | Durée: ${service.duration}` : ""}
  Disponibilité: ${service.id === "reiki" || service.id === "magnetiseuse" || service.id === "mediumnite" ? "Présentiel, à domicile ou à distance" : "Présentiel ou à domicile"}
`
  )
  .join("\n")}

Spécialités: Psycho énergéticienne, Maître enseignante en Reiki, Magnétiseuse coupeuse de feu, Voyante, Médium, Sophro relaxologue

Mise à jour: ${new Date().toISOString().split("T")[0]}
`;

  return new Response(summary, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};


