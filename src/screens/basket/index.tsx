import * as React from 'react';
import {View, FlatList} from 'react-native';
import {ListItem, Avatar, Button, Badge, Icon} from '@rneui/themed';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {StackActions} from '@react-navigation/native';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {getCartItems, getCartTotalPrice} from '../../helpers';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';
import {s} from 'react-native-size-matters';

function BasketScreen({navigation, route}) {
  const vendorId = route?.params.id;

  const loading = useSelector(
    (root: RootState) => root.loading.models.cartModel,
  );
  const {token} = useSelector((root: RootState) => root.authModel);
  const {cart} = useSelector((root: RootState) => root.cartModel);
  const {vendors} = useSelector((root: RootState) => root.vendorModel);
  const {defaultAddress, profile} = useSelector(
    (root: RootState) => root.userModel,
  );

  const vendorCart = cart?.[vendorId] || {};
  const vendor = vendors?.[vendorId];

  const dispatch = useDispatch<Dispatch>();

  const paystackWebViewRef = React.useRef<paystackProps.PayStackRef>();

  React.useEffect(() => {
    navigation.setOptions({
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Button
            icon={{
              name: 'x',
              type: 'feather',
              size: 24,
              color: themeColors.nasturcian,
            }}
            type="clear"
            onPress={() => {
              dispatch.cartModel.clearCart();
              navigation.goBack();
            }}
          />
        </View>
      ),
    });
  }, [navigation, dispatch]);

  React.useEffect(() => {
    if (!defaultAddress && token) {
      dispatch.userModel.getUserAddresses();
    }
  }, [defaultAddress, dispatch.userModel, token]);

  const items = getCartItems(vendorCart);

  const handlePaymentSuccess = async res => {
    const status = await dispatch.cartModel.verifyPayment(
      res.data.transactionRef.reference,
    );
    if (status) {
      const products = {};
      items.forEach(prod => {
        products[prod.product.id] = prod.count;
      });
      const order = await dispatch.cartModel.createOrder({
        vendor: vendorId,
        address: defaultAddress?.id!,
        ref: res.data.transactionRef.reference,
        products,
      });

      if (order) {
        dispatch.cartModel.clearCart();
        navigation.dispatch(
          StackActions.replace('OrderDetail', {
            id: order.order,
          }),
        );
      }
    }
  };

  const handlePaymentFailed = err => {
    console.log('handlePaymentFailed', err);
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <ListItem bottomDivider containerStyle={styles.listEndView}>
              <Avatar
                source={{
                  uri: 'https://storage.googleapis.com/safemonk/business/2/product/Peekabo/thumbnail.png',
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.itemTitle}>
                  {item.product.name} (x{item.count})
                </ListItem.Title>
                <Badge
                  badgeStyle={{
                    backgroundColor: themeColors.pico,
                    borderWidth: 0,
                  }}
                  value={`N ${item.product.final_price}`}
                  textStyle={{color: themeColors.white}}
                />
              </ListItem.Content>
              <ListItem.Content right>
                <Icon
                  name="trash"
                  type="feather"
                  size={20}
                  color={themeColors.nasturcian}
                  onPress={() =>
                    dispatch.cartModel.deleteItemFromCart({
                      vendorId,
                      product: item.product,
                    })
                  }
                />
              </ListItem.Content>
            </ListItem>
          )}
          contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
          ListFooterComponent={
            <>
              <ListItem bottomDivider containerStyle={styles.listEndView}>
                <ListItem.Content>
                  <ListItem.Title style={styles.totalTitle}>
                    Delivery cost
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                  <Badge
                    badgeStyle={{backgroundColor: themeColors.mazarine}}
                    value="N 2,300"
                  />
                </ListItem.Content>
              </ListItem>
              <ListItem containerStyle={styles.listEndView}>
                <ListItem.Content>
                  <ListItem.Title style={styles.totalTitle}>
                    Total cost
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                  <Badge
                    badgeStyle={{backgroundColor: themeColors.mazarine}}
                    value={`N ${getCartTotalPrice(vendorCart)}`}
                  />
                </ListItem.Content>
              </ListItem>

              <ListItem
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                onPress={() => navigation.navigate('Address')}
                containerStyle={{
                  borderRadius: 7,
                  backgroundColor: themeColors.pico,
                  height: 90,
                  width: '100%',
                  marginTop: s(65),
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{
                      color: themeColors.white,
                      fontWeight: 'bold',
                      paddingBottom: 8,
                    }}>
                    {defaultAddress?.address || 'No Delivery Address'}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    style={{
                      color: themeColors.white,
                    }}>
                    {defaultAddress
                      ? `${defaultAddress?.name} | ${defaultAddress?.phone}`
                      : 'Choose an address'}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color={themeColors.white} />
              </ListItem>

              {vendor?.pre_order_notice ? (
                <ListItem
                  Component={TouchableScale}
                  friction={90}
                  tension={100}
                  activeScale={0.95}
                  containerStyle={{
                    borderRadius: 7,
                    backgroundColor: themeColors.pico,
                    // height: 90,
                    width: '100%',
                    marginTop: s(20),
                    paddingVertical: s(20),
                  }}>
                  <Icon
                    name="alert-circle"
                    type="feather"
                    color={themeColors.harley_davidson}
                    size={s(20)}
                  />
                  <ListItem.Content>
                    <ListItem.Title
                      style={{
                        color: themeColors.white,
                        fontWeight: 'bold',
                        paddingBottom: 8,
                      }}>
                      Notice
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        color: themeColors.white,
                      }}>
                      {vendor?.pre_order_notice}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ) : (
                <></>
              )}
            </>
          }
        />
      </View>

      {token ? (
        <View style={styles.btnView}>
          {defaultAddress ? (
            <Button
              title={`Pay ₦${getCartTotalPrice(vendorCart)}`}
              titleStyle={{fontWeight: 'bold'}}
              buttonStyle={styles.btnStyle}
              radius={30}
              onPress={() => paystackWebViewRef.current.startTransaction()}
              disabled={loading}
              disabledStyle={{backgroundColor: themeColors.pico}}
              loading={loading}
              // onPress={handlePay}
            />
          ) : (
            <Button
              title="Add Address"
              titleStyle={{fontWeight: 'bold'}}
              buttonStyle={styles.btnStyle}
              radius={30}
              onPress={() => navigation.navigate('Address')}
            />
          )}
        </View>
      ) : (
        <View style={styles.btnView}>
          <Button
            title="Login"
            titleStyle={{fontWeight: 'bold'}}
            buttonStyle={styles.btnStyle}
            radius={30}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      )}

      <Paystack
        paystackKey="pk_test_2babf474a1fa34f8deef8c247210032f5c693e22"
        billingEmail={profile?.user.email}
        amount={`${getCartTotalPrice(vendorCart)}`}
        onCancel={handlePaymentFailed}
        onSuccess={handlePaymentSuccess}
        ref={paystackWebViewRef}
      />
    </View>
  );
}

export default BasketScreen;
