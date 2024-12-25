import React, {FC} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Alert, KeyboardType, View, ViewStyle} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import CustomDropDown from '../CustomDropDown';

const CustomRHFDropDown: FC<{
  control: Control<any>;
  name: string;
  label?: string;
  rules?: any;
  data: any;
  required?: boolean;
  defaultValue?: any;
  search?: boolean;
  containerStyle?: ViewStyle;
  onChangeValue?: (item: any) => void;
}> = ({
  control,
  required,
  name,
  rules,
  data,
  defaultValue,
  label,
  search,
  containerStyle,
  onChangeValue,
}) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || null}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomDropDown
            value={value}
            error={error?.message}
            containerStyle={containerStyle}
            required={required}
            data={data}
            search={search}
            label={label}
            defaultValue={defaultValue}
            onChangeItem={item => {
              console.log(item);
              onChange(item);
              onChangeValue && onChangeValue(item);
            }}
          />
        )}
      />
    </>
  );
};

export default CustomRHFDropDown;
