import {BankAccount, WithdrawHistory} from './../../types/general';
import {AxiosResponse} from 'axios';
import ApiHandler from '../ApiHandler';

export default {
  createBankAccount: (data: Partial<BankAccount>) =>
    ApiHandler.post('/payments/accounts', data, {}),
  updateBankAccount: (data: Partial<BankAccount>, userId: string) =>
    ApiHandler.patch(`/payments/accounts/${userId}`, data, {}),
  getBankAccount: (userId: string): Promise<AxiosResponse<BankAccount>> =>
    ApiHandler.get(`/payments/accounts/${userId}`, null, {}),
  deleteBankAccount: (paymentAcctId: string): Promise<AxiosResponse<any>> =>
    ApiHandler.delete(`/payments/accounts/${paymentAcctId}`, null, {}),
  withdrawMoney: (
    data: {
      userId: string;
      amount: number;
      reason: 'FUND_WITHDRAWAL';
    },
    userId: string,
  ): Promise<AxiosResponse<any>> =>
    ApiHandler.get(`/payments/users/${userId}/transfer`, data, {}),
  getWithdrawHistory: (
    userId: string,
    dateRange: string,
    selectedStatus: string,
    limit = 30,
  ): Promise<AxiosResponse<{results: WithdrawHistory[]}>> =>
    ApiHandler.get(
      `/payments/histories/${userId}?limit=${limit}&paymentDateRange=${dateRange}&paymentStatus=${selectedStatus}`,
      null,
      {},
    ),
};
