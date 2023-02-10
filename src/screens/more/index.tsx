/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Icon} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {styles} from './style';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {logout} from '../../helpers';

function MoreScreen({navigation}) {
  const {token} = useSelector((root: RootState) => root.authModel);
  const {user} = useSelector((root: RootState) => root.userModel);

  const anonymousMenus = [
    {label: 'Login', icon: 'log-in', nav: () => navigation.navigate('Login')},
    {
      label: 'Sign up',
      icon: 'user-plus',
      nav: () => navigation.navigate('Signup'),
    },
    {label: 'Help & Support', icon: 'help-circle', nav: () => {}},
  ];
  const authMenus = [
    {label: 'Profile', icon: 'user', nav: () => navigation.navigate('Profile')},
    {
      label: 'Orders',
      icon: 'shopping-cart',
      nav: () => navigation.navigate('Orders'),
    },
    {
      label: 'Addresses',
      icon: 'map-pin',
      nav: () => navigation.navigate('Address'),
    },
    ...(!user?.businesses?.length
      ? [
          {
            label: 'Create business',
            icon: 'shopping-bag',
            nav: () => navigation.navigate('BusinessCreate'),
          },
        ]
      : []),
    {label: 'Help & Support', icon: 'help-circle', nav: () => {}},
    {label: 'Log Out', icon: 'power', nav: logout},
  ];

  const menu = token ? authMenus : anonymousMenus;

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'More',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {menu.map(m => (
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
    </View>
  );
}

export default MoreScreen;
