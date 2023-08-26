import React, {Fragment, useLayoutEffect} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {Theme} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from '../Text/Text';

interface Props {
  innerStyle?: StyleProp<ViewStyle>;
  headerTitle?: string;
  goBack?: () => void;
  children: React.ReactNode;
  headerShown: boolean;
  showArrow?: boolean;
  alignHeaderTitle?: any;
  safeAreaStyle?: StyleProp<ViewStyle>;
}

export const HeaderLayout: React.FC<Props> = ({
  innerStyle,
  children,
  headerTitle,
  headerShown = false,
  showArrow = true,
  alignHeaderTitle = 'flex-start',
  safeAreaStyle,
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack();
    }
  };

  const headerStyle = {
    alignSelf: alignHeaderTitle,
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerShown: headerShown,
      headerStyle: {
        backgroundColor: colors.inverseWhite100,
      },
      headerTitle: () => (
        <View style={s.headerTitle}>
          <Text title style={headerStyle}>
            {headerTitle}
          </Text>
        </View>
      ),
      headerLeft: !showArrow
        ? null
        : () => {
            return (
              <Pressable
                onPress={handleBack}
                style={{paddingHorizontal: Theme.sizes.h1}}>
                <Ionicons
                  name={'arrow-back'}
                  size={Theme.sizes.icon3}
                  color={colors.primary}
                />
              </Pressable>
            );
          },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[s.safeArea, safeAreaStyle]}>
      <View style={innerStyle}>{children}</View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.inverseWhite100,
    paddingTop: Platform.select({
      ios: undefined,
      default: 50,
    }),
  },
  headerTitle: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: Theme.paddings.h16,
  },
});
