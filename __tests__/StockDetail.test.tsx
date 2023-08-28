import React from 'react'
import { render } from '@testing-library/react-native'
import { StockDetail, DetailScreenProps } from '../src/screens/stockDetail/stockDetailUI'
import { Provider } from 'react-redux'
import { store } from '../src/config/store'

const useStockListDetail = jest.fn()

const sample = {
  adj_close: 900,
  adj_high: 90,
  adj_low: 0.8,
  adj_open: 877,
  adj_volume: 9000,
  close: 9888,
  dividend: 900,
  exchange: 90000,
  high: 208,
  low: 18,
  open: 870,
  split_factor: 678,
  symbol: 'AAPL',
  volume: 4,
}

// Mock the useStockListDetail hook
jest.mock('@Hooks/stockDetail', () => ({
  __esModule: true,
  default: jest.fn(),
  useStockListDetail: jest.fn(() => ({
    isLoading: false,
    isFetching: false,
    isError: false,
    data: {
      data: [sample, sample],
    },
    refetch: jest.fn(),
  })),
}))

jest.mock('@Components/index', () => ({
  ErrorScreen: 'ErrorScreen',
  HeaderLayout: 'HeaderLayout',
  Loading: 'Loading',
  Spacer: 'Spacer',
  Text: 'Text',
  TextColor: 'TextColor',
}))

describe('Detail Component', () => {
  let navigation
  beforeEach(() => {
    navigation = {
      navigation: {
        navigate: jest.fn(),
      },
      route: {
        params: {
          symbol: 'AAPL',
          icon: 'apple',
          name: 'Aplle Inc',
        },
      },
    }

    useStockListDetail.mockClear()
  })

  useStockListDetail.mockReturnValue({
    isLoading: false,
    isFetching: false,
    isError: false,
    data: {
      data: [sample, sample],
    },
    refetch: jest.fn(),
  })

  it('matches stock detail snapshot', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <StockDetail {...(navigation as DetailScreenProps)} />
      </Provider>,
    )
    expect(toJSON()).toMatchSnapshot()
  })
})
