/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {StyleSheet, Text} from 'react-native';
// import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS, FONT} from '../../../utils/theme';
import {CustomTextProps} from './interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const fontSizeLevel = {
  S8: RFValue(8),
  S9: RFValue(9),
  S10: RFValue(10),
  S11: RFValue(11),
  S12: RFValue(12),
  S13: RFValue(13),
  S14: RFValue(14),
  S15: RFValue(15),
  S16: RFValue(16),
  S17: RFValue(17),
  S18: RFValue(18),
  S19: RFValue(19),
  S20: RFValue(20),
  S21: RFValue(21),
  S22: RFValue(22),
  S23: RFValue(23),
  S24: RFValue(24),
  S25: RFValue(25),
  S26: RFValue(26),
  S27: RFValue(27),
  S28: RFValue(28),
};
const fontWeights = {
  '200': FONT.extraLightFont,
  '300': FONT.lightFont,
  '400': FONT.regularFont,
  '500': FONT.mediumFont,
  '600': FONT.semiBoldFont,
  '700': FONT.boldFont,
  '800': FONT.extraBoldFont,
};

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  textStyle,
  color,
  center,
  onPress,
  underline,
  numberOfLines,
  fontWeight = '400',
  fontSize,
  ...rest
}) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        underline && {textDecorationLine: 'underline'},
        fontWeights && {
          fontFamily: fontWeights[fontWeight as keyof typeof fontWeights],
        },
        center && {textAlign: 'center'},
        {color: color || COLORS.bodytext},
        fontSize && {
          fontSize: fontSizeLevel[fontSize as keyof typeof fontSizeLevel],
        },
        textStyle,
      ]}
      disabled={typeof onPress === 'function' ? false : true}
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      numberOfLines={numberOfLines}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // text: {
  //   fontFamily: FONT.regularFont,
  //   fontSize: RFValue(12.5),
  // },
});
