import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  ErrorScreen,
  HeaderLayout,
  Loading,
  Row,
  Spacer,
  Text,
  TextColor,
} from '@Components/index';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailRoutes} from 'src/navigation/routes';
import {DetailRoutesParams} from 'src/navigation/types';
import useStockListDetail from '@Hooks/stockDetail';
import {Theme} from '@Theme/theme';

export type DetailScreenProps = NativeStackScreenProps<
  DetailRoutesParams,
  DetailRoutes.STOCKDETAIL
>;

export interface StockInfo {
  adj_close: number;
  adj_high: number;
  adj_low: number;
  adj_open: number;
  adj_volume: number;
  close: number;
  date: Date;
  dividend: number;
  exchange: string;
  high: number;
  low: number;
  open: number;
  split_factor: number;
  symbol: string;
  volume: number;
}

export const StockDetail = ({route}: DetailScreenProps) => {
  const {symbol, icon, name} = route?.params;

  const {isLoading, isFetching, isError, data, refetch} =
    useStockListDetail(symbol);

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

  const response = data ? data?.data[0] : undefined;
  const entries = response ? Object?.entries(response) : undefined;
  const detailArray = entries
    ? entries.slice(0, entries.length - 1)
    : undefined;

  return (
    <HeaderLayout
      headerTitle={symbol}
      headerShown={true}
      safeAreaStyle={s.safeAreaStyle}
      innerStyle={s.container}>
      <Spacer height={20} />
      <View style={s.roundIcon}>
        <Text title_5 color={TextColor.black}>
          {icon}
        </Text>
      </View>
      <View style={s.center}>
        <Text text style={s.text}>
          {name}
        </Text>
      </View>
      <Spacer height={20} />
      <ScrollView contentContainerStyle={s.detailContainer}>
        {!detailArray ? (
          <ErrorScreen
            title={'Unable to get data'}
            message="Try again"
            showButton={false}
          />
        ) : (
          detailArray.map((el, index) => {
            let [key, value] = el;
            return (
              <Row
                title={key}
                value={value as string | number}
                key={`${index}`}
              />
            );
          })
        )}
      </ScrollView>
    </HeaderLayout>
  );
};

export default StockDetail;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeAreaStyle: {
    backgroundColor: Theme.colors.light.offwhite,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  roundIcon: {
    height: Theme.sizes.bigCircleHeight + 20,
    width: Theme.sizes.bigCircleWidth + 20,
    backgroundColor: Theme.colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: Theme.colors.dark.inverseWhite100,
    textTransform: 'capitalize',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: Theme.sizes.r4,
    borderTopRightRadius: Theme.sizes.r4,
    flex: 1,
    backgroundColor: Theme.colors.light.offwhite,
    paddingHorizontal: Theme.paddings.h16,
    paddingVertical: Theme.paddings.h16,
    top: 5,
  },
  errorText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: Theme.sizes.bigCircleHeight,
  },
});
