import {StyleSheet} from 'react-native';
import {ms, mvs, s} from 'react-native-size-matters';
import {themeColors} from '../../constants/color';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EBEBEB',
    borderRadius: mvs(40),
    marginVertical: mvs(14),
    height: mvs(35),
    justifyContent: 'center',
  },
  wrapperBordered: {
    backgroundColor: themeColors.transparent,
    marginBottom: mvs(14),
    height: mvs(35),
    justifyContent: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  animatedView: {
    backgroundColor: themeColors.white,
    position: 'absolute',
    height: '98%',
    borderRadius: ms(40),
  },
  animatedViewBordered: {
    backgroundColor: themeColors.white,
    position: 'absolute',
    height: 3,
    bottom: -5,
  },
  valueTitle: {
    fontWeight: '800',
    fontSize: 25,
    color: themeColors.white,
    textAlign: 'center',
    lineHeight: 24,
  },
  btnStyle: {
    height: '100%',
    justifyContent: 'center',
    borderRadius: ms(40),
    zIndex: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  inActive: {
    color: themeColors.white,
    fontWeight: '800',
  },
  inActiveBordered: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontWeight: '800',
  },
  text: {
    fontSize: s(13),
  },
});

export default styles;
