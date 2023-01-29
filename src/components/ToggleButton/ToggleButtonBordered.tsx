import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import styles from './styles';

const ToggleButtonBordered = (props) => {
  const offset = useSharedValue(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    offset.value = withTiming(calcTranslationX(), {
      duration: 200,
      easing: Easing.cubic,
    });
  }, [props.activeBtn]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const calcTranslationX = () => {
    const steps = width / props.btns.length;
    return steps * props.activeBtn;
  };

  return (
    <View
      style={[styles.wrapperBordered, props.style]}
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width);
      }}>
      <Animated.View
        style={[
          {
            width: `${100 / props.btns.length}%`,
            borderRadius: props.stickBorderRadius || 0,
          },
          animatedStyles,
          styles.shadowProp,
          styles.animatedViewBordered,
        ]}
      />
      <View style={[styles.rowView]}>
        {props.btns.map((btn, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.btnStyle,
                {
                  width: `${100 / props.btns.length}%`,
                },
              ]}
              key={btn}
              onPress={() => props.setActiveBtn(index)}>
              <Text
                style={[
                  props.activeBtn === index
                    ? styles.valueTitle
                    : styles.inActiveBordered,
                  styles.text,
                  // { fontStyle: 'italic' },
                  props.textStyle,
                ]}>
                {btn}
              </Text>
              {props.subTexts ? (
                <Text
                  style={[
                    props.activeBtn === index
                      ? styles.valueTitle
                      : styles.inActiveBordered,
                    styles.text,
                    { fontWeight: '500' },
                    props?.subtextStyle,
                  ]}>
                  {props.subTexts[index]}
                </Text>
              ) : (
                <></>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ToggleButtonBordered;
