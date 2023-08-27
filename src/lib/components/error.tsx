import * as React from 'react';
import {Theme} from '../theme';
import {View, StyleSheet} from 'react-native';
import {Text} from './Text/Text';
import {Spacer} from './Spacer';
import {Button} from './Button/MainButton';

interface ErrorProps {
  message: string;
  title: string;
  isLoading?: boolean;
  onPress?: () => void;
  showButton?: boolean;
}

export const ErrorScreen = ({
  message,
  title,
  isLoading,
  onPress,
  showButton = true,
}: ErrorProps) => (
  <View style={styles.loadingContainer}>
    <Text title>{title}</Text>
    <Text>{message}</Text>
    <Spacer height={20} />
    {showButton ? (
      <Button
        loading={isLoading}
        onPress={() => onPress?.()}
        type="text"
        title="Retry"
      />
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.light.inverseWhite100,
  },
});

export default ErrorScreen;
