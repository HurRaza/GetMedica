import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, useState} from 'react';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {RFValue} from 'react-native-responsive-fontsize';
import {DropDownType} from '../../../utils/types/componentType';
import {CustomText} from '../CustomText';
import {COLORS, FONT} from '../../../utils/theme';

type Props = {
  data: DropDownType[];
  value: string;
  required?: boolean;
  search?: boolean;
  label?: string;
  defaultValue?: any;
  containerStyle?: ViewStyle;
  dropDownStyle?: ViewStyle;
  error?: any;
  onChangeItem: (value: {value: string; label: string}) => void;
};
const CustomDropDown: FC<Props> = ({
  data,
  label,
  onChangeItem,
  search,
  error,
  defaultValue,
  value,
  containerStyle,
  dropDownStyle,
  required,
}) => {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <CustomText
          children={
            <>
              {label}{' '}
              {required && (
                <CustomText color={COLORS.errorRed50} children={'*'} />
              )}
            </>
          }
        />
      )}

      <Dropdown
        // dropdownPosition="top"

        style={[
          styles.dropdown,
          dropDownStyle,
          isFocus && {borderColor: COLORS.primary},
          {borderColor: error ? COLORS.errorRed50 : COLORS.border},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={{
          // backgroundColor: 'red',
          marginTop: heightPercentageToDP(1),
          borderRadius: 20,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        value={value}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        searchPlaceholder="Search..."
        search={search}
        // value={defaultValue}
        renderItem={item => {
          return (
            <View style={styles.dropDownItem}>
              <CustomText fontSize='S13'>{item?.label}</CustomText>
            </View>
          );
        }}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChangeItem(item);

          setIsFocus(false);
        }}
      />
      {error && (
        <CustomText
          fontSize="S10"
          textStyle={styles.error}
          color={COLORS.errorRed50}>
          {error || null}
        </CustomText>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    marginBottom: heightPercentageToDP(1),
    // padding: 16,
  },
  dropdown: {
    // height: 50,
    marginTop: heightPercentageToDP(1),
    backgroundColor: COLORS.white,
    paddingVertical: heightPercentageToDP(2),

    borderWidth: 1,
    borderRadius: 8,

    paddingHorizontal: 8,
  },

  dropDownItem: {
    // marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingLeft: widthPercentageToDP(3),
    borderBottomWidth: RFValue(1),
    paddingVertical: heightPercentageToDP(1),
    borderColor: COLORS.border,
  },
  icon: {
    marginRight: 5,
  },
  itemTextStyle: {color: COLORS.bodytext},
  placeholderStyle: {
    fontSize: RFValue(11),
    fontFamily: FONT.regularFont,
    color: COLORS.subtext,
  },
  selectedTextStyle: {
    fontSize: RFValue(11),
    paddingHorizontal: RFValue(2.5),
    fontFamily: FONT.regularFont,
    color: COLORS.NeutralGrey100,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    // color: COLORS.textPrimary,
    fontSize: RFValue(14),
  },
  error: {
    // marginBottom: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(0.7),
  },
});
