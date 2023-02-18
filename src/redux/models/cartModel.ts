import {Cart} from './../../types/cart';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {CartApi} from '../../services/apis';

type ModelProps = {
  cart: {
    [key: string]: Cart;
  } | null;
};

const cartModel = createModel<RootModel>()({
  state: {
    cart: {},
  } as ModelProps,
  reducers: {
    setState(state, payload): any {
      return {
        ...state,
        ...payload,
        isServerError: false,
        loading: false,
      };
    },
    setError(state, payload) {
      return {
        ...state,
        isServerError: payload,
        loading: false,
      };
    },
    addToCart: (state, payload) => {
      return {
        cart: {
          ...state.cart,
          [payload.vendorId]: {
            ...state?.cart?.[payload.vendorId],
            [payload?.product?._id]: {
              product: payload.product,
              count:
                (state?.cart?.[payload.vendorId]?.[payload?.product?._id]
                  ?.count || 0) + 1,
            },
          },
        },
      };
    },
    removeFromCart: (state, payload) => {
      const newState = {...state};
      if (state.cart?.[payload.vendorId]?.[payload.product?._id]) {
        const count =
          newState.cart?.[payload.vendorId]?.[payload.product?._id]?.count;
        if (count === 1) {
          delete newState.cart?.[payload.vendorId]?.[payload.product?._id];
          return newState;
        }
        const cartItem = newState.cart![payload.vendorId][payload.product?._id];
        cartItem!.count = cartItem!.count - 1;
        newState.cart![payload.vendorId][payload.product?._id] = cartItem;
        return newState;
      }
      return state;
    },
    deleteItemFromCart: (state, payload) => {
      const newState = {...state};
      delete newState.cart?.[payload.vendorId]?.[payload.product?._id];
      return newState;
    },
    clearCart: () => {
      return {cart: {}};
    },
  },
  effects: dispatch => ({
    async verifyPayment(ref: string) {
      dispatch.cartModel.setError(false);
      try {
        await CartApi.verifyPayment({ref});
        return true;
        // dispatch.cartModel.setState({invoicePdf: data});
      } catch ({response}) {}
    },
    async createOrder(payload: {
      vendor: string;
      address: string;
      ref: string;
      products: {[key: string]: number};
    }) {
      dispatch.cartModel.setError(false);
      try {
        const {data} = await CartApi.createOrder(payload);
        dispatch.userModel.getUserOrders();
        dispatch.generalModel.getTrendingProducts();
        return data;
        // dispatch.cartModel.setState({invoicePdf: data});
      } catch ({response}) {
        return false;
      }
    },
  }),
});

export default cartModel;
