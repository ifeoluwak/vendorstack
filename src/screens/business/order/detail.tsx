import * as React from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Text, Button} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import moment from 'moment';
import {styles} from './style';
import {OrderStatus} from '../../../types/general';

function BusinessOrderDetailScreen({navigation, route}) {
  const orderId = route?.params?.id;
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.generalModel.getOrder,
  );
  const statusLoading = useSelector(
    (root: RootState) => root.loading.effects.businessModel.updateOrderStatus,
  );
  const {orders} = useSelector((root: RootState) => root.generalModel);

  const order = orders?.[orderId];

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: `#${orderId}`,
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, orderId]);

  React.useEffect(() => {
    if (orderId) {
      dispatch.generalModel.getOrder(orderId);
    }
  }, [dispatch, orderId]);

  const handleOrderStatus = (
    status: 'ACCEPTED' | 'SHIPPED' | 'REJECTED' | 'RETURN_CONFIRMED',
  ) => {
    dispatch.businessModel.updateOrderStatus({
      orderId,
      customerId: order.customer._id,
      status,
    });
  };

  const acceptOrder = () => handleOrderStatus('ACCEPTED');
  const rejectOrder = () => handleOrderStatus('REJECTED');
  const confirmOrderReturn = () => handleOrderStatus('RETURN_CONFIRMED');
  const shipOrder = () => handleOrderStatus('SHIPPED');

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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
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
                  maxHeight: 100,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    {order.status}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    {moment(order.created_at).format('DD MMM, YYYY')}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    {/* Status: {order.delivery_status?.name} */}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Products
              </Text>
              {order?.products?.map(item => {
                return (
                  <ListItem
                    key={item._id}
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
                        {item.totalPrice} - Qty ({item?.quantity})
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              })}
            </View>

            <View style={{paddingTop: 15, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Customer
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
                    {order?.customer?.firstName} {order?.customer?.lastName}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>

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
                    Total Cost - {order.totalAmount}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
          </ScrollView>

          {order.status === OrderStatus.PENDING ? (
            <View style={styles.btnView}>
              <Button
                title="Accept Order"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                loading={statusLoading}
                onPress={acceptOrder}
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
                onPress={rejectOrder}
              />
            </View>
          ) : (
            <></>
          )}

          {order.status === OrderStatus.ACCEPTED ? (
            <View style={styles.btnView}>
              <Button
                title="Ship Order"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                loading={statusLoading}
                onPress={shipOrder}
              />
            </View>
          ) : (
            <></>
          )}

          {order.status === OrderStatus.REJECTED ? (
            <View style={styles.btnView}>
              <Button
                title="Confirm Order Returned"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                loading={statusLoading}
                onPress={confirmOrderReturn}
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

export default BusinessOrderDetailScreen;
