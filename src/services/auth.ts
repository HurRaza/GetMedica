import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import { showToast } from '../utils/helper';


export const signupWithFirebase = (data: any) => {
  auth()
    .createUserWithEmailAndPassword(data?.email, data?.password)
    .then(res => {
      firestore()
        .collection(data?.role)
        .doc(res.user.uid)
        .set(data?.role ==  'doctor' ? {
          email: data?.email,
          name: data?.name,
          role: data?.role,
          specialization: data?.specialization,
        } : {
          email: data?.email,
          name: data?.name,
          role: data?.role,
        })
        .then(() => {
          console.log('User created successfully!');
          showToast({message:"User created successfully!",position:'bottom'})
        })
        .catch(error => {
          console.error('Error creating user', error);
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        showToast({type:"error", message:"That email address is already in use!",position:'bottom'})
      } else if (error.code === 'auth/invalid-email') {
        showToast({type:"error", message:"That email address is invalid!",position:'bottom'})
      } else if (error.code === 'auth/weak-password') {
        showToast({type:"error", message:"Password must be atleast 6 characters long",position:'bottom'})
      } else {
        showToast({type:"error", message:"Somthing went wrong Oops",position:'bottom'})
      }
    });
};

export const loginWithFirebase = async (data: any) => {
  const res = await firestore().collection(data?.role).where('email','==',data?.email).get();
  if (res.empty){
    return showToast({type:"error", message:"Account Doesn't Exists",position:'bottom'})
  }
  auth()
    .signInWithEmailAndPassword(data?.email, data?.password)
    .then((res) => {
      res.user.uid;
      console.log(res)
      showToast({message:"User logged successfully!",position:'bottom'})
    })    
    .catch(error => {
      console.error('Error in login user', error);
      if (error.code === 'auth/invalid-credential') {
        showToast({type:"error", message:"Invalid Credentials",position:'bottom'})
      } else {
        showToast({type:"error", message:"Somthing went wrong Oops",position:'bottom'})
      }
    });
};



