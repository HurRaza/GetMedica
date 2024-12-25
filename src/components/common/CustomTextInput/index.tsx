import React, {FC, useCallback, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {COLORS, FONT} from '../../../utils/theme';
import {CustomIcon} from '../CustomIcon';
import {CustomText} from '../CustomText';
import {ICustomTextInput} from './interface';

const CustomTextInput: FC<ICustomTextInput> = props => {
  const {
    inputContainerStyle,
    label,
    placeholder,
    secureTextEntry,
    multiline,
    numberOfLines,
    returnKeyType,
    keyboardType,
    onSubmitEditing,
    blurOnSubmit,
    maxLength,
    textStyle,
    error,
    value,
    onChangeText,
    editField,
    name,
    textInputRef,
    changeBorderColorOnFocus = false,
    bottomTextInfo,
    title,
    titleTextStyle,
    autoCapitalize = 'none',
    requiredStar = false,
    editable = true,
    ...rest
  } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [canEdit, setCanEdit] = useState(editable);
  const [focus, setFocus] = useState(false);
  const canEditRef = React.useRef(canEdit);
  const inputRef = React.useRef<TextInput>(null);

  const onPressEdit = () => {
    setCanEdit(!canEdit);
    canEditRef.current = !canEditRef.current;
    inputRef?.current?.blur();
    if (!canEditRef.current) {
      // alert('ture');
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 200);
    } else {
      inputRef?.current?.blur();
    }
  };

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, [focus]);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, [focus]);

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.rowAndCenter}>
          <CustomText
            color={COLORS.bodytext}
            textStyle={[
              {
                marginBottom: hp(1),
              },
              titleTextStyle,
            ]}>
            {title}
          </CustomText>
          {requiredStar && <CustomText color={COLORS.errorRed50}>*</CustomText>}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          focus && styles.focus,
          inputContainerStyle,
          error && {borderColor: COLORS.errorRed50},
          // error && {borderColor: COLORS.red},
          // editField && {backgroundColor: COLORS.white},
        ]}>
        <View style={{flex: 1}}>
          <TextInput
            textAlignVertical="top"
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry ? hidePassword : false}
            multiline={multiline}
            style={[
              styles.inputText,
              textStyle,
              multiline && {paddingTop: RFValue(9.768)},
              !editable && {
                color: COLORS.NeutralGrey50,
              },
            ]}
            numberOfLines={numberOfLines}
            focusable={true}
            keyboardType={keyboardType}
            ref={textInputRef || inputRef}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            placeholderTextColor={COLORS.subtext}
            maxLength={maxLength}
            editable={editable || canEdit}
            key={name}
            onBlur={handleBlur}
            onFocus={handleFocus}
            // {...rest}
          />
        </View>

        {secureTextEntry ? (
          <CustomIcon
            icon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            type="Ionicons"
            size={RFValue(18.75)}
            // color={focus ? '#1849D6' : COLORS.black}
            color={COLORS.NeutralGrey50}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          />
        ) : null}
        {editField ? (
          <CustomIcon
            icon={canEdit ? 'edit' : 'save'}
            type="Feather"
            size={RFValue(18.75)}
            // color={COLORS.darkBlackishGreen}
            onPress={onPressEdit}
            style={styles.eyeIcon}
          />
        ) : null}
      </View>
      {bottomTextInfo ? (
        <CustomText color={'#808080'} textStyle={styles.bottomTextInfo}>
          {bottomTextInfo}
        </CustomText>
      ) : null}
      {error ? (
        <View style={styles.errorContainer}>
          <CustomText fontSize="S10" color={COLORS.errorRed50}>
            {error || null}
          </CustomText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: hp(0.8)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey20,
    minHeight: hp(6.5),
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  inputText: {
    fontSize: RFValue(11),
    fontFamily: FONT.regularFont,
    flex: 1,
    paddingHorizontal: RFValue(9.375),
    color: COLORS.NeutralGrey100,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  eyeIcon: {
    flexDirection: 'row',
    paddingRight: RFValue(6.25),
  },
  bottomTextInfo: {
    fontSize: RFValue(9.375),
    lineHeight: RFValue(13.125),
    marginVertical: hp(0.5),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.4),
    marginLeft: RFValue(0.93),
  },

  focus: {
    // backgroundColor: '#E8EDFB',
    // borderColor: '#1849D6',
  },
  rowAndCenter: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});

export default CustomTextInput;
