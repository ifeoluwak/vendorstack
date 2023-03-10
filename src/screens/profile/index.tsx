import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Input, Text} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {styles} from './style';
import {Dispatch, RootState} from '../../redux/store';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  // phone: Yup.string()
  //   .min(10, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // age_range: Yup.string().required('Required'),
});

function ProfileScreen({navigation}) {
  const dispatch = useDispatch<Dispatch>();

  const {user} = useSelector((root: RootState) => root.userModel);
  const {age_ranges} = useSelector((root: RootState) => root.generalModel);
  const loading = useSelector(
    (root: RootState) => root.loading.effects.userModel.updateUserProfile,
  );

  useEffect(() => {
    dispatch.generalModel.getAgeRange();
    dispatch.userModel.getUserProfile();
  }, [dispatch.generalModel, dispatch.userModel]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation]);

  if (!user) {
    return (
      <Text h4 style={{color: themeColors.white, textAlign: 'center'}}>
        Something went wrong
      </Text>
    );
  }

  return (
    <Formik
      initialValues={{
        firstName: user?.firstName,
        lastName: user?.lastName,
        // age_range: profile?.age_range?.id,
        // phone: profile?.phone,
      }}
      enableReinitialize
      validationSchema={ProfileSchema}
      onSubmit={async values => {
        const success = await dispatch.userModel.updateUserProfile(values);
        if (success) {
          navigation.goBack();
        }
      }}>
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isValid,
        touched,
        errors,
        values,
      }) => (
        <View style={styles.container}>
          <View style={{height: 50}} />
          <Input
            placeholder="First name"
            placeholderTextColor={themeColors.white}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
            errorMessage={touched.firstName ? errors.firstName : ''}
            renderErrorMessage={touched.firstName}
            inputStyle={{color: themeColors.white}}
            inputContainerStyle={{borderColor: themeColors.white}}
            autoCapitalize="none"
          />
          <Input
            placeholder="Last name"
            placeholderTextColor={themeColors.white}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            errorMessage={touched.lastName ? errors.lastName : ''}
            renderErrorMessage={touched.lastName}
            inputStyle={{color: themeColors.white}}
            inputContainerStyle={{borderColor: themeColors.white}}
            autoCapitalize="none"
          />
          {/* <Input
            placeholder="Phone number"
            placeholderTextColor={themeColors.white}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
            errorMessage={touched.phone ? errors.phone : ''}
            renderErrorMessage={touched.phone}
            inputStyle={{color: themeColors.white}}
            inputContainerStyle={{borderColor: themeColors.white}}
            autoCapitalize="none"
          /> */}
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            {age_ranges.map(age => {
              const selected = age.id === values.age_range;
              return (
                <Button
                  key={age.id}
                  title={age.name}
                  titleStyle={{
                    color: selected ? themeColors.pico : themeColors.white,
                  }}
                  buttonStyle={{
                    backgroundColor: selected
                      ? themeColors.white
                      : themeColors.pico,
                  }}
                  size="sm"
                  radius={7}
                  disabledStyle={{backgroundColor: themeColors.pico}}
                  onPress={() => setFieldValue('age_range', age.id)}
                />
              );
            })}
          </View> */}
          {/* <Text style={styles.customErrorText}>{errors.age_range}</Text> */}
          <View style={{height: 50}} />
          <View style={{width: '100%'}}>
            <Button
              title={'Update'}
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
  );
}

export default ProfileScreen;
