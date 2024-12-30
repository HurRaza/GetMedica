import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {useUserStore} from '../../../services/store/userStore';
import {IMAGES} from '../../../utils/theme';
import {CustomText} from '../../../components/common/CustomText';
import CustomDropDown from '../../../components/common/CustomDropDown';
import {TYPEOFSPECIALIZATION} from '../../../utils/constants';
import SecondaryHeader from '../../../components/header/SecondaryHeader';
import CustomSearchInput from '../../../components/common/CustomSeachInput/CustomSearchInput';
import {getDoctorsList} from '../../../services/api/doctor';
import DoctorItemContainer from './components/DoctorItemContainer';
import {signOutFromFirebase} from '../../../services/api/auth';
import {useDoctorsStore} from '../../../services/store/doctorStore';

const DoctorList = () => {
  const {user} = useUserStore();
  const {doctors, setDoctors, filteredDoctors, setFilteredDoctors} =
    useDoctorsStore();
  const [specialization, setSpecialization] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const specializationData = useMemo(() => {
    return [{value: 'all', label: 'All'}, ...TYPEOFSPECIALIZATION];
  },[]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctors: any = await getDoctorsList(specialization);
        setDoctors(doctors);
        setFilteredDoctors(doctors);
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
        title="Doctor Listing"
        dropdownData={specializationData}
        dropdownChangeText={setSpecialization}
      />
      <CustomSearchInput
        value={searchText}
        onSubmitEditing={handleSearchSubmit}
      />
      <DoctorItemContainer data={filteredDoctors} />
    </CustomWrapper>
  );
};

export default DoctorList;

const styles = StyleSheet.create({});
