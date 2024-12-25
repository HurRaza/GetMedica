import {StatusBar, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {CustomIcon} from '../common/CustomIcon';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS, IMAGES} from '../../utils/theme';

import LoadingFullScreen from './components/LoadingFullScreen';
import ErrorFullScreen from './components/ErrorFullScreen';
import {CustomText} from '../common/CustomText';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {navigateGoBack} from '../../utils/navigation';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomImage from '../common/CustomImage';
// import {DEFAULT_IMAGE_URL} from '../../utils/constants';
type Props = {
  name?: string;
  profilePic?: string;
  children: ReactNode;
  onPressBack?: () => void;
  containerStyle?: ViewStyle;
  loading?: boolean;
  error?: boolean;
};
const DesignHeader: FC<Props> = ({
  name,
  profilePic,
  children,
  onPressBack,
  containerStyle,
  loading,
  error,
}) => {
  const {top} = useSafeAreaInsets();
  const renderContent = () => {
    if (loading) return <LoadingFullScreen />;
    if (error) return <ErrorFullScreen />;
    return children;
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={[styles.headerContainer, {paddingTop: top}]}>
        <CustomIcon
          style={styles.icon}
          onPress={() => {
            if (onPressBack) {
              return onPressBack();
            }
            navigateGoBack();
          }}
          color={COLORS.NeutralGrey20}
          size={RFValue(18)}
          type={'AntDesign'}
          icon="arrowleft"
        />
      </View>
      {(profilePic || name) && (
        <View style={styles.imageContainer}>
          <CustomImage
            source={{uri: profilePic}}
            loading={loading}
            style={styles.image}
          />
          <CustomText children={name} fontWeight="600" fontSize="S14" />
        </View>
      )}

      <View style={[styles.mainContainer, containerStyle]}>
        {renderContent()}
      </View>
    </View>
  );
};

export default DesignHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: heightPercentageToDP(18),
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(5),
  },
  icon: {
    borderWidth: RFValue(1),
    borderColor: COLORS.NeutralGrey20,
    borderRadius: 100,
    padding: RFValue(4),
    alignSelf: 'flex-start',
  },

  imageContainer: {
    marginTop: -heightPercentageToDP(5),
    alignSelf: 'center',
    gap: heightPercentageToDP(0.5),
    alignItems: 'center',
  },
  image: {
    height: heightPercentageToDP(10),
    borderRadius: 100,
    aspectRatio: 1,
  },
  mainContainer: {
    flex: 1,

    paddingHorizontal: widthPercentageToDP(5),
    // paddingVertical: heightPercentageToDP(1),
  },
});
