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
import CustomRHFDropDown from '../../../components/common/CustomRHFDropDown/CustomRHFDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import {signupWithFirebase} from '../../../services/auth';

const Signup = () => {
  const {params} = useRoute<RouteProp<RootStackNavigationType, 'Signup'>>();
  const {control, handleSubmit} = useForm({
    // defaultValues: {email: 'hhhh@yopmail.com', password: 'Karachi123+'},
  });
  const SignupHandler = async (data: any) => {
    data.role = params?.role;
    signupWithFirebase(data);
  };
  return (
    <CustomWrapper keybaordAvoidingView>
      <SimpleHeader>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <CustomText
              children={'Sign Up'}
              fontSize="S28"
              fontWeight="600"
              textStyle={styles.title}
            />
            <CustomRHFTextInput
              placeholder="Enter Full Name"
              requiredStar
              control={control}
              rules={{
                required: 'Name is required',
              }}
              name="name"
              title="Name"
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
            {params?.role == 'doctor' ? (
              <CustomRHFDropDown
                name="specialization"
                label="Specialization"
                required
                //   onChangeValue={() => {
                //     setValue('fieldOfPractice', null);
                //     // setValue('typeOfPractice');
                //   }}
                control={control}
                rules={{required: 'Specialization is required'}}
                data={TYPEOFSPECIALIZATION}
              />
            ) : (
              <></>
            )}

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
          </View>

          <CustomButton
            // loading={isPending}
            title={'Continue'}
            onPress={handleSubmit(SignupHandler)}
          />
          <CustomText
            center
            textStyle={styles.subTitleText}
            fontSize="S14"
            fontWeight="400"
            color={COLORS.NeutralGrey60}
            children={
              <>
                Already have an account?
                <CustomText
                  underline
                  onPress={() => navigate('Login', {role: params?.role})}
                  fontWeight="600"
                  fontSize="S14"
                  children=" Login"
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

export default Signup;

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
