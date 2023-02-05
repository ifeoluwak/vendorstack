import {ScrollView, View} from 'react-native';
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
import {Avatar, Button, CheckBox, Input} from '@rneui/themed';
import {styles} from './style';

const BusinessSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  address: Yup.string().min(5, 'Too Short!').required('Required'),
  pre_order_notice: Yup.string().min(5, 'Too Short!'),
  post_order_notice: Yup.string().min(5, 'Too Short!'),
  biography: Yup.string()
    .min(5, 'Too Short!')
    .max(150, 'Too long')
    .required('Required'),
  phone: Yup.string()
    .min(5, 'Too Short!')
    .max(14, 'Too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  website: Yup.string().url('Invalid link'),
});

const BusinessProfileScreen = ({navigation}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.models.businessModel,
  );

  const {profile} = useSelector((root: RootState) => root.userModel);

  const {business} = profile?.user;

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Business',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  const handleImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 1000,
      maxWidth: 800,
    });
    setImage(result);
  };

  if (!business) {
    return <></>;
  }

  return (
    <Formik
      initialValues={{
        name: business?.name || '',
        email: business?.email || '',
        address: business?.address || '',
        phone: business?.phone || '',
        biography: business?.biography || '',
        pre_order_notice: business?.pre_order_notice || '',
        post_order_notice: business?.post_order_notice || '',
        // category: business?.category || '',
        website: business?.website || '',
      }}
      validationSchema={BusinessSchema}
      onSubmit={async values => {
        const form = new FormData();
        form.append('id', business.id);
        form.append('name', values.name);
        form.append('email', values.email);
        form.append('address', values.address);
        form.append('biography', values.biography);
        form.append('phone', values.phone);
        form.append('website', values.website);
        // form.append('category', values.category);
        form.append('pre_order_notice', values.pre_order_notice);
        form.append('post_order_notice', values.post_order_notice);
        if (image?.assets?.[0]) {
          form.append('image', {
            uri: image?.assets?.[0].uri,
            name: image?.assets?.[0].fileName,
            type: image?.assets?.[0].type,
          });
        }
        const success = await dispatch.businessModel.updateBusinessProfile(form);
        if (success) {
          navigation.goBack();
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
                      uri: image ? image?.assets?.[0]?.uri : business.url,
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Input
                    placeholder="Email"
                    label="Email"
                    placeholderTextColor={themeColors.white}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={errors.email}
                    renderErrorMessage={touched.email}
                    inputStyle={{color: themeColors.white}}
                    inputContainerStyle={{borderColor: themeColors.white}}
                    containerStyle={{flex: 4}}
                    autoCapitalize="none"
                    keyboardType="decimal-pad"
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
                    keyboardType="decimal-pad"
                  />
                </View>
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
                  autoCapitalize="none"
                />
                <Input
                  placeholder="Biography"
                  label="Biography"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('biography')}
                  onBlur={handleBlur('biography')}
                  value={values.biography}
                  multiline
                  errorMessage={errors.biography}
                  renderErrorMessage={touched.biography}
                  inputStyle={{color: themeColors.white, height: 90}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                />
                <Input
                  placeholder="Pre order notice"
                  label="Pre order notice"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('pre_order_notice')}
                  onBlur={handleBlur('pre_order_notice')}
                  value={values.pre_order_notice}
                  multiline
                  errorMessage={errors.pre_order_notice}
                  renderErrorMessage={touched.pre_order_notice}
                  inputStyle={{color: themeColors.white, height: 90}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                />
                <Input
                  placeholder="Post order notice"
                  label="Post order notice"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('post_order_notice')}
                  onBlur={handleBlur('post_order_notice')}
                  value={values.post_order_notice}
                  multiline
                  errorMessage={errors.post_order_notice}
                  renderErrorMessage={touched.post_order_notice}
                  inputStyle={{color: themeColors.white, height: 90}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                />
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
              <View style={{height: 50}} />
            </View>
          </ScrollView>
          <View style={styles.btnView}>
            <Button
              title={'Save'}
              titleStyle={{color: themeColors.white, fontWeight: 'bold'}}
              buttonStyle={{backgroundColor: themeColors.pico, width: '100%'}}
              size="lg"
              radius={7}
              disabled={!isValid || loading}
              disabledStyle={{backgroundColor: themeColors.pico}}
              loading={loading}
              onPress={handleSubmit}
            />
          </View>
        </>
      )}
    </Formik>
  );
};

export default BusinessProfileScreen;
