import {RootState} from '../store';

export const reducerActions = {
  setState(state: RootState, payload: any): any {
    return {
      ...state,
      ...payload,
      isServerError: false,
      loading: false,
    };
  },
  setError(state: RootState, payload: boolean) {
    return {
      ...state,
      isServerError: payload,
      loading: false,
    };
  },
  clear(state: RootState, payload = {}) {
    return {
      ...state,
      ...payload,
      loading: false,
    };
  },
  startLoading(state: any) {
    return {
      ...state,
      loading: true,
      isServerError: false,
    };
  },
  stopLoading(state: any) {
    return {
      ...state,
      loading: false,
    };
  },
};
