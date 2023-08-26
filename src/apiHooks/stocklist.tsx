import {
  useFetchStockListQuery,
  useLazySearchStockListQuery,
} from '@Features/stockList/stockList-api-slice';

export const useStockList = () => {
  const {isLoading, isFetching, isError, data, refetch} =
    useFetchStockListQuery({});

  return {
    isFetching,
    isError,
    isLoading,
    refetch,
    data,
  };
};

export default useStockList;
