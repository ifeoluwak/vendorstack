/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Button, Chip, Icon} from '@rneui/themed';
import {SearchBar} from '@rneui/themed';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {themeColors} from '../../constants/color';
import {isIos} from '../../helpers';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {useDebouncedEffect} from '../../hooks/useDebounce';
import {MasonryFlashList} from '@shopify/flash-list';

function SearchScreen({navigation}) {
  const [search, setSearch] = React.useState('');
  const [selectedCat, setSelectedCat] = React.useState('');

  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.generalModel.getCategories ||
      root.loading.effects.vendorModel.searchVendors,
  );
  const {categories, trending_products} = useSelector(
    (root: RootState) => root.generalModel,
  );
  const {searchResult} = useSelector((root: RootState) => root.vendorModel);

  useDebouncedEffect(
    () => {
      if (search || selectedCat) {
        dispatch.vendorModel.searchVendors({
          category: selectedCat,
          query: search,
        });
      } else {
        dispatch.vendorModel.setState({searchResult: []});
      }
    },
    [selectedCat, search],
    1000,
  );

  const updateSearch = (searchText: string) => {
    setSearch(searchText);
  };

  React.useEffect(() => {
    dispatch.generalModel.getCategories();
    dispatch.generalModel.getTrendingProducts();
  }, [dispatch.generalModel]);

  React.useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  const {top} = useSafeAreaInsets();

  console.log(top);

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
          placeholder="@username | name"
          placeholderTextColor={themeColors.white}
          onChangeText={updateSearch}
          value={search}
          style={{width: '80%'}}
          autoCapitalize={false}
          containerStyle={styles.searchContainer}
          inputContainerStyle={{backgroundColor: themeColors.pico}}
          inputStyle={{fontSize: 14, color: themeColors.white}}
        />
      </View>

      <View
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
            const isSelected = item.slug === selectedCat;
            return (
              <Chip
                key={item.slug}
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
                onPress={() => setSelectedCat(isSelected ? '' : item.slug)}
                titleStyle={{
                  color: isSelected ? themeColors.pico : themeColors.white,
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{width: 6}} />}
        />
      </View>

      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}

      <View style={{width: '100%', paddingHorizontal: 10}}>
        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              onPress={() =>
                navigation.navigate('Vendor', {id: item.id, title: item.name})
              }
              containerStyle={{
                backgroundColor: 'transparent',
              }}>
              <Avatar
                rounded
                source={{
                  uri: item.url,
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{color: themeColors.white, fontWeight: 'bold'}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: themeColors.white}}>
                  @{item.ig_username}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color={themeColors.white} />
            </ListItem>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{paddingTop: 20}}
        />
      </View>

      {!searchResult.length ? (
        <View style={styles.trendingContainer}>
          <MasonryFlashList
            data={trending_products}
            numColumns={3}
            renderItem={({item}) => (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Vendor', {
                      id: item.business.id,
                      title: item.business.name,
                      product_id: item.id,
                    })
                  }>
                  <Image source={{uri: item.url}} style={styles.item} />
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={120}
          />
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
