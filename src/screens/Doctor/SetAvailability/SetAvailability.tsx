import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import CustomWrapper from '../../../components/wrappers/CustomWrapper';
import CustomHeader from '../../../components/header/CustomHeader';
import {IMAGES} from '../../../utils/theme';
import {useStore} from '../../../services/store/store';
import {CustomButton} from '../../../components/common/CustomButton';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AvailabilityDetails from './components/AvailabilityDetails';
import {WeeklySchedule} from '../../../utils/types/componentType';
import {
  transformAvailabilityDataToArray,
  transformAvailabilityDataToWeeklySchedule,
} from '../../../utils/helpers';
import {availabilityInFirebase} from '../../../services/api/doctor';

const SetAvailability = () => {
  const {user} = useStore();

  const availabilityRef = useRef<WeeklySchedule>(
    transformAvailabilityDataToWeeklySchedule(user?.timings || [], 'date'),
  );
  const handlePost = async () => {
    console.log(availabilityRef.current, 'asdsssss');
    const manipulatedData = transformAvailabilityDataToArray(availabilityRef);
    console.log('m', manipulatedData);
    console.log('user', user.uid);
    await availabilityInFirebase(manipulatedData, user.uid);
  };
  return (
    <CustomWrapper>
      <CustomHeader
        title={user.name}
        subtitle="Welcome"
        profilePic={IMAGES.avatar}
        icon={'notifications-outline'}
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
