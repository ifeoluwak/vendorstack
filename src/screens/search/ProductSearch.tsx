/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Chip} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {useDebouncedEffect} from '../../hooks/useDebounce';
import {MasonryFlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

function ProductSearchScreen({searchTxt}: {searchTxt: string}) {
//   const [selectedCat, setSelectedCat] = React.useState('');

  const dispatch = useDispatch<Dispatch>();
  const navigation = useNavigation();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.generalModel.searchProducts,
  );
//   const {categories} = useSelector((root: RootState) => root.generalModel);
  const {productSearch} = useSelector((root: RootState) => root.generalModel);

  useDebouncedEffect(
    () => {
      if (searchTxt) {
        dispatch.generalModel.searchProducts({
          query: searchTxt,
        });
      } else {
        dispatch.generalModel.setState({productSearch: []});
      }
    },
    [searchTxt],
    1000,
  );

  return (
    <>
      {/* <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          paddingTop: 12,
          marginBottom: 10,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={({item}) => {
            const isSelected = item._id === selectedCat;
            return (
              <Chip
                key={item._id}
                title={item.name}
                type={isSelected ? 'solid' : 'outline'}
                color={themeColors.white}
                buttonStyle={{
                  borderColor: themeColors.pico,
                  borderWidth: 1,
                  backgroundColor: isSelected
                    ? themeColors.white
                    : themeColors.pico,
                }}
                onPress={() => setSelectedCat(isSelected ? '' : item._id)}
                titleStyle={{
                  color: isSelected ? themeColors.pico : themeColors.white,
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{width: 6}} />}
        />
      </View> */}

      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}

      <View style={styles.trendingContainer}>
        <MasonryFlashList
          data={productSearch}
          numColumns={3}
          renderItem={({item}) => (
            <View key={item._id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Vendor', {
                    id: item.business._id,
                    title: item.business.name,
                    product_id: item._id,
                  })
                }>
                <Image source={{uri: item.photo}} style={styles.item} />
              </TouchableOpacity>
            </View>
          )}
          estimatedItemSize={120}
        />
      </View>
    </>
  );
}

export default ProductSearchScreen;
