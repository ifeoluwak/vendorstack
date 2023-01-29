import 'react-native-gesture-handler';

import React from 'react';
// import { Provider } from 'react-redux';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {persistor, store} from './src/redux/store';
import {View} from 'react-native';
import {themeColors} from './src/constants/color';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: themeColors.mazarine,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View style={{flex: 1, backgroundColor: themeColors.mazarine}} />
          }
          persistor={persistor}>
          <NavigationContainer theme={navTheme}>
            <Host>
              <RootNavigation />
            </Host>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
