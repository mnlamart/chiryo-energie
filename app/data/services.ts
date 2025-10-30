import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'reiki',
    title: 'Reiki',
    description: 'Méthode non conventionnelle d\'origine japonaise, fondée sur des soins dits « énergétiques » par imposition des mains. La personne reste habillée.',
    price: '60 euros',
    duration: '1h environ',
    image: '/images/services/reiki.jpg',
    notes: 'Maître enseignante en Reiki, je vous propose soins et initiations. Forfait si plusieurs séances. Travail à distance possible. Pour les initiations me contacter directement.'
  },
  {
    id: 'sophro-relaxation',
    title: 'Sophro-relaxation',
    description: 'Combinaison de techniques de relaxation, de respiration et de visualisation positive visant à favoriser le bien-être physique et mental et à réduire le stress.',
    price: '60 euros (adulte)',
    duration: '1h environ',
    image: '/images/services/sophro-relaxation.jpg',
    notes: '45 euros la séance enfant jusqu\'à 15 ans. Protocoles établis et personnalisés selon les difficultés rencontrées. Forfait si plusieurs séances. Pour les initiations me contacter directement.'
  },
  {
    id: 'relaxation-energetique',
    title: 'Relaxation énergétique corps',
    description: 'Stimulation de points en digipression sur la face avant.',
    price: '35 euros',
    duration: '30 minutes environ',
    image: '/images/services/relaxation-energetique.jpg'
  },
  {
    id: 'reflexologie',
    title: 'Réflexologie plantaire',
    description: 'C\'est le pied! et pour cause, cette pratique se situe au niveau de la plante des pieds, véritable "tableau de bord" de l\'ensemble du corps. Les pieds sont "découpés" en zones, correspondant à un tissus ou à un organe. Solliciter ces points permet de réguler les déséquilibres.',
    price: '50 euros',
    duration: '1h environ dont 10 minutes de balnéo pieds',
    image: '/images/services/reflexologie.jpg',
    notes: 'Forfait si plusieurs séances.'
  },
  {
    id: 'harmonisation-lymphatique',
    title: 'Harmonisation lymphatique',
    description: 'L\'harmonisation se fait avec les doigts et la paume des mains sur l\'ensemble du corps, en suivant le sens de la circulation lymphatique et en variant la pression. Elle joue un rôle important dans l\'élimination des déchets et vise à favoriser l\'amincissement.',
    price: '60 euros',
    duration: '1h environ',
    image: '/images/services/harmonisation-lymphatique.jpg',
    notes: 'Forfait si plusieurs séances.'
  },
  {
    id: 'shiatsu-sevrage',
    title: 'Shiatsu sevrage tabagique',
    description: 'Pratique japonaise favorisant la circulation énergétique, sanguine et lymphatique par des pressions, des étirements et des mobilisations articulaires, pouvant aider et accompagner la personne pendant la période de sevrage.',
    price: '50 euros',
    duration: 'entre 30 et 45 minutes',
    image: '/images/services/shiatsu-sevrage.jpg',
    notes: 'Prévoir 5 séances minimum avant suivi. Forfait possible.'
  },
  {
    id: 'magnetiseuse',
    title: 'Magnétiseuse coupeuse de feu',
    description: 'Pratique de soins énergétiques par apposition des mains et/ou passes magnétiques. Mes champs d\'action sont divers: brûlures, problèmes de peau tels zona, eczéma, psoriasis, acné, verrues...mais aussi kystes, hémorroïdes, problèmes de sommeil, deuil, stress.',
    price: 'Selon les besoins',
    image: '/images/services/magnetisme.jpg',
    notes: 'J\'interviens sur les brûlures, y compris à distance ou par téléphone. Mon champs d\'action s\'étend également au nettoyage des lieux et des personnes. Mon magnétisme intervient sur les personnes et les animaux. Travail à distance possible. Merci de me contacter directement.'
  },
  {
    id: 'mediumnite',
    title: 'Médiumnité Voyance Cartomancie',
    description: 'Issue d\'un héritage familiale, ma sensibilité peut vous permettre de vous accompagner et de vous guider sur votre chemin de vie. J\'utilise certains outils comme le pendule et les cartes, mais les informations peuvent aussi m\'être transmises sans l\'utilisation de support. Je suis un canal et vous retransmets ce que je reçois.',
    price: '60 euros',
    duration: 'La consultation',
    image: '/images/services/mediumnite.jpg',
    notes: 'Consultation par téléphone ou en présentiel. Travail à distance possible. Pour les nettoyages de personnes, de lieux, pour couper les liens toxiques... Merci de me contacter directement. Chaque protocole étant propre à la situation de chacun.'
  }
];

