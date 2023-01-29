import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from '@rneui/themed';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {useSelector} from 'react-redux';
import {themeColors} from '../constants/color';
import {RootState} from '../redux/store';
import HomeSectionHeader from './HomeSectionHeader';

function HomeTrendingProduct() {
  const navigation = useNavigation();

  const {trending_products} = useSelector(
    (root: RootState) => root.generalModel,
  );

  return (
    <View style={{width: '100%', marginTop: 30}}>
      <HomeSectionHeader title="Trending Products" />
      <FlatList
        data={trending_products}
        showsHorizontalScrollIndicator={false}
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
            containerStyle={styles.listContainerStyle}>
            <ListItem.Content>
              <Avatar
                size="xlarge"
                source={{
                  uri: item.url,
                }}
              />
            </ListItem.Content>
          </ListItem>
        )}
        horizontal
        ItemSeparatorComponent={() => <View style={{width: 10}} />}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 0,
    overflow: 'hidden',
  },
  contentContainerStyle: {
    paddingLeft: 10,
    paddingTop: 10,
    flexGrow: 1,
  },
});

export default HomeTrendingProduct;
