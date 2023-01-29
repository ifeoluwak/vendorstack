import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  vendorContainer: {
    flex: 1,
    width: '100%',
    height: undefined,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
});
