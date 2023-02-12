import * as React from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Text, Divider, CheckBox} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {OrderStatus} from '../../../types/general';
import moment from 'moment';

function BusinessOrderDetailScreen({navigation, route}) {
  const orderId = route?.params?.id;
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.generalModel.getOrder ||
      root.loading.effects.businessModel.updateOrderStatus,
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
      // dispatch.generalModel.getOrderStatuses();
    }
  }, [dispatch, orderId]);

  // const handleStatusUpdate = (status: OrderStatus) => {
  //   dispatch.businessModel.updateOrderStatus({status: status.id, id: order.id});
  // };

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

          {/* <Divider style={{marginVertical: 20}} />
          <Text h4 style={{color: themeColors.white}}>
            Delivery Status
          </Text>
          <View>
            {order_status.map(status => (
              <CheckBox
                key={status?.id}
                title={status?.name}
                checked={order?.delivery_status?.id === status?.id}
                onPress={() => handleStatusUpdate(status)}
                textStyle={{color: themeColors.white}}
                containerStyle={{backgroundColor: 'transparent', marginLeft: 0}}
                uncheckedColor={themeColors.white}
                checkedColor={themeColors.white}
              />
            ))}
          </View> */}
        </ScrollView>
      )}
    </View>
  );
}

export default BusinessOrderDetailScreen;
