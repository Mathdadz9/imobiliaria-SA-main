import type { User, Property, Interest } from "./types"

export const initialUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    password: "123456",
    role: "client",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria@imobiliaria.com",
    password: "123456",
    role: "broker",
  },
]

export const initialProperties: Property[] = [
  {
    id: "1",
    title: "Casa Moderna em Condomínio Fechado",
    description:
      "Linda casa com 3 quartos, 2 banheiros, garagem para 2 carros, área de lazer completa com piscina e churrasqueira.",
    price: 850000,
    city: "São Paulo",
    type: "casa",
    image: "/modern-house-with-pool.png",
    brokerId: "2",
    featured: true,
  },
  {
    id: "2",
    title: "Apartamento Luxuoso Vista Mar",
    description:
      "Apartamento de alto padrão com 4 suítes, varanda gourmet, 3 vagas de garagem. Vista panorâmica para o mar.",
    price: 1200000,
    city: "Rio de Janeiro",
    type: "apartamento",
    image: "/luxury-apartment-ocean-view.png",
    brokerId: "2",
    featured: true,
  },
  {
    id: "3",
    title: "Cobertura Duplex Centro",
    description:
      "Cobertura duplex com 3 quartos, sala ampla, cozinha planejada, terraço com churrasqueira e vista privilegiada.",
    price: 950000,
    city: "Belo Horizonte",
    type: "apartamento",
    image: "/penthouse-duplex-terrace.jpg",
    brokerId: "2",
    featured: true,
  },
  {
    id: "4",
    title: "Casa de Campo com Pomar",
    description:
      "Casa aconchegante em área rural, 2 quartos, varanda, pomar com árvores frutíferas, ideal para quem busca tranquilidade.",
    price: 450000,
    city: "Campinas",
    type: "casa",
    image: "/country-house-orchard.jpg",
    brokerId: "2",
  },
  {
    id: "5",
    title: "Terreno Comercial Avenida Principal",
    description: "Terreno comercial de 500m² em avenida movimentada, ideal para construção de loja ou escritório.",
    price: 600000,
    city: "São Paulo",
    type: "terreno",
    image: "/commercial-land-avenue.jpg",
    brokerId: "2",
  },
  {
    id: "6",
    title: "Sala Comercial Centro Empresarial",
    description: "Sala comercial de 80m², 2 banheiros, copa, vaga de garagem. Prédio moderno com segurança 24h.",
    price: 380000,
    city: "Curitiba",
    type: "comercial",
    image: "/commercial-office-space.png",
    brokerId: "2",
  },
]

export const initialInterests: Interest[] = []
