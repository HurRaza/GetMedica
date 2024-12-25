import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {View} from 'react-native';
import CustomTextInput from '../CustomTextInput';
import {ICustomTextInput} from '../CustomTextInput/interface';

interface CustomRHFTextInputProps extends ICustomTextInput {
  control: any;
  name: string;
  rules?: any;
  defaultValue?: string;
}

const CustomRHFTextInput: FC<CustomRHFTextInputProps> = ({
  control,
  name,
  rules,
  defaultValue,
  ...props
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue || null}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomTextInput
            value={value}
            onChangeText={onChange}
            error={error?.message}
            onBlur={onBlur}
            {...props}
          />
        )}
      />
    </View>
  );
};

export default CustomRHFTextInput;
