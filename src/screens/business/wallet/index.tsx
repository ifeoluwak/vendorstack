import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {ListItem, Button, Icon, CheckBox, Avatar, Divider} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment';
import {Naira} from '../../../constants/general';
import HomeSectionHeader from '../../../components/HomeSectionHeader';

function BusinessWalletScreen({navigation, route}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.businessModel.getBusinessWallet,
  );
  const {total_revenue, total_withdrawn, curr_balance, withdraws} = useSelector(
    (root: RootState) => root.businessModel,
  );

  const dispatch = useDispatch<Dispatch>();

  const onRefresh = () => {
    dispatch.businessModel.getBusinessWallet();
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={styles.itemWrapper}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={withdraws}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={styles.listContainer}>
              <Icon
                name={item.fulfilled ? 'check-circle' : 'alert-octagon'}
                type="feather"
                color={
                  item.fulfilled
                    ? themeColors.white
                    : themeColors.harley_davidson
                }
              />
              <ListItem.Content>
                <ListItem.Title right style={styles.listTitle}>
                  {Naira} {item.amount}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {moment(item.created_at).format('DD, MMM YY')}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.status_message}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
          ListHeaderComponent={
            <View>
              <View style={styles.currBalanceView}>
                <Text style={styles.currBalanceTitle}>
                  {Naira} {curr_balance}
                </Text>
                <Divider />
                <Text style={{fontSize: 14, color: themeColors.pico}}>
                  Current Balance
                </Text>
              </View>
              <View style={styles.balanceRow}>
                <View style={styles.subBalanceView}>
                  <Text style={styles.subBalanceTitle}>
                    {Naira} {total_withdrawn}
                  </Text>
                  <Divider />
                  <Text style={{color: themeColors.white}}>
                    Total Withdrawn
                  </Text>
                </View>
                <View style={styles.subBalanceView}>
                  <Text style={styles.subBalanceTitle}>
                    {Naira} {total_revenue}
                  </Text>
                  <Divider />
                  <Text style={{color: themeColors.white}}>Total Revenue</Text>
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <HomeSectionHeader title="Your withdrawals" />
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}

export default BusinessWalletScreen;
