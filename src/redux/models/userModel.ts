import {Alert} from 'react-native';
import {Profile, UserFollows} from './../../types/user';
import {
  Address,
  AgeRange,
  Order,
  Review,
  Subscription,
} from './../../types/general';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {UserApi} from '../../services/apis';

type UserProp = {
  userVendors: UserFollows[] | [];
  addresses: Address[] | [];
  userOrders: Order[] | [];
  defaultAddress: Address | null;
  profile: Profile | null;
  userBizReview: Review | null;
  userBizSubscription: Subscription | null;
};

const userModel = createModel<RootModel>()({
  state: {
    profile: null,
    userVendors: [],
    addresses: [],
    userOrders: [],
    defaultAddress: null,
    userBizReview: null,
    userBizSubscription: null,
  } as UserProp,
  reducers: {
    setState(state, payload: Partial<UserProp>) {
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
        dispatch.userModel.getUserAddresses();
        return true;
      } catch ({response}) {}
    },
    async deleteAddress(payload: Partial<Address>) {
      try {
        await UserApi.deleteAddress(payload);
        dispatch.userModel.getUserAddresses();
        return true;
      } catch ({response}) {}
    },
    async getUserAddresses(_, state) {
      const {defaultAddress} = state.userModel;
      try {
        const {data} = await UserApi.getUserAddresses();
        dispatch.userModel.setState({
          addresses: data,
          defaultAddress: defaultAddress ? defaultAddress : data[0],
        });
      } catch ({response}) {}
    },
    async getUserProfile() {
      try {
        const {data} = await UserApi.getUserProfile();
        dispatch.userModel.setState({profile: data});
      } catch ({response}) {}
    },
    async updateUserProfile(payload: {
      first_name: string;
      last_name: string;
      age_range: AgeRange;
      phone: string;
    }) {
      try {
        await UserApi.updateUserProfile(payload);
        return true;
      } catch ({response}) {
        Alert.alert('Error', 'Something went wrong. Please try again');
      }
    },
    async updateUserDeviceToken(token: string) {
      try {
        await UserApi.updateUserDeviceToken(token);
        return true;
      } catch ({response}) {}
    },
    async getUserVendors() {
      try {
        const {data} = await UserApi.getUserVendors();
        dispatch.userModel.setState({userVendors: data});
      } catch ({response}) {}
    },
    async getUserOrders() {
      try {
        const {data} = await UserApi.getUserOrders();
        dispatch.userModel.setState({userOrders: data});
      } catch ({response}) {}
    },
    async followVendor(payload: {vendorId: string}) {
      try {
        await UserApi.followVendor(payload);
        await dispatch.userModel.getUserVendors();
      } catch ({response}) {}
    },
    async unfollowVendor(followId: string) {
      try {
        await UserApi.unfollowVendor(followId);
        await dispatch.userModel.getUserVendors();
      } catch ({response}) {}
    },
    async reviewVendor(payload: {
      business: string;
      review: string;
      rating: number;
    }) {
      try {
        await UserApi.reviewVendor(payload);
        return true;
      } catch ({response}) {}
    },
    async updateReview(payload: {id: string; review: string; rating: number}) {
      try {
        await UserApi.updateReview(payload);
        return true;
      } catch ({response}) {}
    },
    async deleteReview(id: string) {
      try {
        await UserApi.deleteReview(id);
        return true;
      } catch ({response}) {}
    },
    async getUserVendorReview(id: string) {
      try {
        const {data} = await UserApi.getUserVendorReview(id);
        console.log('getUserVendorReview', data);
        dispatch.userModel.setState({userBizReview: data});
      } catch ({response}) {}
    },
    async subscribeToVendor(vendor_id: string) {
      try {
        const {data} = await UserApi.subscribe_to_newsletter(vendor_id);
        console.log('getUserSubscription', data);
        dispatch.userModel.getUserSubscriptionToVendor(vendor_id);
      } catch ({response}) {}
    },
    async unSubscribeToVendor(payload: {
      subscriber_id: number;
      vendor_id: string;
    }) {
      try {
        const {data} = await UserApi.unsubscribe_to_newsletter(
          payload.subscriber_id,
        );
        console.log('getUserSubscription', data);
        dispatch.userModel.setState({userBizSubscription: null});
      } catch ({response}) {}
    },
    async getUserSubscriptionToVendor(vendor_id: string) {
      try {
        const {data} = await UserApi.getUserSubscription(vendor_id);
        console.log('getUserSubscription', data);
        dispatch.userModel.setState({userBizSubscription: data});
      } catch ({response}) {}
    },
  }),
});

export default userModel;
