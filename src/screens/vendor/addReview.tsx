import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Dispatch, RootState} from '../../redux/store';
import {themeColors} from '../../constants/color';
import {Button, Icon, Input} from '@rneui/themed';
import {styles} from './style';

const ReviewSchema = Yup.object().shape({
  comment: Yup.string()
    .min(2, 'Too Short!')
    .max(400, 'Too Long!')
    .required('Required'),
  rating: Yup.number().required('Required'),
});

const AddReviewScreen = ({navigation, route}) => {
  const businessId = route?.params?.businessId;
  const vendorId = route?.params?.businessOwnerId;
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.userModel.reviewVendor ||
      root.loading.effects.userModel.updateReview,
  );

  const review = useSelector((root: RootState) => root.userModel.userBizReview);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Review Vendor',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, dispatch]);

  useEffect(() => {
    dispatch.userModel.getUserVendorReview(businessId);
  }, [dispatch.userModel, businessId]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Formik
        enableReinitialize
        initialValues={{
          comment: review?.comment || '',
          rating: review?.rating || 1,
        }}
        validationSchema={ReviewSchema}
        onSubmit={async values => {
          const actionType = review
            ? dispatch.userModel.updateReview
            : dispatch.userModel.reviewVendor;
          const success = await actionType({
            ...values,
            businessId,
            vendorId,
            id: review?._id || '',
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
          <View style={styles.container}>
            <View style={{height: 50}} />
            <View style={{paddingHorizontal: 10, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '60%',
                  marginBottom: 30,
                }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Icon
                    key={i}
                    name="star"
                    type="feather"
                    // reverse
                    solid
                    size={30}
                    adjustsFontSizeToFit
                    color={
                      values.rating <= i - 1
                        ? themeColors.grey
                        : themeColors.white
                    }
                    onPress={() => setFieldValue('rating', i)}
                  />
                ))}
              </View>
              <Input
                placeholder="Add a review"
                placeholderTextColor={themeColors.white}
                onChangeText={handleChange('comment')}
                onBlur={handleBlur('comment')}
                value={values.comment}
                multiline
                errorMessage={errors.comment}
                renderErrorMessage={touched.comment}
                inputStyle={{color: themeColors.white, height: 90}}
                inputContainerStyle={{borderColor: themeColors.white}}
                autoCapitalize="none"
              />
            </View>
            <View style={{height: 50}} />
            <View style={{paddingHorizontal: 20}}>
              <Button
                title={'Submit'}
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

export default AddReviewScreen;
