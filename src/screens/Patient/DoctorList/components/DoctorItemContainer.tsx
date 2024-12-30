import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DoctorItem from './DoctorItem';
import {Text} from 'react-native-svg';
import {CustomText} from '../../../../components/common/CustomText';

type Props = {
  data: any[];
};

const DoctorItemContainer: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item: any, index: number) => item.email + index}
        ListEmptyComponent={
          <View>
            <CustomText center children={'No Results Found'} />
          </View>
        }
        renderItem={({item, index}: any) => {
          return (
            <DoctorItem
              item={item}
              index={index}
              containerStyle={styles.itemContainer}
            />
          );
        }}
      />
    </View>
  );
};

export default DoctorItemContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP(2),
  },
  itemContainer: {
    marginVertical: heightPercentageToDP(1),
  },
});
