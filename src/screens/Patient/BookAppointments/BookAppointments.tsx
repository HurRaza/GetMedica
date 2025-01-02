import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackNavigationType} from '../../../utils/types/navigationType';
import {useDoctorsStore} from '../../../services/store/doctorStore';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {useUserStore} from '../../../services/store/userStore';
import {COLORS, IMAGES} from '../../../utils/theme';
import {signOutFromFirebase} from '../../../services/firebase/auth';
import SecondaryHeader from '../../../components/header/SecondaryHeader';
import DoctorDetails from './components/DoctorDetail';
import {CustomText} from '../../../components/common/CustomText';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {DaysOfWeek} from '../../../utils/constants';
import {
  formatTime12Hour,
  generateTimeSlots,
  getNextDates,
  showToast,
} from '../../../utils/helpers';
import CustomTextInput from '../../../components/common/CustomTextInput';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomButton} from '../../../components/common/CustomButton';
import {bookAppointment} from '../../../services/firebase/appointment';
import {navigate, navigateReset} from '../../../utils/navigation';

const BookAppointments = () => {
  const {params} =
    useRoute<RouteProp<RootStackNavigationType, 'BookAppointments'>>();
  const {filteredDoctors} = useDoctorsStore();
  const {user} = useUserStore();
  const doctorData = filteredDoctors[params.doctorIndex];

  const [dates, setDates] = useState<{day: string; date: string}[]>();
  const [selectedDate, setSelectedDate] = useState<{
    day: string;
    date: string;
  } | null>();
  const [selectedTime, setSelectedTime] = useState();
  const [timeSlots, setTimeSlots] = useState([]);
  const [reasonText, setReasonText] = useState<string>('');

  useEffect(() => {
    if (doctorData?.timings) {
      const nextDates = getNextDates([
        ...new Set(doctorData.timings.map((i: any) => i.day)),
      ]);
      setDates(nextDates);
      setSelectedDate(nextDates[0]);
    }
  }, [doctorData]);

  useEffect(() => {
    if (selectedDate) {
      const dayTimings = doctorData.timings.filter(
        (timing: any) => timing.day === selectedDate.day,
      );
      const slots = dayTimings.flatMap((timing: any) =>
        generateTimeSlots(timing.startTime, timing.endTime),
      );
      setTimeSlots(slots.sort());
      setSelectedTime(slots[0]);
    }
  }, [selectedDate]);

  const onSubmit = async () => {
    if (!reasonText.trim()) {
      return showToast({
        type: 'error',
        message: 'Fill all feilds',
        position: 'bottom',
      });
    }
    const res = await bookAppointment({
      patientId: user.uid,
      doctorId: doctorData.id,
      day: selectedDate?.day,
      date: selectedDate?.date,
      time: selectedTime,
      reason: reasonText,
    });
    if (!res.success) {
      return showToast({
        type: 'error',
        message: res.error,
        position: 'bottom',
      });
    }
    setReasonText('');
    showToast({
      message: 'Appointment request has been sent',
      position: 'bottom',
    });
    navigateReset('PatientAppointments');
  };

  return (
    <CustomWrapper keybaordAvoidingView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <CustomHeader
          title={user.name}
          subtitle="Welcome"
          profilePic={IMAGES.avatar}
          icon={'notifications-outline'}
          onBellPress={() => {
            signOutFromFirebase();
          }}
        />
        <CustomText
          children={'Book Appointment'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.subHeading}
        />
        <DoctorDetails item={doctorData} />
        <CustomText
          children={'Select Day'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.subHeading}
        />
        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.dateList}
          renderItem={({item}) => (
            <View style={styles.daysContainer}>
              <CustomText
                children={item.day.slice(0, 3).toUpperCase()}
                fontSize={'S13'}
                color={COLORS.primary}
                fontWeight="600"
              />
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  selectedDate?.day == item.day
                    ? {
                        backgroundColor: COLORS.primary,
                        elevation: 3,
                      }
                    : {
                        backgroundColor: COLORS.NeutralGrey10,
                        elevation: 0,
                      },
                ]}
                onPress={() => setSelectedDate(item)}>
                <CustomText
                  children={item.date.slice(-2)}
                  fontSize={'S15'}
                  color={
                    selectedDate?.day == item.day
                      ? COLORS.white
                      : COLORS.NeutralGrey100
                  }
                  fontWeight="600"
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <CustomText
          children={'Select Time'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.subHeading}
        />

        <View style={styles.timeContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateContainer,
                selectedTime == slot
                  ? {
                      backgroundColor: COLORS.primary,
                      elevation: 3,
                    }
                  : {
                      backgroundColor: COLORS.NeutralGrey10,
                      elevation: 0,
                    },
              ]}
              onPress={() => setSelectedTime(slot)}>
              <CustomText
                children={formatTime12Hour(slot)}
                fontSize={'S15'}
                color={
                  selectedTime === slot ? COLORS.white : COLORS.NeutralGrey100
                }
                fontWeight="600"
                textStyle={{includeFontPadding: false}}
              />
            </TouchableOpacity>
          ))}
        </View>

        <CustomText
          children={'Reason for Appointment'}
          fontSize="S20"
          fontWeight="500"
          color={COLORS.NeutralGrey100}
          textStyle={styles.subHeading}
        />
        <CustomTextInput
          value={reasonText}
          onChangeText={text => setReasonText(text)}
          multiline
          numberOfLines={6}
          placeholder={`Please tell us why you would like to book this appointment with ${doctorData.name}.`}
          inputContainerStyle={styles.reasonInput}
          textStyle={styles.reasonText}
        />
        <CustomButton title={'Book Appointment'} onPress={() => onSubmit()} />
      </ScrollView>
    </CustomWrapper>
  );
};

export default BookAppointments;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(3),
  },
  subHeading: {
    paddingVertical: heightPercentageToDP(2),
  },
  daysContainer: {
    gap: heightPercentageToDP(2),
    alignItems: 'center',
  },
  dateContainer: {
    padding: heightPercentageToDP(2),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.NeutralGrey10,
    width: widthPercentageToDP(28),
  },
  dateList: {
    gap: widthPercentageToDP(2.8),
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: widthPercentageToDP(2.8),
  },
  reasonInput: {
    height: heightPercentageToDP(20),
    marginBottom: heightPercentageToDP(2),
  },
  reasonText: {
    fontSize: RFValue(14),
    textAlignVertical: 'top',
  },
});
