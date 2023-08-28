import * as React from 'react'
import { Theme } from '../theme'
import { View, StyleSheet } from 'react-native'
import { Text } from './Text/Text'

export const NetErrorScreen = () => (
  <View style={styles.loadingContainer}>
    <Text title>{'Network Error'}</Text>
    <Text>{'Unable to connect... Try again later'}</Text>
  </View>
)

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.light.inverseWhite100,
  },
})

export default NetErrorScreen
