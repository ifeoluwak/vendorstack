import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {themeColors} from '../constants/color';
import {Dispatch} from '../redux/store';

function VendorActionButtons(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  const handleFollow = () => {
    dispatch.userModel.followVendor({vendorId: props.id});
  };

  const handleUnFollow = () => {
    dispatch.userModel.unfollowVendor(props.followed?.id);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 7,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: themeColors.mazarine,
      }}>
      <Button
        title={props.followed ? 'Unfollow' : 'Follow'}
        buttonStyle={{
          backgroundColor: themeColors.harley_davidson,
        }}
        containerStyle={{
          width: '30%',
          marginVertical: 10,
        }}
        size="sm"
        radius={4}
        loading={props.followLoading}
        onPress={props.followed ? handleUnFollow : handleFollow}
      />
      <Button
        title="Chat"
        buttonStyle={{
          backgroundColor: themeColors.pico,
        }}
        containerStyle={{
          width: '30%',
          marginVertical: 10,
        }}
        size="sm"
        radius={4}
      />
      <Button
        buttonStyle={{
          backgroundColor: themeColors.pico,
        }}
        onPress={() => navigation.navigate('VendorOptions', {id: props.id})}
        containerStyle={{
          width: '30%',
          marginVertical: 10,
        }}
        size="sm"
        radius={4}>
        More
        <Icon type="feather" name="chevron-right" color="white" />
      </Button>
    </View>
  );
}

const style = StyleSheet.create({});

export default VendorActionButtons;
