import {StyleSheet} from 'react-native';
import {themeColors} from '../../constants/color';

export const styles = StyleSheet.create({
  headerTitle: {
    color: themeColors.white,
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeColors.mazarine,
    paddingTop: 10,
  },
  listContainerStyle: {
    borderRadius: 10,
    backgroundColor: themeColors.pico,
    maxHeight: 120,
  },
  contentContainerStyle: {
    paddingTop: 10,
    flexGrow: 1,
    width: '100%',
  },
});
