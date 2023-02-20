import {BankAccount, WithdrawHistory} from '../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {WalletApi} from '../../services/apis';

type WalletProp = {
  bankAccount: BankAccount | null;
  history: WithdrawHistory[];
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
        await WalletApi.createBankAccount(payload);
        dispatch.walletModel.getBankAccount();
        return true;
      } catch ({response}) {}
    },
    async updateBankAccount(payload: Partial<BankAccount>, state) {
      const {user} = state.userModel;
      try {
        await WalletApi.updateBankAccount(payload, user?._id!);
        dispatch.walletModel.getBankAccount();
        return true;
      } catch ({response}) {}
    },
    async deleteBankAccount(paymentAcctId: string) {
      try {
        await WalletApi.deleteBankAccount(paymentAcctId);
        dispatch.walletModel.getBankAccount();
        return true;
      } catch ({response}) {}
    },
    async getBankAccount(_, state) {
      const {user} = state.userModel;
      try {
        const {data} = await WalletApi.getBankAccount(user?._id!);
        dispatch.walletModel.setState({bankAccount: data});
      } catch ({response}) {}
    },
    async withdrawMoney(
      payload: {
        amount: number;
      },
      state,
    ) {
      const {user} = state.userModel;
      try {
        await WalletApi.withdrawMoney(
          {...payload, reason: 'FUND_WITHDRAWAL', userId: user?._id!},
          user?._id!,
        );
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async getWithdrawHistory(
      payload: {dateRange: string; selectedStatus: string},
      state,
    ) {
      const {user} = state.userModel;
      try {
        const {dateRange, selectedStatus} = payload;
        const {data} = await WalletApi.getWithdrawHistory(
          user?._id!,
          dateRange,
          selectedStatus,
        );
        console.log('getWithdrawHistory', data.results.length);
        dispatch.walletModel.setState({history: data.results});
      } catch ({response}) {
        console.log('error', response);
      }
    },
  }),
});

export default walletModel;
