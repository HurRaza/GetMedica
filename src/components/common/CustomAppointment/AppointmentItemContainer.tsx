import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {Text} from 'react-native-svg';
import {CustomText} from '../../../components/common/CustomText';
import AppointmentItem from './AppointmentItem';
import {useUserStore} from '../../../services/store/userStore';

type Props = {
  data: any[];
  handleStatusChange?: (id: string, status: string) => void;
};

const AppointmentItemContainer: React.FC<Props> = ({
  data,
  handleStatusChange,
}) => {
  const {user} = useUserStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any, index: number) => index.toString()}
        ListEmptyComponent={
          <View>
            <CustomText center children={'No Appointments Avialable'} />
          </View>
        }
        renderItem={({item, index}: any) => {
          return (
            <AppointmentItem
              role={user.role}
              item={item}
              containerStyle={styles.itemContainer}
              handleStatusChange={handleStatusChange}
            />
          );
        }}
      />
    </View>
  );
};

export default AppointmentItemContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP(2),
  },
  itemContainer: {
    marginVertical: heightPercentageToDP(1),
  },
});
