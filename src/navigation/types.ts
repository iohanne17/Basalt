import {CoreRoutes, DetailRoutes, NetworkRoutes} from './routes';

export type CoreRoutesParams = DetailRoutesParams &
  NetworkRoutesParams & {
    [CoreRoutes.STOCKLIST]: undefined;
    [CoreRoutes.HOME]: undefined;
  };

export type DetailRoutesParams = {
  [DetailRoutes.STOCKDETAIL]: {symbol: string; icon: string; name: string};
};

export type NetworkRoutesParams = {
  [NetworkRoutes.NETWORKINFO]: undefined;
  [NetworkRoutes.LOADING]: undefined;
};

export type AllRoutesParams =
  | CoreRoutesParams
  | NetworkRoutesParams
  | DetailRoutesParams;
