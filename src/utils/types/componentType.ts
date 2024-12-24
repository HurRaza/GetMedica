export type RoleType = 'doctor' | 'patient' | undefined;
export type ScreenType = 'Signup' | 'ForgotPassword' | 'Login';
export type DropDownType = {
  label: string;
  value: any;
};

export type AccountStatusType =
  | 'professionalDetails'
  | 'verification'
  | 'personalDetails'
  | 'active'
  | 'availabilityDetails'
  | 'paymentDetails'
  | 'timings'
  | 'pendingApproval'
  | 'inComplete'
  | 'disable'
  | undefined;

export type ImageObjectType = {
  name: string;
  uri: string;
  type: 'image/jpeg' | 'pdf' | 'application/pdf';
};
export type DaySchedule = {
  is24Hours: boolean;
  startTime: Date | string | undefined;
  endTime: Date | string | undefined;
};

export type WeeklySchedule = {
  [day in Day]?: DaySchedule[];
};

export type MixedAnimalType = {
  largeAnimal: number;
  smallAnimal: number;
  exotics: number;
};
export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type CreateJobSubType = {
  data?: {
    hourlyFee: string;
    jobDescription: string;
    jobTitle: string;
    jobType: DropDownType;
    typeOfPractice: DropDownType;
    fieldOfPractice?: DropDownType;
    noOfVets: string;
  };
  timingArray?: Array<{
    date: Date;
    endTime: Date;
    startTime: Date;
  }>;
  mixedAnimalData?: MixedAnimalType;
};
