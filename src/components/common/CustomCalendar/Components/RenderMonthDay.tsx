import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import {COLORS, FONT} from '../../../../utils/theme';
import {
  heightPercentageToDP,
  // heightPercentageToDP as rem,
  widthPercentageToDP as vw,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

dayjs.extend(isoWeek);
dayjs.extend(weekYear);
interface RenderWeekDayProps {
  selectedDate: any;
  item: any;
  handleDayPress: (value: any) => void;
  currentDate: any;
  data: any;
}

const RenderMonthDay = ({
  item: day,
  selectedDate,
  handleDayPress,
  currentDate,
  data,
}: RenderWeekDayProps) => {
  const isSelected = day?.isSame(selectedDate, 'day');
  const isCurrentDate = day?.isSame(dayjs(), 'day');

  const conditionBasedView = {
    isApplied: (
      <View style={[styles.dot, {backgroundColor: COLORS.warningYellow}]} />
    ),
    isHired: (
      <View style={[styles.dot, {backgroundColor: COLORS.activeBlue}]} />
    ),
    isInvited: <View style={[styles.dot, {backgroundColor: COLORS.purple}]} />,
    isCompleted: (
      <View
        style={[
          styles.dot,
          {backgroundColor: isSelected ? COLORS.white : COLORS.primary},
        ]}
      />
    ),
  };
  return (
    <TouchableOpacity
      key={day.format('YYYY-MM-DD')}
      onPress={() => {
        // console.log(day?.clone()?.startOf('day'));
        if (day.month() === currentDate?.month()) {
          handleDayPress(day);
        }
      }}>
      <View
        style={[
          styles.monthDayContainer,
          isSelected && {
            backgroundColor: COLORS.primary,
            borderRadius: 100,
          },
          isCurrentDate && {
            borderWidth: 0.5,

            borderRadius: vw(50),
            borderColor: COLORS.primary,
          },
          {
            opacity: day.month() === currentDate.month() ? 1 : 0.5,
          },
        ]}>
        <View
          style={{
            top: 0,
            position: 'absolute',
            height: 20,
            zIndex: 9999,
          }}></View>
        <Text
          style={[
            styles.dayNumber,
            {color: isSelected ? '#fff' : '#000'},
            {opacity: day.month() === currentDate?.month() ? 1 : 0.3},
          ]}>
          {day?.date()}
        </Text>
      </View>
      {data && (
        <View style={styles.dotContainer}>
          {data[dayjs(day).format('YYYY-MM-DD')]?.isApplied &&
            conditionBasedView['isApplied']}
          {data[dayjs(day).format('YYYY-MM-DD')]?.isHired &&
            conditionBasedView['isHired']}
          {data[dayjs(day).format('YYYY-MM-DD')]?.isInvited &&
            conditionBasedView['isInvited']}
          {data[dayjs(day).format('YYYY-MM-DD')]?.isCompleted &&
            conditionBasedView['isInvited']}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(RenderMonthDay);

const styles = StyleSheet.create({
  dayNumber: {
    fontSize: vw(3.3),
    color: 'black',
    // fontFamily: FONT.dmSansSemiBold,
  },
  weekdayContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: vw(2),
    paddingVertical: vw(2.55),
    marginVertical: vw(0.5),
    width: Dimensions.get('screen').width / 10.5,
    marginHorizontal: vw(1.3),
  },
  monthDayContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',

    aspectRatio: 1,
    width: Dimensions.get('screen').width / 10.5,
    borderRadius: vw(40),
    marginHorizontal: vw(1.6),
  },
  dotContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 3,
    alignSelf: 'center',
    // gap: vw(0.5),
    borderRadius: 100,
    overflow: 'hidden',
  },
  dot: {
    backgroundColor: COLORS.primary,
    height: RFValue(4),
    aspectRatio: 1,
    // position: 'absolute',
    width: RFValue(4),

    alignSelf: 'center',
    // borderRadius: 50,
  },
});
