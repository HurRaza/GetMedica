import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, MutableRefObject, useState} from 'react';
import {CustomIcon} from '../../../../components/common/CustomIcon';
import {CustomText} from '../../../../components/common/CustomText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../../utils/theme';
import CustomDropDown from '../../../../components/common/CustomDropDown';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';
import {RFValue} from 'react-native-responsive-fontsize';
import {Day, WeeklySchedule} from '../../../../utils/types/componentType';

type Props = {
  day: Day;
  availabilityRef: MutableRefObject<WeeklySchedule>;
  userAvailabilityDetails?: WeeklySchedule[Day];
};
const AvailabilityListItem: FC<Props> = ({
  day,
  availabilityRef,
  userAvailabilityDetails,
}) => {
  const manipulatedAvailability = userAvailabilityDetails?.map(item => {
    return {
      startTime: new Date(`1970-01-01T${item.startTime}`),
      endTime: new Date(`1970-01-01T${item.endTime}`),
    };
  });

  const [selectedItem, setSelectedItem] = useState<boolean>(
    userAvailabilityDetails == undefined ? false : true,
  );

  const [twtfourItem, settwtfourItem] = useState<boolean>(
    userAvailabilityDetails == undefined
      ? false
      : userAvailabilityDetails[0]?.is24Hours,
  );

  const [timingArray, setTimingArray] = useState<
    {startTime: Date | undefined; endTime: Date | undefined}[]
  >(
    userAvailabilityDetails == undefined
      ? [{startTime: undefined, endTime: undefined}]
      : manipulatedAvailability!,
  );

  const onPressDayItem = () => {
    setSelectedItem(prev => !prev);
    if (selectedItem) {
      delete availabilityRef.current[day];
      setTimingArray([{startTime: undefined, endTime: undefined}]);
    } else {
      availabilityRef.current[day] = [
        {
          is24Hours: false,
          startTime: undefined,
          endTime: undefined,
        },
      ];
    }
  };
  const onPress24Hours = () => {
    settwtfourItem(prev => !prev);

    if (!twtfourItem) {
      setTimingArray([{startTime: new Date(), endTime: new Date()}]);
      availabilityRef.current[day] = [
        {
          is24Hours: true,
          startTime: (() => {
            const date = new Date();
            date.setHours(0, 0, 0, 0); // Sets to 12:00 AM
            return date;
          })(),
          endTime: (() => {
            const date = new Date();
            date.setHours(12, 0, 0, 0); // Sets to 12:00 PM
            return date;
          })(),
        },
      ];
      console.log(availabilityRef.current);
    }
  };
  const onTimeConfirm = (
    item: Date,
    index: number,
    type: 'startTime' | 'endTime',
  ) => {
    if (type == 'startTime') {
      // Start Time Setting State and Ref
      timingArray[index].startTime = item;
      setTimingArray([...timingArray]);

      if (availabilityRef.current[day]) {
        return (availabilityRef.current[day][index].startTime = item);
      }
      availabilityRef.current[day] = [
        {
          is24Hours: false,
          startTime: item,
          endTime: undefined,
        },
      ];
    } else if (type == 'endTime') {
      //end Time Setting State and Ref

      timingArray[index].endTime = item;

      setTimingArray([...timingArray]);
      if (availabilityRef.current[day]) {
        return (availabilityRef.current[day][index].endTime = item);
      }
      availabilityRef.current[day] = [
        {
          is24Hours: false,
          startTime: undefined,
          endTime: item,
        },
      ];
    }
  };
  console.log(timingArray, 'timmingArr');
  console.log(availabilityRef.current, 'ava');
  return (
    <View style={styles.container}>
      {/* {selectedItem && (
        <TouchableOpacity
          onPress={onPress24Hours}
          style={styles.hoursContainer}>
          <CustomIcon
            color={twtfourItem ? COLORS.primary : COLORS.NeutralGrey20}
            type={twtfourItem ? 'Ionicons' : 'Feather'}
            icon={twtfourItem ? 'checkbox' : 'square'}
          />
          <CustomText children={'24 Hours'} />
        </TouchableOpacity>
      )} */}
      <TouchableOpacity onPress={onPressDayItem} style={styles.dayContainer}>
        <CustomIcon
          color={selectedItem ? COLORS.primary : COLORS.NeutralGrey20}
          type={selectedItem ? 'Ionicons' : 'Feather'}
          icon={selectedItem ? 'checkbox' : 'square'}
        />
        <CustomText children={day} />
      </TouchableOpacity>
      <View style={styles.PickerListContainer}>
        {selectedItem ? (
          <FlatList
            scrollEnabled={false}
            data={timingArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.timeContainer}>
                    <CustomDatePicker
                      hideIcon
                      disabled={twtfourItem}
                      mode="time"
                      value={item.startTime}
                      onChangeItem={item => {
                        onTimeConfirm(item, index, 'startTime');
                      }}
                      containerStyle={styles.datePickerContainer}
                    />
                    <CustomText children="-" textStyle={styles.minusSign} />
                    <CustomDatePicker
                      hideIcon
                      disabled={twtfourItem}
                      mode="time"
                      value={item.endTime}
                      onChangeItem={item => {
                        onTimeConfirm(item, index, 'endTime');
                      }}
                      containerStyle={styles.datePickerContainer}
                    />
                    {timingArray.length > 1 && (
                      <CustomIcon
                        color={COLORS.NeutralGrey60}
                        style={styles.icon}
                        type="AntDesign"
                        tintColor={
                          twtfourItem ? COLORS.NeutralGrey20 : COLORS.primary
                        }
                        disabled={twtfourItem}
                        icon="minussquareo"
                        size={RFValue(20)}
                        onPress={() => {
                          setTimingArray(
                            timingArray.filter((_, i) => i !== index),
                          );
                          if (availabilityRef.current[day]) {
                            availabilityRef.current[day] =
                              availabilityRef.current[day].filter(
                                (_, i) => i !== index,
                              );
                          }
                        }}
                      />
                    )}
                  </View>
                  <View style={styles.iconContainer}>
                    {index + 1 == timingArray.length && (
                      <CustomIcon
                        color={
                          twtfourItem ? COLORS.NeutralGrey20 : COLORS.primary
                        }
                        type="AntDesign"
                        disabled={twtfourItem}
                        style={styles.icon}
                        icon="plussquare"
                        size={RFValue(20)}
                        onPress={() => {
                          setTimingArray([
                            {startTime: undefined, endTime: undefined},
                            ...timingArray,
                          ]);
                          if (availabilityRef.current[day]) {
                            availabilityRef.current[day] = [
                              {
                                is24Hours: false,
                                startTime: undefined,
                                endTime: undefined,
                              },
                              ...availabilityRef.current[day],
                            ];
                          }
                        }}
                      />
                    )}
                  </View>
                </>
              );
            }}
          />
        ) : (
          <CustomText
            children={'Unavailable'}
            color={COLORS.NeutralGrey50}
            textStyle={styles.unavailableText}
          />
        )}
      </View>
    </View>
  );
};

export default AvailabilityListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dayContainer: {
    flexDirection: 'row',
    gap: widthPercentageToDP(1),
    width: widthPercentageToDP(33),
    paddingTop: heightPercentageToDP(2),
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: heightPercentageToDP(1),
    alignItems: 'center',
  },
  hoursContainer: {
    flexDirection: 'row',
    marginBottom: heightPercentageToDP(1),
    alignItems: 'center',
    gap: widthPercentageToDP(1),
  },
  datePickerContainer: {
    marginBottom: 0,
    flex: 1,
  },
  minusSign: {
    marginHorizontal: widthPercentageToDP(2),
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    marginLeft: widthPercentageToDP(2),
    marginVertical: widthPercentageToDP(2),
  },
  PickerListContainer: {
    flex: 1,
  },
  unavailableText: {
    paddingTop: heightPercentageToDP(2),
  },
});
