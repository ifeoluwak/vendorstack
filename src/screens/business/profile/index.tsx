import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';

import {Dispatch, RootState} from '../../../redux/store';
import {themeColors} from '../../../constants/color';
import {Avatar, Button, Input, Text} from '@rneui/themed';
import {styles} from './style';
import {DropDownFlatlist} from '../../../components/DropDown';
import {useStateAndLga} from '../../../hooks/useStateAndLga';
import {Vendor} from '../../../types/vendor';

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
});

const BusinessProfileScreen = ({navigation}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const [state, setState] = useState('');
  const [stateDropDown, setStateDropDown] = useState(false);

  const dispatch = useDispatch<Dispatch>();

  const {states} = useStateAndLga(state);

  const loading = useSelector(
    (root: RootState) => root.loading.models.businessModel,
  );

  const {categories} = useSelector((root: RootState) => root.generalModel);
  const {
    user: {businesses, _id},
  } = useSelector((root: RootState) => root.userModel);

  useEffect(() => {
    navigation.setOptions({
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

  const business: Vendor = businesses[0];

  return (
    <Formik
      initialValues={{
        _id: business?._id,
        name: business?.name || '',
        description: business.description || '',
        website: business?.website || '',
        phone: business?.phone || '',
        country: business?.country || '',
        state: business?.state || '',
        address: business?.address || '',
        postalCode: business?.postalCode || '',
        socialUsername: business?.socialUsername || '',
        socialAccountId: '17841431289134915',
        socialAccountUserId: '134978675987913',
        socialType: 'INSTAGRAM',
        orderNoticeInfo: business?.orderNoticeInfo || '',
        userId: _id,
      }}
      validationSchema={BusinessSchema}
      onSubmit={async values => {
        if (image?.assets?.[0]?.base64) {
          values.logo = 'data:image/png;base64,' + image?.assets?.[0]?.base64;
        }

        const success = await dispatch.businessModel.updateBusiness({
          ...values,
          categories: [business?.categories?.[0]?._id],
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
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
            <View style={styles.container}>
              <View style={{height: 30}} />
              <View style={{paddingHorizontal: 10, width: '100%'}}>
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    size="xlarge"
                    rounded
                    source={{
                      uri: image ? image?.assets?.[0]?.uri : business.logo,
                    }}
                    containerStyle={{backgroundColor: 'grey'}}>
                    <Avatar.Accessory
                      size={34}
                      onPress={handleImage}
                      color={themeColors.pico}
                      style={{backgroundColor: themeColors.white}}
                    />
                  </Avatar>
                  {image ? (
                    <Button
                      title="Revert"
                      type="clear"
                      titleStyle={{color: themeColors.white}}
                      icon={{
                        name: 'corner-up-left',
                        type: 'feather',
                        size: 15,
                        color: 'white',
                      }}
                      onPress={() => setImage(null)}
                      iconContainerStyle={{marginRight: 10}}
                    />
                  ) : (
                    <></>
                  )}
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
                  placeholder="Category"
                  label="Category"
                  placeholderTextColor={themeColors.white}
                  value={business?.categories?.[0]?.name}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  containerStyle={{flex: 4}}
                  editable={false}
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
                  disabled={!isValid || loading}
                  disabledStyle={{backgroundColor: themeColors.pico}}
                  loading={loading}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </Formik>
  );
};

export default BusinessProfileScreen;
