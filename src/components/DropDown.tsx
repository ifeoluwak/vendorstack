import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated';
import {themeColors} from '../constants/color';
import {isIos} from '../helpers';

export const DropDownFlatlist = ({
  data,
  onSelect,
  onScrollTouch,
}: {
  data: any;
  onSelect: (item: any) => void;
  onScrollTouch?: () => void;
}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item?.id || item?._id || item?.name || item}
        onPress={() => onSelect(item)}>
        <Text style={style.dropDownLabels}>{item.name || item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      entering={ZoomIn.duration(200)}
      exiting={ZoomOut.duration(200)}>
      <View style={[style.card, style.shadowProp, style.dropDownContainer]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          onTouchStart={onScrollTouch}
          nestedScrollEnabled
        />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  dropDownContainer: {
    width: '80%',
    alignSelf: 'center',
    position: isIos ? 'absolute' : 'relative',
    backgroundColor: themeColors.white,
    top: 0,
    borderRadius: 16,
    paddingTop: 5,
    paddingBottom: 8,
    maxHeight: 200,
    paddingHorizontal: 15,
    zIndex: 200,
  },
  dropDownLabels: {
    color: themeColors.pico,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 25,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 3,
    elevation: 2,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
});
