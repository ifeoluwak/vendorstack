/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {SearchBar} from '@rneui/themed';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {themeColors} from '../../constants/color';
import {isIos} from '../../helpers';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {Dispatch} from '../../redux/store';
import ToggleButtonBordered from '../../components/ToggleButton/ToggleButtonBordered';
import {mvs, s} from 'react-native-size-matters';
import BusinessSearchScreen from './BusinessSearch';
import ProductSearchScreen from './ProductSearch';

enum Section {
  VENDOR = 0,
  PRODUCTS = 1,
}

function SearchScreen({navigation}) {
  const [searchTxt, setSearchTxt] = React.useState('');

  const [activeBtn, setActiveBtn] = React.useState<Section>(Section.VENDOR);

  const updateSearch = (searchText: string) => {
    setSearchTxt(searchText);
  };

  React.useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColors.mazarine,
        flex: 1,
        paddingTop: isIos ? 0 : 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Button
          icon={{
            name: 'chevron-left',
            type: 'feather',
            size: 28,
            color: themeColors.white,
          }}
          type="clear"
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder="Search..."
          placeholderTextColor={themeColors.white}
          onChangeText={updateSearch}
          value={searchTxt}
          style={{width: '80%'}}
          autoCapitalize="none"
          containerStyle={styles.searchContainer}
          inputContainerStyle={{backgroundColor: themeColors.pico}}
          inputStyle={{fontSize: 14, color: themeColors.white}}
        />
      </View>

      <ToggleButtonBordered
        activeBtn={activeBtn}
        setActiveBtn={setActiveBtn}
        btns={['Vendors', 'Products']}
        style={{height: mvs(30), marginBottom: s(7), marginTop: s(10)}}
        textStyle={{fontWeight: 'normal'}}
        stickBorderRadius={10}
      />

      {activeBtn === Section.VENDOR ? (
        <BusinessSearchScreen searchTxt={searchTxt} />
      ) : (
        <></>
      )}
      {activeBtn === Section.PRODUCTS ? (
        <ProductSearchScreen searchTxt={searchTxt} />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
