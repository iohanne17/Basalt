import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '@Config/settings';

interface objInput {
  symbol: string;
  date_from: string;
  date_to: string;
}

export const stockListDetailSliceApi = createApi({
  reducerPath: 'stock-detail-api',
  baseQuery: fetchBaseQuery({
    baseUrl: Settings.marketApi,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: build => ({
    getStockListDetail: build.query<void, unknown>({
      query: (symbol: string) =>
        `/tickers/${symbol}?access_key=${Settings.ApiKey}`,
    }),
    fetchDetailUsingRange: build.query<void, unknown>({
      query: (obj: objInput) =>
        `/eod/${obj.symbol}?access_key=${Settings.ApiKey}&date_from=${obj.date_from}&date_to=${obj.date_to}`,
    }),
  }),
});

export const {useGetStockListDetailQuery} = stockListDetailSliceApi;
