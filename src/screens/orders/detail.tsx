import * as React from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {ListItem, Avatar, Text, Icon, Button} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import moment from 'moment';
import {s} from 'react-native-size-matters';
import {OrderStatus} from '../../types/general';
import {styles} from './style';
import {Naira} from '../../constants/general';

function OrderDetailScreen({navigation, route}) {
  const orderId = route?.params?.id;
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.generalModel.getOrder,
  );
  const statusLoading = useSelector(
    (root: RootState) => root.loading.effects.userModel.updateOrderStatus,
  );
  const {orders} = useSelector((root: RootState) => root.generalModel);

  const order = orders?.[orderId];

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Order Detail',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, orderId]);

  React.useEffect(() => {
    if (!order) {
      dispatch.generalModel.getOrder(orderId);
    }
  }, [dispatch, orderId, order]);

  const handleOrderStatus = (status: 'RECEIVED' | 'RETURNED' | 'CANCELED') => {
    dispatch.userModel.updateOrderStatus({
      orderId,
      customerId: order.customer._id,
      status,
    });
  };

  const receivedOrder = () => handleOrderStatus('RECEIVED');
  const returnOrder = () => handleOrderStatus('RETURNED');
  const cancelOrder = () => handleOrderStatus('CANCELED');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.mazarine,
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      {!order ? (
        <></>
      ) : (
        <>
          <ScrollView>
            <ListItem
              containerStyle={{
                borderRadius: 7,
                backgroundColor: themeColors.pico,
                width: '100%',
                marginTop: s(20),
              }}>
              <Icon
                name="alert-circle"
                type="feather"
                color={themeColors.white}
                size={s(20)}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{
                    color: themeColors.white,
                    fontWeight: 'bold',
                    paddingBottom: 8,
                  }}>
                  Status
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{
                    color: themeColors.white,
                  }}>
                  {order?.status}
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  style={{
                    color: themeColors.white,
                    paddingTop: s(5),
                  }}>
                  {moment(order.created_at).format('DD MMM, YYYY')}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Products
              </Text>
              {order?.products?.map(item => {
                return (
                  <ListItem
                    key={item._id}
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: themeColors.pico,
                      maxHeight: 100,
                      width: '100%',
                      marginVertical: 5,
                    }}>
                    <Avatar
                      source={{
                        uri: item?.product.photo,
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title
                        style={{color: themeColors.white, fontWeight: 'bold'}}>
                        {item.product.name}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        numberOfLines={1}
                        style={{
                          color: themeColors.white,
                          textTransform: 'capitalize',
                        }}>
                        {Naira} {item.totalPrice} - Qty ({item?.quantity})
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </View>

            <View style={{paddingTop: 15, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Vendor
              </Text>
              <ListItem
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  maxHeight: 100,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    {order?.business?.name}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      paddingTop: 10,
                    }}>
                    Phone Number - {order.business?.phone}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      paddingTop: 10,
                    }}>
                    {order.business?.website}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            <View style={{paddingTop: 15, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Address
              </Text>
              <ListItem
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    {order.deliveryAddress.streetName}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    {order.deliveryAddress.lga}, {order.deliveryAddress.state}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            {order?.business?.orderNoticeInfo ? (
              <ListItem
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
                  color={themeColors.white}
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
                    {order?.business?.orderNoticeInfo}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ) : (
              <></>
            )}

            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Total
              </Text>
              <ListItem
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  maxHeight: 100,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    Total Cost - {order.totalAmount}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
          </ScrollView>
          {order.status === OrderStatus.PENDING ? (
            <View style={styles.btnView}>
              <Button
                title="Cancel Order"
                titleStyle={{fontWeight: 'bold'}}
                buttonStyle={[
                  styles.btnStyle,
                  {backgroundColor: themeColors.nasturcian},
                ]}
                radius={30}
                loading={statusLoading}
                onPress={cancelOrder}
              />
            </View>
          ) : (
            <></>
          )}

          {order.status === OrderStatus.SHIPPED ? (
            <View style={styles.btnView}>
              <Button
                title="Confirm Delivery"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                loading={statusLoading}
                onPress={receivedOrder}
              />
              <View style={{marginVertical: 7}} />
              <Button
                title="Return Order"
                titleStyle={{fontWeight: 'bold'}}
                buttonStyle={[
                  styles.btnStyle,
                  {backgroundColor: themeColors.nasturcian},
                ]}
                radius={30}
                loading={statusLoading}
                onPress={returnOrder}
              />
            </View>
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
}

export default OrderDetailScreen;
