import React, {FC, useState} from 'react';
import dayjs from 'dayjs';

import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import isToday from 'dayjs/plugin/isToday';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {COLORS} from '../../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
dayjs.extend(isToday);
type Props = {
  disabled?: boolean;
  value: Date | undefined;
  mode?: 'date' | 'time' | 'datetime';
  onChangeItem: (value: Date) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  containerStyle?: any;
  error?: any;
  defaultValue?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  hideIcon?: boolean;
  dateTextContainer?: ViewStyle;
};
const CustomDatePicker: FC<Props> = ({
  disabled,
  value,
  mode,
  hideIcon,
  label,
  required,
  onChangeItem,
  placeholder,
  containerStyle,
  error,
  defaultValue,
  minimumDate,
  maximumDate,

  dateTextContainer,
}) => {
  //
  const [show, setShow] = useState(false);
  const onChangeDate = (selectedDate: Date) => {
    // onChange(selectedDate);

    onChangeItem(selectedDate);

    setShow(false);
  };

  const showMode = () => {
    !disabled && setShow(true);
  };
  const formatValue = (
    value: Date | undefined,
    mode: 'date' | 'time' | 'datetime',
    placeholder = 'Select',
  ) => {
    if (!value) return placeholder;

    const roundTo30Minutes = (date: Date) => {
      const minutes = dayjs(date).minute();
      const roundedMinutes = Math.round(minutes / 30) * 30;
      return dayjs(date).minute(roundedMinutes).second(0);
    };

    const roundedValue = roundTo30Minutes(value);

    if (mode === 'datetime') {
      return dayjs(roundedValue).isToday()
        ? `Today, ${dayjs(roundedValue).format('hh:mm a')}`
        : dayjs(roundedValue).format('hh:mm a D MMMM YYYY');
    }
    if (mode === 'time') {
      return dayjs(roundedValue).format('hh:mm a');
    }

    return dayjs(roundedValue).format('MM/DD/YYYY');
  };
  console.log(value);
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <DateTimePickerModal
          //disabled={true}
          minuteInterval={30}
          isDarkModeEnabled={false}
          is24Hour={false}
          isVisible={show}
          mode={mode}
          locale="en-AU"
          onConfirm={onChangeDate}
          date={value || minimumDate|| new Date()}
          textColor={COLORS.bodytext}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onCancel={() => setShow(false)}
        />
        {label && (
          <CustomText
            textStyle={{
              marginVertical: hp(0.5),
            }}>
            {label}
            {required && (
              <CustomText color={COLORS.errorRed50} children={'*'} />
            )}
          </CustomText>
        )}

        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.5}
          onPress={showMode}
          style={[
            styles.date,
            dateTextContainer,
            error && {borderColor: COLORS.errorRed50},
          ]}>
          <CustomText
            fontSize="S11"
            color={
              disabled
                ? COLORS.NeutralGrey70
                : value
                ? COLORS.bodytext
                : COLORS.NeutralGrey50
            }>
            {formatValue(value, mode || 'date')}
          </CustomText>
          {!hideIcon && (
            <CustomIcon
              size={RFValue(14)}
              type={mode == 'time' || 'datetime' ? 'Feather' : 'AntDesign'}
              icon={mode == 'time' || 'datetime' ? 'clock' : 'calendar'}
              color={
                error
                  ? COLORS.errorRed50
                  : disabled
                  ? COLORS.NeutralGrey30
                  : COLORS.NeutralGrey60
              }
              disabled
            />
          )}
        </TouchableOpacity>
      </View>
      {error && (
        <CustomText
          fontSize="S10"
          textStyle={{marginBottom: heightPercentageToDP(0.4)}}
          color={COLORS.errorRed50}>
          {error?.message}
        </CustomText>
      )}
    </>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    // flex: 1
    // marginVertical: hp(1),
    marginBottom: hp(1),
    // marginTop: heightPercentageToDP(1),
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    borderColor: COLORS.border,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    height: hp(6),
    borderRadius: 5,
    // marginVertical: hp(0.5),
    // backgroundColor: 'red'
  },
});