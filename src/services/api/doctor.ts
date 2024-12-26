import firestore from '@react-native-firebase/firestore';
import {showToast} from '../../utils/helper'

export const availabilityInFirebase = async (
  availabilityData: any[],
  userId: string,
) => {
  try {
    for (const item of availabilityData) {
      if (item.startTime === 'NaN:NaN' || item.endTime === 'NaN:NaN') {
        throw new Error(
          'Invalid availability: Start time or End time cannot be NaN.',
        );
      }
    }

    const doctorDocRef = firestore().collection('doctor').doc(userId);
    const doctorSnapshot = await doctorDocRef.get();

    if (doctorSnapshot.exists) {
      await firestore().collection('doctor').doc(userId).update({
        availability: availabilityData,
      });
      showToast({
        message: 'Availability updated successfully!',
        type: 'success',
        position: 'bottom',
      });
    } else {
      throw new Error('Doctor not found.');
    }
  } catch (error: any) {
    showToast({
      message: error.message,
      type: 'error',
      position: 'bottom',
    });
  }
};