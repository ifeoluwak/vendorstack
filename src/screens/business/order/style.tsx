import {StyleSheet} from 'react-native';
import { themeColors } from '../../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  listContainer: {
    borderRadius: 7,
    backgroundColor: themeColors.pico,
    height: 90,
    width: '100%',
    marginTop: 10,
  },
  listEndView: {
    backgroundColor: themeColors.pico,
    maxHeight: 100,
  },
  listTitle: {
    color: themeColors.white,
    fontWeight: 'bold',
    paddingBottom: 8,
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
    backgroundColor: themeColors.white,
    paddingVertical: 13,
  },
  dropDownState: {
    zIndex: 110,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropDownLga: {
    zIndex: 100,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  btnDropDown: {
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.white,
  },
  btnDropDownText: {
    color: themeColors.white,
    fontSize: 18,
    paddingTop: 10,
  },
  customErrorText: {
    color: themeColors.error,
    fontSize: 12,
    paddingLeft: 5,
    marginTop: 5,
  },
});
