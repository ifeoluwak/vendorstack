/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Icon} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {logout} from '../../helpers';

function BusinessScreen({navigation}) {
  const {token} = useSelector((root: RootState) => root.authModel);
  const {profile} = useSelector((root: RootState) => root.userModel);

  const menus = [
    {
      label: 'Your Page',
      icon: 'shopping-bag',
      nav: () =>
        navigation.navigate('Vendor', {
          id: profile?.user?.business?.id,
          title: profile?.user?.business?.name,
        }),
    },
    {
      label: 'Profile',
      icon: 'user',
      nav: () => navigation.navigate('BusinessProfile'),
    },
    {
      label: 'Wallet',
      icon: 'credit-card',
      nav: () => navigation.navigate('BusinessWallet'),
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
  ];

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: profile?.user?.business?.name,
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, profile]);

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
        <Icon
          name="power"
          type="feather"
          color={themeColors.nasturcian}
          size={18}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.logout}>Log Out</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default BusinessScreen;
