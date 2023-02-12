import {Alert} from 'react-native';
import {Profile, User, UserFollows} from './../../types/user';
import {
  Address,
  AgeRange,
  Order,
  Review,
  ReviewPayload,
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
  user: User | null;
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
    async createAddress(payload: Partial<Address>, state) {
      const {user} = state.userModel;
      try {
        await UserApi.createAddress(payload, user?._id!);
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {}
    },
    async deleteAddress(addressId: string, state) {
      const {user} = state.userModel;
      try {
        await UserApi.deleteAddress(addressId, user?._id!);
        return true;
      } catch ({response}) {}
    },
    async getUserAddresses(_, state) {
      const {defaultAddress} = state.userModel;
      try {
        const {data} = await UserApi.getUserAddresses();
        console.log('getUserAddresses', data);
        dispatch.userModel.setState({
          addresses: data,
          defaultAddress: defaultAddress ? defaultAddress : data[0],
        });
      } catch ({response}) {}
    },
    async getUserProfile() {
      try {
        const {data} = await UserApi.getUserProfile();
        console.log('getUserProfile', data);
        dispatch.userModel.setState({user: data});
      } catch ({response}) {}
    },
    async updateUserProfile(
      payload: {
        firstName: string;
        lastName: string;
      },
      state,
    ) {
      const {user} = state.userModel;
      try {
        await UserApi.updateUserProfile(payload, user?._id!);
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
    async getUserOrders(_, state) {
      const {user} = state.userModel;
      try {
        const {data} = await UserApi.getUserOrders(user?._id!);
        console.log('getUserOrders', data);
        dispatch.userModel.setState({userOrders: data.results});
      } catch ({response}) {}
    },
    async getUserVendorOrders(businessId: string, state) {
      const {user} = state.userModel;
      try {
        const {data} = await UserApi.getUserVendorOrders(
          businessId,
          user?._id!,
        );
        console.log('getUserVendorOrders', data);
        // dispatch.userModel.setState({userOrders: data});
      } catch ({response}) {}
    },
    async followVendor(vendorId: string, state) {
      const {user} = state.userModel;
      try {
        await UserApi.followVendor(vendorId, user?._id);
        Promise.all([
          await dispatch.vendorModel.getVendor(vendorId),
          await dispatch.userModel.getUserProfile(),
        ]);
      } catch ({response}) {}
    },
    async unfollowVendor(vendorId: string, state) {
      const {user} = state.userModel;
      try {
        await UserApi.unfollowVendor(vendorId, user?._id);
        Promise.all([
          await dispatch.vendorModel.getVendor(vendorId),
          await dispatch.userModel.getUserProfile(),
        ]);
      } catch ({response}) {}
    },
    async reviewVendor(payload: ReviewPayload, state) {
      const {user} = state.userModel;
      payload.customerId = user?._id;
      payload.userId = user?._id;
      try {
        await UserApi.reviewVendor(payload);
        return true;
      } catch ({response}) {}
    },
    async updateReview(payload: ReviewPayload, state) {
      const {user} = state.userModel;
      payload.customerId = user?._id;
      payload.userId = user?._id;
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
    async getUserVendorReview(id: string, state) {
      const {user} = state.userModel;
      try {
        const {data} = await UserApi.getUserVendorReview(id, user?._id!);
        if (data.results.length) {
          dispatch.userModel.setState({userBizReview: data.results[0]});
        } else {
          dispatch.userModel.setState({userBizReview: null});
        }
      } catch ({response}) {}
    },
    // async subscribeToVendor(vendor_id: string) {
    //   try {
    //     const {data} = await UserApi.subscribe_to_newsletter(vendor_id);
    //     console.log('getUserSubscription', data);
    //     dispatch.userModel.getUserSubscriptionToVendor(vendor_id);
    //   } catch ({response}) {}
    // },
    // async unSubscribeToVendor(payload: {
    //   subscriber_id: number;
    //   vendor_id: string;
    // }) {
    //   try {
    //     const {data} = await UserApi.unsubscribe_to_newsletter(
    //       payload.subscriber_id,
    //     );
    //     console.log('getUserSubscription', data);
    //     dispatch.userModel.setState({userBizSubscription: null});
    //   } catch ({response}) {}
    // },
    // async getUserSubscriptionToVendor(vendor_id: string) {
    //   try {
    //     const {data} = await UserApi.getUserSubscription(vendor_id);
    //     console.log('getUserSubscription', data);
    //     dispatch.userModel.setState({userBizSubscription: data});
    //   } catch ({response}) {}
    // },
  }),
});

export default userModel;
