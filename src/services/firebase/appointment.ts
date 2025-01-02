import firestore from '@react-native-firebase/firestore';
import { addMinutesToTime, showToast } from '../../utils/helpers';

export const bookAppointment = async (data:any)=>{
    try{
      firestore().collection('appointments').doc().set({
        patientId: data.patientId,
        doctorId:data.doctorId,
        patientRef:firestore().collection('users').doc(data.patientId),
        doctorRef:firestore().collection('users').doc(data.doctorId),
        day:data.day,
        date:data.date,
        startTime:data.time,
        endTime:addMinutesToTime(data?.time,30),
        reason:data.reason,
        status:"pending",
        createdAt: new Date().toLocaleString()
      })

      return {success:true}
    }
    catch(error:any){
        return {success:false,error:error.message}
    }
}
  
export const getAppointmentByPatient = async (
  patientId: string,
  status?: {value: string; label: string} | null,
) => {
  try {
    let appointmentRef = firestore()
      .collection('appointments')
      .where('patientId', '==', patientId);

    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }
    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getAppointmentByDoctor = async (
  doctorId: string,
  status?: {value: string; label: string} | null,
) => {
  try {
    let appointmentRef = firestore()
      .collection('appointments')
      .where('doctorId', '==', doctorId);

    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }
    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const getAppointmentsbyMonth = async (
  id: string,
  status?: {value: string; label: string},
  month?: string
) => {
  try {
     let appointmentRef = firestore()
      .collection('appointments')
      .where('doctorId', '==', id);
   
    if (status && status.value !== 'all') {
      appointmentRef = appointmentRef.where('status', '==', status.value);
    }

    if (month) {
      const startOfMonth = `${month}-01`
      const endOfMonth = `${month}-31`

      appointmentRef = appointmentRef
        .where('date', '>=', startOfMonth)
        .where('date', '<=', endOfMonth);
    }

    const appointmentDoc = await appointmentRef.get();
    if (!appointmentDoc.empty) {
      const appointments = appointmentDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return appointments;
    } else {
      showToast({
        message: 'No Appointments Found',
        type: 'info',
        position: 'bottom',
      });
      return [];
    }
  } catch (error) {
    console.error('Error Fetching Appointments:', error);
    showToast({
      message: 'Failed to Fetch Appointments.',
      type: 'error',
      position: 'bottom',
    });
  }
};

export const updateAppointmentStatus = async (appointmentId:string,status:string)=>{
  try{
    await firestore().collection('appointments').doc(appointmentId).update({
      status:status,
      updateAt: new Date().toLocaleString()
    })
    showToast({
      message: 'Status Update Successfully.',
      position: 'bottom',
    });
    return{success:true}

  }
  catch(error:any){
    console.log("Error in update appointment status",error.message)
    showToast({
      message: 'Failed to update appointment status.',
      type: 'error',
      position: 'bottom',
    });
    return{success:false}
  }
}

