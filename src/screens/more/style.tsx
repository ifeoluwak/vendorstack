import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.mazarine,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  listContainer: {
    borderRadius: 7,
    backgroundColor: themeColors.pico,
    // height: 90,
    width: '100%',
    marginTop: 10,
  },
  listTitle: {
    color: themeColors.white,
  },
  logout: {
    color: themeColors.nasturcian,
  },
});
