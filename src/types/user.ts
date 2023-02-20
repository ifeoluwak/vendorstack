import {AgeRange, Order, Address} from './general';
import {Vendor} from './vendor';

export type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  businesses?: Vendor[];
  addresses: Address[];
  businessFollowings: string[];
  wallet: UserWallet;
  isBusinessOwner: boolean;
  rating: {
    overallReviewRatingAvg: number;
    overallReviewRating: number;
    overallReviewCount: number;
  };
  type: 'USER';
  emailVerification: boolean;
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

export type UserWallet = {
  allPayment: number;
  allTimeBalance: number;
  bookBalance: number;
  currentBalance: number;
  otherPayment: number;
  pendingBalance: number;
  withdrawalPayment: number;
};
