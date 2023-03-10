/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {ActivityIndicator, Linking, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Icon} from '@rneui/themed';

import {styles} from './style';
import {useSelector} from 'react-redux';
import {themeColors} from '../../constants/color';
import {RootState} from '../../redux/store';

function VendorOptionsScreen({navigation, route}) {
  const vendorId = route?.params?.id;
  const loading = useSelector((root: RootState) => {
    const model = root.loading.effects.userModel;
    return model.subscribeToVendor || model.unSubscribeToVendor;
  });
  const {vendors} = useSelector((root: RootState) => root.vendorModel);
  const {token} = useSelector((root: RootState) => root.authModel);

  const vendor = vendors?.[vendorId];

  const menu = React.useMemo(
    () => [
      {
        label: 'Visit Instagram page',
        icon: 'instagram',
        nav: () =>
          Linking.openURL(
            `https://www.instagram.com/${vendor?.socialUsername}`,
          ),
      },
      {
        label: 'Visit Website',
        icon: 'globe',
        nav: () => Linking.openURL(vendor?.website || ''),
      },
      ...(token
        ? [
            {
              label: 'Rate Vendor',
              icon: 'thumbs-up',
              nav: () =>
                navigation.navigate('AddReview', {
                  businessId: vendorId,
                  businessOwnerId: vendor?.vendor?._id,
                }),
            },
          ]
        : []),
      {
        label: 'Contact Vendor',
        icon: 'at-sign',
        nav: () => navigation.navigate('VendorContact', {vendor}),
      },
      {
        label: 'Make a complaint',
        icon: 'alert-triangle',
        nav: () => navigation.navigate('Orders'),
      },
    ],
    [navigation, token, vendor, vendorId],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Options',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  // React.useEffect(() => {
  //   dispatch.userModel.getUserSubscriptionToVendor(vendorId);
  // }, [dispatch.userModel, vendorId]);

  return (
    <View style={styles.container}>
      {menu.map(m => (
        <ListItem
          key={m.label}
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
          {m.icon === 'mail' && loading ? (
            <ActivityIndicator color={themeColors.white} />
          ) : null}
          <ListItem.Chevron color={themeColors.white} />
        </ListItem>
      ))}
    </View>
  );
}

export default VendorOptionsScreen;
