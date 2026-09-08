export type Station = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;

  status: "Disponível" | "Ocupado" | "Indisponível";

  connectors: string[];
  power: number;

  openingHours: string;
  open24Hours: boolean;

  lowMovement: string;

  amenities: string[];

  availableSpots: number;
  totalSpots: number;

  description: string;
};

export const stations: Station[] = [
  {
    id: 1,
    name: "Flui Centro",
    address: "Rua dos Andradas, 1234, Centro Histórico, Porto Alegre",
    latitude: -30.0306,
    longitude: -51.2287,

    status: "Disponível",

    connectors: ["CCS", "Tipo 2"],
    power: 150,

    openingHours: "24 horas",
    open24Hours: true,

    lowMovement: "14h às 17h",

    amenities: ["Café", "Banheiro", "Wi-Fi", "Restaurante"],

    availableSpots: 3,
    totalSpots: 4,

    description:
      "Ponto de recarga rápida localizado no Centro Histórico de Porto Alegre.",
  },

  {
    id: 2,
    name: "Flui Moinhos",
    address: "Rua Padre Chagas, 320, Moinhos de Vento, Porto Alegre",
    latitude: -30.0258,
    longitude: -51.2037,

    status: "Ocupado",

    connectors: ["Tipo 2"],
    power: 60,

    openingHours: "06h às 23h",
    open24Hours: false,

    lowMovement: "10h às 13h",

    amenities: ["Café", "Restaurante", "Estacionamento"],

    availableSpots: 0,
    totalSpots: 2,

    description:
      "Ponto de recarga localizado próximo a restaurantes e estabelecimentos comerciais.",
  },

  {
    id: 3,
    name: "Flui Praia de Belas",
    address: "Av. Praia de Belas, 1181, Praia de Belas, Porto Alegre",
    latitude: -30.0498,
    longitude: -51.2283,

    status: "Disponível",

    connectors: ["CCS", "CHAdeMO", "Tipo 2"],
    power: 120,

    openingHours: "07h às 23h",
    open24Hours: false,

    lowMovement: "09h às 11h",

    amenities: ["Banheiro", "Wi-Fi", "Shopping", "Restaurante"],

    availableSpots: 2,
    totalSpots: 6,

    description:
      "Estação com múltiplos conectores e acesso a diferentes comodidades.",
  },

  {
    id: 4,
    name: "Flui Ipiranga",
    address: "Av. Ipiranga, 5200, Jardim Botânico, Porto Alegre",
    latitude: -30.0582,
    longitude: -51.1827,

    status: "Indisponível",

    connectors: ["CCS"],
    power: 180,

    openingHours: "24 horas",
    open24Hours: true,

    lowMovement: "02h às 06h",

    amenities: ["Banheiro", "Loja de conveniência", "Wi-Fi"],

    availableSpots: 0,
    totalSpots: 3,

    description:
      "Estação de alta potência com carregamento rápido.",
  },
];