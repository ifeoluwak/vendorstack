import * as React from 'react';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {ListItem, Button, Icon, Input} from '@rneui/themed';
import CurrencyInput from 'react-native-currency-input';

import {themeColors} from '../../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../../redux/store';
import {styles} from './style';
import TouchableScale from 'react-native-touchable-scale';

function BusinessWalletWithdrawalsScreen({navigation}) {
  const [value, setValue] = React.useState('0.00');

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
        <>
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
                  Bank Account
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {bankAccount?.beneficiaryName}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {bankAccount?.beneficiaryAccountNo}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>

            <View style={{marginVertical: 20}} />

            <CurrencyInput
              value={value}
              onChangeValue={setValue}
              renderTextInput={textInputProps => (
                <Input
                  {...textInputProps}
                  placeholder="0.00"
                  label="Enter Amount"
                  labelStyle={{color: themeColors.white}}
                  placeholderTextColor={themeColors.white}
                  errorMessage={''}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                />
              )}
              delimiter=","
              separator="."
              precision={2}
            />
          </ScrollView>
          <View style={styles.btnView}>
            <Button
              title="Withdraw"
              titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
              buttonStyle={styles.btnStyle}
              radius={30}
              disabled={!value}
              onPress={() => {}}
            />
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

export default BusinessWalletWithdrawalsScreen;
