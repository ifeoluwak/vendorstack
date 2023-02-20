import {Category, Subscription} from './general';
import {User} from './user';

export type Vendor = {
  _id: string;
  active: boolean;
  takingOrder: boolean;
  verified: boolean;
  name: string;
  email: string;
  address: string;
  phone: string;
  description: string;
  categories: Category[];
  logo: string;
  state: string;
  postalCode: string;
  country: string;
  socialAccountId: string;
  socialAccountUserId: string;
  socialType: string;
  socialUsername: string;
  website: string;
  created_at: string;
  customerFollowers: [];
  customers: [];
  orderNoticeInfo: string;
  vendor?: User;
  rating: {
    reviewCount: number;
    reviewRating: number;
    reviewRatingAvg: number;
  };
  sale: {
    saleId: string;
    soldCount: number;
    totalSold: number;
    pendingSold: number;
  };
  subscription: Subscription;
};

export type TrendingVendor = {
  id: string;
  name: string;
  url: string;
};

export type TopRatedVendor = {
  id: string;
  name: string;
  url: string;
  rating: number;
  review_count: number;
};
