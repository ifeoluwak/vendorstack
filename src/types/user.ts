import { AgeRange, Order, Address } from './general';
import {Vendor} from './vendor';

export type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  business?: Vendor;
  businesses?: Vendor[];
  addresses: Address[];
  businessFollowings: any[];
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
