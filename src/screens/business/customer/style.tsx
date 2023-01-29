import {StyleSheet} from 'react-native';
import {themeColors} from '../../../constants/color';

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
    fontWeight: 'bold',
  },
  logout: {
    color: themeColors.nasturcian,
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
  listSubTitle: {
    color: themeColors.white,
    textTransform: 'capitalize',
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
