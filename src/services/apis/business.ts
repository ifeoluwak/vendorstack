import {Product} from './../../types/product';
import {Profile, Customer} from './../../types/user';
import {Vendor} from './../../types/vendor';
import {Address, Order, Wallet} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  createBusiness: (data: Partial<Vendor>) =>
    ApiHandler.post('/businesses', data, {}),
  updateBusiness: (data: Partial<Vendor>, businessId: string) =>
    ApiHandler.patch(`/businesses/${businessId}`, data, {}),
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
  getBusinessProducts: (
    businessId: string,
    limit = 20,
  ): Promise<AxiosResponse<{results: Product[]}, any>> =>
    ApiHandler.get(
      `/products?productBusinessId=${businessId}&limit=${limit}`,
      null,
      {},
    ),
  updateProduct: (data: Partial<Product>, productId: string) =>
    ApiHandler.patch(`/products/${productId}`, data, {}),
  setProductActive: (productId: string) =>
    ApiHandler.put(`/products/${productId}/active`, null, {}),
  pinProduct: (productId: string) =>
    ApiHandler.put(`/products/${productId}/pin`, null, {}),
  addProduct: (data: Partial<Product>) =>
    ApiHandler.post('/products', data, {}),
};
