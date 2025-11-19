export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

export const generalFAQs: FAQCategory[] = [
  {
    title: "Prise de rendez-vous et modalités",
    faqs: [
      {
        question: "Comment prendre rendez-vous ?",
        answer: "Vous pouvez me contacter par téléphone au 06.61.86.94.01, par email à chiryoenergie@gmail.com, ou en utilisant le formulaire de contact sur le site. Je suis disponible pour des séances en présentiel à Joué-Les-Tours, à domicile, ou à distance selon le service."
      },
      {
        question: "Faites-vous des séances à domicile ?",
        answer: "Oui, je me déplace à domicile selon le service demandé et votre localisation dans la région de Joué-Les-Tours et Indre-et-Loire. Contactez-moi directement pour discuter de vos besoins et de la disponibilité."
      },
      {
        question: "Les séances peuvent-elles se faire à distance ?",
        answer: "Oui, plusieurs services peuvent être effectués à distance : le Reiki, la Magnétiseuse (y compris coupeuse de feu pour brûlures), et la Médiumnité Voyance. Contactez-moi directement pour plus d'informations."
      },
      {
        question: "Combien de séances sont nécessaires ?",
        answer: "Cela dépend du service et de vos besoins. Pour le Shiatsu sevrage tabagique, il est recommandé de prévoir 5 séances minimum. Pour d'autres services, un forfait peut être établi selon vos besoins."
      }
    ]
  },
  {
    title: "Tarifs et paiement",
    faqs: [
      {
        question: "Quels sont les tarifs des séances ?",
        answer: "Les tarifs varient selon le service : Reiki et Sophro-relaxation (60€), Réflexologie plantaire (50€), Relaxation énergétique (35€). Un forfait est disponible pour plusieurs séances. Contactez-moi pour les services sur mesure."
      },
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Les moyens de paiement sont à convenir lors de la prise de rendez-vous. Contactez-moi directement pour connaître les options disponibles."
      },
      {
        question: "Les séances sont-elles remboursées par la sécurité sociale ou la mutuelle ?",
        answer: "Les séances de bien-être holistique ne sont pas prises en charge par la sécurité sociale. Cependant, certaines mutuelles peuvent proposer des remboursements partiels pour certaines pratiques. Je vous invite à vérifier directement auprès de votre mutuelle."
      }
    ]
  },
  {
    title: "Aspects médicaux et précautions",
    faqs: [
      {
        question: "Y a-t-il des contre-indications ?",
        answer: "Les pratiques proposées sont généralement adaptées à tous. Cependant, certaines conditions médicales peuvent nécessiter des précautions. Je vous invite à me consulter avant la séance pour discuter de votre situation particulière."
      },
      {
        question: "Les séances se substituent-elles à un avis médical ?",
        answer: "Non, en aucun cas les séances ne sauraient se substituer à un avis médical. Les services proposés sont complémentaires au traitement médical et visent à améliorer le bien-être global."
      }
    ]
  }
];

// Service-specific FAQs
export const serviceFAQs: Record<string, FAQ[]> = {
  reiki: [
    {
      question: "Qu'est-ce que le Reiki ?",
      answer: "Le Reiki est une méthode non conventionnelle d'origine japonaise, fondée sur des soins dits « énergétiques » par imposition des mains. La personne reste habillée pendant la séance."
    },
    {
      question: "Comment se déroule une séance de Reiki ?",
      answer: "La séance de Reiki dure environ 1 heure. Vous restez habillé et allongé sur une table de massage. J'appose mes mains sur différents points de votre corps pour transmettre l'énergie Reiki, favorisant la relaxation et le bien-être."
    },
    {
      question: "Combien de temps dure une séance de Reiki ?",
      answer: "Une séance de Reiki dure environ 1 heure."
    },
    {
      question: "Proposez-vous des initiations au Reiki ?",
      answer: "Oui, en tant que Maître enseignante en Reiki, je propose des initiations. Contactez-moi directement pour plus d'informations sur les initiations."
    }
  ],
  'sophro-relaxation': [
    {
      question: "Qu'est-ce que la Sophro-relaxation ?",
      answer: "La Sophro-relaxation combine des techniques de relaxation, de respiration et de visualisation positive pour favoriser le bien-être physique et mental et réduire le stress."
    },
    {
      question: "Y a-t-il un tarif différent pour les enfants ?",
      answer: "Oui, pour les enfants jusqu'à 15 ans, la séance est à 45 euros au lieu de 60 euros pour les adultes."
    },
    {
      question: "Les protocoles sont-ils personnalisés ?",
      answer: "Oui, les protocoles sont établis et personnalisés selon les difficultés rencontrées par chaque personne."
    }
  ],
  'relaxation-energetique': [
    {
      question: "En quoi consiste la relaxation énergétique du corps ?",
      answer: "Cette pratique consiste en la stimulation de points en digipression sur la face avant du corps, favorisant la détente et l'harmonie énergétique."
    },
    {
      question: "Combien de temps dure cette séance ?",
      answer: "La séance de relaxation énergétique dure environ 30 minutes."
    }
  ],
  reflexologie: [
    {
      question: "Qu'est-ce que la réflexologie plantaire ?",
      answer: "La réflexologie plantaire est une pratique située au niveau de la plante des pieds, véritable 'tableau de bord' de l'ensemble du corps. Les pieds sont découpés en zones correspondant à des tissus ou organes. Solliciter ces points permet de réguler les déséquilibres."
    },
    {
      question: "Que comprend la séance de réflexologie ?",
      answer: "La séance dure environ 1 heure et comprend 10 minutes de balnéo pieds avant le soin."
    },
    {
      question: "Y a-t-il des forfaits disponibles ?",
      answer: "Oui, un forfait est disponible si vous prenez plusieurs séances."
    }
  ],
  'harmonisation-lymphatique': [
    {
      question: "Qu'est-ce que l'harmonisation lymphatique ?",
      answer: "L'harmonisation se fait avec les doigts et la paume des mains sur l'ensemble du corps, en suivant le sens de la circulation lymphatique et en variant la pression. Elle joue un rôle important dans l'élimination des déchets et vise à favoriser l'amincissement."
    },
    {
      question: "Combien de temps dure la séance ?",
      answer: "La séance d'harmonisation lymphatique dure environ 1 heure."
    },
    {
      question: "Y a-t-il des forfaits ?",
      answer: "Oui, un forfait est disponible si vous prenez plusieurs séances."
    }
  ],
  'shiatsu-sevrage': [
    {
      question: "Comment le Shiatsu peut-il aider au sevrage tabagique ?",
      answer: "Le Shiatsu est une pratique japonaise favorisant la circulation énergétique, sanguine et lymphatique par des pressions, des étirements et des mobilisations articulaires, pouvant aider et accompagner la personne pendant la période de sevrage."
    },
    {
      question: "Combien de séances sont recommandées ?",
      answer: "Il est recommandé de prévoir 5 séances minimum avant le suivi."
    },
    {
      question: "Combien de temps dure une séance ?",
      answer: "Une séance de Shiatsu sevrage tabagique dure entre 30 et 45 minutes."
    },
    {
      question: "Y a-t-il des forfaits disponibles ?",
      answer: "Oui, un forfait est possible pour ce service."
    }
  ],
  magnetiseuse: [
    {
      question: "Qu'est-ce que le magnétisme ?",
      answer: "Le magnétisme est une pratique de soins énergétiques par apposition des mains et/ou passes magnétiques. Mes champs d'action sont divers : brûlures, problèmes de peau (zona, eczéma, psoriasis, acné, verrues), kystes, hémorroïdes, problèmes de sommeil, deuil, stress."
    },
    {
      question: "Qu'est-ce que la coupe de feu ?",
      answer: "La coupe de feu permet d'intervenir sur les brûlures, y compris à distance ou par téléphone. J'interviens rapidement pour soulager la douleur des brûlures."
    },
    {
      question: "Pouvez-vous intervenir à distance ?",
      answer: "Oui, le travail à distance est possible, notamment pour les brûlures. Contactez-moi par téléphone pour une intervention urgente."
    },
    {
      question: "Travaillez-vous également sur les animaux ?",
      answer: "Oui, mon magnétisme intervient sur les personnes et les animaux."
    },
    {
      question: "Faites-vous du nettoyage de lieux ?",
      answer: "Oui, mon champ d'action s'étend également au nettoyage des lieux et des personnes. Contactez-moi directement car chaque protocole est propre à la situation."
    }
  ],
  voyance: [
    {
      question: "Qu'est-ce que la voyance et la cartomancie ?",
      answer: "Les arts divinatoires existent depuis la nuit des temps. J'utilise différents supports : tarots, cartes, oracles ou encore le pendule pour vous accompagner et vous guider sur votre chemin de vie. Que ce soit pour l'amour, le travail ou une décision importante, je vous offre un éclairage sur votre situation."
    },
    {
      question: "Quels types de consultations proposez-vous ?",
      answer: "Je propose deux types de tirages : le tirage intermédiaire (environ 30 minutes, 30€) et le tirage complet (environ 1 heure, 60€). Chaque consultation peut se faire par téléphone ou en présentiel, selon votre préférence."
    },
    {
      question: "Sur quels sujets pouvez-vous me conseiller ?",
      answer: "Je vous accompagne sur différents aspects de votre vie : l'amour, le travail, et les décisions importantes. Les arts divinatoires permettent d'obtenir des éclairages sur votre situation actuelle et future."
    },
    {
      question: "Quels supports utilisez-vous ?",
      answer: "J'utilise différents supports selon la situation : tarots, cartes, oracles ou encore le pendule. Chaque support apporte une dimension particulière à la consultation."
    },
    {
      question: "Comment se déroule une consultation ?",
      answer: "La consultation peut se faire par téléphone ou en présentiel. Vous pouvez choisir entre un tirage intermédiaire (environ 30 minutes) ou un tirage complet (environ 1 heure). Le tarif est à partir de 30€ selon le type de consultation choisi."
    },
    {
      question: "Comment se préparer à une consultation de voyance ?",
      answer: "Il est recommandé de venir avec une question ou une intention claire concernant l'amour, le travail ou une décision à prendre. L'ouverture et la réceptivité facilitent la transmission des informations. Restez naturel et détendu."
    }
  ],
  mediumnite: [
    {
      question: "Qu'est-ce que la médiumnité ?",
      answer: "Sensible aux influences subtiles, aux phénomènes non perceptibles et aux énergies qui nous entourent, je suis médium, clairvoyant, audio voyant et sensitif. Je suis un trait d'union entre l'ici et l'ailleurs, permettant de faire le lien entre le monde visible et invisible."
    },
    {
      question: "Que signifie être clairvoyant, audio voyant et sensitif ?",
      answer: "En tant que médium, je possède plusieurs capacités : la clairvoyance (perception visuelle au-delà du visible), l'audio voyance (perception auditive de messages), et la sensibilité (perception des énergies et influences subtiles). Ces capacités me permettent de recevoir et de transmettre des informations qui ne sont pas accessibles par les sens ordinaires."
    },
    {
      question: "Comment fonctionne une consultation de médiumnité ?",
      answer: "Je vous invite à me contacter selon vos besoins afin de définir ensemble le protocole à établir. Chaque consultation est personnalisée car chaque situation est unique. Le tarif et la durée sont à définir selon vos besoins spécifiques."
    },
    {
      question: "Peut-on consulter à distance ?",
      answer: "Oui, les consultations peuvent se faire par téléphone ou en présentiel. Le travail à distance est possible, car la médiumnité ne dépend pas de la proximité physique."
    },
    {
      question: "Comment se prépare-t-on à une consultation de médiumnité ?",
      answer: "Il est recommandé de venir avec une question ou une intention claire, mais sans attente spécifique. L'ouverture et la réceptivité facilitent la transmission des informations. Nous définirons ensemble le protocole adapté à votre situation lors de la prise de contact."
    },
    {
      question: "Proposez-vous d'autres services comme le nettoyage énergétique ?",
      answer: "Oui, je propose des nettoyages de personnes, de lieux, et la coupe de liens toxiques. Contactez-moi directement car chaque protocole est propre à la situation de chacun."
    }
  ],
  'conseil-naturopathie': [
    {
      question: "En quoi consiste exactement votre accompagnement en conseil naturopathique ?",
      answer: "Mon accompagnement consiste à vous guider dans l'adoption de pratiques naturelles qui renforcent votre vitalité et votre équilibre. Je vous aide à identifier les déséquilibres dans votre mode de vie et à mettre en place des solutions concrètes et durables. Contrairement à une consultation médicale, je me concentre sur la prévention et le renforcement de vos capacités d'auto-guérison à travers des méthodes douces et naturelles."
    },
    {
      question: "Quelles techniques concrètes proposez-vous pour améliorer la respiration ?",
      answer: "Je vous enseigne différentes méthodes de respiration consciente adaptées à vos besoins : techniques de cohérence cardiaque pour réguler le système nerveux, exercices de respiration profonde pour réduire les tensions, et pratiques de respiration rythmée pour améliorer la concentration. Ces techniques peuvent être intégrées facilement dans votre quotidien, même lors de moments de stress ou de fatigue."
    },
    {
      question: "Quelle est la différence entre votre accompagnement et une consultation avec un naturopathe diplômé ?",
      answer: "Je ne délivre pas de diagnostic médical ni de prescriptions de compléments alimentaires comme le ferait un naturopathe diplômé. Mon rôle est celui d'un guide qui vous accompagne dans l'adoption de pratiques naturelles, notamment autour de la respiration et de la gestion du stress. Je vous aide à développer votre autonomie dans la prise en charge de votre bien-être au quotidien."
    },
    {
      question: "Pouvez-vous m'aider à améliorer mon sommeil ou ma digestion ?",
      answer: "Oui, mon accompagnement peut aborder ces aspects. En travaillant sur la respiration et les techniques de relaxation, nous pouvons améliorer la qualité de votre sommeil. Pour la digestion, je peux vous conseiller sur les rythmes alimentaires et les pratiques qui favorisent une meilleure assimilation. Chaque accompagnement est personnalisé selon vos problématiques spécifiques."
    },
    {
      question: "Combien de temps dure une séance et à quelle fréquence recommandez-vous de venir ?",
      answer: "La durée et la fréquence des séances sont adaptées à votre situation. Une première séance permet d'établir un bilan de vos habitudes et de définir vos objectifs. Les séances suivantes peuvent être espacées selon vos besoins, permettant un suivi régulier de votre évolution. Certaines personnes bénéficient d'un accompagnement mensuel, d'autres préfèrent des séances plus rapprochées au début."
    },
    {
      question: "Dois-je préparer quelque chose avant la première séance ?",
      answer: "Avant la première séance, il est utile de réfléchir à vos objectifs et aux domaines de votre vie où vous souhaitez voir des améliorations. Vous pouvez noter vos habitudes actuelles concernant le sommeil, l'alimentation, et les moments de stress. Cela m'aidera à mieux comprendre votre situation et à vous proposer des conseils adaptés dès le premier rendez-vous."
    },
    {
      question: "Votre accompagnement peut-il compléter d'autres pratiques de bien-être que je pratique déjà ?",
      answer: "Absolument. Mon accompagnement est complémentaire à d'autres pratiques comme le yoga, la méditation, ou les soins énergétiques. Les techniques de respiration et de gestion du stress que je propose peuvent même renforcer les bénéfices de ces pratiques. Je peux également vous aider à créer une routine quotidienne qui intègre harmonieusement différentes approches de bien-être."
    }
  ],
  'reequilibrage-des-chakras': [
    {
      question: "Qu'est-ce que le rééquilibrage des chakras ?",
      answer: "Le rééquilibrage des chakras est une pratique énergétique visant à harmoniser les centres d'énergie du corps, appelés chakras. Ces portails énergétiques peuvent être déséquilibrés par le stress, la fatigue ou des blocages. Le rééquilibrage permet de réharmoniser votre énergie et de lever les blocages situés sur vos portails énergétiques pour retrouver un équilibre global."
    },
    {
      question: "Comment savoir si mes chakras sont déséquilibrés ?",
      answer: "Plusieurs signes peuvent indiquer un déséquilibre des chakras : trouble du sommeil, fatigue persistante, stress accru, trouble émotionnels, sensation d‘être parasité ou de ressentir des blocages énergétiques ainsi que des douleurs physiques inexpliquées."
    },
    {
      question: "Comment se déroule une séance de rééquilibrage des chakras ?",
      answer: "Une séance de rééquilibrage des chakras dure 30 minutes. Elle commence par une discussion sur vos préoccupations et vos besoins. Ensuite, je procède à un travail énergétique pour harmoniser vos chakras en utilisant diverses techniques énergétiques adaptées à votre situation. Le but est de réharmoniser votre énergie et de lever les blocages situés sur vos portails énergétiques."
    },
    {
      question: "Quels sont les bienfaits du rééquilibrage des chakras ?",
      answer: "Le rééquilibrage des chakras offre de nombreux bienfaits : réharmonisation énergétique globale, levée des blocages situés sur les portails énergétiques, réduction du stress et de l'anxiété, limitation des pensées négatives, augmentation de l'énergie vitale, amélioration de la clarté mentale, , regain d'énergie et sentiment général de bien-être."
    },
    {
      question: "À qui s'adresse le rééquilibrage des chakras ?",
      answer: "Le rééquilibrage des chakras s'adresse à toute personne ressentant un déséquilibre au niveau énergétique: enfants comme adultes."
    },
    {
      question: "Combien de séances sont nécessaires ?",
      answer: "Le nombre de séances nécessaires varie selon vos besoins individuels et votre état énergétique. Certaines personnes ressentent une amélioration significative après une seule séance, tandis que d'autres peuvent bénéficier de plusieurs séances pour des résultats optimaux. Un forfait peut être établi selon vos besoins. Contactez-moi directement pour discuter d'un plan personnalisé."
    },
    {
      question: "Y a-t-il des effets secondaires après une séance ?",
      answer: "La plupart des personnes ressentent une relaxation profonde et un sentiment de bien-être après une séance de rééquilibrage des chakras. Occasionnellement, certaines personnes peuvent éprouver une libération émotionnelle ou une légère fatigue temporaire, ce qui est normal et fait partie du processus de guérison et de réharmonisation énergétique. Ces réactions sont généralement de courte durée et indiquent que le travail énergétique est en cours."
    },
    {
      question: "Comment se préparer à une séance de rééquilibrage des chakras ?",
      answer: "Pour préparer votre séance, portez des vêtements confortables qui vous permettront de vous détendre. Arrivez avec l'esprit ouvert et prêt à recevoir l'énergie. Il est également recommandé de communiquer vos préoccupations ou vos intentions spécifiques avant la séance, afin que je puisse adapter le travail énergétique à vos besoins particuliers."
    },
    {
      question: "Le rééquilibrage des chakras est-il compatible avec d'autres traitements médicaux ?",
      answer: "Oui, le rééquilibrage des chakras est complémentaire aux traitements médicaux conventionnels et ne les remplace pas. Cette pratique énergétique peut être utilisée en parallèle avec d'autres soins pour améliorer votre bien-être global. Cependant, il est recommandé de consulter votre professionnel de santé avant de commencer toute nouvelle thérapie, et en aucun cas les séances ne sauraient se substituer à un avis médical."
    },
    {
      question: "Y a-t-il des contre-indications au rééquilibrage des chakras ?",
      answer: "Le rééquilibrage des chakras est généralement sûr et adapté à la plupart des personnes. Cependant, si vous avez des conditions médicales spécifiques, je vous recommande de consulter votre professionnel de santé avant de commencer. Les séances sont complémentaires aux traitements médicaux et ne les remplacent pas. En aucun cas les séances ne sauraient se substituer à un avis médical."
    },
    {
      question: "Le rééquilibrage des chakras peut-il se faire à distance ?",
      answer: "Le rééquilibrage des chakras peut être effectué en présentiel à Joué-Les-Tours ou à domicile selon votre localisation. Pour les séances à distance, contactez-moi directement pour discuter de vos besoins et de la disponibilité. Chaque situation est unique et je peux adapter le protocole selon vos préférences."
    },
    {
      question: "Qu'est-ce que le chakra couronne et à quoi est-il lié ?",
      answer: "Le chakra couronne est le septième chakra, situé au sommet de la tête. Il est lié à la pensée supérieure, à l'unité, à la compréhension et à la connaissance. Ce chakra représente notre connexion à la spiritualité et à la conscience universelle. Lorsqu'il est équilibré, il favorise la sagesse, la paix intérieure et une meilleure compréhension de notre place dans l'univers."
    },
    {
      question: "Qu'est-ce que le chakra du troisième œil et quelles sont ses fonctions ?",
      answer: "Le chakra du troisième œil, ou chakra frontal, est situé entre les sourcils. Il est lié au mental, à l'intuition, aux capacités sensorielles et à la pensée positive. Ce chakra gouverne notre perception intuitive et notre capacité à voir au-delà de l'apparence. Un chakra du troisième œil équilibré favorise la clarté mentale, l'intuition développée et une vision positive de la vie."
    },
    {
      question: "En quoi consiste le chakra de la gorge et quel est son rôle ?",
      answer: "Le chakra de la gorge est le cinquième chakra, situé au niveau de la gorge. Il est lié à notre vérité intérieure, à la communication, à notre capacité d'écoute. Il transforme nos émotions en mots et permet l'expression authentique de nos pensées et sentiments. Un chakra de la gorge équilibré facilite une communication claire, honnête et bienveillante, tant avec soi-même qu'avec les autres."
    },
    {
      question: "Qu'est-ce que le chakra du cœur et quelles sont ses caractéristiques ?",
      answer: "Le chakra du cœur est le quatrième chakra, situé au centre de la poitrine. Il est lié à l'ouverture aux autres, à la solidarité, à l'amour et à la compassion. Ce chakra représente notre capacité à donner et recevoir de l'amour, ainsi qu'à ressentir de l'empathie. Lorsqu'il est équilibré, il favorise des relations harmonieuses, la générosité et une connexion profonde avec les autres et avec soi-même."
    },
    {
      question: "Quel est le rôle du chakra du plexus solaire ?",
      answer: "Le chakra du plexus solaire est le troisième chakra, situé au niveau de l'estomac. Il est lié à l'amour propre, à l'identité personnelle et à la connaissance de soi. Ce chakra gouverne notre estime de soi, notre confiance et notre capacité à prendre des décisions. Un chakra du plexus solaire équilibré favorise une bonne estime de soi, une identité personnelle forte et une meilleure compréhension de qui nous sommes vraiment."
    },
    {
      question: "En quoi consiste le chakra sacré et à quoi est-il associé ?",
      answer: "Le chakra sacré est le deuxième chakra, situé dans le bas-ventre. Il est lié au féminin ou masculin sacré, au plaisir, à la créativité et à la sexualité. Ce chakra représente notre capacité à ressentir le plaisir, à créer et à exprimer notre sensualité de manière saine. Un chakra sacré équilibré favorise une créativité épanouie, une relation harmonieuse avec notre corps et une expression saine de notre sexualité."
    },
    {
      question: "Qu'est-ce que le chakra racine et pourquoi est-il important ?",
      answer: "Le chakra racine est le premier chakra, situé à la base de la colonne vertébrale. Il est lié à la sécurité, à l'ancrage, à la détermination et à notre place dans le monde. Ce chakra représente notre fondation énergétique et notre sentiment de sécurité matérielle et émotionnelle. Un chakra racine équilibré favorise un sentiment de stabilité, de sécurité et une connexion solide avec la terre et la réalité matérielle, permettant de se sentir ancré et déterminé dans la vie."
    }
  ]
};

