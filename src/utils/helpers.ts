import Toast, {ToastPosition, ToastType} from 'react-native-toast-message';
import dayjs from 'dayjs';
import {MutableRefObject} from 'react';
import {Day, WeeklySchedule} from './types/componentType';
import {Timing} from './types/apiResponseType';
import {TYPEOFPRACTICE} from './constants';
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
        console.log(
          `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`,
        );
        return `${date.getHours()}:${String(date.getMinutes()).padStart(
          2,
          '0',
        )}`;
      };
      if (is24Hours) {
        return {
          startTime: '00:00',
          endTime: '23:59',
          day: day.toUpperCase(),
        } as Timing;
      }
      return {
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        day: day.toUpperCase(),
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
    console.log(acc);
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
    console.log(acc);
    return acc;
  }, {} as WeeklySchedule); // Correctly specify the initial accumulator
};

export const getPracticeType = (
  type: 'smallAnimal' | 'largeAnimal' | 'mixedAnimal' | 'exotic',
) => {
  const practiceType = {
    smallAnimal: 'Small Animal',
    largeAnimal: 'Large Animal',
    mixedAnimal: 'Mixed Animal',
    exotic: 'Exotics',
  };

  return practiceType[type] || type;
};

export const getFieldPracticeType = (
  type:
    | 'generalPractice'
    | 'emergency'
    | 'specialist'
    | 'production'
    | 'equine',
) => {
  const fieldOfPracticeType = {
    generalPractice: 'General Practice',
    emergency: 'Emergency and Critical Care',
    specialist: 'Specialist',
    production: 'Production',
    equine: 'Equine',
  };

  return fieldOfPracticeType[type] || type;
};

export const cleanObject = (obj: {}) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null),
  );
};

export const transformArrayIntoMonthlyObjectVetNurse = (
  array: {
    isApplied: boolean;
    isCompleted: boolean;
    isHired: boolean;
    isInvited: boolean;
    date: string;
  }[],
) => {
  return array.reduce((acc: any, item) => {
    acc[dayjs(item.date).format('YYYY-MM-DD')] = {
      isApplied: item?.isApplied,
      isCompleted: item?.isCompleted,
      isHired: item?.isHired,
      isInvited: item?.isInvited,
    };
    return acc;
  }, {});
};

export const transformArrayIntoMonthlyObjectHospital = (
  array: {
    isCompleted: boolean;
    inProgress: boolean;
    upcoming: boolean;
    date: string;
  }[],
) => {
  return array.reduce((acc: any, item) => {
    acc[dayjs(item.date).format('YYYY-MM-DD')] = {
      isApplied: item?.upcoming,
      isCompleted: item?.isCompleted,
      isHired: item?.inProgress,
    };
    return acc;
  }, {});
};
