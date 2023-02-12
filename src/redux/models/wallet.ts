import {BankAccount, Order} from './../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {WalletApi} from '../../services/apis';

type WalletProp = {
  bankAccount: BankAccount | null;
  history: Order[];
};

const walletModel = createModel<RootModel>()({
  state: {
    bankAccount: null,
    history: [],
  } as WalletProp,
  reducers: {
    setState(state, payload: Partial<WalletProp>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async createBankAccount(payload: Partial<BankAccount>, state) {
      const {user} = state.userModel;
      try {
        payload.userId = user?._id;
        const {data} = await WalletApi.createBankAccount(payload);
        // await dispatch.userModel.getUserProfile();
        console.log('createBankAccount', data);
        return true;
      } catch ({response}) {}
    },
    async updateBankAccount(payload: Partial<BankAccount>, state) {
      const {user} = state.userModel;
      try {
        await WalletApi.updateBankAccount(payload, user?._id!);
        // dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async deleteBankAccount(paymentAcctId: string) {
      try {
        await WalletApi.deleteBankAccount(paymentAcctId);
        // dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async getBankAccount(_, state) {
      const {user} = state.userModel;
      try {
        const {data} = await WalletApi.getBankAccount(user?._id!);
        // dispatch.userModel.getUserProfile();
        console.log('getBankAccount', data);
      } catch ({response}) {}
    },
    async withdrawMoney(
      payload: {
        userId: string;
        amount: number;
        reason: 'FUND_WITHDRAWAL';
      },
      state,
    ) {
      const {user} = state.userModel;
      try {
        await WalletApi.withdrawMoney(payload, user?._id!);
        // dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async getWithdrawHistory(_, state) {
      const {user} = state.userModel;
      try {
        const {data} = await WalletApi.getWithdrawHistory(user?._id!);
        // dispatch.userModel.getUserProfile();
        console.log('getWithdrawHistory', data);
      } catch ({response}) {}
    },
  }),
});

export default walletModel;
