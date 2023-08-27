import React from 'react';
import {render} from '@testing-library/react-native';
import {Home, HomeScreenProps} from '../src/screens/home/homeUI';

jest.mock('@Components/index', () => ({
  ErrorScreen: 'ErrorScreen',
  HeaderLayout: 'HeaderLayout',
  ListItemSeparator: 'ListItemSeparator',
  Loading: 'Loading',
  Spacer: 'Spacer',
  Text: 'Text',
}));

jest.mock('@Components/searchBar', () => 'SearchBar');

jest.mock('@Hooks/stocklist', () => ({
  useStockList: () => ({
    isLoading: false,
    isFetching: false,
    data: [],
    isError: false,
    refetch: jest.fn(),
    search: jest.fn(),
  }),
}));

describe('Home Component', () => {
  let navigation;
  beforeEach(() => {
    navigation = {
      navigation: {
        navigate: jest.fn(),
      },
      route: {
        params: undefined,
      },
    };
  });
  it('matches snapshot', () => {
    const {toJSON} = render(<Home {...(navigation as HomeScreenProps)} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
