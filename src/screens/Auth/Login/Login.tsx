import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import SimpleHeader from '../../../components/header/SimpleHeader';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS} from '../../../utils/theme';
import {navigate} from '../../../utils/navigation';
import {CustomButton} from '../../../components/common/CustomButton';
import CustomRHFTextInput from '../../../components/common/CustomRHFTextInput';
import {useForm} from 'react-hook-form';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {loginWithFirebase} from '../../../services/auth';

const Login = () => {
  const {params} = useRoute<RouteProp<RootStackNavigationType, 'Login'>>();
  const {control, handleSubmit} = useForm({
    // defaultValues: {email: 'hhhh@yopmail.com', password: 'Karachi123+'},
  });

  const LoginHandler = async (data: any) => {
    data.role = params?.role;
    loginWithFirebase(data);
  };
  return (
    <CustomWrapper keybaordAvoidingView>
      <SimpleHeader>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <CustomText
              children={'Log In'}
              fontSize="S28"
              fontWeight="600"
              textStyle={styles.title}
            />
            <CustomRHFTextInput
              placeholder="Enter Email Address"
              requiredStar
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              name="email"
              title="Email"
            />
            <CustomRHFTextInput
              secureTextEntry
              placeholder="Enter Password"
              requiredStar
              control={control}
              rules={{
                required: 'Password is required',
              }}
              name="password"
              title="Password"
            />
            <CustomText
              underline
              onPress={() => {}}
              fontSize="S14"
              fontWeight="600"
              children="Forgot Password?"
              color={COLORS.primary}
              textStyle={styles.forgotPasswordText}
            />
          </View>

          <CustomButton
            // loading={isPending}
            title={'Continue'}
            onPress={handleSubmit(LoginHandler)}
          />
          <CustomText
            center
            textStyle={styles.subTitleText}
            fontWeight="400"
            fontSize="S14"
            color={COLORS.NeutralGrey60}
            children={
              <>
                Don’t have an account?
                <CustomText
                  underline
                  onPress={() => navigate('Signup', {role: params?.role})}
                  fontWeight="600"
                  fontSize="S14"
                  children=" SignUp"
                  color={COLORS.primary}
                />
              </>
            }
          />
        </ScrollView>
      </SimpleHeader>
    </CustomWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    textAlign: 'right',
  },
  SignOption: {},
  subTitleText: {
    marginVertical: heightPercentageToDP(2),
  },
});
