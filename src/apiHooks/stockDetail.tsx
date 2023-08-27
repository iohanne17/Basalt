import {
  useGetStockListDetailQuery,
  useLazyFetchDetailUsingRangeQuery,
} from '@Features/stockDetail/stockDetail-api-slice';
import {useState} from 'react';

interface IFindStockDetail {
  symbol: string;
  date_from: string;
  date_to: string;
}

export const useStockListDetail = (symbol: string) => {
  const [showLazyData, setShowLazyData] = useState(false);
  const {isLoading, isFetching, isError, data, refetch} =
    useGetStockListDetailQuery(symbol);
  const {findTrigger, apiResponse} = useLazyStockListDetail();

  const findStockDetail = async (val: IFindStockDetail) => {
    try {
      await findTrigger(val);
      if (apiResponse.isSuccess) {
        setShowLazyData(true);
      }
    } catch (error) {
      setShowLazyData(false);
      throw new Error('Failed to fetch');
    }
  };

  const refetchData = () => {
    setShowLazyData(false);
    refetch();
  };

  return {
    isFetching: isFetching,
    isError,
    isLoading: isLoading,
    data: data?.data,
    refetch: refetchData,
    findStockDetail,
    apiLazyResponse: apiResponse,
    lazyHandle: showLazyData,
  };
};

export const useLazyStockListDetail = () => {
  const [findTrigger, apiResponse] = useLazyFetchDetailUsingRangeQuery();

  return {
    isFetching: apiResponse.isFetching,
    data: apiResponse.data,
    findTrigger,
    apiResponse,
  };
};
