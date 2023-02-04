import {Review} from './general';
import {Product} from './product';

export type Vendor = {
  id: string;
  slug: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  biography: string;
  category: string;
  url: string;
  state: string;
  pre_order_notice: string;
  post_order_notice: string;
  website: string;
  ig_username: string;
  created_at: string;
  products?: Product[];
  follower_count: number;
  review_count: number;
  rating: number;
  reviews: Review[];
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
