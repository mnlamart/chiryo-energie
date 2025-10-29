export interface FAQ {
  question: string;
  answer: string;
}

export const generalFAQs: FAQ[] = [
  {
    question: "Qu'est-ce que le Reiki ?",
    answer: "Le Reiki est une méthode non conventionnelle d'origine japonaise, fondée sur des soins dits « énergétiques » par imposition des mains. La personne reste habillée pendant la séance."
  },
  {
    question: "Combien de séances sont nécessaires ?",
    answer: "Cela dépend du service et de vos besoins. Pour le Shiatsu sevrage tabagique, il est recommandé de prévoir 5 séances minimum. Pour d'autres services, un forfait peut être établi selon vos besoins."
  },
  {
    question: "Les séances peuvent-elles se faire à distance ?",
    answer: "Oui, plusieurs services peuvent être effectués à distance : le Reiki, la Magnétiseuse (y compris coupeur de feu pour brûlures), et la Médiumnité Voyance. Contactez-moi directement pour plus d'informations."
  },
  {
    question: "Quels sont les tarifs des séances ?",
    answer: "Les tarifs varient selon le service : Reiki et Sophro-relaxation (60€), Réflexologie plantaire (50€), Relaxation énergétique (35€). Un forfait est disponible pour plusieurs séances. Contactez-moi pour les services sur mesure."
  },
  {
    question: "Les séances se substituent-elles à un avis médical ?",
    answer: "Non, en aucun cas les séances ne sauraient se substituer à un avis médical. Les services proposés sont complémentaires au traitement médical et visent à améliorer le bien-être global."
  },
  {
    question: "Qu'est-ce que la coupe de feu ?",
    answer: "La coupe de feu est une pratique de soins énergétiques par apposition des mains permettant de soulager les brûlures. J'interviens sur les brûlures, y compris à distance ou par téléphone."
  }
];

// Service-specific FAQs
export const serviceFAQs: Record<string, FAQ[]> = {
  reiki: [
    {
      question: "Comment se déroule une séance de Reiki ?",
      answer: "La séance de Reiki dure environ 1 heure. Vous restez habillé et allongé sur une table de massage. J'appose mes mains sur différents points de votre corps pour transmettre l'énergie Reiki, favorisant la relaxation et le bien-être."
    },
    {
      question: "Combien de temps dure une séance de Reiki ?",
      answer: "Une séance de Reiki dure environ 1 heure."
    },
    {
      question: "Le Reiki peut-il se faire à distance ?",
      answer: "Oui, le Reiki peut être pratiqué à distance. Contactez-moi pour discuter de cette possibilité."
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
    },
    {
      question: "Proposez-vous des initiations à la Sophrologie ?",
      answer: "Oui, je propose des initiations. Contactez-moi directement pour plus d'informations."
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
  mediumnite: [
    {
      question: "Qu'est-ce que la médiumnité ?",
      answer: "Issue d'un héritage familial, ma sensibilité peut vous permettre de vous accompagner et de vous guider sur votre chemin de vie. Je suis un canal et vous retransmets ce que je reçois."
    },
    {
      question: "Utilisez-vous des supports comme les cartes ?",
      answer: "J'utilise certains outils comme le pendule et les cartes, mais les informations peuvent aussi m'être transmises sans l'utilisation de support."
    },
    {
      question: "Peut-on consulter à distance ?",
      answer: "Oui, les consultations peuvent se faire par téléphone ou en présentiel. Le travail à distance est possible."
    },
    {
      question: "Proposez-vous d'autres services comme le nettoyage énergétique ?",
      answer: "Oui, je propose des nettoyages de personnes, de lieux, et la coupe de liens toxiques. Contactez-moi directement car chaque protocole est propre à la situation de chacun."
    }
  ]
};

