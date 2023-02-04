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
  price: Yup.string()
    .min(1, 'Too Short!')
    .max(9, 'Too Long!')
    .required('Required'),
});

const BusinessProfileScreen = ({navigation, route}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);
  const dispatch = useDispatch<Dispatch>();

  const product: Product = route?.params?.product;

  const loading = useSelector(
    (root: RootState) => root.loading.models.businessModel,
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: product?.name,
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, product]);

  const handleImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 1000,
      maxWidth: 800,
    });
    setImage(result);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Formik
        initialValues={{
          name: product.name,
          price: product.price,
          discount_price: product.discount_price,
          desc: product.desc,
          qty: `${product.qty}`,
          active: product.active,
          out_of_stock: product.out_of_stock,
        }}
        validationSchema={ProductSchema}
        onSubmit={async values => {
          const form = new FormData();
          form.append('id', product.id);
          form.append('name', values.name);
          form.append('price', values.price);
          form.append('discount_price', values.discount_price);
          form.append('desc', values.desc);
          form.append('qty', values.qty);
          form.append('active', values.active);
          form.append('out_of_stock', values.out_of_stock);
          if (image?.assets?.[0]) {
            form.append('image', {
              uri: image?.assets?.[0].uri,
              name: image?.assets?.[0].fileName,
              type: image?.assets?.[0].type,
            });
          }
          const success = await dispatch.businessModel.updateProduct(form);
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
          <View style={styles.container}>
            <View style={{height: 30}} />
            <View style={{paddingHorizontal: 10, width: '100%'}}>
              <View style={{alignItems: 'center'}}>
                <Avatar
                  size="xlarge"
                  rounded
                  source={{
                    uri: image ? image?.assets?.[0]?.uri : product.url,
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
                placeholder="Description"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('desc')}
                onBlur={handleBlur('desc')}
                value={values.desc}
                multiline
                errorMessage={errors.desc}
                renderErrorMessage={touched.desc}
                inputStyle={{color: themeColors.white, height: 90}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Input
                  placeholder="Price"
                  label="Price"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  errorMessage={errors.price}
                  renderErrorMessage={touched.price}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  containerStyle={{flex: 4}}
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                />
                <Input
                  placeholder="Discount Price"
                  label="Discount Price"
                  placeholderTextColor={themeColors.white}
                  onChangeText={handleChange('discount_price')}
                  onBlur={handleBlur('discount_price')}
                  value={values.discount_price}
                  errorMessage={errors.discount_price}
                  renderErrorMessage={touched.discount_price}
                  inputStyle={{color: themeColors.white}}
                  inputContainerStyle={{borderColor: themeColors.white}}
                  containerStyle={{flex: 4}}
                  autoCapitalize="none"
                  keyboardType="decimal-pad"
                />
              </View>
              <Input
                placeholder="Quantity"
                label="Quantity"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('qty')}
                onBlur={handleBlur('qty')}
                value={values.qty}
                errorMessage={errors.qty}
                renderErrorMessage={touched.qty}
                inputStyle={{color: themeColors.white}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
              <View style={{alignItems: 'flex-start'}}>
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
              </View>
            </View>
            <View style={{height: 50}} />
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
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default BusinessProfileScreen;
