import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@Components/index';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Text title>home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
