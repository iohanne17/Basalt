import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Settings from '@Config/settings';
import {StockInfo} from '@Screens/stockDetail';

interface objInput {
  symbol: string;
  date_from: string;
  date_to: string;
}

interface IStockDetail {
  data: StockInfo[];
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
    getStockListDetail: build.query<IStockDetail, any>({
      query: (symbol: string) =>
        `/eod?access_key=${Settings.ApiKey}&symbols=${symbol}`,
    }),
    fetchDetailUsingRange: build.query<unknown, unknown>({
      query: (obj: objInput) =>
        `/eod?access_key=${Settings.ApiKey}&symbols=${obj.symbol}&date_from=${obj.date_from}&date_to=${obj.date_to}`,
    }),
  }),
});

export const {useGetStockListDetailQuery} = stockListDetailSliceApi;
