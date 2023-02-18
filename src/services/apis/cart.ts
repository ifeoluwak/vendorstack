import {OrderTransaction} from './../../types/cart';
import {AxiosResponse} from 'axios';
import {PostOrder} from '../../types/cart';
import ApiHandler from '../ApiHandler';

export default {
  verifyPayment: (data: {ref: string}) =>
    ApiHandler.post('/api/verify_transaction', data, {}),
  createOrder: (data: PostOrder): Promise<AxiosResponse<OrderTransaction>> =>
    ApiHandler.post('/orders', data, {}),
};
