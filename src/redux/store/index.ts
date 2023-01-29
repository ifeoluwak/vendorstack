import {init, RematchDispatch, RematchRootState} from '@rematch/core';
import loadingPlugin, {ExtraModelsFromLoading} from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import {persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {models, RootModel} from '../models';

type FullModel = ExtraModelsFromLoading<RootModel>;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'cartModel',
    'authModel',
    'vendorModel',
    'userModel',
    'generalModel',
  ],
};

export const store = init<RootModel, FullModel>({
  models: models,
  plugins: [loadingPlugin(), persistPlugin(persistConfig)],
});

export const persistor = persistStore(store);

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
