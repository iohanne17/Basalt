import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '@Config/settings';
import {IRenderItemProps} from '@Screens/home';

interface IStockListResponse {
  data: IRenderItemProps[];
}

export const stockListSliceApi = createApi({
  reducerPath: 'stock-list-api',
  baseQuery: fetchBaseQuery({
    baseUrl: Settings.marketApi,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: build => ({
    fetchStockList: build.query<IStockListResponse, any>({
      query: () => `/tickers?access_key=${Settings.ApiKey}&limit=10`,
    }),
    searchStockList: build.query<any, any>({
      query: (symbol: string) =>
        `/tickers?access_key=${Settings.ApiKey}&limit=10&search=${symbol}`,
    }),
  }),
});

export const {useFetchStockListQuery, useLazySearchStockListQuery} =
  stockListSliceApi;
