import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Button, Chip, Icon} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import moment from 'moment';
import {yesterday} from '../../../helpers';
import {styles} from '../wallet/style';
import {WithdrawStatus} from '../../../types/general';
import {Naira} from '../../../constants/general';

function BusinessWithdrawalHistoryScreen({navigation}) {
  const dispatch = useDispatch<Dispatch>();

  const [dateOne, setDateOne] = useState(yesterday.toDate());
  const [openDateOne, setOpenDateOne] = useState(false);

  const [dateTwo, setDateTwo] = useState(new Date());
  const [openDateTwo, setOpenDateTwo] = useState(false);

  const [selectedStatus, setSelectedStatus] = React.useState('');

  const loading = useSelector(
    (root: RootState) => root.loading.effects.walletModel.getWithdrawHistory,
  );
  const {history} = useSelector((root: RootState) => root.walletModel);

  const paymentStatuses = [
    'PENDING',
    'FAILED',
    'SUCCESS',
    'RECEIVED',
    'REVERSED',
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Withdrawal History',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch.walletModel.getWithdrawHistory({
      dateRange: `${moment(dateOne).format('YYYY-MM-DD')},${moment(
        dateTwo,
      ).format('YYYY-MM-DD')}`,
      selectedStatus,
    });
  }, [dispatch, dateOne, dateTwo, selectedStatus]);

  console.log(history);

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
          data={paymentStatuses}
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
          showsVerticalScrollIndicator={false}
          data={history}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={styles.listContainer}>
              <Icon
                name={
                  item.status === WithdrawStatus.SUCCESS
                    ? 'check-circle'
                    : 'alert-octagon'
                }
                type="feather"
                color={
                  item.status === WithdrawStatus.SUCCESS
                    ? themeColors.white
                    : themeColors.harley_davidson
                }
              />
              <ListItem.Content>
                <ListItem.Title right style={styles.listTitle}>
                  {Naira} {item.amount}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {moment(item.createdAt).format('DD, MMM YY')}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.description}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          contentContainerStyle={{
            paddingTop: 10,
            flexGrow: 1,
            paddingBottom: 100,
          }}
        />
      </View>
    </View>
  );
}

export default BusinessWithdrawalHistoryScreen;
