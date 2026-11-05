export interface MenuItem {
  id: string;
  name: string;
  category: 'Simples' | 'Especiais' | 'Acompanhamentos' | 'Bebidas';
  description: string;
  price: number;
  image?: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: MenuItem;
  quantity: number;
  notes?: string;
}

export interface OrderForm {
  name: string;
  phone: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  neighborhood: string;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
  changeFor?: string;
  notes: string;
}

export interface StoreConfig {
  name: string;
  subtitle: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  city: string;
  deliveryFee: number;
  minOrder: number;
  openingHours: string;
}
