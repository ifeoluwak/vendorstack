import {Vendor} from './vendor';

export type Product = {
  _id: string;
  name: string;
  photo: string;
  description: string;
  quantity: number | string;
  costPrice: number | string;
  sellingPrice: number | string;
  business: Vendor;
  createdAt: string;
  active: boolean;
  pin: boolean;
};

export type ProductLean = {
  id: string;
  url: string;
  business: {
    id: string;
    name: string;
  };
};
