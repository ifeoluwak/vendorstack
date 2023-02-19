import {Product, ProductLean} from './../../types/product';
import {AgeRange, Category, Order, OrderStatus} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';
import {TopRatedVendor, TrendingVendor} from '../../types/vendor';
import {OrderTransaction} from '../../types/cart';

export default {
  getCategories: (): Promise<AxiosResponse<Category[], any>> =>
    ApiHandler.get('/users/categories', null, {}),
  getAgeRange: (): Promise<AxiosResponse<AgeRange[], any>> =>
    ApiHandler.get('/api/get_age_range', null, {}),
  getOrderTransaction: (
    transactionId: string,
  ): Promise<AxiosResponse<OrderTransaction>> =>
    ApiHandler.get(`/transactions/${transactionId}`, null, {}),
  deleteOrderTransaction: (
    transactionId: string,
  ): Promise<AxiosResponse<OrderTransaction>> =>
    ApiHandler.delete(`/transactions/${transactionId}`, null, {}),
  getOrder: (id: string): Promise<AxiosResponse<Order>> =>
    ApiHandler.get(`/orders/${id}`, null, {}),
  getOrderStatuses: (): Promise<AxiosResponse<OrderStatus[], any>> =>
    ApiHandler.get('/api/get_order_status', null, {}),
  searchProducts: (
    productSearch: string,
    limit = 30,
  ): Promise<AxiosResponse<{results: Product[]}>> =>
    ApiHandler.get(
      `/products?productSearch=${productSearch}&limit=${limit}`,
      null,
      {},
    ),
  getTrendingProducts: (): Promise<AxiosResponse<ProductLean[], any>> =>
    ApiHandler.get('/api/trending_products_api?limit=5', null, {}),
  getTrendingVendors: (): Promise<AxiosResponse<TrendingVendor[], any>> =>
    ApiHandler.get('/api/trending_vendors_api?limit=5', null, {}),
  getTopratedVendors: (): Promise<AxiosResponse<TopRatedVendor[], any>> =>
    ApiHandler.get('/api/toprated_vendors_api?limit=5', null, {}),
  updateOrderStatus: (id: string): Promise<AxiosResponse<any>> =>
    ApiHandler.get(`/orders/${id}/status`, null, {}),
};
