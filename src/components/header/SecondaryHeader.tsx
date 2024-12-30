import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomText} from '../common/CustomText';
import CustomDropDown from '../common/CustomDropDown';
import {COLORS} from '../../utils/theme';
import {DropDownType} from '../../utils/types/componentType';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type Props = {
  title: string;
  dropdownData?: DropDownType[];
  dropdownChangeText?: (item: {value: string; label: string}) => void;
};

const SecondaryHeader: React.FC<Props> = ({
  title,
  dropdownData,
  dropdownChangeText,
}) => {
  const [selectedValue, setSelectedValue] = React.useState('Select');
  return (
    <View style={styles.container}>
      <CustomText
        children={title}
        fontSize="S20"
        fontWeight='500'
        color={COLORS.NeutralGrey100}
      />
      {dropdownData && dropdownChangeText && (
        <CustomDropDown
          data={dropdownData}
          onChangeItem={dropdownChangeText}
          value={selectedValue}
          containerStyle={styles.DropdownContainer}
        />
      )}
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: heightPercentageToDP(2),
  },
  DropdownContainer: {
    width: widthPercentageToDP(36),
  },
});
