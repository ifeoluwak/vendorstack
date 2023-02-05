import {Product} from './../../types/product';
import {Profile, Customer} from './../../types/user';
import {Vendor} from './../../types/vendor';
import {Address, Order, Wallet} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  createAddress: (data: Partial<Address>) =>
    ApiHandler.post('/api/user_address_create', data, {}),
  getBusinessProducts: (): Promise<AxiosResponse<Product[], any>> =>
    ApiHandler.get('/api/get_business_products', null, {}),
  getBusinessCustomers: (): Promise<AxiosResponse<Customer[], any>> =>
    ApiHandler.get('/api/get_business_customers', null, {}),
  getBusinessOrders: (): Promise<AxiosResponse<Order[], any>> =>
    ApiHandler.get('/api/get_business_orders', null, {}),
  getUBusinessProfile: (): Promise<AxiosResponse<Profile, any>> =>
    ApiHandler.get('/api/get_user_profile', null, {}),
  getBusinessOrder: (id: string): Promise<AxiosResponse<Order, any>> =>
    ApiHandler.get(`/api/get_order?order=${id}`, null, {}),
  getBusinessFollowers: (id: string): Promise<AxiosResponse<Order, any>> =>
    ApiHandler.get(`/api/get_order?order=${id}`, null, {}),
  getBusinessSubscribers: (id: string): Promise<AxiosResponse<Order, any>> =>
    ApiHandler.get(`/api/get_order?order=${id}`, null, {}),
  getBusinessWallet: (): Promise<AxiosResponse<Wallet, any>> =>
    ApiHandler.get('/api/get_user_wallet', null, {}),
  updateOrderStatus: (data: {id: string; status: string}) =>
    ApiHandler.post('/api/update_business_order_status', data, {}),
  updateBusinessProfile: (data: Partial<Vendor>) =>
    ApiHandler.post('/api/update_business_profile', data, {
      'Content-type': 'multipart/form-data',
    }),
  updateProduct: (data: Partial<Product>) =>
    ApiHandler.post('/api/update_business_product', data, {
      'Content-type': 'multipart/form-data',
    }),
  addProduct: (data: Partial<Product>) =>
    ApiHandler.post('/api/create_business_product', data, {
      'Content-type': 'multipart/form-data',
    }),
};
