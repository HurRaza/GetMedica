import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';

import {COLORS} from '../../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  value?: string;
  onSubmitEditing?: (e: any) => void;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  reference?: any;
};
const CustomSearchInput: FC<Props> = ({
  value,
  onSubmitEditing,
  containerStyle,
  onChangeText,
  reference,
}) => {
  const textInputRef = useRef<TextInput>(null);
  // const [text, setText] = useState('123');

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        autoCorrect={false}
        ref={textInputRef || reference}
        onChangeText={text => {
          // setText(text);
          onChangeText && onChangeText(text);
        }}
        onSubmitEditing={onSubmitEditing}
        // value={text}
        returnKeyType="search"
        placeholder="Search"
        placeholderTextColor={COLORS.NeutralGrey50}
        style={styles.input}
        selectionColor={COLORS.NeutralGrey50}
      />
      <CustomIcon
        type={'Feather'}
        icon="search"
        size={20}
        color={COLORS.NeutralGrey50}
      />
    </View>
  );
};

export default CustomSearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    // marginTop: heightPercentageToDP(1),
    flexDirection: 'row',
    alignItems: 'center',
    height: heightPercentageToDP(5),
    borderRadius: 5,
    // paddingVertical: Platform.OS == 'ios' ? heightPercentageToDP(2) : 0,
    paddingHorizontal: widthPercentageToDP(2),
    gap: widthPercentageToDP(1),
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
  },
  input: {
    color: COLORS.bodytext,

    flex: 1,
  },
});
