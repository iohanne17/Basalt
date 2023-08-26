import React from "react"
import { DetailRoutes, CoreRoutes, NetworkRoutes } from "./routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { CoreRoutesParams } from "./types"
import { Home } from "@Screens/home"
import { StockDetail } from "@Screens/stockDetail"

const Stack = createNativeStackNavigator<CoreRoutesParams>()
const options = { headerShown: false }

const CoreNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={options}
      initialRouteName={CoreRoutes.STOCKLIST}
    >
      <Stack.Screen name={CoreRoutes.STOCKLIST} component={Home} />
      <Stack.Screen name={DetailRoutes.STOCKDETAIL} component={StockDetail} />
      <Stack.Screen name={NetworkRoutes.NETWORKINFO} component={StockDetail} />
    </Stack.Navigator>
  )
}

export const MainNavigator = () => {
  return <CoreNavigator />
}
