import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {Dispatch, RootState} from '../../redux/store';
import {themeColors} from '../../constants/color';
import {Button, Icon, Input, Text} from '@rneui/themed';
import {styles} from './style';
import {useFCMToken} from '../../hooks/useFCMToken';

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  //   email: Yup.string().email('Invalid email').required('Required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch<Dispatch>();
  const [showPassword, setShowPassword] = useState(false);

  const fcmToken = useFCMToken();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.authModel.login,
  );

  React.useEffect(() => {
    navigation.setOptions({
      header: () => null,
    });
  }, [navigation]);

  console.log({fcmToken});

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={async values => {
          const success = await dispatch.authModel.login({...values, fcmToken});
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
            <Icon
              name="shopping-bag"
              type="feather"
              size={50}
              color={themeColors.white}
            />
            <Text h3 h3Style={{color: themeColors.white}}>
              Login to your account
            </Text>
            <View style={{height: 50}} />
            <Input
              placeholder="Username"
              placeholderTextColor={themeColors.white}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              errorMessage={errors.username}
              renderErrorMessage={touched.username}
              inputStyle={{color: themeColors.white}}
              inputContainerStyle={{borderColor: themeColors.white}}
              autoCapitalize="none"
            />
            <Input
              placeholder="Password"
              placeholderTextColor={themeColors.white}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorMessage={errors.password}
              renderErrorMessage={touched.password}
              secureTextEntry={!showPassword}
              inputStyle={{color: themeColors.white}}
              inputContainerStyle={{borderColor: themeColors.white}}
              autoCapitalize="none"
              rightIcon={
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  type="feather"
                  size={20}
                  color={themeColors.white}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <View style={{height: 50}} />
            <View style={{width: '100%'}}>
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
            <View style={{position: 'absolute', top: 46, left: 20}}>
              <Icon
                name="arrow-left"
                type="feather"
                size={30}
                color={themeColors.white}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginScreen;
