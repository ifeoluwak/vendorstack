import {Vendor} from './../../types/vendor';
import {Product} from './../../types/product';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  getVendors: (): Promise<AxiosResponse<{vendors: Vendor[]}, any>> =>
    ApiHandler.get('/api/search_business_api', null, {}),
  searchVendors: (
    query: string,
    category: string,
  ): Promise<AxiosResponse<{vendors: Vendor[]}, any>> =>
    ApiHandler.get(
      `/api/search_business_api?query=${query}&category=${category}`,
      null,
      {},
    ),
  getVendor: (vendorId: string): Promise<AxiosResponse<Vendor, any>> =>
    ApiHandler.get(`/api/get_vendor?vendor=${vendorId}`, null, {}),
  getVendorProducts: (
    vendorId: string,
  ): Promise<AxiosResponse<{products: Product[]}, any>> =>
    ApiHandler.get(
      `/ecommerce/api/vendor/products?vendorId=${vendorId}`,
      null,
      {},
    ),
};
