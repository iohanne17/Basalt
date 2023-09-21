import React, { ReactNode } from 'react'
import { FlatList, ListRenderItem, Pressable, StyleSheet, View } from 'react-native'
import { ErrorScreen, HeaderLayout, ListItemSeparator, Loading, Spacer, Text, TextColor } from '@Components/index'
import SearchBar from '@Components/searchBar'
import { useStockList } from '@Hooks/stocklist'
import { Theme } from '@Theme/theme'
import { CoreRoutes, DetailRoutes } from 'src/navigation/routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CoreRoutesParams } from 'src/navigation/types'
import withLoader, { ExtraInfoType } from 'src/hoc/withLoadingAndError'
import { TWithModal, withModal } from 'src/hoc'

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

type TCombo = ExtraInfoType & TWithModal
export type HomeScreenProps = NativeStackScreenProps<CoreRoutesParams, CoreRoutes.STOCKLIST> & TCombo

// interface HomeScreenProps extends NativeStackScreenProps<CoreRoutesParams, CoreRoutes.STOCKLIST>, ExtraInfoType {}

enum UIViews {
  empty = 'empty',
  flatlist = 'flatlist',
}

const ViewsM = ({ closeModal }: TWithModal) => {
  const onPress = () => {
    closeModal()
  }

  return (
    <View style={{ flex: 1 }}>
      <Text title_2>i am testing modal</Text>
      <Text title_4>This is a neat trick</Text>
      <Text title_5>Upgrading my RN skills</Text>
      <Pressable style={s.button} onPress={onPress}>
        <Text text_semibold>{'close Modal'}</Text>
      </Pressable>
    </View>
  )
}

const HocView = withModal(ViewsM)

const Home_ = ({ navigation: { navigate }, data, search, refetch, openModal, closeModal }: HomeScreenProps) => {
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.symbol}${index}`}
        ItemSeparatorComponent={ListItemSeparator}
      />
    ),
    [UIViews.empty]: <ErrorScreen title={'Data not available'} message="Try another name" showButton={false} />,
  }

  const onPressIn = () => {
    openModal(<HocView />)
  }

  const viewSelector = data?.length === 0 ? UIViews.empty : UIViews.flatlist

  return (
    <HeaderLayout headerTitle={'My WatchList'} headerShown={true} showLeftIcon={false} innerStyle={s.container}>
      <Spacer height={20} />
      <SearchBar onSearch={search} onCancel={refetch} />
      {views[viewSelector]}
      <Pressable style={{ borderRadius: 25 }} onPress={onPressIn}>
        <Text text_semibold>{'Open Modal'}</Text>
      </Pressable>
    </HeaderLayout>
  )
}

export const Home = withModal(withLoader(Home_, useStockList))
export default withModal(withLoader(Home_, useStockList))

const s = StyleSheet.create({
  button: {
    height: 100,
    backgroundColor: 'teal',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
