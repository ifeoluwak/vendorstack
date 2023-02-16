import {Product} from './../../types/product';
import {Customer} from './../../types/user';
import {Order, WithdrawRequest} from './../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {BusinessApi} from '../../services/apis';
import {Vendor} from '../../types/vendor';

type BusinessProp = {
  products: Product[] | [];
  orders: Order[];
  customers: Customer[];
  withdraws: WithdrawRequest[] | [];
  total_revenue: number;
  curr_balance: number;
  total_withdrawn: number;
};

const businessModel = createModel<RootModel>()({
  state: {
    products: [],
    orders: [],
    customers: [],
    withdraws: [],
    total_revenue: 0,
    curr_balance: 0,
    total_withdrawn: 0,
  } as BusinessProp,
  reducers: {
    setState(state, payload: Partial<BusinessProp>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async createBusiness(payload, state) {
      const {user} = state.userModel;
      try {
        payload.userId = user?._id;
        const {data} = await BusinessApi.createBusiness(payload);
        await dispatch.userModel.getUserProfile();
        console.log('createBusiness', data);
        return true;
      } catch ({response}) {}
    },
    async updateBusiness(payload: Partial<Vendor>) {
      try {
        await BusinessApi.updateBusiness(payload, payload._id!);
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async setBusinessTakingOrders(_, state) {
      try {
        const {
          user: {businesses},
        } = state.userModel;
        const businessId = businesses[0]._id;
        await BusinessApi.setBusinessTakingOrders(businessId);
        // console.log('setBusinessTakingOrders', data);
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async setBusinessActive(_, state) {
      try {
        const {
          user: {businesses},
        } = state.userModel;
        const businessId = businesses[0]._id;
        await BusinessApi.setBusinessActive(businessId);
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async updateOrderStatus(
      payload: {
        orderId: string;
        customerId: string;
        status: 'ACCEPTED' | 'SHIPPED' | 'REJECTED' | 'RETURN_CONFIRMED';
      },
      state,
    ) {
      try {
        const {user} = state.userModel;
        await BusinessApi.updateOrderStatus({...payload, userId: user?._id!});
        dispatch.generalModel.getOrder(payload.orderId);
        return true;
      } catch ({response}) {}
    },
    async getBusinessOrders(
      payload: {dateRange: string; selectedStatus: string},
      state,
    ) {
      try {
        const {
          user: {businesses},
        } = state.userModel;
        const businessId = businesses[0]._id;
        const {dateRange, selectedStatus} = payload;
        const {data} = await BusinessApi.getBusinessOrders(
          businessId,
          dateRange,
          selectedStatus,
        );
        dispatch.businessModel.setState({orders: data.results});
      } catch ({response}) {}
    },
    async getBusinessCustomers(_, state) {
      try {
        const {
          user: {businesses},
        } = state.userModel;
        const businessId = businesses[0]._id;
        const {data} = await BusinessApi.getBusinessCustomers(businessId);
        console.log('getBusinessCustomers', data);
        // dispatch.businessModel.setState({customers: data});
      } catch ({response}) {}
    },
    async getBusinessWallet() {
      try {
        const {data} = await BusinessApi.getBusinessWallet();
        dispatch.businessModel.setState({
          withdraws: data.withdraws,
          total_revenue: data.total_revenue,
          curr_balance: data.curr_balance,
          total_withdrawn: data.total_withdrawn,
        });
      } catch ({response}) {}
    },
    async getBusinessProducts(_, state) {
      const {
        user: {businesses},
      } = state.userModel;
      const businessId = businesses?.[0]?._id;
      try {
        const {data} = await BusinessApi.getBusinessProducts(businessId);
        dispatch.businessModel.setState({products: data.results});
      } catch ({response}) {}
    },
    async updateProduct(payload: Partial<Product>, state) {
      const {
        user: {_id: userId, businesses},
      } = state.userModel;
      const businessId = businesses?.[0]?._id;
      try {
        await BusinessApi.updateProduct(
          {
            ...payload,
            businessId,
            userId,
          },
          payload._id,
        );
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
    async addProduct(payload: Partial<Product>, state) {
      const {
        user: {_id: userId, businesses},
      } = state.userModel;
      const businessId = businesses?.[0]?._id;
      try {
        await BusinessApi.addProduct({
          ...payload,
          businessId,
          userId,
        });
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
    async setProductActive(productId: string) {
      try {
        await BusinessApi.setProductActive(productId);
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
    async pinProduct(productId: string) {
      try {
        await BusinessApi.pinProduct(productId);
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
  }),
});

export default businessModel;
