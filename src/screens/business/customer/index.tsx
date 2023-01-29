import * as React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {ListItem, Button} from '@rneui/themed';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';

function BusinessCustomersScreen({navigation, route}) {
  const loading = useSelector((root: RootState) => root.loading.models.businessModel);
  const {customers} = useSelector((root: RootState) => root.businessModel);

  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Customers',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  React.useEffect(() => {
    dispatch.businessModel.getBusinessCustomers();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={styles.itemWrapper}>
        <FlatList
          data={customers}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              onPress={() =>
                navigation.navigate('BusinessCustomerDetail', {customer: item})
              }
              friction={90}
              tension={100}
              activeScale={0.95}
              onPressOut={() => {}}
              containerStyle={styles.listContainer}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.user.email}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  Orders: {item.orders.length}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color={themeColors.white} />
            </ListItem>
          )}
          contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
        />
      </View>
    </View>
  );
}

export default BusinessCustomersScreen;
