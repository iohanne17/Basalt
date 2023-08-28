import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native'
import { ErrorScreen, HeaderLayout, ListItemSeparator, Loading, Spacer, Text, TextColor } from '@Components/index'
import SearchBar from '@Components/searchBar'
import { useStockList } from '@Hooks/stocklist'
import { Theme } from '@Theme/theme'
import { CoreRoutes, DetailRoutes } from 'src/navigation/routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CoreRoutesParams } from 'src/navigation/types'

export interface IRenderItemProps {
  country: string | null
  has_eod: boolean
  has_intraday: boolean
  name: string
  stock_exchange: IStock
  symbol: string
}

interface IStock {
  acronym: string
  city: string
  country: string
  country_code: string
  mic: string
  name: string
  website: string
}

export type HomeScreenProps = NativeStackScreenProps<CoreRoutesParams, CoreRoutes.STOCKLIST>

enum UIViews {
  empty = 'empty',
  flatlist = 'flatlist',
}

export const Home = ({ navigation: { navigate } }: HomeScreenProps) => {
  const [stocks, setData] = useState<IRenderItemProps[] | undefined>([])
  const { isLoading, isFetching, data, isError, refetch, search, apiLazyResponse, lazyHandle } = useStockList()

  useEffect(() => {
    if (lazyHandle && apiLazyResponse?.isSuccess) {
      setData(apiLazyResponse?.data?.data)
    } else {
      setData(data)
    }
  }, [
    isLoading,
    lazyHandle,
    isFetching,
    apiLazyResponse?.isSuccess,
    apiLazyResponse?.data?.data?.[0]?.symbol,
    data?.[0]?.symbol,
  ])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <ErrorScreen
        title="Data Error"
        message="Error fetching data... Try again later"
        onPress={refetch}
        isLoading={isLoading}
      />
    )
  }

  const onPress = (symbol: string, icon: string, name: string) => {
    navigate(DetailRoutes.STOCKDETAIL, { symbol, icon, name })
  }

  const renderItem: ListRenderItem<IRenderItemProps> = ({ item: { symbol, name } }) => {
    const icon = symbol.substring(0, 2)

    return (
      <Pressable style={s.renderItem} onPress={() => onPress(symbol, icon, name)}>
        <View style={s.roundIcon}>
          <Text title_5 color={TextColor.white}>
            {icon}
          </Text>
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
    )
  }

  const views = {
    [UIViews.flatlist]: (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={stocks}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.symbol}${index}`}
        ItemSeparatorComponent={ListItemSeparator}
      />
    ),
    [UIViews.empty]: <ErrorScreen title={'Data not available'} message="Try another name" showButton={false} />,
  }

  const viewSelector = stocks?.length === 0 ? UIViews.empty : UIViews.flatlist

  return (
    <HeaderLayout headerTitle={'My WatchList'} headerShown={true} showLeftIcon={false} innerStyle={s.container}>
      <Spacer height={20} />
      <SearchBar onSearch={search} onCancel={refetch} />
      {views[viewSelector]}
    </HeaderLayout>
  )
}

export default Home

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
  error: {
    backgroundColor: 'red',
  },
})
