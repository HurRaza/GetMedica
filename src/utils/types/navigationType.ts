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
  ForgotPassword: undefined;
  SetNewPassword: undefined;
  VerifyOtp: {screenType: ScreenType; role: RoleType; email: string};
  Signup: {role: RoleType};
  CompleteProfileMultiStep: undefined;
  JobDetails: {id: number; jobType?: 'notApplied' | undefined};
  NurseVetBottomTab: {};
  HospitalBottomTab: {};
  ProfileStatus: undefined;
  ViewProfile: undefined;
  SingleChat: {name: string; id: string; profile_pic?: string};
  HospitalAllJobs: {id: number};
  Map: undefined;
  ProfileDetail: undefined;
  // HospitalDetailScreen: undefined;
  PaymentDetails: CreateJobSubType;
  EditPersonalDetails: undefined;
  EditProfessionalDetails: undefined;
  EditHospitalDetails: undefined;
  EditTimingAvailabilityDetails: undefined;
  CreateJob: undefined;
  PreviewJob: CreateJobSubType & {
    selectedBoost?: {boostAmount?: any; price?: any} | undefined;
  };
  BoastJob: CreateJobSubType & {
    selectedBoost?: {boostAmount?: any; price?: any} | undefined;
  };
  ViewUserDetails: {id: number};
  Review: {id: number};
  InviteToJob: {userId?: number};
  ReviewSeeAll: {id: number};
};
