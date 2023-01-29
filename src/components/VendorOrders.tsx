import React from 'react';
import {FlatList} from 'react-native';
import {ListItem} from '@rneui/themed';
import TouchableScale from 'react-native-touchable-scale';
import {themeColors} from '../constants/color';
import {Order} from '../types/general';
import {useNavigation} from '@react-navigation/native';

function VendorOrders({orders}: {orders: Order[]}) {
  const navigation = useNavigation();
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() =>
            navigation.navigate('OrderDetail', {
              id: item?.id,
            })
          }
          containerStyle={{
            backgroundColor: themeColors.transparent,
          }}>
          <ListItem.Content>
            <ListItem.Title
              style={{color: themeColors.white, fontWeight: 'bold'}}>
              Order #{item?.id}
            </ListItem.Title>
            <ListItem.Subtitle
              numberOfLines={1}
              style={{
                color: themeColors.white,
                textTransform: 'capitalize',
              }}>
              {item.order_items?.map(i => i?.product?.name).join(', ')}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron color={themeColors.white} />
        </ListItem>
      )}
    />
  );
}

export default VendorOrders;
