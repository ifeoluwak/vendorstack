import {Product} from './../../types/product';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {VendorApi} from '../../services/apis';
import {Vendor} from '../../types/vendor';

type VendorProp = {
  searchResult: Vendor[] | [];
  products: {[key: string]: Product[]} | null;
  vendors: {[key: string]: Vendor} | null;
  userVendors: Vendor[] | [];
};

const vendorModel = createModel<RootModel>()({
  state: {
    searchResult: [],
    products: null,
    vendors: {},
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
    async getVendor(vendorId: string, state) {
      const vendors = state.vendorModel.vendors;
      try {
        const {data} = await VendorApi.getVendor(vendorId);
        dispatch.vendorModel.setState({
          vendors: {...vendors, [vendorId]: data},
        });
      } catch ({response}) {}
    },
    async searchVendors(payload: {query: string; category: string}) {
      try {
        const {data} = await VendorApi.searchVendors(
          payload.query,
          payload.category,
        );
        dispatch.vendorModel.setState({searchResult: data.vendors});
      } catch ({response}) {}
    },
    async getVendorProducts(vendorId: string, state) {
      const {products} = state.vendorModel;
      try {
        const {data} = await VendorApi.getVendorProducts(vendorId);
        dispatch.vendorModel.setState({
          products: {...products, [vendorId]: data.products},
        });
      } catch ({response}) {}
    },
  }),
});

export default vendorModel;
