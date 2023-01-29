import {ProductLean} from './../../types/product';
import {AgeRange, Category, Order, OrderStatus} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';
import {TopRatedVendor, TrendingVendor} from '../../types/vendor';

export default {
  getCategories: (): Promise<AxiosResponse<{categories: Category[]}, any>> =>
    ApiHandler.get('/api/get_category_api', null, {}),
  getAgeRange: (): Promise<AxiosResponse<AgeRange[], any>> =>
    ApiHandler.get('/api/get_age_range', null, {}),
  getOrder: (id: string): Promise<AxiosResponse<Order, any>> =>
    ApiHandler.get(`/api/get_order?order=${id}`, null, {}),
  getOrderStatuses: (): Promise<AxiosResponse<OrderStatus[], any>> =>
    ApiHandler.get('/api/get_order_status', null, {}),
  getTrendingProducts: (): Promise<AxiosResponse<ProductLean[], any>> =>
    ApiHandler.get('/api/trending_products_api?limit=5', null, {}),
  getTrendingVendors: (): Promise<AxiosResponse<TrendingVendor[], any>> =>
    ApiHandler.get('/api/trending_vendors_api?limit=5', null, {}),
  getTopratedVendors: (): Promise<AxiosResponse<TopRatedVendor[], any>> =>
    ApiHandler.get('/api/toprated_vendors_api?limit=5', null, {}),
};
