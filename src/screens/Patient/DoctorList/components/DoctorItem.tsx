import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useCallback} from 'react';
import {COLORS, IMAGES} from '../../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {navigate} from '../../../../utils/navigation';
import CustomIconWithText from '../../../../components/common/CustomIconWithText/CustomIconWithText';
import {CustomText} from '../../../../components/common/CustomText';
import CustomImage from '../../../../components/common/CustomImage';
import {CustomIcon} from '../../../../components/common/CustomIcon';
import {DayShortNames} from '../../../../utils/constants';

type Props = {
  containerStyle?: ViewStyle;
  item: any;
  index: number;
};

const CustomDoctor: FC<Props> = ({containerStyle, item, index}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('BookAppointments', {doctorIndex: index})}
      style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomImage
          source={IMAGES.avatar}
          borderRadius={100}
          width={RFValue(40)}
          height={RFValue(40)}
        />
        <View style={{flex: 1}}>
          <CustomText
            children={item.name}
            color={COLORS.bodytext}
            fontSize="S15"
          />
          <CustomText
            children={
              item.specialization
                ? item.specialization.charAt(0).toUpperCase() +
                  item.specialization.slice(1)
                : ''
            }
            fontWeight="500"
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="calendar-number-outline"
          textStyle={styles.iconText}
          text={`Availability: ${[
            ...new Set(item.timings.map((i: any) => DayShortNames[i.day])),
          ]}`}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="graduation"
          textStyle={styles.iconText}
          text={`9 Years of Experience`}
        />
        <CustomIconWithText
          iconType="AntDesign"
          iconName="staro"
          textStyle={styles.iconText}
          text={`5 star rating`}
        />
      </View>
      <CustomIcon
        type="AntDesign"
        icon="arrowright"
        color={COLORS.primary}
        style={styles.rightArrowIcon}
      />
    </TouchableOpacity>
  );
};

export default CustomDoctor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: RFValue(10),
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 20,
  },
  headerContainer: {
    gap: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
  },

  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.primaryTransparant5,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
  },
  iconText: {
    color: COLORS.NeutralGrey80,
  },
  bottomContainer: {
    marginTop: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },
  rightArrowIcon: {
    position: 'absolute',
    right: RFValue(10),
    backgroundColor: COLORS.primaryTransparant5,
    padding: RFValue(5),
    borderRadius: 100,
    bottom: RFValue(10),
  },
});
