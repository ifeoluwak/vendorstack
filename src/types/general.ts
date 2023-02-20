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
  deliveryAddress: Address;
};

export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  SHIPPED = 'SHIPPED',
  RECEIVED = 'RECEIVED',
  REJECTED = 'REJECTED',
  RETURNED = 'RETURNED',
  RETURN_CONFIRMED = 'RETURN_CONFIRMED',
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
  status: TransactionStatus;
  type: 'ORDER_PAYMENT';
  level: 'FREE_LEVEL';
  orders: string[];
  createdAt: string;
  updatedAt: string;
};

export enum TransactionStatus {
  PENDING = 'PENDING',
}

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
  _id: string;
  name: string;
  description: string;
  amount: number;
  active: boolean;
  enabledFeatures: SubscriptionFeature[];
};

export type SubscriptionFeature = {
  name: string;
  status: boolean;
  action: string;
  description: string;
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
