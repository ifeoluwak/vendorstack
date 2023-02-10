import * as React from 'react';
import {View, FlatList, Alert, ActivityIndicator, RefreshControl} from 'react-native';
import {ListItem, Button, Icon, CheckBox, Avatar} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';

function BusinessProductsScreen({navigation, route}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.businessModel.getBusinessProducts,
  );
  const {products} = useSelector((root: RootState) => root.businessModel);

  const dispatch = useDispatch<Dispatch>();

  const onRefresh = () => {
    dispatch.businessModel.getBusinessProducts();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Products',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  React.useEffect(() => {
    onRefresh();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={styles.itemWrapper}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              onPress={() =>
                navigation.navigate('BusinessProductDetail', {product: item})
              }
              friction={90}
              tension={100}
              activeScale={0.95}
              onPressOut={() => {}}
              containerStyle={styles.listContainer}>
              <Avatar
                rounded
                source={{
                  uri: item.photo,
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  Price: {item.sellingPrice}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={[styles.listSubTitle]}>
                  In stock: {item.quantity}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color={themeColors.white} />
            </ListItem>
          )}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 100,
            flexGrow: 1,
          }}
        />
      </View>

      <View style={styles.btnView}>
        <Button
          title="Add New"
          titleStyle={{fontWeight: 'bold'}}
          buttonStyle={styles.btnStyle}
          radius={30}
          onPress={() => navigation.navigate('BusinessAddProduct')}
        />
      </View>
    </View>
  );
}

export default BusinessProductsScreen;
