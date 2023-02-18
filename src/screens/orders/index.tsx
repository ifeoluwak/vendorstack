import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Button, Chip} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import moment from 'moment';
import {yesterday} from '../../helpers';

function UserOrdersScreen({navigation}) {
  const dispatch = useDispatch<Dispatch>();

  const [dateOne, setDateOne] = useState(yesterday.toDate());
  const [openDateOne, setOpenDateOne] = useState(false);

  const [dateTwo, setDateTwo] = useState(new Date());
  const [openDateTwo, setOpenDateTwo] = useState(false);

  const [selectedStatus, setSelectedStatus] = React.useState('');

  const loading = useSelector(
    (root: RootState) => root.loading.effects.businessModel.getBusinessOrders,
  );
  const {orders} = useSelector((root: RootState) => root.businessModel);

  const orderStatuses = [
    'PENDING',
    'ACCEPTED',
    'SHIPPED',
    'RECEIVED',
    'REJECTED',
    'RETURNED',
    'RETURN_CONFIRMED',
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Orders',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch.userModel.getUserOrders({
      dateRange: `${moment(dateOne).format('YYYY-MM-DD')},${moment(
        dateTwo,
      ).format('YYYY-MM-DD')}`,
      selectedStatus,
    });
  }, [dispatch, dateOne, dateTwo, selectedStatus]);

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 10,
          marginBottom: 20,
        }}>
        <View style={{width: '40%'}}>
          <Button
            buttonStyle={{backgroundColor: themeColors.white}}
            titleStyle={{color: themeColors.mazarine}}
            title={
              dateOne ? moment(dateOne).format('DD MMM, YYYY') : 'Start Date'
            }
            onPress={() => setOpenDateOne(true)}
          />
          <DatePicker
            modal
            open={openDateOne}
            date={dateOne}
            maximumDate={yesterday.toDate()}
            mode="date"
            onConfirm={date => {
              setOpenDateOne(false);
              setDateOne(date);
            }}
            onCancel={() => {
              setOpenDateOne(false);
            }}
          />
        </View>
        <View style={{width: '40%'}}>
          <Button
            buttonStyle={{backgroundColor: themeColors.white}}
            titleStyle={{color: themeColors.mazarine}}
            title={
              dateTwo ? moment(dateTwo).format('DD MMM, YYYY') : 'End Date'
            }
            onPress={() => setOpenDateTwo(true)}
          />
          <DatePicker
            modal
            open={openDateTwo}
            date={dateTwo}
            maximumDate={new Date()}
            mode="date"
            onConfirm={date => {
              setOpenDateTwo(false);
              setDateTwo(date);
            }}
            onCancel={() => {
              setOpenDateTwo(false);
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          // paddingTop: 12,
          marginBottom: 20,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={orderStatuses}
          renderItem={({item}) => {
            const isSelected = item === selectedStatus;
            return (
              <Chip
                key={item}
                title={item}
                type={isSelected ? 'solid' : 'outline'}
                color={themeColors.white}
                buttonStyle={{
                  borderColor: themeColors.pico,
                  borderWidth: 1,
                  backgroundColor: isSelected
                    ? themeColors.white
                    : themeColors.pico,
                }}
                onPress={() => setSelectedStatus(isSelected ? '' : item)}
                titleStyle={{
                  color: isSelected ? themeColors.pico : themeColors.white,
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{width: 6}} />}
        />
      </View>
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
                navigation.navigate('OrderDetail', {
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
                  From - {item?.business?.name}
                </ListItem.Title>
                <ListItem.Subtitle
                  numberOfLines={1}
                  style={{
                    color: themeColors.white,
                    textTransform: 'capitalize',
                  }}>
                  {item?.totalAmount} (#{item.products.length} Items)
                </ListItem.Subtitle>
                <ListItem.Subtitle
                  numberOfLines={1}
                  style={{
                    color: themeColors.white,
                    textTransform: 'capitalize',
                  }}>
                  {moment(item?.created_at).format('DD MMM, YYYY')}
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

export default UserOrdersScreen;
