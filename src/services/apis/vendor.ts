import {Review} from './../../types/general';
import {Vendor} from './../../types/vendor';
import {Product} from './../../types/product';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  getVendors: (limit = 10): Promise<AxiosResponse<{results: Vendor[]}, any>> =>
    ApiHandler.get(`/businesses?limit=${limit}`, null, {}),
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
    ApiHandler.get(`/businesses/${vendorId}`, null, {}),
  getVendorProducts: (
    vendorId: string,
    limit = 20,
  ): Promise<AxiosResponse<{results: Product[]}, any>> =>
    ApiHandler.get(
      `/products?productBusinessId=${vendorId}&limit=${limit}`,
      null,
      {},
    ),
  getVendorReviews: (
    businessId: string,
    limit = 30,
  ): Promise<AxiosResponse<{results: Review[]}>> =>
    ApiHandler.get(
      `/reviews?reviewBusinessId=${businessId}&limit=${limit}`,
      null,
      {},
    ),
};
