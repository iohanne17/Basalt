import ErrorScreen from '@Components/error'
import Loading from '@Components/loading'
import { TUseStockList } from '@Hooks/stocklist'
import { IRenderItemProps } from '@Screens/home'
import React, { useEffect, useState, ComponentType } from 'react'

export type ExtraInfoType = {
  data?: IRenderItemProps[]
  search: (val: string) => Promise<void>
  refetch: () => void
}

export default function withLoader<P>(WrappedComponent: ComponentType<P & ExtraInfoType>, hook: TUseStockList) {
  const ComponentWithExtraInfo = (props: P) => {
    const [innerData, setData] = useState<IRenderItemProps[] | undefined>([])
    const { isLoading, isFetching, data, isError, refetch, search, apiLazyResponse, lazyHandle } = hook()

    useEffect(() => {
      if (lazyHandle && apiLazyResponse?.isSuccess) {
        setData(apiLazyResponse?.data?.data)
      } else {
        setData(data)
      }
    }, [
      isLoading,
      lazyHandle,
      isFetching,
      apiLazyResponse?.isSuccess,
      apiLazyResponse?.data?.data?.[0]?.symbol,
      data?.[0]?.symbol,
    ])

    if (isLoading) {
      return <Loading />
    }

    if (isError) {
      return (
        <ErrorScreen
          title="Data Error"
          message="Error fetching data... Try again later"
          onPress={refetch}
          isLoading={isLoading}
        />
      )
    }
    // At this point, the props being passed in are the original props the component expects.
    return <WrappedComponent {...props} data={innerData} search={search} refetch={refetch} />
  }
  return ComponentWithExtraInfo
}
