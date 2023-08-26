import { CoreRoutes, DetailRoutes, NetworkRoutes } from "./routes"

export type CoreRoutesParams = DetailRoutesParams &
  NetworkRoutesParams & {
    [CoreRoutes.STOCKLIST]: undefined
    [CoreRoutes.HOME]: undefined
  }

export type DetailRoutesParams = {
  [DetailRoutes.STOCKDETAIL]: undefined
}

export type NetworkRoutesParams = {
  [NetworkRoutes.NETWORKINFO]: undefined
}

export type AllRoutesParams =
  | CoreRoutesParams
  | NetworkRoutesParams
  | DetailRoutesParams
