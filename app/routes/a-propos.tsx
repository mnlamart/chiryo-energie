import { useRouteLoaderData } from "react-router";
import About from "../components/About";
import type { loader as rootLoader } from "../root";

export default function AboutPage() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";

  return (
    <>
      <title>À propos - Chiryo Energie</title>
      <meta name="description" content="Découvrez qui est Chiryo Energie, Psycho énergéticienne à Joué-Les-Tours : Magnétiseuse coupeuse de feu, Maître enseignante en Reiki, Sophro relaxologue, voyante et médium." />
      <meta name="summary" content="Chiryo Energie, Psycho énergéticienne à Joué-Les-Tours et Tours (Indre-et-Loire). Magnétiseuse coupeuse de feu, Maître enseignante en Reiki, Sophro relaxologue, voyante et médium. Héritage familial en énergétique et développement personnel." />
      <meta name="keywords" content="Chiryo Energie, psycho énergéticienne Joué-Les-Tours, magnétiseuse Tours, maître reiki Indre-et-Loire, voyante Centre-Val de Loire" />
      <meta property="og:title" content="À propos - Chiryo Energie" />
      <meta property="og:description" content="Découvrez qui est Chiryo Energie, Psycho énergéticienne à Joué-Les-Tours." />
      <meta property="og:url" content={`${baseUrl}/a-propos`} />
      <meta name="twitter:title" content="À propos - Chiryo Energie" />
      <meta name="twitter:description" content="Chiryo Energie, Psycho énergéticienne à Joué-Les-Tours." />
      <div>
        <About />
      </div>
    </>
  );
}

