import {createModel} from '@rematch/core';
import {Alert} from 'react-native';
import {RootModel} from '.';
import {AuthApi} from '../../services/apis';

type AuthProp = {
  token: string;
};

const authModel = createModel<RootModel>()({
  state: {
    token: '',
  } as AuthProp,
  reducers: {
    setState(state, payload: Partial<AuthProp>) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: dispatch => ({
    async login(payload) {
      try {
        const {data} = await AuthApi.login(payload);
        dispatch.authModel.setState({token: data.token});
        if (payload.fcmToken) {
          dispatch.userModel.updateUserDeviceToken(payload.fcmToken);
        }
        dispatch.userModel.getUserProfile();
        return true;
      } catch ({response}) {
        const messages = Object.values(response?.data).flat();
        Alert.alert('Error', messages.join('\n'));
      }
    },
    async register(payload) {
      try {
        const {data} = await AuthApi.register(payload);
        dispatch.authModel.setState({token: data.token});
        dispatch.userModel.setState({profile: data.user});
        if (payload.fcmToken) {
          dispatch.userModel.updateUserDeviceToken(payload.fcmToken);
        }
        return true;
      } catch ({response}) {
        const messages = Object.values(response?.data).flat();
        Alert.alert('Error', messages.join('\n'));
      }
    },
  }),
});

export default authModel;
