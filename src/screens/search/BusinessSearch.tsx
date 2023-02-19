/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Chip} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {useDebouncedEffect} from '../../hooks/useDebounce';
import {useNavigation} from '@react-navigation/native';

function BusinessSearchScreen({searchTxt}: {searchTxt: string}) {
  const [selectedCat, setSelectedCat] = React.useState<String[]>([]);

  const dispatch = useDispatch<Dispatch>();
  const navigation = useNavigation();

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.generalModel.getCategories ||
      root.loading.effects.vendorModel.searchVendors,
  );
  const {categories} = useSelector((root: RootState) => root.generalModel);
  const {searchResult} = useSelector((root: RootState) => root.vendorModel);

  useDebouncedEffect(
    () => {
      if (searchTxt || selectedCat.length) {
        console.log({searchTxt,selectedCat });
        dispatch.vendorModel.searchVendors({
          category: selectedCat?.join(','),
          query: searchTxt,
        });
      } else {
        dispatch.vendorModel.setState({searchResult: []});
      }
    },
    [searchTxt, selectedCat],
    1000,
  );

  React.useEffect(() => {
    dispatch.generalModel.getCategories();
  }, [dispatch.generalModel]);

  const handleCategorySelect = (isSelected: boolean, id: string) => {
    if (isSelected) {
      setSelectedCat(selectedCat.filter(c => c !== id));
    } else {
      setSelectedCat([...selectedCat, id]);
    }
  };

  return (
    <>
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
            const isSelected = selectedCat.includes(item._id);
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
                onPress={() => handleCategorySelect(isSelected, item._id)}
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
                navigation.navigate('Vendor', {id: item._id, title: item.name})
              }
              containerStyle={{
                backgroundColor: 'transparent',
              }}>
              <Avatar
                rounded
                source={{
                  uri: item.logo,
                }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{color: themeColors.white, fontWeight: 'bold'}}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{color: themeColors.white}}>
                  @{item.socialUsername}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color={themeColors.white} />
            </ListItem>
          )}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{paddingTop: 20}}
        />
      </View>
    </>
  );
}

export default BusinessSearchScreen;
