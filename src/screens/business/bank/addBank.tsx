import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Dispatch, RootState} from '../../../redux/store';
import {themeColors} from '../../../constants/color';
import {Button, Input, Text} from '@rneui/themed';
import {styles} from './style';
import {DropDownFlatlist} from '../../../components/DropDown';
import {Bank} from '../../../types/general';

const BankAccountSchema = Yup.object().shape({
  bankName: Yup.string().required('Required'),
  beneficiaryName: Yup.string().required('Required'),
  beneficiaryAccountNo: Yup.string()
    .min(10, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
});

const AddBankAccountScreen = ({navigation}) => {
  const dispatch = useDispatch<Dispatch>();

  const [banks, setBanks] = useState<Bank[]>([]);
  const [bank, setBank] = useState<Bank | null>(null);
  const [bankDropDown, setBankDropDown] = useState(false);

  const loading = useSelector(
    (root: RootState) => root.loading.effects.walletModel.createBankAccount,
  );

  const loadBanks = async () => {
    const res = await fetch('https://api.paystack.co/bank?currency=NGN');
    const {data} = await res.json();
    setBanks(data);
  };

  React.useEffect(() => {
    loadBanks();
  }, []);

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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={{
          bankName: '',
          bankCode: '',
          bankAddress: '',
          beneficiaryName: '',
          beneficiaryAccountNo: '',
          swiftCodeOrBic: '',
          routingOrSortNo: '',
        }}
        validationSchema={BankAccountSchema}
        onSubmit={async values => {
          const success = await dispatch.walletModel.createBankAccount({
            ...values,
            bankCode: bank?.code,
          });
          if (success) {
            navigation.goBack();
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          touched,
          errors,
          values,
        }) => (
          <View style={styles.container}>
            <View style={{height: 50}} />
            <View style={{paddingHorizontal: 10, width: '100%'}}>
              <Input
                placeholder="Account Name"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('beneficiaryName')}
                onBlur={handleBlur('beneficiaryName')}
                value={values.beneficiaryName}
                errorMessage={errors.beneficiaryName}
                renderErrorMessage={touched.beneficiaryName}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <Input
                placeholder="Account No."
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('beneficiaryAccountNo')}
                onBlur={handleBlur('beneficiaryAccountNo')}
                value={values.beneficiaryAccountNo}
                errorMessage={errors.beneficiaryAccountNo}
                renderErrorMessage={touched.beneficiaryAccountNo}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <View style={styles.dropDownState}>
                <TouchableOpacity
                  onPress={() => setBankDropDown(!bankDropDown)}
                  style={styles.btnDropDown}>
                  <Text style={styles.btnDropDownText}>
                    {values.bankName ? values.bankName : 'Bank Name'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.customErrorText}>{errors.bankName}</Text>

                {bankDropDown && (
                  <DropDownFlatlist
                    data={banks}
                    onSelect={data => {
                      handleChange('bankName')(data.name);
                      setBankDropDown(false);
                      console.log(data);
                      setBank(data);
                    }}
                  />
                )}
              </View>
              <Input
                placeholder="SwiftCode/Bic (Optional)"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('swiftCodeOrBic')}
                onBlur={handleBlur('swiftCodeOrBic')}
                value={values.swiftCodeOrBic}
                errorMessage={errors.swiftCodeOrBic}
                renderErrorMessage={touched.swiftCodeOrBic}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <Input
                placeholder="Routing/SortNo. (Optional)"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('routingOrSortNo')}
                onBlur={handleBlur('routingOrSortNo')}
                value={values.routingOrSortNo}
                errorMessage={errors.routingOrSortNo}
                renderErrorMessage={touched.routingOrSortNo}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
            </View>
            <View style={{height: 50}} />
            <View style={styles.btnView}>
              <Button
                title={'Continue'}
                buttonStyle={{backgroundColor: themeColors.pico, width: '100%'}}
                size="lg"
                radius={7}
                disabled={!isValid || loading}
                disabledStyle={{backgroundColor: themeColors.pico}}
                loading={loading}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddBankAccountScreen;
