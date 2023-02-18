import {ProductLean} from './../../types/product';
import {AgeRange, Order, OrderStatus} from './../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {GeneralApi} from '../../services/apis';
import {Category} from '../../types/general';
import {TopRatedVendor, TrendingVendor} from '../../types/vendor';
import { Alert } from 'react-native';

type GeneralProp = {
  categories: Category[] | [];
  age_ranges: AgeRange[] | [];
  order_status: OrderStatus[] | [];
  orders: {[key: string]: Order};
  trending_products: ProductLean[];
  trending_vendors: TrendingVendor[];
  toprated_vendors: TopRatedVendor[];
};

const generalModel = createModel<RootModel>()({
  state: {
    categories: [],
    order_status: [],
    orders: {},
    trending_products: [],
    trending_vendors: [],
    toprated_vendors: [],
    age_ranges: [],
  } as GeneralProp,
  reducers: {
    setState(state, payload: Partial<GeneralProp>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async getCategories() {
      try {
        const {data} = await GeneralApi.getCategories();
        console.log('getCategories', data);
        dispatch.generalModel.setState({categories: data});
      } catch ({response}) {}
    },
    async getOrderTransaction(id: string) {
      try {
        const {data} = await GeneralApi.getOrderTransaction(id);
        console.log('getOrderTransaction', data);
        // dispatch.generalModel.setState({orders: {...orders, [id]: data}});
        return data;
      } catch ({response}) {}
    },
    async deleteOrderTransaction(id: string) {
      try {
        const {data} = await GeneralApi.deleteOrderTransaction(id);
        console.log('deleteOrderTransaction', data);
        return true;
      } catch ({response}) {
        Alert.alert('Error', 'Could not delete. Please try again.');
      }
    },
    async getOrder(id: string, state) {
      const {orders} = state.generalModel;
      try {
        const {data} = await GeneralApi.getOrder(id);
        console.log('getOrder', data);
        dispatch.generalModel.setState({orders: {...orders, [id]: data}});
      } catch ({response}) {}
    },
    async getOrderStatuses() {
      try {
        const {data} = await GeneralApi.getOrderStatuses();
        dispatch.generalModel.setState({order_status: data});
      } catch ({response}) {}
    },
    async getTrendingProducts() {
      try {
        const {data} = await GeneralApi.getTrendingProducts();
        dispatch.generalModel.setState({trending_products: data});
      } catch ({response}) {}
    },
    async getTrendingVendors() {
      try {
        const {data} = await GeneralApi.getTrendingVendors();
        dispatch.generalModel.setState({trending_vendors: data});
      } catch ({response}) {}
    },
    async getTopratedVendors() {
      try {
        const {data} = await GeneralApi.getTopratedVendors();
        dispatch.generalModel.setState({toprated_vendors: data});
      } catch ({response}) {}
    },
    async getAgeRange() {
      try {
        const {data} = await GeneralApi.getAgeRange();
        dispatch.generalModel.setState({age_ranges: data});
      } catch ({response}) {}
    },
  }),
});

export default generalModel;
