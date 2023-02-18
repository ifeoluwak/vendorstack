import moment from 'moment';
import {Platform} from 'react-native';

import {store} from '../redux/store';
import {Cart} from './../types/cart';

export const isIos = Platform.OS === 'ios';

export function getCartItems(cart: Cart) {
  return Object.values(cart);
}
export function getCartTotalPrice(cart: Cart) {
  const items = getCartItems(cart);
  return items.reduce(
    (prev, curr) => prev + parseFloat(curr?.product?.sellingPrice) * curr.count,
    0,
  );
}

export function getCartTotalQty(cart: Cart) {
  const items = Object.values(cart);
  return items.reduce((prev, curr) => prev + curr?.count, 0);
}

export function getVendorInFollows(vendorId: string) {
  const {userVendors} = store.getState().userModel;
  return userVendors.find(follow => follow.business._id === vendorId);
}

export function getOrdersFromVendor(vendorId: string) {
  const {userOrders} = store.getState().userModel;
  return userOrders.filter(order => order.business._id === vendorId);
}

export const logout = () => {
  store.dispatch.authModel.setState({token: ''});
  store.dispatch.cartModel.setState({cart: {}});
  // store.dispatch.vendorModel.setState({
  //   searchResult: [],
  //   products: null,
  //   vendors: {},
  // });
  store.dispatch.userModel.setState({
    user: null,
    profile: null,
    userVendors: [],
    addresses: [],
    userOrders: [],
    defaultAddress: null,
    userBizReview: null,
    userBizSubscription: null,
  });
  store.dispatch.generalModel.setState({
    // order_status: [],
    // orders: {},
    // trending_products: [],
  });
  store.dispatch.vendorModel.setState({
    searchResult: [],
    products: null,
    vendors: {},
    reviews: {},
    homeVendors: [],
    // order_status: [],
    // orders: {},
    // trending_products: [],
  });
  store.dispatch.businessModel.setState({
    products: [],
    orders: [],
    customers: [],
    withdraws: [],
    total_revenue: 0,
    curr_balance: 0,
    total_withdrawn: 0,
  });
};

export const today = moment();
export const yesterday = today.subtract(1, 'day');
