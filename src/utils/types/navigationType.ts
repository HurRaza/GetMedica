// import {JobType} from './apiResponseType';
import {
  CreateJobSubType,
  MixedAnimalType,
  RoleType,
  ScreenType,
} from './componentType';

export type RootStackNavigationType = {
  SelectRole: undefined;
  Login: {role: RoleType};
  Signup: {role: RoleType};
  PatientNavigator: undefined;
  DoctorNavigator: undefined;
  SetAvailability: undefined;
  DoctorAppointments:undefined;
  PatientStack:undefined;
  PatientAppointments:undefined;
  DoctorList:undefined;
  BookAppointments:undefined;
};

