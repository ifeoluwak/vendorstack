import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t } from '@transifex/native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import styles from './styles';
import { ToggleButtonProps } from '@src/models/Generic';
import testIds from '@src/constants/testIds';

const ToggleButton = (props: ToggleButtonProps) => {
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
      style={[styles.wrapper, props.style]}
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width);
      }}>
      <Animated.View
        style={[
          {
            width: `${100 / props.btns.length}%`,
          },
          animatedStyles,
          styles.shadowProp,
          styles.animatedView,
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
              testID={`${testIds.ToggleGraphBtnID}-${btn}`}
              key={btn}
              onPress={() => props.setActiveBtn(index)}>
              <Text
                style={[
                  props.activeBtn === index
                    ? styles.valueTitle
                    : styles.inActive,
                  styles.text,
                  props.textStyle,
                ]}>
                {t(btn)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ToggleButton;
