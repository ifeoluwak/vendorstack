import * as React from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Text} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import moment from 'moment';

function OrderDetailScreen({navigation, route}) {
  const orderId = route?.params?.id;
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.generalModel.getOrder,
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
      )}
    </View>
  );
}

export default OrderDetailScreen;
