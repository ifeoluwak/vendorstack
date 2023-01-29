import {useNavigation} from '@react-navigation/native';
import {Avatar, ListItem} from '@rneui/themed';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {useSelector} from 'react-redux';
import {themeColors} from '../constants/color';
import {RootState} from '../redux/store';
import HomeSectionHeader from './HomeSectionHeader';

function HomeTopRatedVendor() {
  const navigation = useNavigation();

  const {toprated_vendors} = useSelector(
    (root: RootState) => root.generalModel,
  );

  return (
    <View style={{width: '100%', marginTop: 30}}>
      <HomeSectionHeader title="Top rated Vendors" />
      <FlatList
        data={toprated_vendors}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            onPress={() =>
              navigation.navigate('Vendor', {
                id: item.id,
                title: item.name,
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
    padding: 0,
    overflow: 'hidden',
  },
  contentContainerStyle: {
    paddingLeft: 10,
    paddingTop: 10,
    flexGrow: 1,
  },
});

export default HomeTopRatedVendor;
