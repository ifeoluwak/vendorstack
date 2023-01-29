import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.mazarine,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  customErrorText: {
    color: themeColors.error,
    fontSize: 12,
    paddingLeft: 15,
    marginTop: 5,
  },
});
