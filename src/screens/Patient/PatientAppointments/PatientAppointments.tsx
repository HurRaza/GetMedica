import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
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
import {getAppointmentByPatient} from '../../../services/firebase/appointment';
import {getDetailFromRef} from '../../../utils/helpers';

const PatientAppointments = () => {
  const {user} = useUserStore();
  const [status, setStatus] = useState<{
    value: string;
    label: string;
  }>(TYPESOFSTATUS[0]);
  const [appointments, setAppointments] = useState<any | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const appointment: any = await getAppointmentByPatient(
          user.uid,
          status,
        );

        await Promise.allSettled(
          appointment.map(async (e: any) => {
            e.user = await getDetailFromRef(e.doctorRef);
          }),
        );

        setAppointments(appointment);
      } catch (error: any) {
        console.error('Error fetching appointment:', error.message);
      }
    };
    fetchAppointment();
  }, [status]);

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
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <AppointmentItemContainer data={appointments} />
      )}
    </CustomWrapper>
  );
};

export default PatientAppointments;

const styles = StyleSheet.create({
  subHeading: {
    paddingVertical: heightPercentageToDP(2),
  },
  loader: {
    paddingTop: heightPercentageToDP(2),
  },
});
