import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {ListItem, Icon, Divider, Button} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment';
import {Naira} from '../../../constants/general';
import HomeSectionHeader from '../../../components/HomeSectionHeader';
import {WithdrawStatus} from '../../../types/general';

function BusinessWalletScreen({navigation, route}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.walletModel.getWithdrawHistory,
  );
  const {user} = useSelector((root: RootState) => root.userModel);
  const {history} = useSelector((root: RootState) => root.walletModel);

  const wallet = user?.wallet;

  const dispatch = useDispatch<Dispatch>();

  const onRefresh = () => {
    console.log('got here ----xx-x-x-x-x-x');
    dispatch.walletModel.getWithdrawHistory();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Wallet',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  React.useEffect(() => {
    onRefresh();
  }, []);

  console.log('history', history);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={styles.itemWrapper}>
        <View>
          <View style={styles.currBalanceView}>
            <Text style={styles.currBalanceTitle}>
              {Naira} {wallet?.currentBalance}
            </Text>
            <Divider />
            <Text style={{fontSize: 14, color: themeColors.pico}}>
              Current Balance
            </Text>
          </View>
          <View style={styles.balanceRow}>
            <View style={styles.subBalanceView}>
              <Text style={styles.subBalanceTitle}>
                {Naira} {wallet?.pendingBalance}
              </Text>
              <Divider />
              <Text style={{color: themeColors.white}}>Pending Balance</Text>
            </View>
            <View style={styles.subBalanceView}>
              <Text style={styles.subBalanceTitle}>
                {Naira} {wallet?.allTimeBalance}
              </Text>
              <Divider />
              <Text style={{color: themeColors.white}}>Total Revenue</Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <HomeSectionHeader title="Your withdrawals" />
          </View>
        </View>
        {/* <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
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
        /> */}

        {wallet?.currentBalance > 0 ? (
          <View style={styles.btnView}>
            <Button
              title="Make a Withdrawal"
              titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
              buttonStyle={styles.btnStyle}
              radius={30}
              onPress={() => navigation.navigate('BusinessWalletWithdrawals')}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export default BusinessWalletScreen;
