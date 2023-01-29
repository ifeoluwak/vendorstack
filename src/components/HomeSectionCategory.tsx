import {useNavigation} from '@react-navigation/native';
import {MasonryFlashList} from '@shopify/flash-list';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {themeColors} from '../constants/color';
import {clothing, fashion} from '../constants/images';
import {Dispatch, RootState} from '../redux/store';

function HomeSectionCategory() {
  const navigation = useNavigation();

  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    dispatch.generalModel.getCategories();
  }, []);

  const {categories} = useSelector((root: RootState) => root.generalModel);

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={categories}
        numColumns={4}
        renderItem={({item}) => (
          <View key={item.id}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                //   navigation.navigate('Vendor', {
                //     id: item.business.id,
                //     title: item.business.name,
                //     product_id: item.id,
                //   });
              }}>
              <Image source={fashion} style={styles.item} />
              <Text numberOfLines={1} style={styles.title}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    paddingHorizontal: 10,
    marginTop: 30,
    minHeight: 300,
  },
  item: {
    // aspectRatio: 1,
    height: 50,
    width: 50,
    marginBottom: 10,
    alignSelf: 'center',
    tintColor: themeColors.white,
    // width: '100%',
    // flex: 1,
  },
  btn: {
    backgroundColor: themeColors.pico,
    borderRadius: 7,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 10,
    color: themeColors.white,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default HomeSectionCategory;
