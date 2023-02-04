import React from 'react';
import {View} from 'react-native';
import Logo from '../assets/images/vendorstack2.svg';
import {themeColors} from '../constants/color';

function Splash() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColors.mazarine,
      }}>
      <Logo />
    </View>
  );
}

export default Splash;
