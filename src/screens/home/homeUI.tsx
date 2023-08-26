import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ErrorScreen, Loading, Text} from '@Components/index';
import {useStockList} from '@Hooks/stocklist';

export const Home = () => {
  const {isLoading, isFetching, isError, data, refetch} = useStockList();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorScreen
        title="Data Error"
        message="Error fetching data... Try again later"
        onPress={refetch}
        isLoading={isLoading}
      />
    );
  }

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
