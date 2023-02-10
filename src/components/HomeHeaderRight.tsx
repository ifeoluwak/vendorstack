import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {themeColors} from '../constants/color';

function HomeHeaderRight({hasBusiness}) {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection: 'row'}}>
      <Button
        icon={{
          name: 'search',
          type: 'feather',
          size: 24,
          color: themeColors.white,
        }}
        type="clear"
        onPress={() => navigation.navigate('Search')}
      />
      {hasBusiness ? (
        <Button
          icon={{
            name: 'shopping-bag',
            type: 'feather',
            size: 24,
            color: themeColors.white,
          }}
          type="clear"
          onPress={() => navigation.navigate('BusinessMore')}
        />
      ) : (
        <></>
      )}
      <Button
        icon={{
          name: 'menu',
          type: 'feather',
          size: 24,
          color: themeColors.white,
        }}
        type="clear"
        onPress={() => navigation.navigate('More')}
      />
    </View>
  );
}

export default HomeHeaderRight;
