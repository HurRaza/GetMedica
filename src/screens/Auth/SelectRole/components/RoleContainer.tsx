import {
  ImageSourcePropType,
  Role,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {CustomText} from '../../../../components/common/CustomText';
import CustomImage from '../../../../components/common/CustomImage';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../../utils/theme';
import {RoleType} from '../../../../utils/types/componentType';
type Props = {
  title: RoleType;
  image: ImageSourcePropType;
  selectedItem: boolean;
  onPress: (value: RoleType) => void;
};
const RoleContainer: FC<Props> = ({title, image, selectedItem, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={[
        styles.container,
        selectedItem ? styles.selectedContainer : styles.unSelectedContainer,
      ]}>
      <CustomImage source={image} style={styles.image} />
      <CustomText
        fontWeight="600"
        children={
          title && title.charAt(0).toLocaleUpperCase() + title.substring(1)
        }
        fontSize="S17"
        color={selectedItem ? COLORS.primary : COLORS.NeutralGrey70}
      />
    </TouchableOpacity>
  );
};

export default RoleContainer;

const styles = StyleSheet.create({
  container: {
    borderWidth: RFValue(1),
    marginTop: heightPercentageToDP(5),
    paddingVertical: heightPercentageToDP(3),
    marginHorizontal: widthPercentageToDP(15),
    alignItems: 'center',
    gap: heightPercentageToDP(1),
    borderRadius: RFValue(10),
  },
  selectedContainer: {
    borderColor: COLORS.primary,
    // backgroundColor: COLORS.primaryTransparant5,
  },
  unSelectedContainer: {
    borderColor: COLORS.NeutralGrey20,
  },
  image: {
    height: hp(20),
    aspectRatio: 1,
  },
});
