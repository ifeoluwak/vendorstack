import * as React from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Text, Icon, Button} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import moment from 'moment';
import {s} from 'react-native-size-matters';
import {OrderStatus} from '../../types/general';
import {styles} from './style';

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
      headerTitle: `Order #${orderId}`,
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

  const handleOrderStatus = (status: 'RECEIVED' | 'RETURNED') => {
    dispatch.userModel.updateOrderStatus({
      orderId,
      customerId: order.customer._id,
      status,
    });
  };

  const receivedOrder = () => handleOrderStatus('RECEIVED');
  const returnOrder = () => handleOrderStatus('RETURNED');

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
            <View style={{paddingTop: 15, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Delivery
              </Text>
              <ListItem
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    {order?.delivery_address?.address}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    {order.delivery_address?.name} |{' '}
                    {order.delivery_address?.phone}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    Status: {order?.delivery_status?.name}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    Date: {moment(order?.created_at).format('DD, MMM YYYY')}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Products
              </Text>
              {order.order_items.map(item => {
                return (
                  <ListItem
                    key={item.product.name}
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: themeColors.pico,
                      maxHeight: 100,
                      width: '100%',
                      marginVertical: 5,
                    }}>
                    <Avatar
                      source={{
                        uri: item?.product?.url,
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
                        {item.product.final_price} - Qty ({item.qty})
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
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
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
                    {order.business?.email} - {order.business?.phone}
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

            {order?.business?.pre_order_notice ? (
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
                    {order?.business?.post_order_notice}
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
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  maxHeight: 100,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    Total Cost - {order.value}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
          </ScrollView>
          {order.status === OrderStatus.SHIPPED ? (
            <View style={styles.btnView}>
              <Button
                title="Accept Order"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                loading={statusLoading}
                onPress={receivedOrder}
              />
              <View style={{marginVertical: 7}} />
              <Button
                title="Reject Order"
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
