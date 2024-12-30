import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import SimpleHeader from '../../../components/header/SimpleHeader';
import {CustomText} from '../../../components/common/CustomText';
import {COLORS} from '../../../utils/theme';
import {navigate, navigateReset} from '../../../utils/navigation';
import {CustomButton} from '../../../components/common/CustomButton';
import CustomRHFTextInput from '../../../components/common/CustomRHFTextInput';
import {useForm} from 'react-hook-form';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CustomRHFDropDown from '../../../components/common/CustomRHFDropDown/CustomRHFDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import {signupWithFirebase} from '../../../services/api/auth';
import {showToast} from '../../../utils/helpers';
import {useUserStore} from '../../../services/store/userStore';

const Signup = () => {
  const {params} = useRoute<RouteProp<RootStackNavigationType, 'Signup'>>();
  const {
    control,
    handleSubmit,
    formState: {isSubmitting, isValid},
  } = useForm({mode: 'onChange'});

  const SignupHandler = async (data: any) => {
    data.role = params?.role;
    const res = await signupWithFirebase(data);
    if (!res.success) {
      showToast({
        type: 'error',
        message: res.error,
        position: 'bottom',
      });
      return;
    }
    showToast({message: 'User created successfully!', position: 'bottom'});
    const setUser = useUserStore.getState().setUser;
    setUser({
      uid: res.uid,
      email: data?.email,
      name: data?.name,
      role: data?.role,
      ...(data.role === 'doctor' && {
        specialization: data?.specialization.value,
      }),
    });
    return data.role == 'doctor'
      ? navigateReset('DoctorNavigator')
      : navigateReset('PatientNavigator');
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
            loading={isSubmitting}
            disabled={isSubmitting}
            isValid={isValid}
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
