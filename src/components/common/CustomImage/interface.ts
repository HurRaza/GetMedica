import {ImageProps, StyleProp, ViewStyle} from 'react-native';

export interface CustomImageProps {
  editable?: boolean;
  id?: any;
  source?: any;
  height?: number | string;
  width?: number | string;
  onPressImage?: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  resizeMode?: 'cover' | 'stretch' | 'center';
  loading?: boolean;
  style?: any;
  tintColor?: string;
  thumbnail?: string;
  borderRadius?: number;
}
