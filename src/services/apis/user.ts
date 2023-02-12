import {Profile, User, UserFollows} from './../../types/user';
import {Address, AgeRange, Order, Review, ReviewPayload} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  createAddress: (data: Partial<Address>, userID: string) =>
    ApiHandler.post(`/users/${userID}/address`, data, {}),
  deleteAddress: (addressId: string, userID: string) =>
    ApiHandler.delete(`/users/${userID}/address/${addressId}`, null, {}),
  getUserAddresses: (): Promise<AxiosResponse<Address[], any>> =>
    ApiHandler.get('/api/get_user_addresses', {}, {}),
  getUserVendors: (): Promise<AxiosResponse<UserFollows[], any>> =>
    ApiHandler.get('/api/get_user_vendors', null, {}),
  getUserOrders: (
    customerId: string,
    limit = 30,
  ): Promise<AxiosResponse<{results: Order[]}>> =>
    ApiHandler.get(
      `/orders?orderByCustomerId=${customerId}&limit=${limit}`,
      null,
      {},
    ),
  getUserVendorOrders: (
    businessId: string,
    customerId: string,
  ): Promise<AxiosResponse<{results: Order[]}>> =>
    ApiHandler.get(
      `/orders?orderByCustomerId=${customerId}&orderByBusinessId=${businessId}`,
      null,
      {},
    ),
  getUserProfile: (): Promise<AxiosResponse<User, any>> =>
    ApiHandler.get('/users/me', null, {}),
  updateUserProfile: (
    data: {
      firstName: string;
      lastName: string;
      // age_range: AgeRange;
      // phone: string;
    },
    userID: string,
  ) => ApiHandler.put(`/users/${userID}`, data, {}),
  updateUserDeviceToken: (token: string) =>
    ApiHandler.post('/api/save_user_device_token', {token}, {}),
  followVendor: (businessId: string, followerId: string) =>
    ApiHandler.put(`businesses/${businessId}/follower/${followerId}`, {}, {}),
  unfollowVendor: (businessId: string, followerId: string) =>
    ApiHandler.delete(
      `businesses/${businessId}/follower/${followerId}`,
      {},
      {},
    ),
  subscribe_to_newsletter: (vendor_id: string) =>
    ApiHandler.post('/api/subscribe_to_newsletter', {vendor_id}, {}),
  unsubscribe_to_newsletter: (subscriber_id: number) =>
    ApiHandler.post('/api/unsubscribe_to_newsletter', {subscriber_id}, {}),
  getUserSubscription: (vendor_id: string) =>
    ApiHandler.get(
      `/api/get_user_vendor_newsletter_subscription?vendor_id=${vendor_id}`,
      null,
      {},
    ),
  createOrder: (data: {
    vendor: string;
    address: string;
    ref: string;
    products: {[key: string]: number}[];
  }) => ApiHandler.post('/api/user_checkout', data, {}),
  reviewVendor: (data: ReviewPayload) => ApiHandler.post('/reviews', data, {}),
  updateReview: (data: ReviewPayload) =>
    ApiHandler.patch(`/reviews/${data.id}`, data, {}),
  deleteReview: (id: string) =>
    ApiHandler.post('/api/delete_business_review', {id}, {}),
  getUserVendorReview: (
    businessId: string,
    customerId: string,
  ): Promise<AxiosResponse<{results: Review[]}>> =>
    ApiHandler.get(
      `/reviews?reviewCustomerId=${customerId}&reviewBusinessId=${businessId}`,
      null,
      {},
    ),
};
