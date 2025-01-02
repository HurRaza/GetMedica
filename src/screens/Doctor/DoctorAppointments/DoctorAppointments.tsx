import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {signOutFromFirebase} from '../../../services/firebase/auth';
import {IMAGES, COLORS} from '../../../utils/theme';
import {useUserStore} from '../../../services/store/userStore';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import SecondaryHeader from '../../../components/header/SecondaryHeader';
import {TYPESOFSTATUS} from '../../../utils/constants';
import AppointmentItemContainer from '../../../components/common/CustomAppointment/AppointmentItemContainer';
import {
  getAppointmentByDoctor,
  getAppointmentsbyMonth,
  updateAppointmentStatus,
} from '../../../services/firebase/appointment';
import {getDetailFromRef} from '../../../utils/helpers';
import {Calendar} from 'react-native-calendars';

const DoctorAppointments = () => {
  const {user} = useUserStore();
  const [status, setStatus] = useState<{
    value: string;
    label: string;
  }>(TYPESOFSTATUS[0]);

  const [appointments, setAppointments] = useState<any | null>(null);
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleDateString('fr-CA').slice(0, -3),
  );
  const [datesList, setDatesList] = useState<any>([]);
  const handleMonthChange = (month: any) => {
    const newMonth = month.dateString.slice(0, -3);
    setSelectedMonth(newMonth);
  };

  const handleDayChange = (day: any) => {
    const newDate = day.dateString;
    setSelectedDate(newDate);

    const filtered = appointments.filter(
      (appointment: any) => appointment.date === newDate,
    );
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointment: any = await getAppointmentsbyMonth(
          user.uid,
          status,
          selectedMonth,
        );

        await Promise.allSettled(
          appointment.map(async (e: any) => {
            e.user = await getDetailFromRef(e.patientRef);
          }),
        );
        setAppointments(appointment);
        setFilteredAppointments(appointment);
        const dates = appointment.map((item: any) => {
          return item.date;
        });

        setDatesList(dates);
      } catch (error: any) {
        console.error('Error fetching appointment:', error.message);
      }
    };
    fetchAppointment();
  }, [status, selectedMonth]);

  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.avatar}
        icon={'notifications-outline'}
        onBellPress={() => {
          signOutFromFirebase();
        }}
      />
      <SecondaryHeader
        value={status}
        title="View Appointments"
        dropdownData={TYPESOFSTATUS}
        dropdownChangeText={setStatus}
      />

      {!appointments ? (
        <View>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <AppointmentItemContainer
          data={filteredAppointments}
          renderHeader={
            <Calendar
              onDayPress={(day: any) => handleDayChange(day)}
              onMonthChange={handleMonthChange}
              markedDates={datesList.reduce(
                (acc: any, date: string) => {
                  acc[date] = {
                    marked: true,
                    selectedDotColor: 'blue',
                  };
                  return acc;
                },
                {
                  [selectedDate]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'blue',
                  },
                },
              )}
            />
          }
        />
      )}
    </CustomWrapper>
  );
};

export default DoctorAppointments;

const styles = StyleSheet.create({
  subHeading: {
    paddingVertical: heightPercentageToDP(2),
  },
  loader: {
    paddingTop: heightPercentageToDP(2),
  },
});
