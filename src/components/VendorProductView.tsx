import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Text, Divider, Icon} from '@rneui/themed';

import {themeColors} from '../constants/color';
import {Dispatch} from '../redux/store';
import {CartItem} from '../types/cart';
import {Product} from '../types/product';

function VendorProductView({
  cartItem,
  product,
  vendorId,
  onBuy,
  takingOrder,
}: {
  vendorId: string;
  cartItem: CartItem;
  product: Product;
  onBuy: () => void;
  takingOrder: boolean;
}) {
  const dispatch = useDispatch<Dispatch>();
  return (
    <>
      <Image
        source={{
          uri: product?.photo,
        }}
        style={styles.item}
      />
      <View style={{paddingHorizontal: 10, paddingTop: 5}}>
        <View style={styles.header}>
          <View style={{width: '70%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {product?.name.substring(0, 50)}
            </Text>
          </View>
          <View style={styles.amountView}>
            <Text
              numberOfLines={1}
              style={{
                color: themeColors.mazarine,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              N {product?.sellingPrice}
            </Text>
          </View>
        </View>
        <Divider style={{marginTop: 10, marginBottom: 20}} />
        <Text>{product?.description.substring(0, 150)}</Text>
      </View>
      <View style={{paddingHorizontal: 10, paddingTop: 30, width: '50%'}}>
        <View style={styles.cartBtnView}>
          <Icon
            name="minus"
            type="feather"
            size={30}
            color={themeColors.mazarine}
            onPress={() =>
              dispatch.cartModel.removeFromCart({vendorId, product})
            }
            containerStyle={styles.cartIcon}
          />
          <Text h4 style={{color: themeColors.mazarine}}>
            {cartItem?.count || 0}
          </Text>
          <Icon
            name="plus"
            type="feather"
            size={30}
            color={themeColors.mazarine}
            onPress={() => {
              if ((cartItem?.count || 0) < product?.quantity) {
                dispatch.cartModel.addToCart({vendorId, product});
              }
            }}
            containerStyle={styles.cartIcon}
          />
        </View>
        <View style={{alignItems: 'center', marginVertical: 15}}>
          {product?.quantity < 11 ? (
            <Text style={{color: themeColors.nasturcian, fontStyle: 'italic'}}>
              {product?.quantity} left in stock
            </Text>
          ) : (
            <></>
          )}
        </View>
        <Button
          title={!takingOrder ? 'Temporarily Closed' : 'Buy now'}
          buttonStyle={{backgroundColor: themeColors.mazarine}}
          containerStyle={{paddingBottom: 30}}
          onPress={onBuy}
          disabled={!takingOrder}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  amountView: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cartBtnView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  cartIcon: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: themeColors.mazarine,
  },
});

export default VendorProductView;
