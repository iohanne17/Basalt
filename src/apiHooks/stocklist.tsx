import {
  useFetchStockListQuery,
  useLazyFetchStockListQuery,
  useLazySearchStockListQuery,
} from '@Features/stockList/stockList-api-slice';
import {IRenderItemProps} from '@Screens/home';
import {useEffect, useState} from 'react';

export const useStockList = () => {
  const [stocks, setData] = useState<IRenderItemProps[] | undefined>([]);
  const [trigger, {isLoading, isFetching, isError, isSuccess, data}] =
    useLazyFetchStockListQuery();
  const {searchTrigger, apiResponse} = useLazyStockList();

  const refetch = async () => {
    try {
      await trigger({});
      if (isSuccess) {
        setData(data?.data);
      }
    } catch (error) {
      throw new Error('Failed to fetch');
    }
  };

  const findStock = async (val: string) => {
    try {
      await searchTrigger(val);
      if (apiResponse.isSuccess) {
        setData(apiResponse?.data?.data);
      }
    } catch (error) {
      throw new Error('Failed to fetch');
    }
  };

  useEffect(() => {
    refetch();
  }, [isLoading, apiResponse.isSuccess]);

  return {
    isFetching: isFetching,
    isError,
    isLoading: isLoading,
    data: stocks,
    refetch,
    search: findStock,
  };
};

export const useLazyStockList = () => {
  const [searchTrigger, apiResponse] = useLazySearchStockListQuery();

  return {
    isFetching: apiResponse.isFetching,
    isLoading: apiResponse.isLoading,
    data: apiResponse.data,
    searchTrigger,
    apiResponse,
  };
};
