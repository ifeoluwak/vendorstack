import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  searchContainer: {
    width: '80%',
    paddingVertical: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
    overflow: 'hidden',
    borderRadius: 5,
  },
  trendingContainer: {
    flex: 1,
    width: '100%',
    height: undefined,
    justifyContent: 'center',
    // backgroundColor: '#ecf0f1',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});
