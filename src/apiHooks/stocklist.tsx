import { useFetchStockListQuery, useLazySearchStockListQuery } from '@Features/stockList/stockList-api-slice'
import { useState } from 'react'

export const useStockList = () => {
  const [showLazyData, setShowLazyData] = useState(false)
  const { isLoading, isFetching, isError, data, refetch } = useFetchStockListQuery({})
  const { searchTrigger, apiResponse } = useLazyStockList()

  const findStock = async (val: string) => {
    try {
      await searchTrigger(val)
      if (apiResponse.isSuccess) {
        setShowLazyData(true)
      }
    } catch (error) {
      setShowLazyData(false)
      throw new Error('Failed to fetch')
    }
  }

  const refetchData = () => {
    setShowLazyData(false)
    refetch()
  }

  return {
    isFetching: isFetching,
    isError,
    isLoading: isLoading,
    data: data?.data,
    refetch: refetchData,
    search: findStock,
    apiLazyResponse: apiResponse,
    lazyHandle: showLazyData,
  }
}

export const useLazyStockList = () => {
  const [searchTrigger, apiResponse] = useLazySearchStockListQuery()

  return {
    isFetching: apiResponse.isFetching,
    isLoading: apiResponse.isLoading,
    data: apiResponse.data,
    searchTrigger,
    apiResponse,
  }
}

export type TUseStockList = typeof useStockList
