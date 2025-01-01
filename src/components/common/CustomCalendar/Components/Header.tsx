import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IMAGES} from '../../../../utils/theme';
import dayjs from 'dayjs';
import {
  // heightPercentageToDP as rem,
  widthPercentageToDP as vw,
} from 'react-native-responsive-screen';
import {CustomIcon} from '../../CustomIcon';
interface headerProps {
  isWeekView: boolean;
  setCurrentDate: any;
  currentDate: any;
  handlePrevWeek: () => void;
  handlePrevMonth: () => void;
  handleNextWeek: () => void;
  handleNextMonth: () => void;
}

const Header = ({
  isWeekView,
  currentDate,
  setCurrentDate,
  handlePrevMonth,
  handlePrevWeek,
  handleNextWeek,
  handleNextMonth,
}: headerProps) => {
  return (
    <View style={styles.header}>
      <>
        <CustomIcon
          type="AntDesign"
          icon="left"
          onPress={isWeekView ? handlePrevWeek : handlePrevMonth}
        />

        <View>
          <Text style={styles.headerTitle}>
            {currentDate?.format('MMMM YYYY')}
          </Text>
        </View>

        <CustomIcon
          type="AntDesign"
          icon="right"
          onPress={isWeekView ? handleNextWeek : handleNextMonth}
        />
      </>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(8),
    paddingVertical: vw(3.3),

    // paddingBottom: vw(2),
    // width: Dimensions.get('screen').width,
    // paddingBottom: vw(2),
    // backgroundColor: 'red',
  },
  CalenderArrow: {
    height: vw(3.5),
    width: vw(3.5),
    zIndex: 99999,
  },
  headerTitle: {
    fontSize: vw(3.2),
    fontWeight: 'bold',
    color: '#000',
  },
});
