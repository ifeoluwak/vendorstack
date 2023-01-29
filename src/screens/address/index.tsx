import * as React from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {ListItem, Button, Icon, CheckBox} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';

function AddressScreen({navigation, route}) {
  const loading = useSelector(
    (root: RootState) => root.loading.effects.userModel.getUserAddresses,
  );
  const {addresses, defaultAddress} = useSelector(
    (root: RootState) => root.userModel,
  );

  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    navigation.setOptions({
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  React.useEffect(() => {
    dispatch.userModel.getUserAddresses();
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
          data={addresses}
          renderItem={({item}) => (
            <ListItem
              Component={TouchableScale}
              onPress={() =>
                dispatch.userModel.setState({defaultAddress: item})
              }
              friction={90}
              tension={100}
              activeScale={0.95}
              containerStyle={styles.listContainer}>
              {defaultAddress?.id === item.id ? (
                <Icon name="check" type="feather" color={themeColors.white} />
              ) : (
                <Icon name="circle" type="feather" color={themeColors.white} />
              )}
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.address}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.name} | {item.phone}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                name="trash"
                type="feather"
                color={themeColors.nasturcian}
                onPress={() => dispatch.userModel.deleteAddress(item)}
              />
            </ListItem>
          )}
          contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
        />
      </View>

      <View style={styles.btnView}>
        <Button
          title="Add New"
          titleStyle={{fontWeight: 'bold'}}
          buttonStyle={styles.btnStyle}
          radius={30}
          onPress={() => navigation.navigate('AddAddress')}
        />
      </View>
    </View>
  );
}

export default AddressScreen;
