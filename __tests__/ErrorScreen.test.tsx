import React from 'react';
import ErrorScreen from '../src/lib/components/error';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react-native';

const props = {
  title: 'Network error',
  message: 'Try again later',
  onPress: () => null,
  isLoading: false,
};

test('Renders snapshot as expected', () => {
  const tree = renderer.create(<ErrorScreen {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render the label', () => {
  const {getByText} = render(<ErrorScreen {...props} />);

  const label = getByText('Network error');
  expect(label).toBeTruthy();
});
