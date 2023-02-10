import {User} from './user';
import {Product} from './product';
import {Vendor} from './vendor';

export type Category = {
  _id: string;
  code: string;
  description: string;
  name: string;
};

export type AgeRange = {
  id: string;
  slug: string;
  name: string;
};

export type Address = {
  _id: string;
  addressId: string;
  streetName: string;
  busStop: string;
  country: string;
  state: string;
  description: string;
  lga: string;
};

export type Order = {
  id: string;
  business: Vendor;
  order_items: OrderItem[];
  value: string;
  is_paid: boolean;
  delivery_agent: string;
  delivery_date: string;
  delivery_cost: string;
  delivery_address: Address;
  delivery_status: OrderStatus;
  created_at: String;
};

export type OrderStatus = {
  id: string;
  name: string;
};

export type OrderItem = {
  business: Vendor | string;
  created_at: string;
  id: string;
  order: string;
  price: string;
  product: Product | number;
  qty: number;
};

export type WithdrawRequest = {
  id: string;
  amount: number;
  status_message: string;
  fulfilled: boolean;
  created_at: string;
};

export type Wallet = {
  total_revenue: number;
  curr_balance: number;
  total_withdrawn: number;
  withdraws: WithdrawRequest[];
};

export type Review = {
  id: number;
  review: string;
  rating: number;
  user: User;
};

export type Newsletter = {
  id: number;
  title: string;
  email: string;
  created_at: string;
};

export type Subscription = {
  id: number;
  business: Vendor;
  user: User;
  newsletter: Newsletter;
  created_at: string;
};


