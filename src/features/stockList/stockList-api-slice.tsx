import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '@Config/settings';

export const stockListSliceApi = createApi({
  reducerPath: 'stock-list-api',
  baseQuery: fetchBaseQuery({
    baseUrl: Settings.marketApi,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: build => ({
    fetchStockList: build.query<void, unknown>({
      query: () => `/tickers?access_key=${Settings.ApiKey}&limit=10`,
    }),
    searchStockList: build.query<void, unknown>({
      query: (symbol: string) =>
        `/tickers?access_key=${Settings.ApiKey}&limit=10&search=${symbol}`,
    }),
  }),
});

export const {useFetchStockListQuery, useLazySearchStockListQuery} =
  stockListSliceApi;
