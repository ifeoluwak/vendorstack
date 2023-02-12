import * as React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar} from '@rneui/themed';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../constants/color';
import {RootState} from '../redux/store';
import HomeSectionHeader from './HomeSectionHeader';

function HomeVendors() {
  const navigation = useNavigation();
  const {homeVendors} = useSelector((root: RootState) => root.vendorModel);

  if (!homeVendors?.length) {
    return null;
  }

  return (
    <View style={{width: '100%', marginBottom: 30}}>
      <HomeSectionHeader title="Vendors you follow" />
      <FlatList
        data={homeVendors}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            onPress={() =>
              navigation.navigate('Vendor', {
                id: item._id,
                title: item.name,
              })
            }
            containerStyle={styles.listContainerStyle}>
            <ListItem.Content>
              <Avatar
                size="xlarge"
                source={{
                  uri: item.logo,
                }}
              />
              <ListItem.Title
                style={{
                  color: themeColors.pico,
                  fontSize: 12,
                  paddingVertical: 8,
                  paddingLeft: 5,
                }}>
                {item.name}
              </ListItem.Title>
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
    backgroundColor: themeColors.white,
    // maxHeight: 120,
    padding: 0,
    overflow: 'hidden',
  },
  contentContainerStyle: {
    paddingTop: 10,
    paddingLeft: 10,
    flexGrow: 1,
    // width: '100%',
  },
});

export default HomeVendors;
