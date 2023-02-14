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
  _id: string;
  business: Vendor;
  // transaction: OrderItem[];
  status: OrderStatus;
  created_at: String;
  totalAmount: String;
  products: OrderItem[];
  vendor: User;
  customer: User;
  transaction: Transaction;
};

export enum OrderStatus {
  PENDING,
  RECEIVED,
  REJECTED,
}

export type OrderItem = {
  _id: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  product: Product;
};

export type Transaction = {
  _id: string;
  totalAmount: number;
  convenienceFee: number;
  totalPayableAmount: number;
  referenceId: string;
  status: 'PENDING';
  type: 'ORDER_PAYMENT';
  level: 'FREE_LEVEL';
  orders: string[];
  createdAt: string;
  updatedAt: string;
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

export type BankAccount = {
  _id: string;
  bankName: string;
  bankCode: string;
  bankAddress: string;
  beneficiaryName: string;
  beneficiaryAccountNo: string;
  swiftCodeOrBic: string;
  routingOrSortNo: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
};

export type Review = {
  _id: number;
  comment: string;
  rating: number;
  customer: User;
};

export type ReviewPayload = {
  businessId: string;
  vendorId: string;
  comment: string;
  rating: number;
  customerId?: string;
  userId?: string;
  id?: string;
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

export type Bank = {
  active: boolean;
  code: string;
  country: string;
  createdAt: string;
  currency: string;
  gateway: '';
  id: number;
  is_deleted: boolean;
  longcode: string;
  name: string;
  pay_with_bank: boolean;
  slug: string;
  type: string;
  updatedAt: string;
};

export type WithdrawHistory = {
  _id: string;
  amount: number;
  createdAt: string;
  description: string;
  reason: WithdrawReason;
  referenceId: string;
  status: WithdrawStatus;
  transferCode: string;
  updatedAt: string;
};

export enum WithdrawStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  REVERSED = 'REVERSED',
  FAILED = 'FAILED',
}

export enum WithdrawReason {
  FUND_WITHDRAWAL = 'FUND_WITHDRAWAL',
  FUND_TRANSFER = 'FUND_TRANSFER',
  FUND_REFUND = 'FUND_REFUND',
}
