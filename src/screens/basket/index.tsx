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
import {OrderTransaction} from '../../types/cart';
import {Naira, paystack_key} from '../../constants/general';

function BasketScreen({navigation, route}) {
  const [orderCreated, setOrderCreated] =
    React.useState<OrderTransaction | null>();

  const loading = useSelector(
    (root: RootState) => root.loading.models.cartModel,
  );
  const {token} = useSelector((root: RootState) => root.authModel);
  const {cart} = useSelector((root: RootState) => root.cartModel);
  const {vendors} = useSelector((root: RootState) => root.vendorModel);
  const {user, defaultAddress} = useSelector(
    (root: RootState) => root.userModel,
  );

  const vendorCart = cart || {};

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

  const handleOrder = async res => {
    const orderDetails = items.map(prod => ({
      productId: prod.product._id,
      quantity: prod.count,
    }));
    const order = await dispatch.cartModel.createOrder({
      orderDetails,
      addressId: defaultAddress?.addressId!,
    });

    if (order) {
      dispatch.cartModel.clearCart();
      setOrderCreated(order);
      handlePayment();
    }
  };

  React.useEffect(() => {
    if (orderCreated) {
      handlePayment();
    }
  }, [orderCreated]);

  const handlePayment = () => paystackWebViewRef.current.startTransaction();

  const handlePaymentComplete = err => {
    console.log('handlePaymentFailed', err);
    navigation.dispatch(
      StackActions.replace('TransactionOrderDetail', {
        id: orderCreated?._id,
      }),
    );
  };

  return (
    <View style={styles.container}>
      {items.length ? (
        <>
          <View style={styles.itemWrapper}>
            <FlatList
              data={items}
              renderItem={({item}) => (
                <ListItem bottomDivider containerStyle={styles.listEndView}>
                  <Avatar
                    source={{
                      uri: item.product.photo,
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
                      value={`${Naira} ${item.product.sellingPrice}`}
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
                  {/* <ListItem bottomDivider containerStyle={styles.listEndView}>
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
              </ListItem> */}
                  <ListItem containerStyle={styles.listEndView}>
                    <ListItem.Content>
                      <ListItem.Title style={styles.totalTitle}>
                        Total cost
                      </ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content right>
                      <Badge
                        badgeStyle={{backgroundColor: themeColors.mazarine}}
                        value={`${Naira} ${getCartTotalPrice(vendorCart)}`}
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
                        {defaultAddress?.streetName || 'No Delivery Address'}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={{
                          color: themeColors.white,
                        }}>
                        {defaultAddress
                          ? `${defaultAddress?.lga} | ${defaultAddress?.state}`
                          : 'Choose an address'}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color={themeColors.white} />
                  </ListItem>
                </>
              }
            />
          </View>

          {token ? (
            <View style={styles.btnView}>
              {defaultAddress ? (
                <Button
                  title={`Pay ${Naira}${getCartTotalPrice(vendorCart)}`}
                  titleStyle={{fontWeight: 'bold'}}
                  buttonStyle={styles.btnStyle}
                  radius={30}
                  onPress={handleOrder}
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
        </>
      ) : (
        <></>
      )}

      <Paystack
        paystackKey={paystack_key}
        billingEmail={user?.username!}
        billingName={`${user?.firstName} ${user?.lastName}`}
        amount={`${orderCreated?.totalPayableAmount}`}
        refNumber={orderCreated?.referenceId}
        onCancel={handlePaymentComplete}
        onSuccess={handlePaymentComplete}
        ref={paystackWebViewRef}
      />
    </View>
  );
}

export default BasketScreen;
