import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import {IconType} from '../CustomIcon/interface';
import {FontSizeType} from '../CustomText/interface';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../utils/theme';
import CustomImage from '../CustomImage';
type Props = {
  text: string;
  containerStyle?: ViewStyle;
  secondaryText?: string;
  iconType?: IconType;
  iconSize?: number;
  iconName?: string;
  fontSize?: FontSizeType;
  textStyle?: TextStyle;
  iconColor?: string;
  source?: ImageSourcePropType;
};
const CustomIconWithText: FC<Props> = ({
  text,
  iconType,
  iconName,
  iconSize = RFValue(19),
  fontSize,
  textStyle,
  source,
  containerStyle,
  iconColor = COLORS.primary,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {source ? (
        <CustomImage source={source} style={styles.image} />
      ) : (
        <CustomIcon
          type={iconType || 'AntDesign'}
          icon={iconName || ''}
          size={iconSize}
          color={iconColor}
        />
      )}

      <CustomText
        // allowFontScaling
        // numberOfLines={1}
        children={text}
        fontSize={fontSize}
        textStyle={[styles.text, textStyle]}
      />
    </View>
  );
};

export default CustomIconWithText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: widthPercentageToDP(1.2),
  },
  image: {width: RFValue(16), height: RFValue(16)},
  text: {
    // flex: 1,
  },
});
