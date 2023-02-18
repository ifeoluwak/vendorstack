import { Vendor } from './vendor';
import {OrderStatus, Address} from './general';
import {Product} from './product';
import {Customer, User} from './user';

export type CartItem = {
  product: Product;
  count: number;
};

export type Cart = {
  [key: string]: CartItem;
};

export type PostOrder = {
  orderDetails: PostProduct[];
  addressId: string;
  customerId?: string;
  userId?: string;
};

export type PostProduct = {
  productId: string;
  quantity: number;
};

export type OrderTransaction = {
  orders: [
    {
      _id: string;
      createdAt: string;
      deliveryAddress: Address;
      isTransactionPaid: boolean;
      products: OrderProduct[];
      status: OrderStatus;
      totalAmount: number;
      updatedAt: string;
      vendor: Customer;
      customer: Customer;
      business: {
        _id: string;
        name: string;
        logo: string;
        website: string;
      };
    },
  ];
  _id: string;
  convenienceFee: number;
  createdAt: string;
  level: string;
  referenceId: string;
  status: string;
  totalAmount: number;
  totalPayableAmount: number;
  type: 'ORDER_PAYMENT';
  updatedAt: string;
  user: string;
};

export type OrderProduct = {
  _id: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  product: {
    _id: string;
    name: string;
    photo: string;
  };
};
