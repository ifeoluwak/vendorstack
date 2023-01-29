import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from '@rneui/themed';
import {MasonryFlashList} from '@shopify/flash-list';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {useSelector} from 'react-redux';
import {themeColors} from '../constants/color';
import {RootState} from '../redux/store';
import HomeSectionHeader from './HomeSectionHeader';

function PromotedProductList() {
  const navigation = useNavigation();

  const {trending_products} = useSelector(
    (root: RootState) => root.generalModel,
  );

  return (
    <View style={styles.container}>
      <HomeSectionHeader title="Promoted" />
      <View style={{ marginTop: 10 }} />
      <MasonryFlashList
        data={trending_products}
        numColumns={4}
        renderItem={({item}) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            onPress={() =>
              navigation.navigate('Vendor', {
                id: item.business.id,
                title: item.business.name,
                product_id: item.id,
              })
            }
            containerStyle={styles.btn}>
            <ListItem.Content>
              <Avatar
                source={{
                  uri: item.url,
                }}
                size="large"
                avatarStyle={{ width: '100%' }}
                containerStyle={{ width: '100%' }}
              />
            </ListItem.Content>
          </ListItem>
        )}
        estimatedItemSize={90}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    // marginBottom: 30,
    minHeight: 100,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  item: {
    height: 50,
    width: 50,
    marginBottom: 10,
    alignSelf: 'center',
    tintColor: themeColors.white,
  },
  btn: {
    backgroundColor: themeColors.pico,
    borderRadius: 7,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 0,
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

export default PromotedProductList;
