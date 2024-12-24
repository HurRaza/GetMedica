import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONT, IMAGES} from '../../../utils/theme';

import {CustomButtonProps} from './interface';
import {RFValue} from 'react-native-responsive-fontsize';

import CustomImage from '../CustomImage';
import {CustomText} from '../CustomText';

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  containerStyle,
  disabled = false,
  isValid = null,
  textStyle,

  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled || (isValid != null && !isValid)}
      style={[
        styles.container,
        styles.primaryButton,

        containerStyle,
        isValid != null && !isValid && styles.disabledButton,
      ]}>
      {loading ? (
        <ActivityIndicator size={RFValue(20)} color="white" />
      ) : children ? (
        children
      ) : (
        <CustomText
          center
          color={isValid != null && !isValid ? '#B3B3B3' : COLORS.white}
          textStyle={[
            {fontFamily: FONT.mediumFont, fontWeight: '600'},
            textStyle,
          ]}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export const CustomSocialButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading,
  containerStyle,
  disabled = false,
  isValid = null,
  textStyle,
  secondary,
  socialImage,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || (isValid != null && !isValid)}
      style={[
        styles.container,
        styles.socialAuth,
        containerStyle,
        isValid != null && !isValid && styles.disabledButton,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomImage
            source={socialImage}
            style={{
              width: RFValue(16),
              height: RFValue(16),
              marginRight: RFValue(5),
            }}
          />
          <CustomText
            center
            color={
              isValid != null && !isValid ? '#B3B3B3' : COLORS.NeutralGrey80
            }
            textStyle={[
              {fontFamily: FONT.mediumFont, fontWeight: '600'},
              textStyle,
            ]}>
            {title}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  buttonBorder: {
    borderWidth: 1.5,
    borderColor: '#B3B3B3',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: hp(1.7),
  },

  socialAuth: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: hp(1.7),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
  },
  disabledButton: {
    backgroundColor: '#E5E5E5',
  },
});
