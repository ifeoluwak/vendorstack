import {StyleSheet} from 'react-native';
import {themeColors} from '../../../constants/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.mazarine,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  currBalanceView: {
    borderRadius: 7,
    backgroundColor: themeColors.white,
    alignItems: 'center',
    width: '70%',
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  currBalanceTitle: {fontWeight: 'bold', fontSize: 34, color: themeColors.pico},
  balanceRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  subBalanceView: {
    borderRadius: 7,
    backgroundColor: themeColors.pico,
    alignItems: 'center',
    width: '48%',
    marginTop: 10,
    paddingVertical: 20,
  },
  subBalanceTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: themeColors.white,
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
    paddingTop: 5,
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
