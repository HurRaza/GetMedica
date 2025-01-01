import {StyleSheet, Text, View} from 'react-native';
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
  updateAppointmentStatus,
} from '../../../services/firebase/appointment';

const DoctorAppointments = () => {
  const {user} = useUserStore();
  const [status, setStatus] = useState<{
    value: string;
    label: string;
  }>(TYPESOFSTATUS[0]);
  const [appointments, setAppointments] = useState<any>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const appointment: any = await getAppointmentByDoctor(user.uid, status);
        setAppointments(appointment);
      } catch (error: any) {
        console.error('Error fetching appointment:', error.message);
      }
    };
    fetchDoctors();
  }, [status]);

  const handleStatusChange = (id: string, status: string) => {
    updateAppointmentStatus(id, status);
    status == 'approved'
      ? setStatus(TYPESOFSTATUS[2])
      : setStatus(TYPESOFSTATUS[3]);
  };

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

      <AppointmentItemContainer
        data={appointments}
        handleStatusChange={handleStatusChange}
      />
    </CustomWrapper>
  );
};

export default DoctorAppointments;

const styles = StyleSheet.create({
  subHeading: {
    paddingVertical: heightPercentageToDP(2),
  },
});
