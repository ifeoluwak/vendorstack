import {useNavigation} from '@react-navigation/native';
import {Button, Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {themeColors} from '../constants/color';
import {Dispatch, RootState} from '../redux/store';

function VendorActionButtons({id, ownerId}: {id: string; ownerId: string}) {
  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  const {token} = useSelector((root: RootState) => root.authModel);
  const {user} = useSelector((root: RootState) => root.userModel);
  const loading = useSelector(
    (root: RootState) => root.loading.models.userModel,
  );

  const following = user?.businessFollowings.find(fol => fol === id);

  const handleFollow = () => {
    dispatch.userModel.followVendor(id);
  };

  const handleUnFollow = () => {
    dispatch.userModel.unfollowVendor(id);
  };

  const isOwner = user?._id === ownerId;

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
        title={following ? 'Unfollow' : 'Follow'}
        buttonStyle={{
          backgroundColor: themeColors.harley_davidson,
        }}
        containerStyle={{
          width: '30%',
          marginVertical: 10,
        }}
        size="sm"
        radius={4}
        // disabledStyle={{
        //   backgroundColor: themeColors.white,
        // }}
        disabled={!token || isOwner}
        loading={loading}
        onPress={following ? handleUnFollow : handleFollow}
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
        onPress={() => navigation.navigate('VendorOptions', {id: id})}
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
