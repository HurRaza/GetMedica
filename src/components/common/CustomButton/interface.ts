import {ReactNode} from 'react';
import {TextStyle, ViewStyle} from 'react-native';

export interface CustomButtonProps {
  title?: any;
  onPress: () => void;
  loading?: boolean;
  loadingColor?: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  disabled?: boolean;
  isValid?: boolean;
  textStyle?: TextStyle[] | TextStyle;
  secondary?: boolean;
  socialImage?: any;
  children?: ReactNode;
}
