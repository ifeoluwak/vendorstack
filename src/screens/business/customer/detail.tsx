import {View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Dispatch, RootState} from '../../../redux/store';
import {themeColors} from '../../../constants/color';
import {Avatar, ListItem, Text} from '@rneui/themed';
import {Customer} from '../../../types/user';
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment';

const CustomerDetailScreen = ({navigation, route}) => {
  const dispatch = useDispatch<Dispatch>();

  const customer: Customer = route?.params?.customer;

  const loading = useSelector(
    (root: RootState) => root.loading.effects.authModel.login,
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: customer?.user.email,
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, customer]);

  return (
    <FlatList
      style={{backgroundColor: themeColors.mazarine, paddingHorizontal: 20}}
      data={customer.orders}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            onPress={() =>
              navigation.navigate('BusinessOrderDetail', {
                id: item.id,
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
                Order #{item.id}
              </ListItem.Title>
              <ListItem.Subtitle
                numberOfLines={1}
                style={{
                  color: themeColors.white,
                  textTransform: 'capitalize',
                  marginVertical: 5,
                }}>
                Price - {item.value}
              </ListItem.Subtitle>
              <ListItem.Subtitle
                numberOfLines={1}
                style={{
                  color: themeColors.white,
                  textTransform: 'capitalize',
                }}>
                Date - {moment(item.created_at).format('DD.MM.YYYY H:ma')}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color={themeColors.white} />
          </ListItem>
        );
      }}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      contentContainerStyle={{
        paddingTop: 10,
        flexGrow: 1,
        width: '100%',
        backgroundColor: themeColors.mazarine,
      }}
      // ListHeaderComponentStyle={{
      //   paddingHorizontal: 20,
      // }}
      ListHeaderComponent={
        <View style={{}}>
          <View style={{paddingTop: 15, width: '100%'}}>
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={{
                borderRadius: 10,
                backgroundColor: themeColors.pico,
                // maxHeight: 100,
                width: '100%',
              }}>
              <ListItem.Content>
                <ListItem.Title
                  style={{color: themeColors.white, fontWeight: 'bold'}}>
                  {customer.user.username} {customer.user.first_name}{' '}
                  {customer.user.last_name}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{color: themeColors.white, paddingTop: 10}}>
                  {customer.newsletter
                    ? 'Subscribed to newsletter'
                    : 'Not subscribed to newsletter'}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>

          <View style={{paddingTop: 15, width: '100%'}}>
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={{
                borderRadius: 10,
                backgroundColor: themeColors.pico,
                // maxHeight: 100,
                width: '100%',
              }}>
              <ListItem.Content>
                <ListItem.Title
                  style={{color: themeColors.white, fontWeight: 'bold'}}>
                  Total Spent
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{color: themeColors.white, paddingTop: 10}}>
                  {customer.orders.reduce(
                    (prev, curr) => prev + +curr.value,
                    0,
                  )}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
          <View style={{paddingTop: 35, width: '100%'}}>
            <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
              Orders
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default CustomerDetailScreen;
