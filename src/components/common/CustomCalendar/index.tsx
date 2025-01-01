import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import weekYear from 'dayjs/plugin/weekYear';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import {
  // heightPercentageToDP as rem,
  widthPercentageToDP as vw,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';

import {RFValue} from 'react-native-responsive-fontsize';
import Header from './Components/Header';
import RenderMonthDay from './Components/RenderMonthDay';
import RenderWeekDay from './Components/RenderWeekDay';
import {useGetQueryData} from '../../../service/hooks/useGetQueryData';
import useUserStore from '../../../service/store/user.store';
import {API_Hospitals, API_Nurse, API_Vets} from '../../../utils/ApiContants';
import useGeneralStore from '../../../service/store/general.store';
import {ApiResponse} from '../../../utils/types/apiResponseType';
import {
  transformArrayIntoMonthlyObjectHospital,
  transformArrayIntoMonthlyObjectVetNurse,
} from '../../../utils/helpers';

dayjs.extend(isoWeek);
dayjs.extend(weekYear);

const CustomCalendar: FC<any> = ({handleApiCall = {}, type}) => {
  const {userDetails} = useUserStore();
  const {setTriggerMyJobs} = useGeneralStore();
  const monthlyDateRef = useRef<any>(dayjs());

  const {width, height} = Dimensions.get('screen');

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isWeekView, setIsWeekView] = useState(false);
  const apiObjectBasedOnRole = {
    vet: API_Vets.indicaitedDates,
    nurse: API_Nurse.indicaitedDates,
    hospital: API_Hospitals.indicaitedDates,
  };
  const calendarHeight = useSharedValue(height * 0.38);
  const {data, refetch} = useGetQueryData<ApiResponse<any>>({
    endPoint: apiObjectBasedOnRole[userDetails?.role || 'hospital'],
    query: {
      date: currentDate.toDate(),
      calendarType: isWeekView ? 'weekly' : 'monthly',
      type: type,
    },

    rest: {
      select: data => {
        return {
          data:
            userDetails.role === 'hospital'
              ? transformArrayIntoMonthlyObjectHospital(data?.data as any)
              : transformArrayIntoMonthlyObjectVetNurse(data?.data as any),
        };
      },
    },
  });
  console.log(data, 'DATA');
  const handleToggleView = (toValue: number) => {
    calendarHeight.value = withSpring(toValue, {damping: 30, stiffness: 10});

    setIsWeekView(toValue === height * 0.2);
  };
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const handlePrevWeek = () => {
    const newWeek = currentDate.clone().subtract(1, 'week');

    setCurrentDate(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = currentDate.clone().add(1, 'week');

    setCurrentDate(newWeek);
  };

  useLayoutEffect(() => {
    handleToggleView(isWeekView ? height * 0.38 : height * 0.2);
  }, []);

  const handleDayPress = useCallback(
    async (day: any) => {
      let date: any = dayjs(day)?.format('YYYY-MM-DD');
      setSelectedDate(date);
      //Changing the Global State which will trigger the Component to re-render to Api Call of the Four
      //used For the NurseVetMyJobs 4 child component
      console.log(day, '');
      setTriggerMyJobs({trigger: true, date});
    },
    [handleApiCall],
  );

  const renderHeader = () => {
    return (
      <Header
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        handleNextMonth={handleNextMonth}
        handleNextWeek={handleNextWeek}
        handlePrevMonth={handlePrevMonth}
        handlePrevWeek={handlePrevWeek}
        isWeekView={isWeekView}
      />
    );
  };

  const renderDayNames = useMemo(
    () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [],
  );

  const generateMonthDays = useMemo(() => {
    const startOfMonth = currentDate
      .clone()
      .startOf('month')
      .startOf('isoWeek');
    const endOfMonth = currentDate.clone().endOf('month').endOf('isoWeek');
    const days = [];

    for (
      let day = startOfMonth;
      day.isBefore(endOfMonth);
      day = day.add(1, 'day')
    ) {
      days.push(day.clone());
    }

    return days;
  }, [currentDate]);
  const renderWeekDays = useMemo(() => {
    const startOfWeek = currentDate.clone().startOf('isoWeek');
    const endOfWeek = currentDate.clone().endOf('isoWeek');
    const days = [];

    for (
      let day = startOfWeek;
      day.isBefore(endOfWeek);
      day = day.add(1, 'day')
    ) {
      days.push(day.clone());
    }

    return days;
  }, [currentDate]);

  const renderMonthDay = useCallback(
    ({item, index}: any) => {
      return (
        <RenderMonthDay
          currentDate={currentDate}
          data={data?.data}
          handleDayPress={handleDayPress}
          item={item}
          selectedDate={selectedDate}
        />
      );
    },
    [selectedDate, currentDate, data?.data],
  );

  const renderWeekDay = useCallback(
    ({item, index}: any) => {
      return (
        <RenderWeekDay
          currentDate={currentDate}
          data={data?.data}
          handleDayPress={handleDayPress}
          item={item}
          selectedDate={selectedDate}
        />
      );
    },
    [selectedDate, currentDate, data?.data],
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.renderCalender}>
        {renderHeader()}

        <FlatList
          data={isWeekView ? renderWeekDays : generateMonthDays}
          renderItem={isWeekView ? renderWeekDay : renderMonthDay}
          keyExtractor={item => item.format('YYYY-MM-DD')}
          key={isWeekView ? 'week' : 'month'}
          numColumns={7}
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.weekContainer}>
              {renderDayNames.map((dayName, index) => (
                <View
                  key={index}
                  style={[
                    styles.monthDayContainer,
                    // {paddingVertical: vw(1)},
                  ]}>
                  <Text style={styles.dayName}>{dayName}</Text>
                </View>
              ))}
            </View>
          }
        />

        <Pressable
          onTouchEnd={() => {
            handleToggleView(isWeekView ? height * 0.38 : height * 0.2);
          }}
          style={{
            zIndex: 9999,
            marginTop: vw(1),
            paddingVertical: -3,
            width: widthPercentageToDP(25),
            borderRadius: 50,
            height: RFValue(3),
            backgroundColor: COLORS.primary,
            alignSelf: 'center',
          }}></Pressable>
      </View>
    </View>
  );
};
export default CustomCalendar;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: vw(3.2),
    fontWeight: 'bold',
    color: '#000',
  },
  CalenderArrow: {
    height: vw(3.5),
    width: vw(3.5),
    zIndex: 99999,
  },
  weekdayContainer: {
    alignItems: 'center',
    // paddingVertical: vw(3.2),
    // marginVertical: vw(2),
    // gap: vw(3),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: vw(2),
    paddingVertical: vw(2.55),
    marginVertical: vw(0.5),
    width: Dimensions.get('screen').width / 10.5,
    marginHorizontal: vw(1.3),
  },
  renderCalender: {
    borderRadius: vw(6),
    width: Dimensions.get('screen').width / 1.1,
    backgroundColor: COLORS.white,
    paddingVertical: vw(1),
    paddingTop: vw(2),
  },
  CalenderToggle: {
    width: vw(10),
    alignSelf: 'center',
    paddingBottom: vw(4),
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: vw(1),
    paddingVertical: vw(0.4),
  },
  monthDayContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: vw(2.55),
    marginVertical: vw(0.5),
    width: Dimensions.get('screen').width / 10.5,
    borderRadius: vw(40),
    marginHorizontal: vw(1.3),
    // backgroundColor: 'red',
    // paddingTop: vw(1),
  },
  monthlyCurrentDay: {},
  selectedDay: {
    backgroundColor: COLORS.primary,
    borderRadius: vw(50),
  },
  currentDate: {
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderRadius: vw(50),
  },
  dayName: {
    fontSize: vw(3.3),
    color: COLORS.NeutralGrey60,
    // fontFamily: FONT.dmSansSemiBold,
  },
  dayNumber: {
    fontSize: vw(3.3),
    color: 'black',
    // fontFamily: FONT.dmSansSemiBold,
  },
  infoCircle: {height: vw(6), width: vw(6)},
});
