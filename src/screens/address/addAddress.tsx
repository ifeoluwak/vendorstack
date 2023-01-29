import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Dispatch, RootState} from '../../redux/store';
import {themeColors} from '../../constants/color';
import {Button, Input, Text} from '@rneui/themed';
import {styles} from './style';
import {DropDownFlatlist} from '../../components/DropDown';
import {useStateAndLga} from '../../hooks/useStateAndLga';

const AddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  state: Yup.string().required('Required'),
  lga: Yup.string().required('Required'),
  phone: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string(),
});

const AddAddressScreen = ({navigation}) => {
  const dispatch = useDispatch<Dispatch>();

  const [state, setState] = useState('');
  const [stateDropDown, setStateDropDown] = useState(false);
  const [lgaDropDown, setLgaDropDown] = useState(false);

  const loading = useSelector(
    (root: RootState) => root.loading.effects.userModel.createAddress,
  );

  const {states, lgas} = useStateAndLga(state);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'New Address',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Formik
        initialValues={{address: '', phone: '', name: '', state: '', lga: ''}}
        validationSchema={AddressSchema}
        onSubmit={async values => {
          const success = await dispatch.userModel.createAddress(values);
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
                placeholder="Address"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
                errorMessage={errors.address}
                renderErrorMessage={touched.address}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <View style={styles.dropDownState}>
                <TouchableOpacity
                  onPress={() => setStateDropDown(!stateDropDown)}
                  style={styles.btnDropDown}>
                  <Text style={styles.btnDropDownText}>
                    {values.state ? values.state : 'State'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.customErrorText}>{errors.state}</Text>

                {stateDropDown && (
                  <DropDownFlatlist
                    data={states}
                    onSelect={data => {
                      handleChange('state')(data);
                      setStateDropDown(false);
                      console.log(data);
                      setState(data);
                    }}
                  />
                )}
              </View>
              <View style={styles.dropDownLga}>
                <TouchableOpacity
                  onPress={() => setLgaDropDown(!lgaDropDown)}
                  style={styles.btnDropDown}>
                  <Text style={styles.btnDropDownText}>
                    {values.lga ? values.lga : 'LGA'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.customErrorText}>{errors.lga}</Text>

                {lgaDropDown && (
                  <DropDownFlatlist
                    data={lgas}
                    onSelect={data => {
                      handleChange('lga')(data);
                      setLgaDropDown(false);
                    }}
                  />
                )}
              </View>
              <Input
                placeholder="Phone"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                errorMessage={errors.phone}
                renderErrorMessage={touched.phone}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <Input
                placeholder="Name (Optional)"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                errorMessage={errors.name}
                renderErrorMessage={touched.name}
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

export default AddAddressScreen;
