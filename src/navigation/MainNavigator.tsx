import React, { Fragment, useEffect, useState } from 'react'
import { DetailRoutes, CoreRoutes, NetworkRoutes } from './routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CoreRoutesParams } from './types'
import { Home } from '@Screens/home'
import { StockDetail } from '@Screens/stockDetail'
import { NetErrorScreen } from '@Components/network'
import NetInfo from '@react-native-community/netinfo'
import Loading from '@Components/loading'

const Stack = createNativeStackNavigator<CoreRoutesParams>()
const options = { headerShown: false }

export const MainNavigator = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected)
      setIsLoading(true)
    })

    return () => {
      // Unsubscribe
      unsubscribe()
    }
  }, [isConnected])

  const renderApp = () => {
    const list = [
      {
        cond: !isLoading,
        node: (
          <Fragment>
            <Stack.Screen name={NetworkRoutes.LOADING} component={Loading} />
          </Fragment>
        ),
      },
      {
        cond: !isConnected,
        node: (
          <Fragment>
            <Stack.Screen name={NetworkRoutes.NETWORKINFO} component={NetErrorScreen} />
          </Fragment>
        ),
      },
      {
        cond: true,
        node: (
          <Fragment>
            <Stack.Screen name={CoreRoutes.STOCKLIST} component={Home} />
            <Stack.Screen name={DetailRoutes.STOCKDETAIL} component={StockDetail} />
          </Fragment>
        ),
      },
    ]

    return list.find(({ cond }) => !!cond)?.node
  }

  return (
    <Stack.Navigator screenOptions={options} initialRouteName={CoreRoutes.STOCKLIST}>
      {renderApp()}
    </Stack.Navigator>
  )
}
