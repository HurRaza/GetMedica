import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, IMAGES} from '../../../utils/theme';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import {CustomButton} from '../../common/CustomButton';
import {CustomText} from '../../common/CustomText';
type Props = {
  containerStyle?: ViewStyle;
  errorButtonTitle?: string;
  errorButtonFunction?: () => void;
};
const ErrorFullScreen: FC<Props> = ({
  containerStyle,
  errorButtonTitle,
  errorButtonFunction,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LottieView
        speed={0.5}
        source={IMAGES.errorLottie}
        style={styles.lootieStyle}
        autoPlay={true}
        loop={false}
      />
      <CustomText>Unable to Fetch Data</CustomText>
      {errorButtonTitle && (
        <CustomButton
          title={errorButtonTitle}
          containerStyle={styles.button}
          onPress={() => errorButtonFunction && errorButtonFunction()}
        />
      )}
    </View>
  );
};

export default ErrorFullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  lootieStyle: {
    // tintColor: 'red',

    height: heightPercentageToDP(20),
    width: heightPercentageToDP(20),
  },
  button: {
    width: widthPercentageToDP(70),
    marginTop: heightPercentageToDP(2),
  },
});
