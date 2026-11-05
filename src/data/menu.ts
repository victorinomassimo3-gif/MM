import { MenuItem, StoreConfig } from '../types';

export const OFFICIAL_WHATSAPP_NUMBER = '244932727291';
export const OFFICIAL_PHONE_DISPLAY = '+244 932 727 291';

export const DEFAULT_STORE_CONFIG: StoreConfig = {
  name: 'MENU BURGUERS',
  subtitle: 'SABOR • QUALIDADE • TRADIÇÃO',
  phone: OFFICIAL_PHONE_DISPLAY,
  whatsappNumber: OFFICIAL_WHATSAPP_NUMBER,
  address: 'Rua Alegre, 123',
  city: 'Cidade Brasileira',
  deliveryFee: 5.00,
  minOrder: 15.00,
  openingHours: 'Terça a Domingo • 18:00 às 23:30',
};

export const MENU_ITEMS: MenuItem[] = [
  // --- SIMPLES ---
  {
    id: 'x-bacon',
    name: 'X-Bacon',
    category: 'Simples',
    description: 'Alface, tomate, batata palha, milho, hambúrguer artesanal, presunto, muçarela e fatias de bacon crocante.',
    price: 22.00,
    image: '/src/assets/images/burger_bacon_especial_1793905401897.jpg',
    badge: 'Popular',
  },
  {
    id: 'bacon-especial',
    name: 'Bacon Especial',
    category: 'Simples',
    description: 'Alface, tomate, batata palha, milho, hambúrguer, presunto, muçarela, bacon generoso, salsicha e ovo frito.',
    price: 22.00,
    image: '/src/assets/images/burger_bacon_especial_1793905401897.jpg',
    isFeatured: true,
    badge: 'Destaque no Cardápio',
  },
  {
    id: 'x-frango',
    name: 'X-Frango',
    category: 'Simples',
    description: 'Alface, tomate, batata palha, milho, filé de frango grelhado suculento, presunto, muçarela e bacon.',
    price: 22.00,
    image: '/src/assets/images/burger_frango_especial_1793905402335.jpg',
  },
  {
    id: 'frango-especial',
    name: 'Frango Especial',
    category: 'Simples',
    description: 'Alface, tomate, batata palha, milho, filé de frango, presunto, muçarela, bacon, salsicha artesanal e ovo.',
    price: 22.00,
    image: '/src/assets/images/burger_frango_especial_1793905402335.jpg',
    isFeatured: true,
    badge: 'Destaque no Cardápio',
  },

  // --- ESPECIAIS ---
  {
    id: 'x-bacon-turbo',
    name: 'X-Bacon Turbo',
    category: 'Especiais',
    description: 'Alface, tomate, batata palha, milho, hambúrguer duplo artesanal, presunto, muçarela derretida e dose extra de bacon.',
    price: 22.00,
    image: '/src/assets/images/burger_bacon_especial_1793905401897.jpg',
    badge: 'Mais Pedido',
  },
  {
    id: 'bacon-mega',
    name: 'Bacon Mega',
    category: 'Especiais',
    description: 'Alface, tomate, batata palha, milho, hambúrguer premium, presunto, muçarela, fatias crocantes de bacon, salsicha e ovo na chapa.',
    price: 22.00,
    image: '/src/assets/images/burger_bacon_especial_1793905401897.jpg',
  },
  {
    id: 'x-frango-turbo',
    name: 'X-Frango Turbo',
    category: 'Especiais',
    description: 'Alface, tomate, batata palha, milho, filé de frango empanado crocante, presunto, muçarela e bacon defumado.',
    price: 22.00,
    image: '/src/assets/images/burger_frango_especial_1793905402335.jpg',
  },
  {
    id: 'frango-mega',
    name: 'Frango Mega',
    category: 'Especiais',
    description: 'Alface, tomate, batata palha, milho, filé de frango empanado, presunto, muçarela, bacon crocante, salsicha e ovo.',
    price: 22.00,
    image: '/src/assets/images/burger_frango_especial_1793905402335.jpg',
  },

  // --- ACOMPANHAMENTOS ---
  {
    id: 'batata-pequena',
    name: 'Batata Pequena — 100g',
    category: 'Acompanhamentos',
    description: 'Porção individual de batatas fritas douradas, sequinhas e crocantes.',
    price: 7.00,
    image: '/src/assets/images/fries_cheddar_bacon_1793905403520.jpg',
  },
  {
    id: 'batata-grande',
    name: 'Batata Grande — 500g',
    category: 'Acompanhamentos',
    description: 'Porção generosa para compartilhar com amigos e família. Crocância garantida.',
    price: 10.00,
    image: '/src/assets/images/fries_cheddar_bacon_1793905403520.jpg',
    badge: 'Melhor Custo-Benefício',
  },
  {
    id: 'batata-queijo-bacon',
    name: 'Batata com Queijo e Bacon',
    category: 'Acompanhamentos',
    description: 'Batata frita crocante coberta com molho cremoso de cheddar e generosos pedacinhos de bacon.',
    price: 15.00,
    image: '/src/assets/images/fries_cheddar_bacon_1793905403520.jpg',
    badge: 'Favorito',
  },
  {
    id: 'aneis-cebola',
    name: 'Anéis de Cebola',
    category: 'Acompanhamentos',
    description: 'Porção crocante de anéis de cebola dourados empanados na cerveja com molho barbecue.',
    price: 12.00,
    image: '/src/assets/images/crispy_onion_rings_1793905403444.jpg',
  },

  // --- BEBIDAS ---
  {
    id: 'refri-2l',
    name: 'Refrigerante 2 Litros',
    category: 'Bebidas',
    description: 'Garrafa de 2 litros gelada (Coca-Cola, Guaraná Antarctica ou Fanta - informar sabor nas observações).',
    price: 9.00,
  },
  {
    id: 'refri-lata',
    name: 'Refrigerante Lata 350ml',
    category: 'Bebidas',
    description: 'Lata 350ml gelada (Coca-Cola normal ou zero, Guaraná Antarctica ou Sprite).',
    price: 5.00,
  },
  {
    id: 'suco-natural',
    name: 'Suco Natural 500ml',
    category: 'Bebidas',
    description: 'Suco 100% natural feito na hora (Laranja, Limonada Suíça ou Maracujá).',
    price: 7.00,
  },
  {
    id: 'suco-lata',
    name: 'Suco Lata Del Valle',
    category: 'Bebidas',
    description: 'Lata 350ml refrescante (Uva, Pêssego ou Manga).',
    price: 5.00,
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Simples', label: 'Simples' },
  { id: 'Especiais', label: 'Especiais' },
  { id: 'Acompanhamentos', label: 'Acompanhamentos' },
  { id: 'Bebidas', label: 'Bebidas' },
] as const;

export const formatMoney = (val: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};
