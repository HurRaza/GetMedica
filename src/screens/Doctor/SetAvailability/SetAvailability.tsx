import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {IMAGES} from '../../../utils/theme';
import {useUserStore} from '../../../services/store/userStore';
import {CustomButton} from '../../../components/common/CustomButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AvailabilityDetails from './components/AvailabilityDetails';
import {WeeklySchedule} from '../../../utils/types/componentType';
import {
  showToast,
  transformAvailabilityDataToArray,
  transformAvailabilityDataToWeeklySchedule,
} from '../../../utils/helpers';
import {setTimeScheduleInFirebase} from '../../../services/firebase/doctor';
import {signOutFromFirebase} from '../../../services/firebase/auth';

const SetAvailability = () => {
  const {user} = useUserStore();
  const availabilityRef = useRef<WeeklySchedule>(
    transformAvailabilityDataToWeeklySchedule(user?.availability || [], 'date'),
  );

  const handlePost = async () => {
    const manipulatedData = transformAvailabilityDataToArray(availabilityRef);
    const res = await setTimeScheduleInFirebase(user.uid, manipulatedData);
    if (!res?.success) {
      showToast({
        type: 'error',
        message: res?.error,
        position: 'bottom',
      });
      return;
    }
    showToast({message: 'Availability Time Updated!', position: 'bottom'});
    const setUser = useUserStore.getState().setUser;
    setUser({
      ...user,
      currentTiming: res.scheduleId,
      availability: manipulatedData,
    });
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
      <View style={styles.mainContainer}>
        <AvailabilityDetails availabilityRef={availabilityRef} />
        <CustomButton
          // loading={isPending}
          title={'Save Changes'}
          onPress={handlePost}
        />
      </View>
    </CustomWrapper>
  );
};

export default SetAvailability;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: heightPercentageToDP(3),
    marginBottom: heightPercentageToDP(2),
  },
});
