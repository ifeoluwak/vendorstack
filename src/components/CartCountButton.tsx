import {useNavigation} from '@react-navigation/native';
import {FAB} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';

import {themeColors} from '../constants/color';
import {getCartTotalQty} from '../helpers';
import {RootState} from '../redux/store';

const CartCountButton = () => {
  const navigation = useNavigation();
  const {cart} = useSelector((root: RootState) => root.cartModel);

  const total = getCartTotalQty(cart || {});

  if (!total) {
    return <></>;
  }

  return (
    <FAB
      visible={true}
      icon={{
        name: 'shopping-cart',
        type: 'feather',
        color: themeColors.white,
      }}
      color={themeColors.pico}
      placement="right"
      onPress={() => navigation.navigate('Basket')}
      title={`${total}`}
    />
  );
};

export default CartCountButton;
