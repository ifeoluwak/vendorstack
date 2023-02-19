import React from 'react';
import {View} from 'react-native';
import {Icon, ListItem} from '@rneui/themed';
import TouchableScale from 'react-native-touchable-scale';
import {themeColors} from '../constants/color';
import {s} from 'react-native-size-matters';
import {Vendor} from '../types/vendor';
import {StyleSheet} from 'react-native';

function VendorInfo({vendor}: {vendor: Vendor}) {
  return (
    <View style={{flex: 1, paddingHorizontal: s(10)}}>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        containerStyle={[styles.listContainer]}>
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
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}>
            {vendor?.state.replace('_', ' ')}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: themeColors.white,
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
        containerStyle={[styles.listContainer]}>
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
            }}>
            {vendor?.phone}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        containerStyle={[styles.listContainer]}>
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
            }}>
            {vendor.vendor?.username}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {vendor?.orderNoticeInfo ? (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          containerStyle={{
            borderRadius: 7,
            backgroundColor: themeColors.pico,
            // height: 90,
            width: '100%',
            marginTop: s(10),
            paddingVertical: s(10),
          }}>
          <Icon
            name="alert-circle"
            type="feather"
            color={themeColors.white}
            size={s(20)}
          />
          <ListItem.Content>
            <ListItem.Title
              style={{
                color: themeColors.white,
                fontWeight: 'bold',
                paddingBottom: 8,
              }}>
              Notice
            </ListItem.Title>
            <ListItem.Subtitle
              style={{
                color: themeColors.white,
              }}>
              {vendor?.orderNoticeInfo}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 7,
    backgroundColor: themeColors.pico,
    // height: 90,
    width: '100%',
    marginTop: 10,
  },
});

export default VendorInfo;
