import {useNavigation} from '@react-navigation/native';
import {FAB} from '@rneui/themed';
import React from 'react';
import {useSelector} from 'react-redux';

import {themeColors} from '../constants/color';
import {getCartTotalQty} from '../helpers';
import {RootState} from '../redux/store';

type CartCountButtonProps = {
  vendorId: string;
};

const CartCountButton = (props: CartCountButtonProps) => {
  const navigation = useNavigation();
  const {cart} = useSelector((root: RootState) => root.cartModel);

  const vendorCart = cart?.[props.vendorId];

  const total = getCartTotalQty(vendorCart || {});

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
      onPress={() => navigation.navigate('Basket', {id: props.vendorId})}
      title={`${total}`}
    />
  );
};

export default CartCountButton;
