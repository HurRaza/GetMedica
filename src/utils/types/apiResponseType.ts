import {AccountStatusType, Day, RoleType} from './componentType';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
export interface InfiniteQueryType<T> {
  pageParam: number[];
  pages: T[];
}
export type ImageUploadResponseType = {url: string; message: string};
export interface ErrorType {
  response: {
    data: {
      message: string;
    };
  };
}
//USER
export type AuthApiReponse = {
  user: UserDetailsType;

  access_token?: string;
};

export type VerifyOtpResponseType = {
  user: UserDetailsType;
  access_token: string;
  message: string;
};
export type GenderType = 'male' | 'female';
//USER DETAILS

export type UserDetailsType = {
  id: number;
  fullname?: string;
  email: string;
  status: AccountStatusType;
  role: RoleType;
  ratingsBreakdown: RatingBreadownType;
  providerType?: undefined;
  location?: string;
  cordintates?: any;
  phoneNumber?: string;
  profilePicture?: string;
  hospital?: HospitalDetailType;
  vet?: VetDetailTyoe;
  nurse?: NurseDetailTyoe;
  payment?: any;
  // personalDetail?: PersonalDetailType;
  professionalDetail?: ProfessionalDetailType;
  timings?: Timing[];

  avgRating: number;
  reviews: {}[];
};
export type Timing = {
  day: Day;
  startTime: Date | string | undefined;
  endTime: Date | string | undefined;
};
export interface HospitalDetailType {
  id?: number;
  abn: number;
  website?: string;
  typeOfPractice: PracticeEnumHospital;
  fieldOfPractice: SmallAnimal | LargeAnimal;
  mixed_percentages?: number[];
}
export interface VetDetailTyoe {
  id: number;
  dob: string;
  gender: GenderType;
  about: string;
}
export interface NurseDetailTyoe {
  id: number;
  dob: string;
  gender: GenderType;
  about: string;
}
export type PracticeEnumHospital =
  | 'smallAnimal'
  | 'largeAnimal'
  | 'mixed'
  | 'exotic';

export interface ProfessionalDetailType {
  id?: number;
  veterinaryLicenseNo?: string;
  yearsOfExperience: string;
  qualification: string;
  typeOfPractice: PracticeEnumHospital;
  fieldOfPractice?: (SmallAnimal | LargeAnimal)[];
  radiologyLicenseNo?: string;
  expiryDate: string;
  microchipLicenseNo?: string;
  insuranceDocument: string;
  resume: string;
}
export interface PersonalDetailType {
  id?: number;
  about: string;
  dob?: string;
  fullname: string;
  typeOfPractice: PracticeEnumHospital;
  gender?: (SmallAnimal | LargeAnimal)[];
  location: string;
  expiryDate: string;
  phoneNumber: string;
  profilePicture: string;
}

export type SmallAnimal = 'GeneralPractice' | 'Emergency' | 'Specialist';

export type LargeAnimal = 'Production' | 'Equine';
export type RatingBreadownType = {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
};

export type CreateJobResponseType = {
  job: {
    type: any;
    title: string;
    description: string;
    noOfVets: number;
    typeOfPractice: string;
    fieldOfPractice: string;
    hourlyFee: number;
    status: string;
    hospital: {
      id: number;
    };
    id: number;
    crisisShift: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

// export type CreateShiftResponseType = {
//   shifts: Array<{
//     startTimeDate: Date;
//     endTimeDate: Date;
//     status: string;
//     job: {
//       id: number;
//       type: string;
//       title: string;
//       description: string;
//       noOfVets: number;
//       typeOfPractice: string;
//       fieldOfPractice: string;
//       hourlyFee: any;
//       status: string;
//       crisisShift: false;
//       createdAt: Date;
//       updatedAt: Date;
//       hospital: {
//         id: number;
//         abn: string;
//         website: any;
//         typeOfPractice: any;
//         fieldOfPractice: any;
//         mixed_percentages: any;
//         createdAt: Date;
//         updatedAt: Date;
//       };
//     };
//     id: number;
//     extraHrs: any;
//     isAllHired: boolean;
//     createdAt: Date;
//     updatedAt: Date;
//   }>;
// };

export interface User {
  id: number;
  fullname: string;
  profilePicture: string;
}

export interface Hospital {
  id: number;
  user: User;
}

export interface VETJOBS {
  id: number;
  type: string; // e.g., "vet"
  hourlyFee: string; // Stored as a string representing a monetary value
  crisisShift: boolean;
  typeOfPractice: string; // e.g., "smallAnimal"
  noOfVets: number;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  hospital: Hospital;
}

export interface HOSPITAL_HOME_DOCTORS {
  user: {
    id: number;
    fullname: string;
    email: string;
    role: string;
    profilePicture: string;
    professionalDetail: {
      id: number;
      yearsOfExperience: number;
      qualification: string;
      typeOfPractice: 'smallAnimal' | 'largeAnimal' | 'mixedAnimal' | 'exotic';
    };
  };
  avgRating: number;
  distance: number;
}

type ProfessionalDetail = {
  yearsOfExperience: number;
  qualification: string;
};

//Job Details
type JobDetailUser = {
  id: number;
  fullname: string;
  email: string;
  profilePicture: string;
  professionalDetail: ProfessionalDetail;
};

export type Applicant = {
  id: number;
  applicationStatus: string;
  user: JobDetailUser;
};

type Shift = {
  id: number;
  startTimeDate: Date;
  endTimeDate: Date;
  status: string;
  applicants: Applicant[];
};

export type JobDetailResponseType = {
  id: number;
  type: string;
  title: string;
  description: string;
  noOfVets: number;
  typeOfPractice: string;
  fieldOfPractice: string;
  hourlyFee: string;
  hospital: Hospital;
  // shifts: {applicants: Applicant[]}[];
  status: JobStatusType;
  crisisShift: boolean;
  createdAt: Date;
  updatedAt: Date;
  shifts: {title: string; data: Shift[]}[];
};

export interface GetMyJobsResponseType extends JobDetailResponseType {
  startTime: Date;
  endTime: Date;
}
export type JobStatusType = 'upcoming' | 'inprogress' | 'completed';

export type AllHospitalJobsResponseType = {};
export type InviteToShiftResponseType = {
  message: string;
  invitedShifts: number[];
};
// export type HireUserToShiftResponseType = {

// }
