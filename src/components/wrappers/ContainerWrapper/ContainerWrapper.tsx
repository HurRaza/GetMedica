import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
type Props = {
  containerStyle?: ViewStyle;
  children: ReactNode;
};
const ContainerWrapper: FC<Props> = ({children, containerStyle}) => {
  return (
    <View style={[styles.jobDetailsContainer, containerStyle]}>{children}</View>
  );
};

export default ContainerWrapper;

const styles = StyleSheet.create({
  jobDetailsContainer: {
    marginTop: heightPercentageToDP(2),
    backgroundColor: COLORS.white,
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(4),
    borderRadius: 10,
  },
});
