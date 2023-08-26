import * as React from 'react';
import {Theme} from '../theme';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator
      color={Theme.colors.light.primary}
      size={'large'}
      animating={true}
    />
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

export default Loading;
