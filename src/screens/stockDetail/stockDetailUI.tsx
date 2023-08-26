import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@Components/index';

export const StockDetail = () => {
  return (
    <View style={styles.container}>
      <Text title>detail</Text>
    </View>
  );
};

export default StockDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
