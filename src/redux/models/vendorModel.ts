import {Product} from './../../types/product';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {VendorApi} from '../../services/apis';
import {Vendor} from '../../types/vendor';
import {Review} from '../../types/general';

type VendorProp = {
  searchResult: Vendor[] | [];
  products: {[key: string]: Product[]} | null;
  vendors: {[key: string]: Vendor} | null;
  reviews: {[key: string]: Review[]} | null;
  userVendors: Vendor[] | [];
  homeVendors: Vendor[] | [];
};

const vendorModel = createModel<RootModel>()({
  state: {
    searchResult: [],
    products: null,
    vendors: {},
    reviews: {},
    homeVendors: [],
  } as VendorProp,
  reducers: {
    setState(state, payload: Partial<VendorProp>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async getHomeVendors() {
      try {
        const {data} = await VendorApi.getVendors();
        dispatch.vendorModel.setState({
          homeVendors: data.results,
        });
      } catch ({response}) {}
    },
    async getVendor(vendorId: string, state) {
      const vendors = state.vendorModel.vendors;
      try {
        const {data} = await VendorApi.getVendor(vendorId);
        dispatch.vendorModel.setState({
          vendors: {...vendors, [vendorId]: data},
        });
      } catch ({response}) {}
    },
    async searchVendors(payload: {query: string; category?: string}) {
      try {
        const {data} = await VendorApi.searchVendors(
          payload.query,
          payload.category,
        );
        console.log('searchVendors', data);
        dispatch.vendorModel.setState({searchResult: data.results});
      } catch ({response}) {}
    },
    async getVendorProducts(vendorId: string, state) {
      const {products} = state.vendorModel;
      try {
        const {data} = await VendorApi.getVendorProducts(vendorId);
        dispatch.vendorModel.setState({
          products: {...products, [vendorId]: data.results},
        });
      } catch ({response}) {}
    },
    async getVendorReviews(vendorId: string, state) {
      const {reviews} = state.vendorModel;
      try {
        const {data} = await VendorApi.getVendorReviews(vendorId);
        dispatch.vendorModel.setState({
          reviews: {...reviews, [vendorId]: data.results},
        });
      } catch ({response}) {}
    },
  }),
});

export default vendorModel;
