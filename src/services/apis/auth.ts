import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  login: (data: any) =>
    ApiHandler.post('/users/login', data, {credentials: 'include'}),
  register: (data: any) =>
    ApiHandler.post('/users', data, {credentials: 'include'}),
};
