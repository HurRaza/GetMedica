import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {COLORS, IMAGES} from '../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomIconWithText from '../../../components/common/CustomIconWithText/CustomIconWithText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CustomImage from '../../../components/common/CustomImage';
import {CustomText} from '../../../components/common/CustomText';
import {DayShortNames} from '../../../utils/constants';
import {CustomButton} from '../../../components/common/CustomButton';
import {getDetailFromRef} from '../../../utils/helpers';
import {updateAppointmentStatus} from '../../../services/firebase/appointment';

type Props = {
  containerStyle?: ViewStyle;
  item?: any;
  role: string;
};

const AppointmentItem: FC<Props> = ({containerStyle, item, role}) => {
  const [approved, setApproved] = useState(false);

  const handleStatus = async (id: string, status: string) => {
    const res = await updateAppointmentStatus(id, status);
    if (res) {
      setApproved(true);
    }
  };

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
            children={item.user.name}
            color={COLORS.bodytext}
            fontSize="S21"
            fontWeight="500"
          />
          {role == 'patient' && (
            <CustomText
              children={
                item.user?.specialization
                  ? item.user.specialization.charAt(0).toUpperCase() +
                    item.user.specialization.slice(1)
                  : ''
              }
              fontWeight="500"
              fontSize="S14"
              color={COLORS.primary}
            />
          )}
        </View>

        {role == 'patient' && (
          <View
            style={[
              styles.typeContainer,
              item.status === 'pending'
                ? {backgroundColor: COLORS.NeutralGrey10}
                : item.status === 'rejected'
                ? {backgroundColor: COLORS.errorRedTransparent10}
                : {backgroundColor: COLORS.primaryTransparant5},
            ]}>
            <CustomText
              fontSize="S12"
              fontWeight="500"
              children={
                item.status
                  ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                  : ''
              }
              color={
                item.status == 'approved'
                  ? COLORS.primary
                  : item.status == 'rejected'
                  ? COLORS.errorRed50
                  : COLORS.NeutralGrey70
              }
            />
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <CustomIconWithText
          iconType="Ionicons"
          iconName="calendar-number-outline"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={item.date}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="clock"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={`${item?.startTime}-${item.endTime}`}
        />
        <CustomIconWithText
          iconType="SimpleLineIcons"
          iconName="phone"
          iconSize={RFValue(17)}
          fontSize="S12"
          textStyle={styles.iconText}
          text={'+1 22111 154 44'}
        />
      </View>
      <CustomText
        children={item?.reason || 'jjj'}
        color={COLORS.NeutralGrey60}
        fontSize="S12"
        fontWeight="400"
        textStyle={styles.description}
      />
      {!approved && role == 'doctor' && item.status == 'pending' && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title={'Decline'}
            onPress={() => {
              handleStatus(item.id, 'rejected');
            }}
            containerStyle={styles.cancelButtonCont}
            textStyle={styles.cancelButton}
          />
          <CustomButton
            title={'Confirm'}
            onPress={() => {
              handleStatus(item.id, 'approved');
            }}
            containerStyle={styles.confirmButtonCont}
            textStyle={styles.confirmButton}
          />
        </View>
      )}
    </View>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: COLORS.white,
    padding: RFValue(10),
    borderWidth: RFValue(1),
    borderRadius: 20,
    borderTopWidth: RFValue(3),
    borderTopColor: COLORS.primary,
    borderBottomColor: COLORS.NeutralGrey20,
    borderLeftColor: COLORS.NeutralGrey20,
    borderRightColor: COLORS.NeutralGrey20,
  },
  headerContainer: {
    gap: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.NeutralGrey10,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(2),
    borderRadius: 5,
  },
  iconText: {
    color: COLORS.NeutralGrey100,
    fontWeight: '500',
  },
  bottomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: heightPercentageToDP(2),
    gap: widthPercentageToDP(3),
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
    lineHeight: RFValue(20),
    paddingVertical: heightPercentageToDP(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: heightPercentageToDP(1),
  },
  confirmButtonCont: {
    width: widthPercentageToDP(25),
  },
  cancelButtonCont: {
    width: widthPercentageToDP(25),
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: RFValue(1),
  },
  cancelButton: {
    color: COLORS.primary,
    fontSize: RFValue(12),
  },
  confirmButton: {
    fontSize: RFValue(12),
  },
});
