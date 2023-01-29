import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  verifyPayment: (data: {ref: string}) =>
    ApiHandler.post('/api/verify_transaction', data, {}),
  createOrder: (data: {
    vendor: string;
    address: string;
    ref: string;
    products: {[key: string]: number};
  }): Promise<AxiosResponse<{order: number}>> =>
    ApiHandler.post('/api/user_checkout', data, {}),
};
