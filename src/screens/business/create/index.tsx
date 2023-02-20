import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {StackActions} from '@react-navigation/native';

import {Dispatch, RootState} from '../../../redux/store';
import {themeColors} from '../../../constants/color';
import {Avatar, Button, Input, Text} from '@rneui/themed';
import {styles} from './style';
import {DropDownFlatlist} from '../../../components/DropDown';
import {useStateAndLga} from '../../../hooks/useStateAndLga';
import {Category} from '../../../types/general';

const BusinessSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(150, 'Too Long!')
    .required('Required'),
  phone: Yup.string()
    .min(1, 'Too Short!')
    .max(11, 'Too Long!')
    .required('Required'),
  website: Yup.string().url('Enter a valid url'),
  state: Yup.string().required('Enter a state'),
  orderNoticeInfo: Yup.string(),
  address: Yup.string(),
  category: Yup.string().required('Required'),
});

const BusinessCreateScreen = ({navigation}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [state, setState] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [stateDropDown, setStateDropDown] = useState(false);
  const [catDropDown, setCatDropDown] = useState(false);

  const dispatch = useDispatch<Dispatch>();

  const {states} = useStateAndLga(state);

  const loading = useSelector(
    (root: RootState) => root.loading.models.businessModel,
  );

  const {categories} = useSelector((root: RootState) => root.generalModel);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Create Business',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (!categories.length) {
      dispatch.generalModel.getCategories();
    }
  }, [categories, dispatch.generalModel]);

  const handleImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      maxHeight: 350,
      maxWidth: 350,
      includeBase64: true,
    });
    setImage(result);
  };

  return (
    <Formik
      initialValues={{
        name: 'Yahoo Shop',
        logo: '',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
        website: 'https://www.google.com',
        phone: '09029601481',
        country: 'NG',
        state: '',
        address: '',
        postalCode: '',
        category: '',
        socialUsername: 'yahooshop',
        socialAccountId: '17841431289134915',
        socialAccountUserId: '134978675987913',
        socialType: 'INSTAGRAM',
        orderNoticeInfo: '',
      }}
      validationSchema={BusinessSchema}
      onSubmit={async values => {
        const success = await dispatch.businessModel.createBusiness({
          ...values,
          categories: [category?._id],
          logo: 'data:image/png;base64,' + image?.assets?.[0]?.base64 || '',
        });
        if (success) {
          //   navigation.goBack();
          navigation.dispatch(StackActions.replace('BusinessMore'));
        }
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isValid,
        touched,
        errors,
        values,
      }) => (
        <>
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
            <View style={styles.container}>
              <View style={{height: 30}} />
              <View style={{paddingHorizontal: 10, width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    source={{
                      uri: image ? image?.assets?.[0]?.uri : null,
                    }}
                    containerStyle={{backgroundColor: 'grey'}}>
                    <Avatar.Accessory
                      size={34}
                      onPress={handleImage}
                      color={themeColors.pico}
                      style={{backgroundColor: themeColors.white}}
                    />
                  </Avatar>
                </View>
                <View style={{height: 30}} />
                <Input
                  placeholder="Name"
                  label="Name"
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
                <Input
                  placeholder="Phone"
                  label="Phone"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  errorMessage={errors.phone}
                  renderErrorMessage={touched.phone}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  containerStyle={{flex: 4}}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
                <Input
                  placeholder="Website"
                  label="Website"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('website')}
                  onBlur={handleBlur('website')}
                  value={values.website}
                  errorMessage={errors.website}
                  renderErrorMessage={touched.website}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  containerStyle={{flex: 4}}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
                <Input
                  //   placeholder="Description"
                  label="Description"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  multiline
                  errorMessage={errors.description}
                  renderErrorMessage={touched.description}
                  inputStyle={{color: themeColors.white, height: 90}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                />
                <Input
                  //   placeholder="Customer Notice"
                  label="Customer Notice"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('orderNoticeInfo')}
                  onBlur={handleBlur('orderNoticeInfo')}
                  value={values.orderNoticeInfo}
                  multiline
                  errorMessage={errors.orderNoticeInfo}
                  renderErrorMessage={touched.orderNoticeInfo}
                  inputStyle={{color: themeColors.white, height: 90}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                />
                <Input
                  placeholder="Address"
                  label="Address"
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

                <View style={styles.dropDownCategory}>
                  <TouchableOpacity
                    onPress={() => setCatDropDown(!catDropDown)}
                    style={styles.btnDropDown}>
                    <Text style={styles.btnDropDownText}>
                      {category?.name ? category.name : 'Select a category'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.customErrorText}>{errors.category}</Text>

                  {catDropDown && (
                    <DropDownFlatlist
                      data={categories}
                      onSelect={data => {
                        handleChange('category')(data._id);
                        setCatDropDown(false);
                        console.log(data);
                        setCategory(data);
                      }}
                    />
                  )}
                </View>

                <View style={{height: 50}} />
                <Button
                  title={'Save'}
                  titleStyle={{color: themeColors.white, fontWeight: 'bold'}}
                  buttonStyle={{
                    backgroundColor: themeColors.pico,
                    width: '100%',
                  }}
                  size="lg"
                  radius={7}
                  disabled={!isValid || loading || !image}
                  disabledStyle={{backgroundColor: themeColors.pico}}
                  loading={loading}
                  onPress={handleSubmit}
                />
              </View>
              {/* <View style={{alignItems: 'flex-start'}}>
                  <CheckBox
                    center
                    title="Is Active"
                    textStyle={{color: themeColors.white}}
                    checked={values.active}
                    onPress={() => setFieldValue('active', !values.active)}
                    containerStyle={{backgroundColor: 'transparent'}}
                    checkedColor={themeColors.white}
                  />
                  <CheckBox
                    center
                    title="Out of stock"
                    textStyle={{color: themeColors.white}}
                    checked={values.out_of_stock}
                    onPress={() =>
                      setFieldValue('out_of_stock', !values.out_of_stock)
                    }
                    containerStyle={{backgroundColor: 'transparent'}}
                    checkedColor={themeColors.white}
                  />
                </View> */}
            </View>
          </ScrollView>
          {/* <View style={styles.btnView}>
            <Button
              title={'Save'}
              titleStyle={{color: themeColors.white, fontWeight: 'bold'}}
              buttonStyle={{backgroundColor: themeColors.pico, width: '100%'}}
              size="lg"
              radius={7}
              disabled={!isValid || loading || !image}
              disabledStyle={{backgroundColor: themeColors.pico}}
              loading={loading}
              onPress={handleSubmit}
            />
          </View> */}
        </>
      )}
    </Formik>
  );
};

export default BusinessCreateScreen;
