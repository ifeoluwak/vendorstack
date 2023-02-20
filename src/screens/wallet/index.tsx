import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Divider, Button} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {styles} from './style';
import {Naira} from '../../constants/general';

function UserWalletScreen({navigation}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.userModel.getUserProfile,
  );
  const {user} = useSelector((root: RootState) => root.userModel);

  const wallet = user?.wallet;

  const dispatch = useDispatch<Dispatch>();

  const onRefresh = () => {
    dispatch.userModel.getUserProfile();
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

  const balanceItems = React.useMemo(() => {
    return Object.keys(wallet || {}).map((balance, index) => {
      const title = balance;
      const even = index % 2 === 0;
      return (
        <View
          style={[
            styles.currBalanceView,
            {backgroundColor: even ? themeColors.white : themeColors.pico},
          ]}>
          <Text
            style={[
              styles.currBalanceTitle,
              {color: even ? themeColors.pico : themeColors.white},
            ]}>
            {Naira} {wallet?.[balance]}
          </Text>
          <Divider />
          <Text
            style={{
              fontSize: 14,
              color: even ? themeColors.pico : themeColors.white,
              textTransform: 'capitalize',
            }}>
            {title.replace(/([a-z](?=[A-Z]))/g, '$1 ')}
          </Text>
        </View>
      );
    });
  }, [wallet]);

  console.log(user?.wallet);

  return (
    <View style={styles.container}>
      {/* {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )} */}
      <View style={styles.itemWrapper}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={[themeColors.white]}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}>
          {balanceItems}
          {/* <View style={styles.balanceRow}>
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
          </View> */}
        </ScrollView>

        {wallet?.currentBalance > 0 ? (
          <View style={styles.btnView}>
            <Button
              title="Make a Withdrawal"
              titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
              buttonStyle={styles.btnStyle}
              radius={30}
              onPress={() => navigation.navigate('UserWalletWithdraw')}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

export default UserWalletScreen;
