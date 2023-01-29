import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeColors.mazarine,
  },
  itemWrapper: {
    width: '100%',
    paddingHorizontal: 10,
    flex: 1,
  },
  itemTitle: {
    color: themeColors.white,
    fontWeight: 'bold',
  },
  listEndView: {
    backgroundColor: themeColors.pico,
    maxHeight: 100,
  },
  totalTitle: {
    color: themeColors.white,
    fontWeight: 'bold',
  },
  btnView: {
    position: 'absolute',
    bottom: 40,
    width: '80%',
    alignSelf: 'center',
  },
  btnStyle: {
    backgroundColor: themeColors.pico,
    paddingVertical: 13,
  },
});
