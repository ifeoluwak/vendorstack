import {Product} from './product';

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  [key: string]: CartItem;
};
