import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../../utils/helper';
import {useStore} from '../store/store';
import { navigateReset } from '../../utils/navigation';

export const signupWithFirebase = async (data: any) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(data?.email, data?.password);

    await firestore()
      .collection(data?.role)
      .doc(res.user.uid)
      .set(
        data?.role === 'doctor' ? {
          email: data?.email,
          name: data?.name,
          role: data?.role,
          specialization: data?.specialization.value,
        } : {
          email: data?.email,
          name: data?.name,
          role: data?.role,
        }
      );

    const setUser = useStore.getState().setUser;
    setUser({
      uid: res.user.uid,
      email: data?.email,
      name: data?.name,
      role: data?.role,
      ...(data.role === 'doctor' && {specialization: data?.specialization.value}),
    });

    console.log('User created successfully!');
    showToast({ message: "User created successfully!", position: 'bottom' });
    
    return data.role == 'doctor' ? navigateReset('DoctorNavigator') : navigateReset('PatientNavigator')

  } catch (error:any) {
    console.error('Error during signup', error);

    if (error.code === 'auth/email-already-in-use') {
      showToast({ type: "error", message: "That email address is already in use!", position: 'bottom' });
    } else if (error.code === 'auth/invalid-email') {
      showToast({ type: "error", message: "That email address is invalid!", position: 'bottom' });
    } else if (error.code === 'auth/weak-password') {
      showToast({ type: "error", message: "Password must be at least 6 characters long", position: 'bottom' });
    } else {
      showToast({ type: "error", message: "Something went wrong Oops", position: 'bottom' });
    }
  }
};

export const loginWithFirebase = async (data: any) => {
  try {
    const loginRes = await firestore().collection(data?.role).where('email', '==', data?.email).get();

    if (loginRes.empty) {
      showToast({ type: "error", message: "Account Doesn't Exist", position: 'bottom' });
      return;
    }

    const res = await auth().signInWithEmailAndPassword(data?.email.trim(), data?.password);

    const userDoc = await firestore()
      .collection(data?.role)
      .doc(res.user.uid)
      .get();

    const userData = userDoc.data();

    const setUser = useStore.getState().setUser;
    setUser({
      uid: res.user.uid,
      email: userData?.email,
      name: userData?.name,
      role: userData?.role,
      ...(userData?.specialization && { specialization: userData.specialization }),
    });

    showToast({ message: "User logged in successfully!", position: 'bottom' });
    
    return data.role == 'doctor' ? navigateReset('DoctorNavigator') : navigateReset('PatientNavigator')

  } catch (error:any) {
    console.error('Error during login', error);
    if (error.code === 'auth/invalid-credential') {
      showToast({ type: "error", message: "Invalid Credentials", position: 'bottom' });
    } else {
      showToast({ type: "error", message: "Something went wrong Oops", position: 'bottom' });
    }
  }
};
