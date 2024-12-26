import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../components/wrappers/CustomWrapper';
import CustomHeader from '../../components/header/CustomHeader';
import {useStore} from '../../services/store/store';
import {IMAGES} from '../../utils/theme';

const DoctorList = () => {
  const {user} = useStore();
  return (
    <CustomWrapper>
      
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.avatar}
        icon={'notifications-outline'}
      />

    </CustomWrapper>
  );
};

export default DoctorList;

const styles = StyleSheet.create({});
