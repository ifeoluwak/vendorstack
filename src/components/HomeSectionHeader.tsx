import {ListItem} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import {themeColors} from '../constants/color';

function HomeSectionHeader({title}: {title: string}) {
  return (
    <ListItem
      containerStyle={{
        backgroundColor: themeColors.transparent,
        paddingBottom: 0,
        paddingLeft: 10,
      }}>
      <ListItem.Content>
        <Text style={{color: themeColors.white, fontWeight: 'bold'}}>
          {title}
        </Text>
      </ListItem.Content>
    </ListItem>
  );
}

export default HomeSectionHeader;
