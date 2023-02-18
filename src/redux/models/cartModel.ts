import {Alert} from 'react-native';
import {PostOrder, CartItem} from './../../types/cart';
import {createModel} from '@rematch/core';
import {RootModel} from '.';
import {CartApi} from '../../services/apis';

type ModelProps = {
  cart: {
    [key: string]: CartItem;
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
          [payload?.product?._id]: {
            product: payload.product,
            count: (state?.cart?.[payload?.product?._id]?.count || 0) + 1,
          },
        },
      };
    },
    removeFromCart: (state, payload) => {
      const newState = {...state};
      if (state.cart?.[payload.product?._id]) {
        const count = newState.cart?.[payload.product?._id]?.count;
        if (count === 1) {
          delete newState.cart?.[payload.product?._id];
          return newState;
        }
        const cartItem = newState.cart![payload.product?._id];
        cartItem!.count = cartItem!.count - 1;
        newState.cart![payload.product?._id] = cartItem;
        return newState;
      }
      return state;
    },
    deleteItemFromCart: (state, payload) => {
      const newState = {...state};
      delete newState.cart?.[payload.product?._id];
      return newState;
    },
    clearCart: () => {
      return {cart: {}};
    },
  },
  effects: dispatch => ({
    async createOrder(payload: PostOrder, state) {
      dispatch.cartModel.setError(false);
      try {
        const {user} = state.userModel;
        payload.customerId = user?._id!;
        payload.userId = user?._id!;
        const {data} = await CartApi.createOrder(payload);
        console.log('createOrder', JSON.stringify(data));
        return data;
      } catch ({response}) {
        Alert.alert('Error', 'Could not create order. Please try again.');
      }
    },
  }),
});

export default cartModel;
