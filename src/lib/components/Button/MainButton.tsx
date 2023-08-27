import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import type {ComponentProps} from 'react';

import {colors} from '../../theme/colors';
import {Theme} from '../../theme/theme';
import {Text} from '../Text/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export enum MB_SCHEME {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum BUTTON_SIZE {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type PropType = ComponentProps<typeof MaterialCommunityIcons>['name'];

export interface MainButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  scheme?: MB_SCHEME;
  sizeScheme?: BUTTON_SIZE;
  onPress: () => any;
  style?: StyleProp<ViewStyle>;
  type: 'icon' | 'text';
  iconName?: PropType;
  iconSize?: number;
  iconColor?: string;
  textStyle?: StyleProp<TextStyle>;
}
export const Button = ({
  disabled,
  loading,
  title,
  onPress,
  style,
  type = 'text',
  scheme = MB_SCHEME.medium,
  sizeScheme = BUTTON_SIZE.medium,
  iconColor = colors.primary,
  iconName = 'home',
  iconSize,
  textStyle,
  ...touchableProps
}: MainButtonProps) => {
  const contentType =
    type === 'text' ? (
      <Text title style={[s.text, textStyle]}>
        {title}
      </Text>
    ) : (
      <MaterialCommunityIcons
        size={iconSize}
        name={iconName}
        color={iconColor}
      />
    );

  const content = loading ? (
    <View style={s.loaderWrapper}>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  ) : (
    contentType
  );

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        s.main,
        {opacity: pressed ? 0.5 : 1},
        buttonSizeStyle[sizeScheme],
        style,
      ]}
      {...touchableProps}>
      {content}
    </Pressable>
  );
};

const s = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.sizes.r4,
    backgroundColor: colors.primary,
  },
  loaderWrapper: {
    height: 24,
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.light.inverseWhite100,
  },
});

const buttonSizeStyle = {
  [BUTTON_SIZE.small]: {
    width: 100,
    height: 50,
  },
  [BUTTON_SIZE.medium]: {
    width: 150,
    height: 50,
  },
  [BUTTON_SIZE.large]: {
    paddingVertical: Theme.sizes.v5,
    paddingHorizontal: Theme.sizes.h5,
  },
};

const buttonStyle = {
  [MB_SCHEME.medium]: {
    enabled: {
      borderRadius: Theme.sizes.r4,
    },
    disabled: {
      borderRadius: Theme.sizes.r4,
    },
  },
};
