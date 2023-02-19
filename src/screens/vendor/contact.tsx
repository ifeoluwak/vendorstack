/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Icon} from '@rneui/themed';

import {styles} from './style';
import {themeColors} from '../../constants/color';
import {s} from 'react-native-size-matters';
import { Vendor } from '../../types/vendor';

function VendorContactScreen({navigation, route}) {
  const vendor: Vendor = route?.params?.vendor;

  console.log(vendor);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Contact',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        // onPressOut={m.nav}
        containerStyle={[styles.listContainer, {paddingVertical: s(18)}]}>
        <Icon
          name="map-pin"
          type="feather"
          color={themeColors.white}
          size={s(20)}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: themeColors.white,
              fontSize: s(16),
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
            {vendor?.state.replace('_', ' ')}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: themeColors.white,
              fontSize: s(14),
              paddingTop: s(7),
            }}>
            {vendor?.address}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        // onPressOut={m.nav
        containerStyle={[styles.listContainer, {paddingVertical: s(18)}]}>
        <Icon
          name="phone"
          type="feather"
          color={themeColors.white}
          size={s(20)}
        />
        <ListItem.Content>
          <ListItem.Title
            selectable
            style={{
              color: themeColors.white,
              fontSize: s(16),
            }}>
            {vendor?.phone}
          </ListItem.Title>
        </ListItem.Content>
        {/* <Icon
          name="copy"
          type="feather"
          color={themeColors.white}
          size={s(20)}
        /> */}
      </ListItem>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        // onPressOut={m.nav}
        containerStyle={[styles.listContainer, {paddingVertical: s(18)}]}>
        <Icon
          name="mail"
          type="feather"
          color={themeColors.white}
          size={s(20)}
        />
        <ListItem.Content>
          <ListItem.Title
            selectable
            style={{
              color: themeColors.white,
              fontSize: s(16),
            }}>
            {vendor?.vendor?.username}
          </ListItem.Title>
        </ListItem.Content>
        {/* <Icon
          name="copy"
          type="feather"
          color={themeColors.white}
          size={s(20)}
        /> */}
      </ListItem>
    </View>
  );
}

export default VendorContactScreen;
