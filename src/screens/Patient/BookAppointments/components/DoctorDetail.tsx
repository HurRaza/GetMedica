import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {COLORS, IMAGES} from '../../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomIconWithText from '../../../../components/common/CustomIconWithText/CustomIconWithText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomImage from '../../../../components/common/CustomImage';
import {CustomText} from '../../../../components/common/CustomText';
import {DayShortNames} from '../../../../utils/constants';

type Props = {
  containerStyle?: ViewStyle;
  item: any;
};

const DoctorDetails: FC<Props> = ({containerStyle, item}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <CustomImage
          source={IMAGES.avatar}
          borderRadius={100}
          width={RFValue(50)}
          height={RFValue(50)}
        />
        <View style={{flex: 1}}>
          <CustomText
            children={item?.name}
            color={COLORS.bodytext}
            fontSize="S21"
            fontWeight="500"
          />
          <CustomText
            children={
              item?.specialization
                ? item.specialization.charAt(0).toUpperCase() +
                  item.specialization.slice(1)
                : ''
            }
            fontWeight="500"
            fontSize="S14"
            color={COLORS.primary}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="calendar-number-outline"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={`Availability: ${[
            ...new Set(item.timings.map((i: any) => DayShortNames[i.day])),
          ]}`}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="graduation"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={`9 Years of Experience`}
        />
        <CustomIconWithText
          iconType="AntDesign"
          iconName="staro"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={`5 star rating`}
        />
        <CustomText
          color={COLORS.NeutralGrey80}
          fontSize="S12"
          fontWeight="400"
          textStyle={styles.description}>
          <CustomText
            children={item.name}
            color={COLORS.primary}
            fontSize="S12"
          />{' '}
          has dedicated over 9 years to
          {' ' + item.specialization + ' '}
          care, focusing on treating musculoskeletal injuries, joint disorders,
          and sports injuries. Known for his patient centered approach, he
          tailors treatment plans to fit individual needs, from preventative
          care to surgical solutions.
        </CustomText>
      </View>
    </View>
  );
};

export default DoctorDetails;

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
    alignItems: 'center',
  },

  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.primaryTransparant5,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
  },
  iconText: {
    color: COLORS.NeutralGrey80,
    fontWeight: '500',
  },
  bottomContainer: {
    marginTop: heightPercentageToDP(2),
    gap: heightPercentageToDP(1),
  },
  rightArrowIcon: {
    position: 'absolute',
    right: RFValue(10),
    backgroundColor: COLORS.primaryTransparant5,
    padding: RFValue(6),
    borderRadius: 100,
    bottom: RFValue(10),
  },
  description: {
    marginTop: heightPercentageToDP(2),
    lineHeight: RFValue(20),
  },
});
