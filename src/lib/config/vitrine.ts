export interface ChurchValue {
  id: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Users' | 'HeartHandshake' | 'BookOpen';
}

export interface Pastor {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface ChurchEvent {
  id: string;
  day: string;
  time: string;
  title: string;
  speaker: string;
  type: 'Culte' | 'Événement' | 'Formation';
  location: string;
  description?: string;
}

export interface DonationMethod {
  id: string;
  provider: string;
  category: 'mobile_money' | 'bank_transfer' | 'online';
  accountName: string;
  accountNumber: string;
  badge?: string;
  instructions: string;
}

export interface VitrineConfig {
  churchName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  visionText: string;
  missionText: string;
  values: ChurchValue[];
  pastors: Pastor[];
  events: ChurchEvent[];
  address: {
    street: string;
    city: string;
    country: string;
    landmark: string;
    mapQuery: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    phoneSecondary?: string;
    whatsapp: string;
    email: string;
    officeHours: string;
  };
  socials: {
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
  };
  donations: {
    introduction: string;
    verse: string;
    verseReference: string;
    methods: DonationMethod[];
  };
}

export const VITRINE_CONFIG: VitrineConfig = {
  churchName: 'Charis Nation',
  tagline: 'Une génération bâtie sur la grâce, la parole vivante et la puissance de l’Esprit.',
  heroHeadline: 'Bienvenue à Charis Nation',
  heroSubheadline: 'Un sanctuaire de réveil spirituel, de communion fraternelle et d’édification pour impacter notre génération par la grâce de Dieu.',
  visionText: 'Bâtir une église apostolique et prophétique, ancrée dans la grâce inconditionnelle du Christ, où chaque croyant découvre sa destinée céleste et rayonne dans son appel.',
  missionText: 'Proclamer l’Évangile de la grâce avec puissance, équiper les disciples par des enseignements profonds, et transformer les cœurs à travers une vie d’adoration et de service.',
  values: [
    {
      id: 'foi',
      title: 'Foi & Parole',
      description: 'Une confiance inébranlable dans les promesses divines et l’autorité souveraine des Saintes Écritures.',
      iconName: 'Flame',
    },
    {
      id: 'communion',
      title: 'Communion Fraternelle',
      description: 'Une communauté unie, accueillante et bienveillante où chaque frère et sœur est chéri comme un membre du corps.',
      iconName: 'Users',
    },
    {
      id: 'service',
      title: 'Service & Compassion',
      description: 'L’amour en action à travers le soutien aux démunis, l’hospitalité chaleureuse et l’engagement pour la cité.',
      iconName: 'HeartHandshake',
    },
    {
      id: 'formation',
      title: 'Formation & Discipulat',
      description: 'L’édification continue des disciples pour faire mûrir les caractères et manifester la stature parfaite de Christ.',
      iconName: 'BookOpen',
    },
  ],
  pastors: [
    {
      id: 'pastor-1',
      name: 'Rev. Israel Watchman',
      role: 'Pasteur Principal & Fondateur',
      bio: 'Visionnaire inspiré par l’Esprit, voué à l’enseignement apostolique de la grâce et au réveil des nations pour la gloire de Dieu.',
      imageUrl: '/images/preacher_man.png',
    },
    {
      id: 'pastor-2',
      name: 'Pasteure Sarah Watchman',
      role: 'Pasteure Associée & Ministère des Familles',
      bio: 'Sentinelle d’intercession, passionnée par la restauration des couples, le leadership féminin et la louange prophétique.',
      imageUrl: '/images/worship_woman.png',
    },
    {
      id: 'pastor-3',
      name: 'Pasteur David Kouassi',
      role: 'Pasteur Jeunesse & Discipulat',
      bio: 'Engagé auprès des nouvelles générations pour allumer la flamme de la sainteté, de l’excellence et de l’impact sociétal.',
      imageUrl: '/images/preacher_man.png',
    },
  ],
  events: [
    {
      id: 'culte-celebration',
      day: 'Dimanche',
      time: '09h00 — 11h30',
      title: 'Culte de Célébration & Grâce',
      speaker: 'Rev. Israel Watchman',
      type: 'Culte',
      location: 'Grand Sanctuaire Charis',
      description: 'Temps puissant de louange, d’adoration collective et prédication de la parole vivante pour ouvrir la semaine dans la victoire.',
    },
    {
      id: 'culte-enseignement',
      day: 'Mercredi',
      time: '18h30 — 20h00',
      title: 'Culte d’Enseignement & Discipulat',
      speaker: 'Collège Pastoral',
      type: 'Formation',
      location: 'Sanctuaire & En ligne',
      description: 'Étude biblique méthodique, questions-réponses et édification doctrinale pour fortifier les fondements de la foi.',
    },
    {
      id: 'veillee-priere',
      day: 'Dernier Vendredi du mois',
      time: '21h00 — 03h00',
      title: 'Nuit de Gloire & Intercession',
      speaker: 'Rev. Israel Watchman & Équipe',
      type: 'Événement',
      location: 'Grand Sanctuaire Charis',
      description: 'Atmosphère intense d’intercession prophétique, de délivrance et d’effusion du Saint-Esprit.',
    },
  ],
  address: {
    street: 'Carrefour Charis, Boulevard de la Grâce',
    city: 'Abidjan, Cocody Angré',
    country: 'Côte d’Ivoire',
    landmark: 'À 200m de l’échangeur, face à la Résidence Les Palmiers',
    mapQuery: 'Cocody, Abidjan, Côte d\'Ivoire',
    coordinates: {
      lat: 5.3852,
      lng: -3.9785,
    },
  },
  contact: {
    phone: '+225 07 00 11 22 33',
    phoneSecondary: '+225 05 44 55 66 77',
    whatsapp: '+225 07 00 11 22 33',
    email: 'contact@charisnation.org',
    officeHours: 'Mardi au Vendredi : 09h00 – 17h00 | Samedi : 09h00 – 13h00',
  },
  socials: {
    youtube: 'https://youtube.com/@charisnation',
    facebook: 'https://facebook.com/charisnation',
    whatsapp: 'https://wa.me/2250700112233',
    instagram: 'https://instagram.com/charisnation',
  },
  donations: {
    introduction: 'Votre fidélité et vos offrandes soutiennent l’expansion du Royaume, les actions d’évangélisation et l’assistance fraternelle aux plus démunis.',
    verse: '« Que chacun donne comme il l’a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. »',
    verseReference: '2 Corinthiens 9:7',
    methods: [
      {
        id: 'moov',
        provider: 'Moov Money',
        category: 'mobile_money',
        accountName: 'CHARIS NATION MINISTÈRE',
        accountNumber: '+225 01 40 50 60 70',
        badge: 'Moov Africa',
        instructions: 'Code marchand ou transfert direct vers le compte officiel du ministère.',
      },
      {
        id: 'mtn',
        provider: 'MTN Mobile Money',
        category: 'mobile_money',
        accountName: 'CHARIS NATION MINISTÈRE',
        accountNumber: '+225 05 50 60 70 80',
        badge: 'MTN MoMo',
        instructions: 'Transfert direct sécurisé avec confirmation par notification SMS.',
      },
      {
        id: 'wave',
        provider: 'Wave / Orange Money',
        category: 'mobile_money',
        accountName: 'CHARIS NATION CULTE',
        accountNumber: '+225 07 60 70 80 90',
        badge: 'Wave / Orange',
        instructions: 'Paiement sans frais supplémentaires par QR Code ou numéro dédié.',
      },
      {
        id: 'rib',
        provider: 'Virement Bancaire (RIB)',
        category: 'bank_transfer',
        accountName: 'ÉGLISE CHARIS NATION INTERNATIONALE',
        accountNumber: 'CI092 01001 023456789012 34',
        badge: 'Ecobank / Atlantique',
        instructions: 'Mentionner « Dîme », « Don » ou « Offrande » en motif de virement.',
      },
    ],
  },
};
