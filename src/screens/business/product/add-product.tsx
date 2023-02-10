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
import {Product} from '../../../types/product';

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  costPrice: Yup.string()
    .min(1, 'Add cost price')
    .max(9, 'Too Long!')
    .required('Required'),
  sellingPrice: Yup.string()
    .min(1, 'Add selling price')
    .max(9, 'Too Long!')
    .required('Required'),
  quantity: Yup.string()
    .min(1, 'Add Quantity')
    .max(5, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(4, 'Add Description')
    .max(200, 'Too Long!')
    .required('Required'),
});

const BusinessAddProductScreen = ({navigation, route}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.models.businessModel,
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'New Product',
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
      maxHeight: 400,
      maxWidth: 650,
      includeBase64: true,
    });
    setImage(result);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        costPrice: '',
        sellingPrice: '',
        description: '',
        quantity: '1',
      }}
      validationSchema={ProductSchema}
      onSubmit={async values => {
        const success = await dispatch.businessModel.addProduct({
          ...values,
          costPrice: +values.costPrice,
          sellingPrice: +values.sellingPrice,
          quantity: +values.quantity,
          photo: 'data:image/png;base64,' + image?.assets?.[0]?.base64 || '',
        });
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
                  placeholder="Description"
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Input
                    placeholder="0"
                    label="Selling Price"
                    placeholderTextColor={themeColors.white}
                    onChangeText={handleChange('sellingPrice')}
                    onBlur={handleBlur('sellingPrice')}
                    value={values.sellingPrice}
                    errorMessage={errors.sellingPrice}
                    renderErrorMessage={touched.sellingPrice}
                    inputStyle={{color: themeColors.white}}
                    inputContainerStyle={{borderColor: themeColors.white}}
                    containerStyle={{flex: 4}}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                  />
                  <Input
                    placeholder="0"
                    label="Cost Price"
                    placeholderTextColor={themeColors.white}
                    onChangeText={handleChange('costPrice')}
                    onBlur={handleBlur('costPrice')}
                    value={values.costPrice}
                    errorMessage={errors.costPrice}
                    renderErrorMessage={touched.costPrice}
                    inputStyle={{color: themeColors.white}}
                    inputContainerStyle={{borderColor: themeColors.white}}
                    containerStyle={{flex: 4}}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                  />
                </View>
                <Input
                  placeholder="Quantity"
                  label="Quantity"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('quantity')}
                  onBlur={handleBlur('quantity')}
                  value={values.quantity}
                  errorMessage={errors.quantity}
                  renderErrorMessage={touched.quantity}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                />
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
              disabled={!isValid || loading || !image}
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

export default BusinessAddProductScreen;
