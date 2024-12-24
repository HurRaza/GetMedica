import {StatusBar} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {BaseToast, ErrorToast, InfoToast} from 'react-native-toast-message';

export const COLORS = {
  primary: '#18A0FB',
  primaryDark: '#305C51',
  primaryLight: '#D2EDEE',
  yellowdDark: '#FFC107',
  warningYellow: '#FB9C0C',
  activeBlue: '#1F58EA',
  purple: '#9294F2',
  primaryTransparant5: 'rgba(0, 130, 127, 0.05)',
  primaryTransparant10: 'rgba(0, 130, 127, 0.1)',
  errorRed50: '#F14D4D',
  title: '#121212',
  bodytext: '#252525',
  yellow: '#FBC187',
  yellowLight: '#F1C34D1A',
  lightgrey: '#FAFAFA',
  subtext: '#ADADAD',
  icon: '#9B9B9B',
  border: '#E2E2E2',
  white: '#FFFFFF',
  black: '#000000',
  NeutralGrey0: '#F2F5F6',
  NeutralGrey10: '#E9EDEE',
  NeutralGrey20: '#D8DFE0',
  NeutralGrey30: '#C8D1D2',
  NeutralGrey40: '#B6C2C3',
  NeutralGrey50: '#9EA9AA',
  NeutralGrey60: '#8D9A9B',
  NeutralGrey70: '#626D6F',
  NeutralGrey80: '#51595A',
  NeutralGrey90: '#333839',
  NeutralGrey100: '#25292A',
};

export const IMAGES = {
  doctor: require('../assets/pictures/doctor.png'),
  patient: require('../assets/pictures/patient.png'),
};

export const FONT = {
  boldFont: 'PlusJakartaSans-Bold',
  extraBoldFont: 'PlusJakartaSans-ExtraBold',
  extraLightFont: 'PlusJakartaSans-ExtraLight',
  lightFont: 'PlusJakartaSans-Light',
  mediumFont: 'PlusJakartaSans-Medium',
  regularFont: 'PlusJakartaSans-Regular',
  semiBoldFont: 'PlusJakartaSans-SemiBold',
};

export const SHADOW = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
};

export const toastConfig = (bottom: number) => ({
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{
        // backgroundColor: COLORS.backgroundColor,
        borderLeftColor: 'green',
        // borderWidth: 2,
        // borderColor: COLORS.greyColor,
        marginTop: StatusBar.currentHeight || heightPercentageToDP(2.5),
        marginBottom: bottom - heightPercentageToDP(3),
        width: '90%',
        height: heightPercentageToDP(6),
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: RFValue(9),

        fontFamily: FONT.regularFont,
        // color: COLORS.whiteColor,
      }}
      text2Style={{
        fontSize: RFValue(9),

        fontFamily: FONT.regularFont,
        // color: COLORS.whiteColor,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{
        // backgroundColor: COLORS.backgroundColor,
        borderLeftColor: 'red',
        // borderWidth: 2,
        marginTop: StatusBar.currentHeight || heightPercentageToDP(2.5),
        marginBottom: bottom - heightPercentageToDP(3),
        width: '90%',
        // borderColor: COLORS.greyColor,
        height: heightPercentageToDP(6),
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: RFValue(9),
        fontFamily: FONT.regularFont,

        // fontFamily: FONT.semiBoldFont,
        // color: COLORS.whiteColor,
      }}
      text2Style={{
        fontSize: RFValue(9),
        fontFamily: FONT.semiBoldFont,
        // fontFamily: FONT.regularFont,
        // color: COLORS.whiteColor,
      }}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{
        // backgroundColor: COLORS.backgroundColor,
        borderLeftColor: '#5bc0de',

        marginTop: StatusBar.currentHeight || heightPercentageToDP(2.5),
        marginBottom: bottom - heightPercentageToDP(3),
        width: '90%',
        // borderColor: COLORS.greyColor,
        height: heightPercentageToDP(6),
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: RFValue(9.5),

        fontFamily: FONT.regularFont,
        // fontFamily: FONT.semiBoldFont,
        // color: COLORS.whiteColor,
      }}
      text2Style={{
        fontSize: heightPercentageToDP(1),

        // fontFamily: FONT.regularFont,
        // color: COLORS.whiteColor,
      }}
    />
  ),
});
