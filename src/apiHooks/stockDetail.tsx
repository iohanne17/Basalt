import {useGetStockListDetailQuery} from '@Features/stockDetail/stockDetail-api-slice';

export const useStockListDetail = (symbol: string) => {
  const {isLoading, isFetching, isError, data, refetch} =
    useGetStockListDetailQuery(symbol);

  return {
    isFetching,
    isError,
    isLoading,
    refetch,
    data,
  };
};

export default useStockListDetail;
