import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  ErrorScreen,
  HeaderLayout,
  ListItemSeparator,
  Loading,
  Spacer,
  Text,
} from '@Components/index';
import SearchBar from '@Components/searchBar';
import {useStockList} from '@Hooks/stocklist';
import {Theme} from '@Theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CoreRoutes, DetailRoutes} from 'src/navigation/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CoreRoutesParams} from 'src/navigation/types';

export interface IRenderItemProps {
  country: string | null;
  has_eod: boolean;
  has_intraday: boolean;
  name: string;
  stock_exchange: IStock;
  symbol: string;
}

interface IStock {
  acronym: string;
  city: string;
  country: string;
  country_code: string;
  mic: string;
  name: string;
  website: string;
}

type HomeScreenProps = NativeStackScreenProps<
  CoreRoutesParams,
  CoreRoutes.STOCKLIST
>;

export const Home = ({navigation: {navigate}}: HomeScreenProps) => {
  const {isLoading, isFetching, data, isError, refetch, search} =
    useStockList();

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

  const onPress = (symbol: string, icon: string, name: string) => {
    navigate(DetailRoutes.STOCKDETAIL, {symbol, icon, name});
  };

  const renderItem: ListRenderItem<IRenderItemProps> = ({
    item: {symbol, name},
  }) => {
    const logo = [
      'amazon',
      'facebook',
      'google',
      'pinterest',
      'apple',
      'trademark',
      'bug',
    ];
    const random = Math.floor(Math.random() * logo.length);
    const icon = logo[random];

    return (
      <Pressable
        style={s.renderItem}
        onPress={() => onPress(symbol, icon, name)}>
        <View style={s.roundIcon}>
          <FontAwesome
            name={icon}
            size={Theme.sizes.icon2}
            color={Theme.colors.light.inverseWhite100}
          />
        </View>
        <Spacer width={Theme.sizes.h4} />
        <View>
          <Text title style={s.textTitle}>
            {symbol}
          </Text>
          <Spacer height={Theme.sizes.h1} />
          <Text text style={s.text}>
            {name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <HeaderLayout
      headerTitle={'My WatchList'}
      headerShown={true}
      showArrow={false}
      innerStyle={s.container}>
      <Spacer height={20} />
      <SearchBar onSearch={search} onCancel={refetch} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.symbol}${index}`}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </HeaderLayout>
  );
};

export default Home;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: Theme.paddings.h16,
  },
  renderItem: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: Theme.sizes.v2,
  },
  roundIcon: {
    height: Theme.sizes.bigCircleHeight,
    width: Theme.sizes.bigCircleWidth,
    borderRadius: Theme.sizes.r4,
    backgroundColor: Theme.colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.dark.inverseWhite100,
    textTransform: 'capitalize',
  },
  textTitle: {
    color: Theme.colors.dark.inverseWhite100,
    textTransform: 'uppercase',
  },
});
