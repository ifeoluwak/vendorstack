import {OrderItem} from './general';

export type Product = {
  id: string;
  name: string;
  price: string;
  discount_price: string;
  final_price: string;
  qty: number;
  desc: string;
  media_url: string;
  url: string;
  active: boolean;
  media_type: 'img' | 'video';
  origin: 'default' | 'instagram';
  out_of_stock: boolean;
  thumbnail_url: string;
  orders: OrderItem[];
};

export type ProductLean = {
  id: string;
  url: string;
  business: {
    id: string;
    name: string;
  };
};
