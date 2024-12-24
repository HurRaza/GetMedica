import {FC, ReactNode, useMemo} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../../utils/theme';
// import LoadingFullScreen from '../../header/components/LoadingFullScreen';

const CustomWrapper: FC<{
  containerStyle?: any;
  loading?: boolean;
  children?: ReactNode;
  title?: string;
  backButton?: boolean;
  keybaordAvoidingView?: boolean;
  onPressWithOutFeedback?: () => void;
  edges?: ('top' | 'right' | 'bottom' | 'left')[] | [];
}> = ({
  containerStyle,
  edges = ['top', 'right', 'bottom', 'left'],
  children,
  loading,
  onPressWithOutFeedback,
  keybaordAvoidingView = false,
}) => {
  // const {goBack} = useNavigation<NavigationProp<any, any>>();

  const {bottom, top, left, right} = useSafeAreaInsets();
  const style: ViewStyle = useMemo(() => {
    const computedStyle: ViewStyle = {};

    if (edges.includes('bottom')) {
      computedStyle.paddingBottom = bottom + heightPercentageToDP(0.1);
    }

    if (edges.includes('top')) {
      computedStyle.paddingTop = top;
    }

    if (edges.includes('left')) {
      computedStyle.paddingLeft = left;
    }

    if (edges.includes('right')) {
      computedStyle.paddingRight = right;
    }

    return computedStyle;
  }, [edges]);

  if (keybaordAvoidingView) {
    return (
      <View style={[style, styles.container, containerStyle]}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={Platform.OS == 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={
            Platform.OS == 'ios' ? heightPercentageToDP(1) : 0
          }>
          {children}
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={[style, styles.container, containerStyle]}>{children}</View>
  );
};

export default CustomWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: COLORS.NeutralGrey0,
  },
});
