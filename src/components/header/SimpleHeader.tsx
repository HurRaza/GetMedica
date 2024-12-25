import {StatusBar, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {CustomIcon} from '../common/CustomIcon';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';

import LoadingFullScreen from './components/LoadingFullScreen';
import ErrorFullScreen from './components/ErrorFullScreen';
import {CustomText} from '../common/CustomText';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {navigateGoBack} from '../../utils/navigation';
import {RFValue} from 'react-native-responsive-fontsize';
type Props = {
  children: ReactNode;
  onPressBack?: () => void;
  containerStyle?: ViewStyle;
  loading?: boolean;
  error?: boolean;
};
const SimpleHeader: FC<Props> = ({
  children,
  onPressBack,
  containerStyle,
  loading,
  error,
}) => {
  const renderContent = () => {
    if (loading) return <LoadingFullScreen />;
    if (error) return <ErrorFullScreen />;
    return children;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <CustomIcon
          style={styles.iconContainer}
          onPress={() => {
            if (onPressBack) {
              return onPressBack();
            }
            navigateGoBack();
          }}
          size={RFValue(24)}
          type={'AntDesign'}
          icon="arrowleft"
        />

        {/* <CustomIcon
          size={heightPercentageToDP(3)}
          type={'AntDesign'}
          icon="arrowleft"
          // color={COLORS.white}
        /> */}
      </View>
      <View style={[styles.mainContainer, containerStyle]}>
        {renderContent()}
      </View>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(5),
  },
  iconContainer: {
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 100,
    padding: RFValue(4),
  },
  textStyle: {
    // backgroundColor: 'red',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(5),
    paddingBottom: heightPercentageToDP(1),
    // backgroundColor: 'red',
  },
});
