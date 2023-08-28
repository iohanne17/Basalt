import React, { Fragment, useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import {
  BUTTON_SIZE,
  Button,
  ErrorScreen,
  HeaderLayout,
  Loading,
  Row,
  Spacer,
  Text,
  TextColor,
  DatePickerComponent,
} from '@Components/index'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DetailRoutes } from 'src/navigation/routes'
import { DetailRoutesParams } from 'src/navigation/types'
import { useStockListDetail } from '@Hooks/stockDetail'
import { Theme } from '@Theme/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '@Theme/colors'
import DatePicker from 'react-native-date-picker'
import { parseISO, format } from 'date-fns'

export type DetailScreenProps = NativeStackScreenProps<DetailRoutesParams, DetailRoutes.STOCKDETAIL>

export interface StockInfo {
  adj_close: number
  adj_high: number
  adj_low: number
  adj_open: number
  adj_volume: number
  close: number
  date: Date
  dividend: number
  exchange: string
  high: number
  low: number
  open: number
  split_factor: number
  symbol: string
  volume: number
}

enum UIViews {
  empty = 'empty',
  list = 'list',
}

export const StockDetail = ({ route }: DetailScreenProps) => {
  const { symbol, icon, name } = route?.params
  const [stockDetail, setData] = useState<StockInfo[] | undefined>()
  const [dateFrom, setDateFrom] = useState(new Date())
  const [dateTo, setDateTo] = useState(new Date())
  const [filterView, setFilterView] = useState(false)
  const { isLoading, isFetching, isError, data, refetch, findStockDetail, lazyHandle, apiLazyResponse } =
    useStockListDetail(symbol)

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
    apiLazyResponse?.data?.data?.[0]?.adj_close,
    data?.[0]?.adj_close,
  ])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorScreen title="Data Error" message="Error fetching data... Try again later" />
  }

  function handleSearch() {
    if (dateFrom !== new Date())
      findStockDetail({
        symbol,
        date_from: format(parseISO(dateFrom.toISOString()), 'yyyy-MM-dd'),
        date_to: format(parseISO(dateTo.toISOString()), 'yyyy-MM-dd'),
      })
  }

  const headerRight = () => (
    <Pressable onPress={() => setFilterView(p => !p)} style={{ paddingHorizontal: Theme.sizes.h1 }}>
      <Ionicons name={'filter'} size={Theme.sizes.icon3} color={colors.primary} />
    </Pressable>
  )

  const response = stockDetail ? stockDetail?.[0] : undefined
  const entries = response ? Object?.entries(response) : undefined
  const array: any[] | undefined = entries ? entries.slice(0, entries.length - 4) : undefined

  const MappedView = () => {
    return (
      <ScrollView contentContainerStyle={s.detailContainer}>
        {array &&
          array.map((el, index) => {
            let [key, value] = el
            return <Row title={key} value={value as string | number} key={`${index}`} />
          })}
      </ScrollView>
    )
  }

  const views = {
    [UIViews.list]: <MappedView />,
    [UIViews.empty]: <ErrorScreen title={'Unable to get data'} message="Try again" showButton={false} />,
  }

  const viewSelector = !array ? UIViews.empty : UIViews.list

  return (
    <HeaderLayout
      headerTitle={symbol}
      headerShown={true}
      headerRight={headerRight}
      safeAreaStyle={s.safeAreaStyle}
      innerStyle={s.container}
      showRightIcon={!!array}
    >
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
      <Spacer height={10} />
      {filterView && (
        <Fragment>
          <View style={s.row}>
            <DatePickerComponent title="Start Date" onConfirm={val => setDateFrom(val)} />
            <DatePickerComponent title="End date" onConfirm={val => setDateTo(val)} />
          </View>
          <Button type="text" title="Filter" onPress={handleSearch} style={s.button} sizeScheme={BUTTON_SIZE.small} />
        </Fragment>
      )}
      <Spacer height={filterView ? 10 : 90} />
      {views[viewSelector]}
    </HeaderLayout>
  )
}

export default StockDetail

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  picker: {
    paddingHorizontal: Theme.sizes.h1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
  },
})
