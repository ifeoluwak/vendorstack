import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {Divider, Button} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import {Naira} from '../../../constants/general';

function BusinessSaleScreen({navigation}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.userModel.getUserProfile,
  );
  const {user} = useSelector((root: RootState) => root.userModel);

  const business = user?.businesses?.[0];

  const dispatch = useDispatch<Dispatch>();

  const onRefresh = () => {
    dispatch.userModel.getUserProfile();
  };

  React.useEffect(() => {
    navigation.setOptions({
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

  //   const keys = ['']

  const balanceItems = React.useMemo(() => {
    return Object.keys(business?.sale || {}).map((key, index) => {
      const title = key;
      const even = index % 2 === 0;
      if (key !== 'saleId') {
        return (
          <View
            style={[
              styles.currSaleView,
              {backgroundColor: even ? themeColors.white : themeColors.pico},
            ]}>
            <Text
              style={[
                styles.currSaleTitle,
                {color: even ? themeColors.pico : themeColors.white},
              ]}>
              {key !== 'soldCount' ? Naira : ''} {business?.sale?.[key]}
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
      }
    });
  }, [business?.sale]);

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
      </View>
    </View>
  );
}

export default BusinessSaleScreen;
