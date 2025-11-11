import { useRouteLoaderData } from "react-router";
import FAQs from "../components/FAQs";
import Breadcrumbs from "../components/Breadcrumbs";
import Container from "../components/Container";
import type { loader as rootLoader } from "../root";

export default function FAQsPage() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";

  return (
    <>
      <title>Questions fréquentes - Chiryo Energie</title>
      <meta name="description" content="Questions fréquentes sur les services de bien-être holistique à Joué-Les-Tours. Réponses sur Reiki, Sophro-relaxation, Réflexologie, Magnétisme, tarifs et séances. Consultez nos FAQ." />
      <meta name="summary" content="FAQ sur les services de bien-être holistique proposés par Chiryo Energie à Joué-Les-Tours et Tours (Indre-et-Loire). Réponses aux questions sur Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité, tarifs, séances à distance." />
      <meta name="keywords" content="FAQ Reiki Joué-Les-Tours, questions fréquentes énergéticien Tours, informations services bien-être Indre-et-Loire" />
      <meta property="og:title" content="Questions fréquentes - Chiryo Energie" />
      <meta property="og:description" content="Trouvez les réponses aux questions fréquentes sur nos services de bien-être holistique à Joué-Les-Tours." />
      <meta property="og:url" content={`${baseUrl}/faqs`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:alt" content="Questions fréquentes - Chiryo Energie" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content="Questions fréquentes - Chiryo Energie" />
      <meta name="twitter:description" content="FAQ sur les services de bien-être holistique de Chiryo Energie." />
      <div>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Accueil", path: "/" },
              { label: "Questions fréquentes", path: "/faqs" },
            ]}
          />
        </Container>
        <FAQs />
      </div>
    </>
  );
}

