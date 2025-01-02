import Toast, {ToastPosition, ToastType} from 'react-native-toast-message';
import dayjs from 'dayjs';
import {MutableRefObject} from 'react';
import {Day, WeeklySchedule} from './types/componentType';
import {Timing} from './types/apiResponseType';
import {DaysOfWeek, TYPEOFPRACTICE} from './constants';
import {G} from 'react-native-svg';

export const showToast = ({
  type,
  message,
  position,
}: {
  type?: ToastType;
  message: string;
  position?: ToastPosition;
}) => {
  try {
    Toast.show({
      type: type || 'success',
      text1: message,
      position,
    });
  } catch (error) {
    console.log('SHOW TOAST ERROR', error);
  }
};

export const getNextDates = (availableDays: any) => {
  const today = new Date();

  const availableIndices = availableDays.map((day: any) =>
    DaysOfWeek.indexOf(day),
  );

  const nextDates = [];
  for (let i = 1; i <= 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    const dayIndex = futureDate.getDay();

    if (availableIndices.includes(dayIndex)) {
      nextDates.push({
        day: DaysOfWeek[dayIndex],
        date: futureDate.toLocaleDateString('fr-CA'),
      });
    }
  }
  return nextDates;
};

export const formatTime12Hour = (time: string): string => {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; 
  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

export const generateTimeSlots = (startTime: string, endTime: string) => {
  const slots = [];
  let [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  while (startHour < endHour ||(startHour === endHour && startMinute < endMinute)) {
    const time = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
    slots.push(time);

    startMinute += 30;
    
    if (startMinute >= 60) {
      startMinute -= 60;
      startHour += 1;
    }
  }
  return slots;
};

export const addMinutesToTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, mins);
  date.setMinutes(date.getMinutes() + minutes);

  const endHours = String(date.getHours()).padStart(2, '0');
  const endMinutes = String(date.getMinutes()).padStart(2, '0');
  return `${endHours}:${endMinutes}`;
};

export const convertDateToUSLocale =(date: any) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

export const getDetailFromRef = async(userRef:any)=>{
  const doc = await userRef.get()
  const data = await doc.data()
  return data;
}

export const formatTime = (value: Date, format?: 'hh:mm:ss') => {
  // console.log("formatTime", value);
  try {
    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    const seconds = value.getSeconds().toString().padStart(2, '0');

    if (format == 'hh:mm:ss') {
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${value.getHours() % 12 || 12}:${minutes} ${
      value.getHours() >= 12 ? 'PM' : 'AM'
    }`;
  } catch (error) {
    console.log('ERRRO', error);
  }
};

export const formatDate = (value: Date, format?: 'yyyy-mm-dd') => {
  try {
    let year = value.getFullYear();
    let month = value.getMonth() + 1;
    let day = value.getDate();

    if (format == 'yyyy-mm-dd') {
      return `${year}-${month.toString().padStart(2, '0')}-${day
        .toString()
        .padStart(2, '0')}`;
    }

    return `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year}`;
  } catch (error) {
    console.log('ERRRO', error);
  }
};

export const transformAvailabilityDataToArray = (
  availabilityRef: MutableRefObject<WeeklySchedule>,
): Timing[] => {
  return Object.entries(availabilityRef.current).flatMap(([day, times]) =>
    times.map(({startTime, endTime, is24Hours}: any) => {
      const formatTime = (isoString: any) => {
        const date = new Date(isoString);
        
        return `${date.getHours()}:${String(date.getMinutes()).padStart(
          2,
          '0',
        )}`;
      };
      if (is24Hours) {
        return {
          startTime: '00:00',
          endTime: '23:59',
          day: day,
        } as Timing;
      }
      return {
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        day: day
      } as Timing;
    }),
  );
};

export const transformAvailabilityDataToWeeklySchedule = (
  availability: Timing[],
  format: 'string' | 'date' = 'string',
): WeeklySchedule => {
  return availability?.reduce((acc, curr) => {
    const day = (curr.day.charAt(0).toUpperCase() +
      curr.day.slice(1).toLowerCase()) as Day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day]!.push({
      startTime:
        format == 'string'
          ? curr.startTime
          : new Date(dayjs().format('YYYY-MM-DD') + 'T' + curr.startTime),
      endTime:
        format == 'string'
          ? curr.endTime
          : new Date(dayjs().format('YYYY-MM-DD') + 'T' + curr.endTime),
      is24Hours: curr.startTime === '00:00:00' && curr.endTime === '23:59:00',
    });
    return acc;
  }, {} as WeeklySchedule); // Correctly specify the initial accumulator
};

export const transformAvailabilityDateToWeeklySchedule = (
  availability: Timing[],
): WeeklySchedule => {
  return availability?.reduce((acc, curr) => {
    const day = (curr.day.charAt(0).toUpperCase() +
      curr.day.slice(1).toLowerCase()) as Day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day]!.push({
      startTime: curr.startTime,
      endTime: curr.endTime,
      is24Hours: curr.startTime === '00:00:00' && curr.endTime === '23:59:00',
    });
    return acc;
  }, {} as WeeklySchedule); // Correctly specify the initial accumulator
};

// export const getPracticeType = (
//   type: 'smallAnimal' | 'largeAnimal' | 'mixedAnimal' | 'exotic',
// ) => {
//   const practiceType = {
//     smallAnimal: 'Small Animal',
//     largeAnimal: 'Large Animal',
//     mixedAnimal: 'Mixed Animal',
//     exotic: 'Exotics',
//   };

//   return practiceType[type] || type;
// };

// export const getFieldPracticeType = (
//   type:
//     | 'generalPractice'
//     | 'emergency'
//     | 'specialist'
//     | 'production'
//     | 'equine',
// ) => {
//   const fieldOfPracticeType = {
//     generalPractice: 'General Practice',
//     emergency: 'Emergency and Critical Care',
//     specialist: 'Specialist',
//     production: 'Production',
//     equine: 'Equine',
//   };

//   return fieldOfPracticeType[type] || type;
// };

// export const cleanObject = (obj: {}) => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([_, value]) => value != null),
//   );
// };

// export const transformArrayIntoMonthlyObjectVetNurse = (
//   array: {
//     isApplied: boolean;
//     isCompleted: boolean;
//     isHired: boolean;
//     isInvited: boolean;
//     date: string;
//   }[],
// ) => {
//   return array.reduce((acc: any, item) => {
//     acc[dayjs(item.date).format('YYYY-MM-DD')] = {
//       isApplied: item?.isApplied,
//       isCompleted: item?.isCompleted,
//       isHired: item?.isHired,
//       isInvited: item?.isInvited,
//     };
//     return acc;
//   }, {});
// };

// export const transformArrayIntoMonthlyObjectHospital = (
//   array: {
//     isCompleted: boolean;
//     inProgress: boolean;
//     upcoming: boolean;
//     date: string;
//   }[],
// ) => {
//   return array.reduce((acc: any, item) => {
//     acc[dayjs(item.date).format('YYYY-MM-DD')] = {
//       isApplied: item?.upcoming,
//       isCompleted: item?.isCompleted,
//       isHired: item?.inProgress,
//     };
//     return acc;
//   }, {});
// };
