import {TextInputProps, TextStyle, ViewStyle} from 'react-native';

// export interface CustomTextInputProps {
//   inputContainerStyle?: any;
//   label?: string;
//   placeholder?: string;
//   password?: boolean;
//   multiline?: boolean;
//   numberOfLines?: number;
//   returnKeyType?: any;
//   keyboardType?: any;
//   ref?: any;
//   onSubmitEditing?: any;
//   blurOnSubmit?: any;
//   editable?: boolean;
//   maxLength?: number;
//   textStyle?: any;
//   erros?: any;
//   font?: any;
//   colorTheme?: any;
//   name?: any;
//   rules?: any;
//   defaultValue?: any;
//   control?: any;
// }

export interface ICustomTextInput extends TextInputProps {
  label?: string;
  inputContainerStyle?: ViewStyle;
  textStyle?: any;
  error?: any;
  font?: any;
  colorTheme?: any;
  editField?: boolean;
  name?: string;
  textInputRef?: any;
  changeBorderColorOnFocus?: boolean;
  bottomTextInfo?: string;
  title?: string;
  titleTextStyle?: TextStyle | ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText?: (val: string) => void;
  requiredStar?: boolean;
}
