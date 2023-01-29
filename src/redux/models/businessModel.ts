import {Product} from './../../types/product';
import {Customer} from './../../types/user';
import {Address, Order, WithdrawRequest} from './../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {BusinessApi, UserApi} from '../../services/apis';

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
    async createAddress(payload: Partial<Address>) {
      try {
        await UserApi.createAddress(payload);
        return true;
      } catch ({response}) {}
    },
    async getBusinessProfile() {
      try {
        const {data} = await UserApi.getUserProfile();
        dispatch.businessModel.setState({profile: data});
      } catch ({response}) {}
    },
    async getBusinessOrders() {
      try {
        const {data} = await BusinessApi.getBusinessOrders();
        dispatch.businessModel.setState({orders: data});
      } catch ({response}) {}
    },
    async getBusinessCustomers() {
      try {
        const {data} = await BusinessApi.getBusinessCustomers();
        dispatch.businessModel.setState({customers: data});
      } catch ({response}) {}
    },
    async getBusinessProducts() {
      try {
        const {data} = await BusinessApi.getBusinessProducts();
        dispatch.businessModel.setState({products: data});
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
    async updateOrderStatus(payload: {id: string; status: string}) {
      try {
        await BusinessApi.updateOrderStatus(payload);
        dispatch.generalModel.getOrder(payload.id);
      } catch ({response}) {}
    },
    async updateProduct(payload: Partial<Product>) {
      try {
        await BusinessApi.updateProduct(payload);
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
    async addProduct(payload: Partial<Product>) {
      try {
        await BusinessApi.addProduct(payload);
        dispatch.businessModel.getBusinessProducts();
        return true;
      } catch ({response}) {}
    },
  }),
});

export default businessModel;
