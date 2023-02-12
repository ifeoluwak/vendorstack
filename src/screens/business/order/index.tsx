import * as React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import moment from 'moment';

function BusinessOrdersScreen({navigation}) {
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.businessModel.getBusinessOrders,
  );
  const {orders} = useSelector((root: RootState) => root.businessModel);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Orders',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  React.useEffect(() => {
    dispatch.businessModel.getBusinessOrders();
  }, [dispatch]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: themeColors.mazarine,
        paddingTop: 10,
      }}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() =>
                navigation.navigate('BusinessOrderDetail', {
                  id: item._id,
                })
              }
              containerStyle={{
                borderRadius: 10,
                backgroundColor: themeColors.pico,
                maxHeight: 100,
              }}>
              <ListItem.Content>
                <ListItem.Title
                  style={{color: themeColors.white, fontWeight: 'bold'}}>
                  {item?.totalAmount} (#{item.products.length} Items)
                </ListItem.Title>
                <ListItem.Subtitle
                  numberOfLines={1}
                  style={{
                    color: themeColors.white,
                    textTransform: 'capitalize',
                  }}>
                  {moment(item.created_at).format('DD MMM, YYYY')}
                </ListItem.Subtitle>
                {/* <View style={{paddingTop: 5}}>
                  <FlatList
                    data={item.products}
                    renderItem={({item: order}) => {
                      return (
                        <Avatar
                          source={{
                            uri: order?.product?.url,
                          }}
                        />
                      );
                    }}
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                    style={{flexGrow: 0}}
                  />
                </View> */}
              </ListItem.Content>
              <ListItem.Chevron color={themeColors.white} />
            </ListItem>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{
            paddingTop: 10,
            flexGrow: 1,
            width: '100%',
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default BusinessOrdersScreen;
