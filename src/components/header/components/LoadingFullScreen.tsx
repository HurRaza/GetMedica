import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {COLORS, IMAGES} from '../../../utils/theme';
import LottieView from 'lottie-react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {CustomText} from '../../common/CustomText';

const LoadingFullScreen: FC<{containerStyle?: ViewStyle}> = ({
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <LottieView
        speed={2}
        source={IMAGES.loadingLottie}
        style={styles.lootieStyle}
        autoPlay={true}
      />
    </View>
  );
};

export default LoadingFullScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',

    alignItems: 'center',
    justifyContent: 'center',
  },
  lootieStyle: {
    height: heightPercentageToDP(30),
    width: heightPercentageToDP(30),
  },
});
