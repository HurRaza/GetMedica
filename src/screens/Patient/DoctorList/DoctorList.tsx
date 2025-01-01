import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {useUserStore} from '../../../services/store/userStore';
import {COLORS, IMAGES} from '../../../utils/theme';
import {CustomText} from '../../../components/common/CustomText';
import CustomDropDown from '../../../components/common/CustomDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import SecondaryHeader from '../../../components/header/SecondaryHeader';
import CustomSearchInput from '../../../components/common/CustomSeachInput/CustomSearchInput';
import {getDoctorsList} from '../../../services/firebase/doctor';
import DoctorItemContainer from './components/DoctorItemContainer';
import {signOutFromFirebase} from '../../../services/firebase/auth';
import {useDoctorsStore} from '../../../services/store/doctorStore';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const DoctorList = () => {
  const {user} = useUserStore();
  const [loading, setLoading] = useState(true);
  const {doctors, setDoctors, filteredDoctors, setFilteredDoctors} =
    useDoctorsStore();
  const specializationData = useMemo(() => {
    return [{value: 'all', label: 'All'}, ...TYPEOFSPECIALIZATION];
  }, []);
  const [specialization, setSpecialization] = useState<{
    value: string;
    label: string;
  }>(specializationData[0]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors: any = await getDoctorsList(specialization);
        setDoctors(doctors);
        setFilteredDoctors(doctors);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching doctors:', error.message);
      }
    };
    fetchDoctors();
  }, [specialization]);

  useEffect(() => {
    const filteredDoctor = doctors.filter((doctor: any) =>
      doctor.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredDoctors(filteredDoctor);
  }, [searchText, doctors]);

  const handleSearchSubmit = (e: any) => {
    setSearchText(e.nativeEvent.text);
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
        value={specialization}
        title="Doctor Listing"
        dropdownData={specializationData}
        dropdownChangeText={setSpecialization}
      />
      <CustomSearchInput
        value={searchText}
        onSubmitEditing={handleSearchSubmit}
      />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : (
        <DoctorItemContainer data={filteredDoctors} />
      )}
    </CustomWrapper>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  loader: {
    paddingTop: heightPercentageToDP(2),
  },
});
