export enum CoreRoutes {
  HOME = "HOME",
  STOCKLIST = "STOCKLIST",
}

export enum DetailRoutes {
  STOCKDETAIL = "STOCKDETAIL",
}

export enum NetworkRoutes {
  NETWORKINFO = "NETWORKINFO",
}

export type AllRoutes = CoreRoutes | DetailRoutes | NetworkRoutes
