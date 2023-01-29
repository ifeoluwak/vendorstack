import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  login: (data: any) =>
    ApiHandler.post('/api/auth/login', data, {credentials: 'include'}),
  register: (data: any) =>
    ApiHandler.post('/api/auth/register', data, {credentials: 'include'}),
};
