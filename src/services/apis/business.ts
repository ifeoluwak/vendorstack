import {Product} from './../../types/product';
import {Customer} from './../../types/user';
import {Vendor} from './../../types/vendor';
import {Order} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  createBusiness: (data: Partial<Vendor>) =>
    ApiHandler.post('/businesses', data, {}),
  updateBusiness: (data: Partial<Vendor>, businessId: string) =>
    ApiHandler.patch(`/businesses/${businessId}`, data, {}),
  setBusinessActive: (businessId: string) =>
    ApiHandler.put(`/businesses/${businessId}/active`, null, {}),
  setBusinessTakingOrders: (businessId: string) =>
    ApiHandler.put(`/businesses/${businessId}/taking-order`, {}, {}),
  updateOrderStatus: (data: {
    orderId: string;
    customerId: string;
    status: 'ACCEPTED' | 'SHIPPED' | 'REJECTED' | 'RETURN_CONFIRMED';
    userId: string;
  }) => ApiHandler.put(`/orders/${data.orderId}/status`, data, {}),
  getBusinessCustomers: (
    businessId: string,
  ): Promise<AxiosResponse<{results: Customer[]}>> =>
    ApiHandler.get(`/businesses/${businessId}/customers`, null, {}),
  getBusinessOrders: (
    businessId: string,
    dateRange: string,
    selectedStatus: string,
    limit = 30,
  ): Promise<AxiosResponse<{results: Order[]}>> =>
    ApiHandler.get(
      `/orders?orderByBusinessId=${businessId}&limit=${limit}&orderDateRange=${dateRange}&OrderStatus=${selectedStatus}`,
      null,
      {},
    ),
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
