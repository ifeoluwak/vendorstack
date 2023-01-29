import React from 'react';
import {Button, ListItem, Avatar, Text, Divider, Icon} from '@rneui/themed';
import {Vendor} from '../types/vendor';
import {themeColors} from '../constants/color';
import {View} from 'react-native';

function VendorHeader({vendor}: {vendor: Vendor}) {
  return (
    <ListItem
      // bottomDivider
      containerStyle={{backgroundColor: themeColors.mazarine}}>
      <Avatar
        source={{
          uri: vendor?.url,
        }}
        size="large"
        rounded
      />
      <ListItem.Content>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                color: themeColors.white,
                textTransform: 'capitalize',
              }}>
              {vendor?.rating || 0}/5
            </Text>
            <Text style={{color: themeColors.white, fontWeight: 'bold'}}>
              Rating
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: themeColors.white}}>
              {vendor?.follower_count}
            </Text>
            <Text style={{color: themeColors.white, fontWeight: 'bold'}}>
              Followers
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: themeColors.white}}>
              {vendor?.products?.length}
            </Text>
            <Text style={{color: themeColors.white, fontWeight: 'bold'}}>
              Products
            </Text>
          </View>
        </View>
        <ListItem.Subtitle style={{color: themeColors.white, fontSize: 13}}>
          {vendor?.biography.slice(0, 150)}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default VendorHeader;
