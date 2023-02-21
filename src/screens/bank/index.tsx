import * as React from 'react';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {ListItem, Button, Icon} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';

function BankAccountScreen({navigation}) {
  const loading = useSelector(
    (root: RootState) => root.loading.models.walletModel,
  );
  const {bankAccount} = useSelector((root: RootState) => root.walletModel);

  const dispatch = useDispatch<Dispatch>();

  React.useEffect(() => {
    dispatch.walletModel.getBankAccount();
  }, [dispatch]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      {bankAccount ? (
        <ScrollView style={styles.itemWrapper}>
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            containerStyle={styles.listContainer}>
            <Icon name="check" type="feather" color={themeColors.white} />
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                {bankAccount?.beneficiaryName}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listSubTitle}>
                {bankAccount?.beneficiaryAccountNo}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
              name="trash"
              type="feather"
              color={themeColors.nasturcian}
              onPress={() =>
                dispatch.walletModel.deleteBankAccount(bankAccount?._id!)
              }
            />
          </ListItem>
        </ScrollView>
      ) : (
        <View style={styles.btnView}>
          <Button
            title="Add Bank Account"
            titleStyle={{fontWeight: 'bold'}}
            buttonStyle={styles.btnStyle}
            radius={30}
            onPress={() => navigation.navigate('AddBankAccount')}
          />
        </View>
      )}
    </View>
  );
}

export default BankAccountScreen;
