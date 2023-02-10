import axios from 'axios';
import {logout} from '../helpers';
import {store} from '../redux/store';

const tokens = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyOTM0ZDBkOWEyMzYzYmUzYjZiOWQiLCJmaXJzdE5hbWUiOiJpZmVvbHV3YSIsImxhc3ROYW1lIjoia2luZyIsIndhbGxldCI6eyJ3YWxsZXRJZCI6IjZlOWZhMzlkLWNjZDUtNDNhYy05ZGJiLTMzYTY5MjAwYTJlOCIsIndpdGhkcmF3YWxCYWxhbmNlIjowLCJjdXJyZW50QmFsYW5jZSI6MCwicGVuZGluZ0JhbGFuY2UiOjAsImJvb2tCYWxhbmNlIjowfSwidHlwZSI6IlVTRVIiLCJ1c2VybmFtZSI6ImlmZW9sdXdha2luZzI0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjpudWxsLCJidXNpbmVzc2VzIjpbXSwiYnVzaW5lc3NGb2xsb3dpbmdzIjpbXSwiYWRkcmVzc2VzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMy0wMi0wN1QxODowNzowOS41NjhaIiwidXBkYXRlZEF0IjoiMjAyMy0wMi0wN1QxODowNzowOS41NjhaIiwiX192IjowLCJpYXQiOjE2NzU3OTM1NDEsImV4cCI6MTY3NTg3OTk0MX0.8xrqq96-bXOf5tLLqW5CaQyHl6VwSuUerWfYuOk-iFc`;

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.Accept = 'application/json';
axios.defaults.timeout = 15000;
// const BASE_URL = 'https://3838-109-180-229-29.ngrok.io/';
const BASE_URL = 'https://8824-197-210-78-57.eu.ngrok.io/api/v1';
axios.defaults.baseURL = BASE_URL;

async function handleRequest(req: any) {
  const uri = req.url.replace(BASE_URL, '/');
  const isAuth = uri.includes('auth');
  if (!isAuth) {
    const reduxStore = store.getState();
    const token = reduxStore.authModel.token;
    // console.log({token});
    if (token) {
      // req.headers['Authorization'] = `Token ${token}`;
      req.headers['Authorization'] = `Bearer ${token}`;
      // console.log(req);
      return req;
    }
    return req;
  } else {
    return req;
  }
}

async function handleResponse(res: any) {
  return res;
}

async function handleErrorResponse(err: any) {
  console.log('ApiHandler - handleErrorResponse', err?.response);

  if (err?.response.status === 401) {
    logout();
  }

  return Promise.reject(err);
}

axios.interceptors.request.use(
  async req => handleRequest(req),
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  async res => handleResponse(res),
  async err => handleErrorResponse(err),
);

/***
 * The ApiHandler framework with observable
 */
export default {
  post: async (url: any, data: any, options: any) =>
    axios.post(
      options?.fullPath ? url : url,
      data,
      options && {headers: options},
    ),
  patch: async (url: any, data: any, options: any) =>
    axios.patch(
      options?.fullPath ? url : url,
      data,
      options && {headers: options},
    ),
  put: async (url: any, data: any, options: any) =>
    axios.put(
      options?.fullPath ? url : url,
      data,
      options && {headers: options},
    ),
  delete: async (url: any, data: any, options: any) => {
    data = getParams(data);
    const config = data ? {headers: options, data} : {headers: options};
    return axios.delete(options?.fullPath ? url : url, config);
  },
  get: async (url: any, params: any, options: any) => {
    params = getParams(params);
    const config = params ? {headers: options, params} : {headers: options};
    return axios.get(options?.fullPath ? url : url, config);
  },
};

const getParams = params => {
  if (!params) {
    return null;
  }
  return params instanceof Object && !Object.keys(params).length
    ? null
    : params;
};
