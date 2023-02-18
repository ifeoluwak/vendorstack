/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Icon, Switch} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {styles} from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {logout} from '../../helpers';

function BusinessScreen({navigation}) {
  const [takingOrders, setTakingOrders] = useState(true);

  const handleTakingOrder = () => {
    setTakingOrders(!takingOrders);
    dispatch.businessModel.setBusinessTakingOrders();
  };

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.businessModel.setBusinessTakingOrders,
  );
  const {user} = useSelector((root: RootState) => root.userModel);

  const business = user?.businesses?.[0];

  useEffect(() => {
    if (business) {
      setTakingOrders(business.takingOrder);
    }
  }, [business]);

  const dispatch = useDispatch<Dispatch>();

  const menus = useMemo(
    () => [
      {
        label: 'Storefront',
        icon: 'shopping-bag',
        nav: () =>
          navigation.navigate('Vendor', {
            id: business?._id,
            title: business?.name,
          }),
      },
      {
        label: 'Business Profile',
        icon: 'book-open',
        nav: () => navigation.navigate('BusinessProfile'),
      },
      {
        label: 'Wallet',
        icon: 'credit-card',
        nav: () => navigation.navigate('BusinessWallet'),
      },
      {
        label: 'Withdrawals',
        icon: 'credit-card',
        nav: () => navigation.navigate('BusinessWithdrawalHistory'),
      },
      {
        label: 'Bank account',
        icon: 'key',
        nav: () => navigation.navigate('BusinessBankAccount'),
      },
      {
        label: 'Orders',
        icon: 'shopping-cart',
        nav: () => navigation.navigate('BusinessOrders'),
      },
      {
        label: 'Products',
        icon: 'layers',
        nav: () => navigation.navigate('BusinessProducts'),
      },
      {
        label: 'Customers',
        icon: 'users',
        nav: () => navigation.navigate('BusinessCustomers'),
      },
      // {
      //   label: 'Turn off taking orders',
      //   icon: 'toggle-left',
      //   nav: () => dispatch.businessModel.setBusinessTakingOrders(),
      // },
    ],
    [navigation, business],
  );

  console.log('business', business);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: business?.name,
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, business]);

  return (
    <View style={styles.container}>
      {menus.map(m => (
        <ListItem
          key={m.icon}
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          onPressOut={m.nav}
          containerStyle={styles.listContainer}>
          <Icon
            name={m.icon}
            type="feather"
            color={themeColors.white}
            size={18}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>{m.label}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color={themeColors.white} />
        </ListItem>
      ))}
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        onPress={logout}
        containerStyle={styles.listContainer}>
        {loading ? (
          <ActivityIndicator color={themeColors.white} />
        ) : (
          <Icon
            name="toggle-left"
            type="feather"
            color={themeColors.white}
            size={18}
          />
        )}
        <ListItem.Content>
          <ListItem.Title style={styles.listTitle}>
            Taking orders
          </ListItem.Title>
        </ListItem.Content>
        <Switch value={takingOrders} onValueChange={handleTakingOrder} />
      </ListItem>
    </View>
  );
}

export default BusinessScreen;
