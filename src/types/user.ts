import {AgeRange, Order} from './general';
import {Vendor} from './vendor';

export type User = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  business?: Vendor;
};

export type Profile = {
  id: string;
  phone: string;
  age_range: AgeRange;
  user: User;
};

export type Customer = {
  id: string;
  newsletter: boolean;
  orders: Order[];
  user: User;
};

export type UserFollows = {
  id: string;
  business: Vendor;
};
